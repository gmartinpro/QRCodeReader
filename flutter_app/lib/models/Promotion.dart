
class Promotion {
   String idPromotion;
   double reductionPercentage;
   String qrCodeIdQrCode;
   DateTime createdAt;
   DateTime updatedAt;

  Promotion(this.idPromotion, this.reductionPercentage, this.qrCodeIdQrCode, this.createdAt, this.updatedAt);

  Promotion.fromJson(Map<String, dynamic> json)
      : idPromotion = json['id_promotion'],
       reductionPercentage = json['reduction_percentage'],
       qrCodeIdQrCode = json['qrCodeIdQrCode'],
       createdAt = json['createdAt'],
        updatedAt = json['updatedAt'];
 
  Map<String, dynamic> toJson() =>
    {
      'id_promotion': idPromotion,
      'reduction_percentage': reductionPercentage,
      'qrCodeIdQrCode': qrCodeIdQrCode,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
}
