import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

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
      throw new Error("email or password incorret");
    }

    if (user.password !== password) {
      throw new Error("email or password incorret");
    }

    const token = sign({}, "a3740377e4ff48fcf933e22e32c57c60", {
      subject: user.id,
      expiresIn: "1d",
    });
    const returnUser: IReturnUserDTO = { user, token };
    return returnUser;
  }
}

export { AuthUserUseCase };
