import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct, getCategories, deleteCategory } from './apiAdmin';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { DataGrid } from '@mui/x-data-grid';

const ManageCategory = () => {
const [Categories, setCategories] = useState([]);

const { user, token } = isAuthenticated();

const loadProducts = () => {
    getCategories().then((data) => {
    if (data.error) {
        console.log(data.error);
    } else {
        setCategories(data);
    }
    });
};

const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
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
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
        return (
        <>
            {/* <Link to={{pathname:"/user/" + params.row._id , user:params.row}}>
            <button className="userListEdit">View</button>
            </Link> */}
            {/* <button onClick={() => showProductDetailsModal(params.row)} className='userListEdit'>View</button> */}
            <Link to={`/admin/category/update/${params.row._id}`}>
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
    title='Manage Category'
    description='Perform CRUD on category'
    className='container-fluid'
    >
    <DataGrid
            rows={Categories}
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

export default ManageCategory;
