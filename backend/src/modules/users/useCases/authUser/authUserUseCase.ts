import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { IReturnUserDTO } from "../../dto/IReturnUserDTO";
import { IUsersRepository } from "../../infra/IUsersRepository";

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute({ email, password }: ICreateUserDTO): Promise<IReturnUserDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("email or password incorret", 403);
    }

    if (user.password !== password) {
      throw new AppError("email or password incorret", 403);
    }

    const token = sign({}, "a3740377e4ff48fcf933e22e32c57c60", {
      subject: user.id,
      expiresIn: "1d",
    });
    return { user, token };
  }
}

export { AuthUserUseCase };
