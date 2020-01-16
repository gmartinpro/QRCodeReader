import { Model, DataTypes } from "sequelize";
import { sequelize } from '@config/'
import { Models } from '@models/'

export interface UserInterface {
  id_user: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class User extends Model {
  public id_user!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id_user: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: "user",
    modelName: Models.User,
    sequelize: sequelize,
  }
);

User.sync()