import { Model, Sequelize, DataTypes } from "sequelize";

export class UserModel extends Model<any> {
  static setup(sequelizeInstance: Sequelize): typeof UserModel {
    UserModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "User",
        tableName: "users",
        underscored: true,
        paranoid: true,
      }
    );

    return UserModel;
  }
}
