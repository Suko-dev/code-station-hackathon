import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dto/IUpdateUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { User } from "../typeorm/entities/user";

class UsersRepositoryInMemory implements IUsersRepository {
  repository: User[] = [];

  async delete(id: string): Promise<void> {
    const index = this.repository.findIndex((item) => item.id === id);
    this.repository.splice(index, 1);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.find((item) => item.email === email);
  }

  async create({ email, image, password }: ICreateUserDTO): Promise<User> {
    const newItem = new User();
    Object.assign(newItem, { email, image, password });
    this.repository.push(newItem);
    return newItem;
  }

  async update({ name, image, profit, id }: IUpdateUserDTO): Promise<User> {
    const index = this.repository.findIndex((item) => item.id === id);
    const user = this.repository.find((item) => item.id === id);
    if (!user) {
      throw new Error("user not found");
    }
    Object.assign(user, { name, image, profit });
    this.repository[index] = user;

    return user;
  }
}
export { UsersRepositoryInMemory };
