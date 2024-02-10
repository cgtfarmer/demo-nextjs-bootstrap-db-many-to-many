import DbClient from '@/backend/client/db-client';

export default class ProductRepository {

  static async findAll(storeId) {
    console.log(`[ProductRepository#findAll] storeId=${storeId}`);

    let sql = `
      SELECT P.*
      FROM products P
      JOIN storeProducts SP on SP.productId = P.id
    `;

    if (storeId != undefined) sql += `WHERE SP.storeId = ${storeId}`;

    const results = await DbClient.executeStorement(sql);

    const products = results[0];

    return products;
  }

  static async findById(id) {
    console.log(`[ProductRepository#findById] ${id}`);

    const sql = `
      SELECT *
      FROM products
      WHERE id = ?
    `;

    const values = [id];

    const results = await DbClient.executeStorementWithParams(sql, values);

    const product = results[0][0];

    return product;
  }

  static async create(product) {
    console.log(`[ProductRepository#create] ${product}`);

    const sql = `
      INSERT INTO products (name, weight, color, imageUrl)
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

  static async update(product) {
    console.log(`[ProductRepository#update] ${product}`);

    const sql = `
      UPDATE products
      SET name = ?,
          weight = ?,
          color = ?,
          imageUrl = ?
      WHERE id = ?
    `;

    const values = [
      product.name,
      product.weight,
      product.color,
      product.imageUrl,
      // product.storeId,
      product.id
    ];

    await DbClient.executeStorementWithParams(sql, values);

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
