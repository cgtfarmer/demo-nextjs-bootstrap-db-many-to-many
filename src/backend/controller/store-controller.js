import StoreRepository from '@/backend/repository/store-repository';

export default class StoreController {

  static async index(req, res) {
    console.log('[StoreController#index]');

    const response = await StoreRepository.findAll();

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async show(req, res) {
    const storeId = req.query.storeId;
    console.log(`[StoreController#show] ${storeId}`);

    const response = await StoreRepository.findById(storeId);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async create(req, res) {
    const data = req.body;
    console.log(`[StoreController#create] ${JSON.stringify(data)}`);

    const response = await StoreRepository.create(data);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async update(req, res) {
    const storeId = req.query.storeId;
    const data = req.body;
    console.log(`[StoreController#update] ${storeId}, ${JSON.stringify(data)}`);

    data.id = storeId;
    const response = await StoreRepository.update(data);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async destroy(req, res) {
    const storeId = req.query.storeId;
    console.log(`[StoreController#destroy] ${storeId}`);

    await StoreRepository.destroy(storeId);

    const response = { msg: 'Deleted successfully' };

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }
}
