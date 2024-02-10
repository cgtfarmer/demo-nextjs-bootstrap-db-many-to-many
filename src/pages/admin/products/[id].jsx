import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
  const [product, setProduct] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        // console.log(await response.text());
        const productData = await response.json();

        setProduct(productData);
      } else {
        console.error(response);
      }
    };

    if (id == undefined) return;

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you sure ?');

    if (confirmation) {
      const response = await fetch(`/api/stores/${product.storeId}/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        console.error(response);
      }
    }
  };

  if (product == null) return;

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Show Product</h1>

      <Link variant="dark" className="me-auto" href="/admin/products">Back</Link>

      <Spacer />

      <div>
        <Link href={`/admin/products/${id}/edit`}>Edit</Link>
        <span> | </span>
        <Link href="#" onClick={() => handleDelete(product.id)}>Delete</Link>
      </div>

      <Table variant='dark' size="md" responsive striped hover className="show-table">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{product.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{product.name}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{product.weight}</td>
          </tr>
          <tr>
            <th>Color</th>
            <td>{product.color}</td>
          </tr>
          <tr>
            <th>Image</th>
            <td>{product.imageUrl}</td>
          </tr>
          <tr>
            <th>Store ID</th>
            <td>{product.storeId}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Page;
