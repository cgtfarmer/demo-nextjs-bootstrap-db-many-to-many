import DbClient from '@/backend/client/db-client';

export default class StoreProductRepository {

  static async create(product) {
    console.log(`[ProductRepository#create] ${product}`);

    const sql = `
      INSERT INTO storeProducts (storeId, productId, quantity, price)
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      product.name,
      product.weight,
      product.color,
      product.imageUrl,
      // product.storeId
    ];

    const results = await DbClient.executeStorementWithParams(sql, values);

    product.id = results[0].insertId;
    return product;
  }

  static async destroy(id) {
    console.log(`[ProductRepository#destroy] ${id}`);

    const sql = `
      DELETE FROM products
      WHERE id = ?
    `;

    const values = [id];

    await DbClient.executeStorementWithParams(sql, values);
  }
}
