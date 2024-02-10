import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
  const [store, setStore] = useState({});

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

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you sure ?');

    if (confirmation) {
      const response = await fetch(`/api/stores/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/stores');
      } else {
        console.error(response);
      }
    }
  };

  if (store == null) return;

  return (
    <>
      <h1 className="display-6 my-3 mb-4">Show Store</h1>

      <Link variant="dark" className="me-auto" href="/admin/stores">Back</Link>

      <Spacer />

      <div>
        <Link href={`/stores/${id}/edit`}>Edit</Link>
        <span> | </span>
        <Link href="#" onClick={() => handleDelete(store.id)}>Delete</Link>
      </div>

      <Table variant='dark' size="md" responsive striped hover className="show-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{store.name}</td>
          </tr>
          <tr>
            <th>Logo</th>
            <td>{store.logoUrl}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Page;
