import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory, getCategories, getCategory, updateCategory } from './apiAdmin';

const UpdateCategory = ({ match }) => {
const [name, setName] = useState('');
const [ id , setId ] = useState(match.params.productId);
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);

// destructure user and token from localstorage
const { user, token } = isAuthenticated();

const handleChange = (e) => {
    setError('');
    setName(e.target.value);
};

const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category
    updateCategory(match.params.productId, user._id, token, name).then((data) => {
    if (data.error) {
        setError(data.error);
    } else {
        setError('');
        setSuccess(true);
    }
    });
};

const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
    <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
        type='text'
        className='form-control'
        onChange={handleChange}
        value={name}
        autoFocus
        required
        />
    </div>
    <button className='btn btn-outline-primary'>Update Category</button>
    </form>
);

const showSuccess = () => {
    if (success) {
    return <h3 className='text-success'>{name} is Updated</h3>;
    }
};

const showError = () => {
    if (error) {
    return <h3 className='text-danger'>Category should be unique</h3>;
    }
};

const goBack = () => (
    <div className='mt-5'>
    <Link to='/admin/dashboard' className='text-warning'>
        Back to Dashboard
    </Link>
    </div>
);

const init = (productId) => {
    getCategory(productId).then((data) => {
    if (data.error) {
    } else {
        // populate the state
        setName(data.name);
    }
    });
};

useEffect(() => {
    init(match.params.productId);
}, []);

return (
    <Layout
    title='Add a new category'
    description={`Hey ${user.name}, ready to add a new category?`}
    >
    <div className='row head'>
        <div className='col-md-8 offset-md-2'>
        {showSuccess()}
        {showError()}
        {newCategoryForm()}
        {goBack()}
        </div>
    </div>
    </Layout>
);
};

export default UpdateCategory;
