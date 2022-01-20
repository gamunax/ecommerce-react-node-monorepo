import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './ApiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // destructure user and info from localStorage
  const { user, token } = isAuthenticated();

  const handleChange = (e: any) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category
    const data = await createCategory(user?._id, token, { name });
    if (data?.err) {
      setError(data?.err);
    } else {
      setError('');
      setSuccess(true);
    }
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group mb-3">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          value={name}
          autoFocus
          required
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
    return;
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} is should be unique</h3>;
    }
    return;
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`Good day ${user?.name}, ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
