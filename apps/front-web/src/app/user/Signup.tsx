import React, { useState } from 'react';
import { API } from '../config';
import Layout from '../core/Layout';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  });

  const { name, email, password } = values;

  const handleChange = (name: any) => (event: any) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signup = (user: { name: string; email: string; password: string }) => {
    fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.error(err);
      
    })
  };

  const clickSubmit = (event: any) => {
    event.preventDefault();
    signup({ name, email, password });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Input your name"
          onChange={handleChange('name')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Input your email"
          onChange={handleChange('email')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange('password')}
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={clickSubmit}>
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Signup"
      description="Signin to Node React E-commerce Monorepo App"
      className="container col-md-8 offset-md-2"
    >
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
