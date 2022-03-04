import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { DataGrid } from '@mui/x-data-grid';

const ManageProducts = () => {
const [products, setProducts] = useState([]);

const { user, token } = isAuthenticated();

const loadProducts = () => {
    getProducts().then((data) => {
    if (data.error) {
        console.log(data.error);
    } else {
        setProducts(data);
    }
    });
};

const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
    if (data.error) {
        console.log(data.error);
    } else {
        loadProducts();
    }
    });
};

useEffect(() => {
    loadProducts();
}, []);
const [pageSize, setPageSize] = React.useState(10);
const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
    field: "name",
    headerName: "Name",
    width: 300,
    },
    {
    field: "description",
    headerName: "Description",
    width: 300,
    },
    {
    field: "price",
    headerName: "Price",
    width: 100,
    },
    {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
    },
    {
        field: "category.name",
        headerName: "Category",
        width: 150,
        renderCell:(params)=>{
            return(
                <>
                    <p>{products.length>0 ? params.row.category.name : ''}</p>
                </>
            )
        }
        },
    {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
        console.log(params)
        return (
        <>
            {/* <Link to={{pathname:"/user/" + params.row._id , user:params.row}}>
            <button className="userListEdit">View</button>
            </Link> */}
            {/* <button onClick={() => showProductDetailsModal(params.row)} className='userListEdit'>View</button> */}
            <Link to={`/admin/product/update/${params.row._id}`}>
                <UpdateIcon
                className="userListUpdate"
                />
            </Link>
            
            <DeleteIcon
            className="userListDelete"
            onClick={() => destroy(params.row._id)}
            />
        </>
        );
    },
    },
];

return (
    <Layout
    title='Manage Products'
    description='Perform CRUD on products'
    className='container-fluid'
    >
    {/* <div className='row'>
        <div className='col-12'>
        <h2 className='text-center'>Total {products.length} products</h2>
        <hr />
        <ul className='list-group'>
            {products.map((p, i) => (
            <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
            >
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                <span className='badge badge-warning badge-pill'>Update</span>
                </Link>
                <Link>
                <span
                    onClick={() => destroy(p._id)}
                    className='badge badge-danger badge-pill'
                >
                    Delete
                </span>
                </Link>
            </li>
            ))}
        </ul>
        </div>
    </div> */}
    <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            checkboxSelection
            getRowId={r=>r._id}
            autoHeight
            rowsPerPageOptions={[10,20,30,50,100]}
            />
    </Layout>
);
};

export default ManageProducts;
