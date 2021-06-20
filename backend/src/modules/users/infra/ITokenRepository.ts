import { ICreateUserTokenDTO } from "../dto/ICreateUserTokenDTO";
import { UserToken } from "./typeorm/entities/userToken";

export interface ITokenRepository {
  create({
    expire_date,
    refresh_token,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserId(userId: string, token: string): Promise<UserToken>;
  delete(id: string): Promise<void>;
}
