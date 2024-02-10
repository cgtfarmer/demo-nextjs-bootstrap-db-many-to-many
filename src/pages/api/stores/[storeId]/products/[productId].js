import ProductController from '@/backend/controller/product-controller';

async function handler(req, res) {
  console.log(`==> Router: START [${req.method}] ${req.url}`);

  switch(req.method) {
  case 'GET':
    await ProductController.show(req, res);
    break;

  case 'PUT':
    await ProductController.update(req, res);
    break;

  case 'DELETE':
    await ProductController.destroy(req, res);
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }

  console.log(`==> Router: END [${req.method}] ${req.url}`);
}

export default handler;
