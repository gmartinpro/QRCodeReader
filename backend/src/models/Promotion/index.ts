import { Model, DataTypes } from "sequelize";
import { sequelize } from '@config/'
import { Models } from '@models/'
import { QRCode } from '@models/QRCode';
import { User } from '@models/User';
import { Product } from '@models/Product';

export interface PromotionInterface {
    id_promotion: string;
    reduction_percentage: number;
    createAt?: Date;
    updateAt?: Date;
}

// export class Promotion extends Model {
//     public id_promotion!: string;
//     public reduction_percentage!: number;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
// }


export const Promotion = sequelize.define(Models.User, {
    id_promotion: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
    },
    reduction_percentage: {
        type: new DataTypes.FLOAT,
        allowNull: false
    },
},
    {
        tableName: Models.Promotion,
        modelName: Models.Promotion,
    }
);


Promotion.sync();

//Liaison avec les autres tables
// Promotion.hasOne(QRCode);
// Promotion.hasMany(Product);

