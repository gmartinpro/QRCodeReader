import { Model, DataTypes } from "sequelize";
import { sequelize } from "@config/";
import { Models } from "@models/";
import { Promotion } from "@models/Promotion";

export interface ProductInterface {
  id_product: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Model {
  public id_product!: string;
  public name!: string;
  public imageUrl!: string;
  public description!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id_product: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    imageUrl: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    description: {
      type: new DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: new DataTypes.FLOAT(),
      allowNull: false
    }
  },
  {
    tableName: Models.Product,
    modelName: Models.Product,
    sequelize: sequelize
  }
);

//

Product.sync();
