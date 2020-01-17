import { QueryInterface } from "sequelize";
import faker from "faker";

import { UuidManager } from "../helpers/UuidManager";
import { Models } from "@models/";
import { PromotionInterface } from "@models/Promotion";
import { ProductInterface } from "@models/Product";
import { QRCodeInterface } from "@models/QRCode";

const uuidManager = new UuidManager();

/**
 * @returns {Promise<Object>}
 */
const promotionsImport = async function(sequelize: QueryInterface) {
  const promotions: PromotionInterface[] = [
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 1)!,
      reduction_percentage: 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 2)!,
      reduction_percentage: 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 3)!,
      reduction_percentage: 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 4)!,
      reduction_percentage: 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion: uuidManager.getUuid(Models.Promotion, 5)!,
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
  await sequelize.bulkDelete(Models.User, {});
};
