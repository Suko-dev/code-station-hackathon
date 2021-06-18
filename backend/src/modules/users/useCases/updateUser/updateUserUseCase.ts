import { inject, injectable } from "tsyringe";

import { IUpdateUserDTO } from "../../dto/IUpdateUserDTO";
import { IUsersRepository } from "../../infra/IUsersRepository";
import { User } from "../../infra/typeorm/entities/user";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute({ id, image, name, profit }: IUpdateUserDTO): Promise<User> {
    return this.userRepository.update({ id, name, image, profit });
  }
}

export { UpdateUserUseCase };
