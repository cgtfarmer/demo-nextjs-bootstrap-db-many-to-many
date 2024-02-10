import ProductRepository from '@/backend/repository/product-repository';

export default class ProductController {

  static async index(req, res) {
    const storeId = req.query.storeId;
    console.log(`[ProductController#index] storeId=${storeId}`);

    const response = await ProductRepository.findAll(storeId);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async show(req, res) {
    const storeId = req.query.storeId;
    const productId = req.query.productId;
    console.log(`[ProductController#show] ${storeId}, ${productId}`);

    const response = await ProductRepository.findById(productId);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async create(req, res) {
    const storeId = req.query.storeId;
    const data = req.body;
    console.log(`[ProductController#create] ${storeId}, ${JSON.stringify(data)}`);

    data.storeId = storeId;
    const response = await ProductRepository.create(data);

    response.storeId = undefined;
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async update(req, res) {
    const storeId = req.query.storeId;
    // const productId = req.query.storeId;
    const data = req.body;
    console.log(`[ProductController#update] ${storeId}, ${JSON.stringify(data)}`);

    data.storeId = storeId;
    const response = await ProductRepository.update(data);

    response.storeId = undefined;
    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async destroy(req, res) {
    const productId = req.query.productId;
    console.log(`[ProductController#destroy] ${productId}`);

    await ProductRepository.destroy(productId);

    const response = { msg: 'Deleted successfully' };

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }
}
