import mysql from 'mysql2/promise';
import DbConfiguration from '../config/db-configuration';

export default class DbClient {

  static #dbConnection;

  static async getConnection() {
    if (this.#dbConnection != undefined) {
      console.log('[DatabaseConnection#getConnection] Connection already initialized, reusing...');
      return this.#dbConnection;
    }

    this.#dbConnection = await mysql.createConnection(DbConfiguration.getConfig());

    console.log('[DatabaseConnection#getConnection] Initializing...');
    await this.#dbConnection.connect();

    console.log('[DatabaseConnection#getConnection] Initialized');
    return this.#dbConnection;
  }

  static async executeStorement(sql) {
    console.log(`[DbClient#executeStorement] SQL: ${sql}`);
    const dbConnection = await this.getConnection();

    const results = await dbConnection.execute(sql);

    return results;
  }

  static async executeStorementWithParams(sql, values) {
    console.log(`[DbClient#executeStorement] SQL: ${sql}, VALUES: ${values}`);
    const dbConnection = await this.getConnection();

    const results = await dbConnection.execute(sql, values);

    return results;
  }
}
