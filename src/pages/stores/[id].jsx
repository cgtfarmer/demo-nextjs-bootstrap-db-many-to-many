import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
  const [store, setStore] = useState({});
  const [products, setProducts] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchStore = async () => {
      const response = await fetch(`/api/stores/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        // console.log(await response.text());
        const storeData = await response.json();

        setStore(storeData);
      } else {
        console.error(response);
      }
    };

    if (id == undefined) return;

    fetchStore();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/stores/${id}/products`, {
        method: 'GET'
      });

      if (response.ok) {
        const products = await response.json();
        console.log(`Products: ${JSON.stringify(products)}`);
        setProducts(products);
      } else {
        console.error(response);
      }
    };

    if (id == undefined) return;

    fetchProducts();
  }, [id]);

  if (store == null || products == null) return;

  const rows = [];
  for (let product of products) {
    const key = `${product.id}`;

    const row = (
      <tr key={key}>
        <td>{product.name}</td>
        <td>{product.weight}</td>
        <td>{product.color}</td>
        <td>{product.imageUrl}</td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="display-6 my-3 mb-4">{store.name} ({store.logoUrl})</h1>

      <Link variant="dark" className="me-auto" href="/stores">Back</Link>

      <Spacer />

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Color</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  );
}

export default Page;
