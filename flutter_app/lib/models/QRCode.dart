class QRCode {
   String idQrCode;
   DateTime createdAt;
   DateTime updatedAt;

  QRCode(this.idQrCode, this.createdAt, this.updatedAt);

  QRCode.fromJson(Map<String, dynamic> json)
      : idQrCode = json['id_qrCode'],
       createdAt = json['createdAt'],
        updatedAt = json['updatedAt'];

  Map<String, dynamic> toJson() =>
    {
      'id_qrCode': idQrCode,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
}
