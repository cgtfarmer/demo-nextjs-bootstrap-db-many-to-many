import StoreController from '@/backend/controller/store-controller';

async function handler(req, res) {
  console.log(`==> Router: START [${req.method}] ${req.url}`);

  switch(req.method) {
  case 'GET':
    await StoreController.show(req, res);
    break;

  case 'PUT':
    await StoreController.update(req, res);
    break;

  case 'DELETE':
    await StoreController.destroy(req, res);
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }

  console.log(`==> Router: END [${req.method}] ${req.url}`);
}

export default handler;
