import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../config';
import Layout from '../core/Layout';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name: any) => (event: any) => {
    setValues({ ...values, error: '', [name]: event.target.value });
  };

  const signup = async (user: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const clickSubmit = async (event: any) => {
    event.preventDefault();
    setValues({ ...values, error: '' });
    const data = await signup({ name, email, password });
    if (data.errors) {
      setValues({ ...values, error: data.errors, success: false });
    } else {
      setValues({
        ...values,
        name: '',
        email: '',
        password: '',
        error: '',
        success: true,
      });
    }
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Input your name"
          value={name}
          onChange={handleChange('name')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Input your email"
          value={email}
          onChange={handleChange('email')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={handleChange('password')}
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={clickSubmit}>
        Submit
      </button>
    </form>
  );

  const showErrow = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/signin'>Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signin to Node React E-commerce Monorepo App"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showErrow()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
