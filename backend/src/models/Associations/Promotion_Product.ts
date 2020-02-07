import { Model, DataTypes } from "sequelize";
import { sequelize } from "@config/";
import { Models } from "@models/";

export interface PromotionProductInterface {
  id_promotion_product: string;
  id_product: string;
  id_promotion?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class PromotionProduct extends Model implements PromotionProductInterface {
  public id_promotion_product!: string;
  public id_product!: string;
  public id_promotion!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PromotionProduct.init(
  {
    id_promotion_product: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    id_product: {
      type: DataTypes.UUID,
      allowNull: false
    },
    id_promotion: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    tableName: Models.Promotion_Product,
    sequelize
  }
);

PromotionProduct.sync();
