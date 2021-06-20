import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../infra/IUsersRepository";
import { User } from "../../infra/typeorm/entities/user";

interface IReturnUser {
  id: string;
  name: string;
  email: string;
  profit: number;
}
@injectable()
export class FindUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<IReturnUser> {
    const { password, ...user } = (await this.userRepository.findById(
      id
    )) as User;
    return user;
  }
}
