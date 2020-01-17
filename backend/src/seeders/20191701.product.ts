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
const productImport = async function(sequelize: QueryInterface) {
  const products: ProductInterface[] = [
    {
      id_product: uuidManager.getUuid(Models.Product, 1)!,
      description: faker.commerce.product(),
      name: faker.commerce.productName(),
      imageUrl: faker.image.imageUrl(),
      price: Number(faker.commerce.price()),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_product: uuidManager.getUuid(Models.Product, 2)!,
      description: faker.commerce.product(),
      name: faker.commerce.productName(),
      imageUrl: faker.image.imageUrl(),
      price: Number(faker.commerce.price()),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_product: uuidManager.getUuid(Models.Product, 3)!,
      description: faker.commerce.product(),
      name: faker.commerce.productName(),
      imageUrl: faker.image.imageUrl(),
      price: Number(faker.commerce.price()),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_product: uuidManager.getUuid(Models.Product, 4)!,
      description: faker.commerce.product(),
      name: faker.commerce.productName(),
      imageUrl: faker.image.imageUrl(),
      price: Number(faker.commerce.price()),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_product: uuidManager.getUuid(Models.Product, 5)!,
      description: faker.commerce.product(),
      name: faker.commerce.productName(),
      imageUrl: faker.image.imageUrl(),
      price: Number(faker.commerce.price()),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  uuidManager.persist();

  return sequelize.bulkInsert(Models.Product, products);
};

export const up = async (sequelize: QueryInterface) => {
  await productImport(sequelize);
};
export const down = async (sequelize: QueryInterface) => {
  await sequelize.bulkDelete(Models.User, {});
};
