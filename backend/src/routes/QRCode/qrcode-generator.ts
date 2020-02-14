import { RequestHandler } from "express";
import { QRCode } from '@models/QRCode'
import qr from 'qr-image';
import { UuidManager } from '../../helpers/UuidManager';
import { Models } from '@models/';
import { Promotion } from '@models/Promotion';

export const generateQRCode: RequestHandler = async (_req, res) => {
    const uuidManager = new UuidManager();
    // Generer l'entité QRCode  
    const QR_CODE = await QRCode.create<QRCode>();
    const ID = QR_CODE.getDataValue("id_qrCode");
    // Génerer une image avec son UID 
    const QR_SVG = qr.image(ID, { type: 'svg' });
    const promotionUuid = uuidManager.getUuid(Models.Promotion, 1)!;
    const promotion = await Promotion.findByPk(promotionUuid);
    await promotion?.update({ qrCodeIdQrCode: ID });

    // Upload image dans src/public
    QR_SVG.pipe(require('fs').createWriteStream('./public/' + ID + '.svg'));

    var svg_string = qr.imageSync(ID, { type: 'svg' });
    // Update dans QRCode le lien 
    return res.status(200).json(svg_string);
};
