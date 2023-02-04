import DIContainer, { factory, object, use } from "rsdi";
import { IDIContainer } from "rsdi/dist/types";
import { Sequelize } from "sequelize";

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

const AddCommonDefinitions = (container: DIContainer): void => {
  container.add({
    sequelize: factory(dbConfig),
  });
};

export default function ConfigDIC(): DIContainer {
  const container = new DIContainer();
  AddCommonDefinitions(container);
  (container as IDIContainer).get("sequelize").sync();
  return container;
}
