export interface ICreateUserTokenDTO {
  userId: string;
  refresh_token: string;
  expire_date: Date;
}
