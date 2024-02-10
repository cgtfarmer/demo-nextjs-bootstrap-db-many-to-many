class PwHelpers {

  static async createDefaultStore(request) {
    const response = await request.post('/api/stores', {
      data: {
        name: 'TestMart',
        logoUrl: '/walmart-logo.png',
      }
    });

    return await response.json();
  }

  static async createDefaultProduct(request) {
    const createStoreBody = await this.createDefaultStore(request);

    const createProductResponse = await request.post(
      `/api/stores/${createStoreBody.id}/products`,
      {
        data: {
          name: 'Apple',
          weight: 0.9,
          color: 'red',
          imageUrl: '/apple.png'
        }
      }
    );

    const data = await createProductResponse.json();

    data.storeId = createStoreBody.id;
    return data;
  };

  static async createDefaultProductWithStoreId(request, storeId) {
    const createProductResponse = await request.post(`/api/stores/${storeId}/products`, {
      data: {
        name: 'Apple',
        weight: 0.9,
        color: 'red',
        imageUrl: '/apple.png'
      }
    });

    return await createProductResponse.json();
  };
}

module.exports = PwHelpers;
