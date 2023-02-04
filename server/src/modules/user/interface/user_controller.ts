import { Application } from "express";
import { IUserRepository } from "../application/repository/user_repository_interface";
import { UserService } from "../application/service/user_service";

export class UserController {
  baseRoute = "/user";
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: IUserRepository
  ) {}

  configureRoutes(app: Application): void {}
}
