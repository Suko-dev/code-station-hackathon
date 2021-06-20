import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { addDays } from "../../../../shared/utils/dateFuncs";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { IReturnUserDTO } from "../../dto/IReturnUserDTO";
import { ITokenRepository } from "../../infra/ITokenRepository";
import { IUsersRepository } from "../../infra/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private tokenRepository: ITokenRepository
  ) {}
  async execute({ email, password }: ICreateUserDTO): Promise<IReturnUserDTO> {
    const verifyEmail = await this.userRepository.findByEmail(email);
    const {
      token_secret,
      refresh_token_expiration,
      refresh_token_secret,
      token_expiration,
    } = auth;
    if (verifyEmail) {
      throw new AppError("user already exists");
    }
    const hashPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      email,
      password: hashPassword,
    });

    const token = sign({}, token_secret, {
      subject: user.id,
      expiresIn: token_expiration,
    });
    const refresh_token = sign({ email }, refresh_token_secret, {
      subject: user.id,
      expiresIn: refresh_token_expiration,
    });
    const [expire] = refresh_token_expiration.split("d");
    await this.tokenRepository.create({
      refresh_token,
      expire_date: addDays(Number(expire)),
      userId: user.id,
    });
    return { user, token, refresh_token };
  }
}

export { CreateUserUseCase };
