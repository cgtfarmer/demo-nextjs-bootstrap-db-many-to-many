export default class DbConfiguration {

  static #configuration = {
    host: 'mysql', // This is the service name defined in the docker-compose file
    user: 'root',
    password: 'super',
    database: 'myDatabase'
  };

  static getConfig() {
    return this.#configuration;
  }
}
