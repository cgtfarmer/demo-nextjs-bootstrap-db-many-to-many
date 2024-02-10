import DbClient from '@/backend/client/db-client';

export default class StoreSummaryRepository {

  static async findAll() {
    console.log('[StoreSummaryRepository#findAll]');

    const sql = `
      SELECT S.id, S.name, S.logoUrl, COUNT(U.id) population,
        AVG(U.age) avgAge, AVG(U.weight) avgWeight, AVG(U.income) avgIncome
      FROM stores S
      JOIN products U ON U.storeId = S.id
      GROUP BY S.id
    `;

    const results = await DbClient.executeStorement(sql);

    const storeSummaries = results[0];

    console.log(storeSummaries);

    return storeSummaries;
  }

  static async findById(id) {
    console.log(`[StoreSummaryRepository#findById] ${id}`);

    const sql = `
      SELECT S.id, S.name, S.logoUrl, COUNT(U.id) population,
        AVG(U.age) avgAge, AVG(U.weight) avgWeight, AVG(U.income) avgIncome
      FROM stores S
      JOIN products U ON U.storeId = S.id
      WHERE S.id = ?
      GROUP BY S.id
    `;

    const values = [id];

    const results = await DbClient.executeStorementWithParams(sql, values);

    const storeSummary = results[0][0];

    return storeSummary;
  }
}
