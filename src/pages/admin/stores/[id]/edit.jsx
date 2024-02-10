import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchStore = async () => {
      const response = await fetch(`/api/stores/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const storeData = await response.json();

        setName(storeData.name);
        setLogoUrl(storeData.logoUrl);
      } else {
        console.error(response);
      }
    };

    if (id == undefined) return;

    fetchStore();
  }, [id]);

  const sendUpdateStoreRequest = async () => {
    const updatedStore = {
      name: name,
      logoUrl: logoUrl,
    };

    const response = await fetch(`/api/stores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStore)
    });

    if (response.ok) {
      const createdStore = await response.json();
      console.log(`Updated store: ${JSON.stringify(createdStore)}`);

      router.push(`/stores/${id}`);
    } else {
      console.error(response);
    }
  };

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Edit Store</h1>

      <Link variant="dark" className="me-auto" href={`/admin/stores/${id}`}>Back</Link>

      <Spacer />

      <Form className="mt-3">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>

          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="logoUrl" className="mt-3">
          <Form.Label>Logo URL</Form.Label>
          <Form.Control
            type="text"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="button" onClick={sendUpdateStoreRequest}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Page;
