import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirecToReferrer: false,
  });

  const { email, password, error, loading, redirecToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name: any) => (event: any) => {
    setValues({ ...values, error: '', [name]: event.target.value });
  };

  const clickSubmit = async (event: any) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    const data = await signin({ email, password });

    if (data?.err) {
      setValues({
        ...values,
        error: data.err,
        redirecToReferrer: false,
        loading: false,
      });
    } else {
      authenticate(data);
      setValues({
        ...values,
        redirecToReferrer: true,
      });
    }
  };

  const signUpForm = () => (
    <form>
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirecToReferrer) {
      if (user && user?.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
    return;
  };

  return (
    <Layout
      title="Signin"
      description="Signin to Node React E-commerce Monorepo App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showErrow()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
