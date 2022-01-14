import React from 'react';
import Layout from '../core/Layout';

const Signup = () => (
  <Layout
    title="Signup"
    description="Signin to Node React E-commerce Monorepo App"
  >
    {process.env['NX_REACT_APP_API_URL']}
  </Layout>
);

export default Signup;
