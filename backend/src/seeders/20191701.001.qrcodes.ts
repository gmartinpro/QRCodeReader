import { QueryInterface } from "sequelize";

import { UuidManager } from "../helpers/UuidManager";
import { Models } from "@models/";
import { QRCodeInterface } from "@models/QRCode";

const uuidManager = new UuidManager();

/**
 * @returns {Promise<Object>}
 */
const qrcodeImport = async function (sequelize: QueryInterface) {
  const qrcodes: QRCodeInterface[] = [
    {
      id_qrCode: uuidManager.getUuid(Models.QRCode, 1)!,
      url: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_qrCode: uuidManager.getUuid(Models.QRCode, 2)!,
      url: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_qrCode: uuidManager.getUuid(Models.QRCode, 3)!,
      url: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_qrCode: uuidManager.getUuid(Models.QRCode, 4)!,
      url: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_qrCode: uuidManager.getUuid(Models.QRCode, 5)!,
      url: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  uuidManager.persist();

  return sequelize.bulkInsert(Models.QRCode, qrcodes);
};

export const up = async (sequelize: QueryInterface) => {
  await qrcodeImport(sequelize);
};
export const down = async (sequelize: QueryInterface) => {
  await sequelize.bulkDelete(Models.QRCode, {});
};
