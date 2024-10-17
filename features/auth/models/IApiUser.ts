import { IUserResponse } from "./IUser";

export interface IApiUser {
  token: string;
  user: IUserResponse;
}
