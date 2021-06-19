import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../infra/IUsersRepository";
import { User } from "../../infra/typeorm/entities/user";

@injectable()
export class FindUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<User> {
    return (await this.userRepository.findById(id)) as User;
  }
}
