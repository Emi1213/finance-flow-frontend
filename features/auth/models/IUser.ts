export interface IAuth {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  lastname: string;
}

export interface IUserResponse {
  id: number;
  email: string;
  name: string;
  lastname: string;
  password: string;
}
