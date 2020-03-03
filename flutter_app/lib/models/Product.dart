class Product {
   String idProduct;
   String name;
   String imageUrl;
   String description;
   double price;
   DateTime createdAt;
   DateTime updatedAt;

  Product(this.idProduct, this.name, this.imageUrl, this.description, this.price, this.createdAt, this.updatedAt);

  Product.fromJson(Map<String, dynamic> json)
      : idProduct = json['id_product'],
       name = json['name'],
       imageUrl = json['imageUrl'],
       description = json['description'],
       price = json['price'],
       createdAt = json['createdAt'],
        updatedAt = json['updatedAt'];
 
  Map<String, dynamic> toJson() =>
    {
      'id_product': idProduct,
      'name': name,
      'imageUrl': imageUrl,
      'description': description,
      'price': price,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
}