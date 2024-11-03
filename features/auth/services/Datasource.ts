import { IAuth, IUserResponse } from "../models/IUser";
import { IApiUser } from "../models/IApiUser";
import { UserAdapter } from "../adapters/UserAdapter";
import { ISignUp } from "../models/ISignUp";

import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { setCookie } from "@/core/utils/CookiesUtil";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  API_ROUTES,
} from "@/shared/api-routes/api-routes";

interface UserDatasource {
  login(credentials: IAuth): Promise<IUserResponse>;
  register(credentials: ISignUp): Promise<IUserResponse>;
}

export class UserDatasourceImpl implements UserDatasource {
  private httpClient: HttpHandler;

  constructor() {
    this.httpClient = AxiosClient.getInstance();
  }

  static getInstance(): UserDatasource {
    return new UserDatasourceImpl();
  }

  async login(credentials: IAuth): Promise<IUserResponse> {
    const data = await this.httpClient.post<IApiUser>(
      API_ROUTES.AUTH.LOGIN,
      credentials,
    );

    data.token && (await setCookie(ACCESS_TOKEN_COOKIE_NAME, data.token));

    return UserAdapter.toDomain(data);
  }

  async register(credentials: ISignUp): Promise<IUserResponse> {
    const data = await this.httpClient.post<IApiUser>(
      API_ROUTES.AUTH.REGISTER,
      credentials,
    );

    data.token && (await setCookie(ACCESS_TOKEN_COOKIE_NAME, data.token));

    return UserAdapter.toDomain(data);
  }
}
