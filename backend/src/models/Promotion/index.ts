import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "@config/";
import { Models } from "@models/";
import { QRCode } from "@models/QRCode";
import { Product } from "@models/Product";
import { PromotionProduct } from "@models/Associations";

export interface PromotionInterface {
  id_promotion: string;
  reduction_percentage: number;
  qrCodeIdQrCode: string;
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

Promotion.belongsTo(QRCode, {
  constraints: true
});
QRCode.hasOne(Promotion, { constraints: true });

Promotion.belongsToMany(Product, {
  through: PromotionProduct,
  foreignKey: "id_promotion",
  as: Models.Promotion_Product
});
Product.belongsToMany(Promotion, {
  through: PromotionProduct,
  foreignKey: "id_product",
  as: Models.Promotion_Product
});

