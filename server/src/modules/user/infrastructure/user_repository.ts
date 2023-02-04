import { IUserRepository } from "../application/repository/user_repository_interface";
import { UserModel } from "./user_model";

export class UserRepository implements IUserRepository {
  userModel: typeof UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel as any;
  }
}
