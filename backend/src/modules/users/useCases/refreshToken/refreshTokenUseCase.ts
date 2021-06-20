import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { addDays } from "../../../../shared/utils/dateFuncs";
import { ITokenRepository } from "../../infra/ITokenRepository";

interface IPayload {
  sub: string;
  email: string;
}
interface IReturnToken {
  token: string;
  refresh_token: string;
}
@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository") private tokensRepository: ITokenRepository
  ) {}

  async execute(token: string): Promise<IReturnToken> {
    const {
      refresh_token_secret,
      refresh_token_expiration,
      token_expiration,
      token_secret,
    } = auth;
    let payload: IPayload;
    try {
      payload = verify(token, refresh_token_secret) as IPayload;
    } catch (error) {
      throw new AppError("Invalid Token");
    }

    const { email, sub } = payload;
    const userToken = await this.tokensRepository
      .findByUserId(String(sub), token)
      .catch(() => {
        throw new AppError("token not exists", 401);
      });
    await this.tokensRepository.delete(userToken.id);

    const refresh_token = sign({ email }, refresh_token_secret, {
      subject: sub,
      expiresIn: refresh_token_expiration,
    });
    const [expire] = refresh_token_expiration.split("d");
    await this.tokensRepository.create({
      refresh_token,
      expire_date: addDays(Number(expire)),
      userId: sub,
    });
    const newToken = sign({}, token_secret, {
      subject: sub,
      expiresIn: token_expiration,
    });
    return { token: newToken, refresh_token };
  }
}
