import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

const Order = () => {
const [history, setHistory] = useState([]);

const {
    user: { _id, name, email, role },
} = isAuthenticated();

const token = isAuthenticated().token;

const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
    if (data.error) {
        console.log(data.error);
    } else {
        setHistory(data);
    }
    });
};

useEffect(() => {
    init(_id, token);
}, []);

const purchaseHistory = (history) => {
    console.log(history)
    return (
    <div className='card mb-5'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
        <li className='list-group-item'>
            {history.map((h, i) => {
            return (
                <div>
                <hr />
                {h.products.map((p, i) => {
                    return (
                    <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ₹{p.price}</h6>
                        <h6>Status: {h.status}</h6>
                        <h6>Purchased Quantity: {p.count}</h6>
                        <h6>Purchased date: {moment(h.createdAt).fromNow()}</h6>
                    </div>
                    );
                })}
                <hr />
                <h6>Total Price: {h.amount}</h6>
                </div>
            );
            })}
        </li>
        </ul>
    </div>
    );
};

return (
    <Layout
    title='Orders'
    description={`${name}`}
    className='container-fluid'
    >
    <div className='row'>
        <div className='col-md-12'>
        {purchaseHistory(history)}
        </div>
    </div>
    </Layout>
);
};

export default Order;
