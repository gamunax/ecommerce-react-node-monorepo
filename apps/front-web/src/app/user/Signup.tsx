import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

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
          placeholder="Enter your name"
          value={name}
          onChange={handleChange('name')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange('email')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
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
      New account is created. Please <Link to="/signin">Signin</Link>
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
