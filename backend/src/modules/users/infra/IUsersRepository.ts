import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { IUpdateUserDTO } from "../dto/IUpdateUserDTO";
import { User } from "./typeorm/entities/user";

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<User>;
  update(userId: IUpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}

export { IUsersRepository };
