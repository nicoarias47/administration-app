import DIContainer, { factory, object, use } from "rsdi";
import { IDIContainer } from "rsdi/dist/types";
import { Sequelize } from "sequelize";
import { UserModel } from "../modules/user/infrastructure/user_model";
import { UserController } from "../modules/user/interface/user_controller";
import { UserRepository, UserService } from "../modules/user/user_module";

const dbConfig = (): Sequelize => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === "development") {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./data/development_database.db",
    });

    return sequelize;
  }

  if (NODE_ENV === "production") {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./data/production_database.db",
    });

    return sequelize;
  }

  if (NODE_ENV === "test") {
    const sequelize = new Sequelize("sqlite::memory:");

    return sequelize;
  }

  throw new Error("NODE_ENV variable not found");
};

const configureUserModel = (container: IDIContainer): typeof UserModel => {
  return UserModel.setup(container.get("sequelize"));
};

const AddCommonDefinitions = (container: DIContainer): void => {
  container.add({
    sequelize: factory(dbConfig),
  });
};

const AddUserDefinitions = (container: DIContainer): void => {
  container.add({
    UserController: object(UserController).construct(
      use(UserService),
      use(UserRepository)
    ),
    UserService: object(UserService).construct(use(UserRepository)),
    UserRepository: object(UserRepository).construct(use(UserModel)),
    UserModel: factory(configureUserModel),
  });
};

export default function ConfigDIC(): DIContainer {
  const container = new DIContainer();
  AddCommonDefinitions(container);
  AddUserDefinitions(container);
  (container as IDIContainer).get("sequelize").sync();
  return container;
}
