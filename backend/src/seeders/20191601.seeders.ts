import { UuidManager } from "../helpers/UuidManager";
import { Sequelize, QueryInterface } from "sequelize";
import { UserInterface } from "@models/User";
import { Models } from "@models/";

const uuidManager = new UuidManager();

/**
 * @returns {Promise<Object>}
 */
const userImport = async function(sequelize: QueryInterface) {
  const users: UserInterface[] = [
    {
      id_user: uuidManager.getUuid(Models.User, 1)!,
      name: "Adrien",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: uuidManager.getUuid(Models.User, 2)!,
      name: "Gabriel",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: uuidManager.getUuid(Models.User, 3)!,
      name: "Vincent",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: uuidManager.getUuid(Models.User, 4)!,
      name: "Pierre",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: uuidManager.getUuid(Models.User, 5)!,
      name: "Paul",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: uuidManager.getUuid(Models.User, 6)!,
      name: "Jacques",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  uuidManager.persist();

  return sequelize.bulkInsert(Models.User, users);
};

export const up = async (sequelize: QueryInterface) => {
  await userImport(sequelize);
};
export const down = async (sequelize: QueryInterface) => {
  await sequelize.bulkDelete(Models.User, {});
};