import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const router = useRouter();

  const sendCreateStoreRequest = async () => {
    const newStore = {
      name: name,
      logoUrl: logoUrl,
    };

    const response = await fetch('/api/stores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStore)
    });

    if (response.ok) {
      const createdStore = await response.json();
      console.log(`Created store: ${JSON.stringify(createdStore)}`);

      router.push('/admin/stores');
    } else {
      console.error(response);
    }
  };

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Create Store</h1>

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

        <Button className="mt-3" variant="primary" type="button" onClick={sendCreateStoreRequest}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Page;
