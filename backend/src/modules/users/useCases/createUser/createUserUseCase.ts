import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { IReturnUserDTO } from "../../dto/IReturnUserDTO";
import { IUsersRepository } from "../../infra/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute({ email, password }: ICreateUserDTO): Promise<IReturnUserDTO> {
    const verifyEmail = await this.userRepository.findByEmail(email);

    if (verifyEmail) {
      throw new AppError("user already exists");
    }
    const user = await this.userRepository.create({
      email,
      password,
    });

    const token = sign({}, "a3740377e4ff48fcf933e22e32c57c60", {
      subject: user.id,
      expiresIn: "1d",
    });
    return { user, token };
  }
}

export { CreateUserUseCase };
