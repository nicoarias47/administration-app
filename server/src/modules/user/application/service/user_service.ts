import { IUserRepository } from "../repository/user_repository_interface";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}
}
