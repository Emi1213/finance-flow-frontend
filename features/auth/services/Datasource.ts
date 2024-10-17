import { IAuth, IUserResponse } from "../models/IUser";
import { IApiUser } from "../models/IApiUser";
import { UserAdapter } from "../adapters/UserAdapter";

import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { AxiosClient } from "@/core/infraestructure/http/AxiosClient";
import { setCookie } from "@/core/utils/CookiesUtil";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  API_ROUTES,
} from "@/shared/api-routes/api-routes";

interface UserDatasource {
  login(credentials: IAuth): Promise<IUserResponse>;
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

    console.log(API_ROUTES.AUTH.LOGIN);

    data.token && (await setCookie(ACCESS_TOKEN_COOKIE_NAME, data.token));

    return UserAdapter.toDomain(data);
  }
}
