import { IApiUser } from "../models/IApiUser";
import { IUserResponse } from "../models/IUser";

export class UserAdapter {
  static toDomain(data: IApiUser): IUserResponse {
    return {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      lastname: data.user.lastname,
      password: data.user.password,
    };
  }
}
