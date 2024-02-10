import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';

function Page() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await fetch('/api/stores/summary', {
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

  const rows = [];
  for (let store of stores) {
    const key = `${store.id}`;

    const row = (
      <tr key={key}>
        <td>{store.name}</td>
        <td>{store.logoUrl}</td>
        <td>
          <Link href={`/stores/${store.id}`}>Show</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Stores</h1>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
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
