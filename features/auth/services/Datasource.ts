import { IAuth, IUser } from "../models/IUser";

interface UserDatasource {
  login(credentials: IAuth): Promise<IUser>;
}

export class UserDatasourceImpl implements UserDatasource {
    private httpClient: HttpHandler

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): UserDatasource {
    return new UserDatasourceImpl()
  }
}
