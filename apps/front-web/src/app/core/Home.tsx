import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = async () => {
    const data = await getProducts('sold');
    if (data?.err) {
      setError(data?.err);
    } else {
      setProductsBySell(data);
    }
  };

  const loadProductsByArrival = async () => {
    const data = await getProducts('createdAt');
    if (data?.err) {
      setError(data?.err);
    } else {
      setProductsByArrival(data);
    }
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout title="Home Page" description="Node React E-commerce Monorepo App">
      {JSON.stringify(productsByArrival)}
      <hr />
      {JSON.stringify(productsBySell)}
    </Layout>
  );
};

export default Home;
