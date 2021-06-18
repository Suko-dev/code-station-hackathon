import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dto/ICreateUserDTO";
import { IUpdateUserDTO } from "../../../dto/IUpdateUserDTO";
import { IUsersRepository } from "../../IUsersRepository";
import { User } from "../entities/user";

class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;
  constructor() {
    this.usersRepository = getRepository(User);
  }

  findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne(email);
  }

  async create({ email, password }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({ email, password });
    await this.usersRepository.save(user);
    return user;
  }

  async update({ id, profit, image, name }: IUpdateUserDTO): Promise<User> {
    await this.usersRepository.update(
      { id },
      {
        profit,
        image,
        name,
      }
    );
    const user = await this.usersRepository.findOneOrFail(id);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
export { UsersRepository };
