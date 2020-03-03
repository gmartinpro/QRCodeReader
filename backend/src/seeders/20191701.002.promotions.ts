import { QueryInterface } from "sequelize";

import { UuidManager } from "../helpers/UuidManager";
import { Models } from "@models/";
import { PromotionInterface } from "@models/Promotion";

const uuidManager = new UuidManager();

/**
 * @returns {Promise<Object>}
 */
const promotionsImport = async function (sequelize: QueryInterface) {
  const promotions: PromotionInterface[] = [
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 1)!,
      qrCodeIdQrCode: uuidManager.getUuid(Models.QRCode, 1)!,
      reduction_percentage: 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 2)!,
      qrCodeIdQrCode: uuidManager.getUuid(Models.QRCode, 2)!,
      reduction_percentage: 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 3)!,
      qrCodeIdQrCode: uuidManager.getUuid(Models.QRCode, 3)!,
      reduction_percentage: 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 4)!,
      qrCodeIdQrCode: uuidManager.getUuid(Models.QRCode, 4)!,
      reduction_percentage: 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 5)!,
      qrCodeIdQrCode: uuidManager.getUuid(Models.QRCode, 4)!,
      reduction_percentage: 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  uuidManager.persist();

  return sequelize.bulkInsert(Models.Promotion, promotions);
};

export const up = async (sequelize: QueryInterface) => {
  await promotionsImport(sequelize);
};
export const down = async (sequelize: QueryInterface) => {
  await sequelize.bulkDelete(Models.Promotion, {});
};
