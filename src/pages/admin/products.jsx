import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products', {
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

    fetchProducts();
  }, []);

  const handleDelete = async (storeId, id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/stores/${storeId}/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  if (products.length < 1) return;

  const rows = [];
  for (let product of products) {
    const key = `${product.id}`;

    const row = (
      <tr key={key}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.weight}</td>
        <td>{product.color}</td>
        <td>{product.imageUrl}</td>
        <td>{product.storeId}</td>
        <td>
          <Link href={`/admin/products/${product.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="#" onClick={() => handleDelete(product.storeId, product.id)}>Delete</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Products</h1>

      <Button variant="primary" href="/admin/products/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Income</th>
            <th>Store ID</th>
            <th></th>
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
