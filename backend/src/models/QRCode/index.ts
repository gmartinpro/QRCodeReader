import { Model, DataTypes } from "sequelize";
import { sequelize } from '@config/'
import { Models } from '@models/'
import { Product } from '@models/Product';

export interface QRCodeInterface {
    id_qrCode: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class QRCode extends Model {
    public id_qrCode!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

QRCode.init(
    {
        id_qrCode: {
            type: DataTypes.UUID,
            unique: true,
            primaryKey: true,
        }
    }, 
    {
    tableName: Models.QRCode,
    modelName: Models.QRCode,
    sequelize: sequelize
    }
);

QRCode.sync();

QRCode.hasOne(Product);