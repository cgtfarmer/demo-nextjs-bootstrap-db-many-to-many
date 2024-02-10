import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function Page() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await fetch('/api/stores', {
        method: 'GET'
      });

      if (response.ok) {
        const stores = await response.json();
        console.log(`Stores: ${JSON.stringify(stores)}`);
        setStores(stores);
      } else {
        console.error(response);
      }
    };

    fetchStores();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setStores((prevStores) =>
          prevStores.filter((store) => store.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  const rows = [];
  for (let store of stores) {
    const key = `${store.id}`;

    const row = (
      <tr key={key}>
        <td>{store.id}</td>
        <td>{store.name}</td>
        <td>{store.logoUrl}</td>
        <td>
          <Link href={`/admin/stores/${store.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/admin/stores/${store.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="#" onClick={() => handleDelete(store.id)}>Delete</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Stores</h1>

      <Button variant="primary" href="/admin/stores/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Logo</th>
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
