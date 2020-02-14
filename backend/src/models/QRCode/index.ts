import { Model, DataTypes } from "sequelize";
import { sequelize } from "@config/";
import { Models } from "@models/";


export interface QRCodeInterface {
  id_qrCode: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class QRCode extends Model {
  public id_qrCode!: string;
  public url!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QRCode.init(
  {
    id_qrCode: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    url: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: Models.QRCode,
    modelName: Models.QRCode,
    sequelize: sequelize
  }
);

QRCode.sync();
