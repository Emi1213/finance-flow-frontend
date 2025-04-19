import { UserAdapter } from "../UserAdapter";
import { IApiUser } from "../../models/IApiUser";
import { IUserResponse } from "../../models/IUser";

describe("UserAdapter", () => {
  it("debe transformar un IApiUser a IUserResponse correctamente", () => {
    const apiUser: IApiUser = {
      token: "abc123",
      user: {
        id: 1,
        email: "john@example.com",
        name: "John",
        lastname: "Doe",
        password: "hashedpassword123",
      },
    };

    const expected: IUserResponse = {
      id: 1,
      email: "john@example.com",
      name: "John",
      lastname: "Doe",
      password: "hashedpassword123",
    };

    const result = UserAdapter.toDomain(apiUser);

    expect(result).toEqual(expected);
  });
});
