import { compare } from "bcryptjs";
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
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private tokenRepository: ITokenRepository
  ) {}
  async execute({ email, password }: ICreateUserDTO): Promise<IReturnUserDTO> {
    const {
      refresh_token_expiration,
      refresh_token_secret,
      token_expiration,
      token_secret,
    } = auth;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("email or password incorret", 403);
    }
    const correctPassword = await compare(password, user.password);

    if (!correctPassword) {
      throw new AppError("email or password incorret", 403);
    }

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

export { AuthUserUseCase };
