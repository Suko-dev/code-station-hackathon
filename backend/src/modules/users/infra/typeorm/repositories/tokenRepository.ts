import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../../dto/ICreateUserTokenDTO";
import { ITokenRepository } from "../../ITokenRepository";
import { UserToken } from "../entities/userToken";

export class UserTokensRepository implements ITokenRepository {
  private repository: Repository<UserToken>;
  constructor() {
    this.repository = getRepository(UserToken);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  findByUserId(userId: string, refresh_token: string): Promise<UserToken> {
    return this.repository.findOneOrFail({ userId, refresh_token });
  }

  async create({
    expire_date,
    refresh_token,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      userId,
      refresh_token,
      expire_date,
    });
    await this.repository.save(userToken);
    return userToken;
  }
}
