class User {
   String idUser;
   String name;
   DateTime createdAt;
   DateTime updatedAt;

  User(this.idUser, this.name, this.createdAt, this.updatedAt);

  User.fromJson(Map<String, dynamic> json)
      : idUser = json['id_user'],
       name = json['name'],
       createdAt = json['createdAt'],
        updatedAt = json['updatedAt'];

  Map<String, dynamic> toJson() =>
    {
      'id_user': idUser,
      'name': name,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
}
