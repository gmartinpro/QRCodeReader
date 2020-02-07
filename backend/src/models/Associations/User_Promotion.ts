import { Model, DataTypes } from "sequelize";
import { sequelize } from "@config/";
import { Models } from "@models/";

export interface UserPromotionInterface {
  id_user: string;
  id_promotion: string;
  id_user_promotion?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class UserPromotion extends Model implements UserPromotionInterface {
  public id_user_promotion!: string;
  public id_user!: string;
  public id_promotion!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserPromotion.init(
  {
    id_user_promotion: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_promotion: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    tableName: Models.User_Promotion,
    sequelize
  }
);


UserPromotion.sync();
