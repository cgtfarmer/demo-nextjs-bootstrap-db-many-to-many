import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setcolor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [storeId, setStoreId] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const productData = await response.json();

        setName(productData.name);
        setWeight(productData.weight);
        setcolor(productData.color);
        setImageUrl(productData.imageUrl);
        setStoreId(productData.storeId);
      } else {
        console.error(response);
      }
    };

    if (id == undefined) return;

    fetchProduct();
  }, [id]);

  const sendUpdateProductRequest = async () => {
    const updatedProduct = {
      id: id,
      name: name,
      weight: weight,
      color: color,
      imageUrl: imageUrl,
      storeId: storeId,
    };

    const response = await fetch(`/api/stores/${storeId}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });

    if (response.ok) {
      const createdProduct = await response.json();
      console.log(`Updated product: ${JSON.stringify(createdProduct)}`);

      router.push(`/admin/products/${id}`);
    } else {
      console.error(response);
    }
  };

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Edit Product</h1>

      <Link variant="dark" className="me-auto" href={`/admin/products/${id}`}>Back</Link>

      <Spacer />

      <Form className="mt-3">
        <Form.Group controlId="first-name">
          <Form.Label>First Name</Form.Label>

          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="last-name" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="gender" className="mt-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            value={color}
            onChange={(e) => setcolor(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="age" className="mt-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="weight" className="mt-3">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="income" className="mt-3">
          <Form.Label>Income</Form.Label>
          <Form.Control
            type="text"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="store-id" className="mt-3">
          <Form.Label>Store ID</Form.Label>
          <Form.Control
            type="text"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
          />
        </Form.Group>

        <Button
          className="mt-3"
          variant="primary"
          type="button"
          onClick={sendUpdateProductRequest}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Page;
