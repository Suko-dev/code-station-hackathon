import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../infra/IUsersRepository";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<void> {
    this.userRepository.delete(id);
  }
}

export { DeleteUserUseCase };
