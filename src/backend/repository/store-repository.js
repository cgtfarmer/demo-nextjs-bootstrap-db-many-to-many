import DbClient from '@/backend/client/db-client';

export default class StoreRepository {

  static async findAll() {
    console.log('[StoreRepository#findAll]');

    const results = await DbClient.executeStorement(`
      SELECT *
      FROM stores
    `);

    const stores = results[0];

    return stores;
  }

  static async findById(id) {
    console.log(`[StoreRepository#findById] ${id}`);

    const sql = `
      SELECT *
      FROM stores
      WHERE id = ?
    `;

    const values = [id];

    const results = await DbClient.executeStorementWithParams(sql, values);

    const store = results[0][0];

    return store;
  }

  static async create(store) {
    console.log(`[StoreRepository#create] ${store}`);

    const sql = `
      INSERT INTO stores (name, logoUrl)
      VALUES (?, ?)
    `;

    const values = [
      store.name,
      store.logoUrl
    ];

    const results = await DbClient.executeStorementWithParams(sql, values);

    store.id = results[0].insertId;
    return store;
  }

  static async update(store) {
    console.log(`[StoreRepository#update] ${store}`);

    const sql = `
      UPDATE stores
      SET name = ?,
          logoUrl = ?
      WHERE id = ?
    `;

    const values = [
      store.name,
      store.logoUrl,
      store.id
    ];

    await DbClient.executeStorementWithParams(sql, values);

    return store;
  }

  static async destroy(id) {
    console.log(`[StoreRepository#destroy] ${id}`);

    const sql = `
      DELETE FROM stores
      WHERE id = ?
    `;

    const values = [id];

    await DbClient.executeStorementWithParams(sql, values);
  }
}
