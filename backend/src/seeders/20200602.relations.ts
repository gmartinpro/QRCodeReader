import { QueryInterface } from "sequelize";

import { UuidManager } from "../helpers/UuidManager";
import { Models } from "@models/";
import { UserPromotionInterface, PromotionProductInterface } from "@models/Associations";

const uuidManager = new UuidManager();

/**
 * @returns {Promise<Object>}
 */
const promotionUser = async function (sequelize: QueryInterface) {
  const user_promotions: UserPromotionInterface[] = [
    {
      id_user_promotion: uuidManager.getUuid(Models.User_Promotion, 1)!,
      id_user: uuidManager.getUuid(Models.User, 1)!,
      id_promotion: uuidManager.getUuid(Models.Promotion, 1)!,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user_promotion: uuidManager.getUuid(Models.User_Promotion, 2)!,
      id_user: uuidManager.getUuid(Models.User, 2)!,
      id_promotion: uuidManager.getUuid(Models.Promotion, 2)!,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user_promotion: uuidManager.getUuid(Models.User_Promotion, 3)!,
      id_user: uuidManager.getUuid(Models.User, 3)!,
      id_promotion: uuidManager.getUuid(Models.Promotion, 3)!,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user_promotion: uuidManager.getUuid(Models.User_Promotion, 4)!,
      id_user: uuidManager.getUuid(Models.User, 4)!,
      id_promotion: uuidManager.getUuid(Models.Promotion, 4)!,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  uuidManager.persist();

  return sequelize.bulkInsert(Models.User_Promotion, user_promotions);
};

const promotionProduct = async function (sequelize: QueryInterface) {
  const promotion_product: PromotionProductInterface[] = [
    {
      id_promotion_product: uuidManager.getUuid(Models.Promotion_Product, 1)!,
      id_product: uuidManager.getUuid(Models.Product, 1)!,
      id_promotion: uuidManager.getUuid(Models.Promotion, 1)!,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion_product: uuidManager.getUuid(Models.Promotion_Product, 2)!,
      id_product: uuidManager.getUuid(Models.Product, 2)!,
      id_promotion: uuidManager.getUuid(Models.Promotion, 2)!,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion_product: uuidManager.getUuid(Models.Promotion_Product, 3)!,
      id_product: uuidManager.getUuid(Models.Product, 3)!,
      id_promotion: uuidManager.getUuid(Models.Promotion, 3)!,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_promotion_product: uuidManager.getUuid(Models.Promotion_Product, 4)!,
      id_product: uuidManager.getUuid(Models.Product, 4)!,
      id_promotion: uuidManager.getUuid(Models.Promotion, 4)!,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  uuidManager.persist();

  return sequelize.bulkInsert(Models.Promotion_Product, promotion_product);
};

export const up = async (sequelize: QueryInterface) => {
  let error;
  await promotionUser(sequelize).catch(err => (error = err));
  await promotionProduct(sequelize).catch(err => (error = err));
  if (error) {
    throw error
  }

};
export const down = async (sequelize: QueryInterface) => {
  await sequelize.bulkDelete(Models.User_Promotion, {});
  await sequelize.bulkDelete(Models.Promotion_Product, {});
};
