import StoreSummaryRepository from '@/backend/repository/store-summary-repository';

export default class StoreSummaryController {

  static async index(req, res) {
    console.log('[StoreSummaryController#index]');

    const response = await StoreSummaryRepository.findAll();

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async show(req, res) {
    const storeId = req.query.storeId;
    console.log(`[StoreSummaryController#show] ${storeId}`);

    const response = await StoreSummaryRepository.findById(storeId);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }
}
