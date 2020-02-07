import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "@config/";
import { Models } from "@models/";
import { QRCode } from "@models/QRCode";
import { User } from '@models/User';

export interface PromotionInterface {
  id_promotion: string;
  reduction_percentage: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Promotion extends Model {
  public id_promotion!: string;
  public reduction_percentage!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Promotion.init(
  {
    id_promotion: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    reduction_percentage: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    tableName: Models.Promotion,
    modelName: Models.Promotion,
    sequelize: sequelize
  }
);

//Liaison avec les autres tables
Promotion.hasOne(QRCode);

Promotion.sync();

