import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../../api/api';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, barcode, product_name, details, category, product_per_carton, sale_price, supplier_price, supplier_name, actions) {
    return { id, barcode, product_name, details, category, product_per_carton, sale_price, supplier_price, supplier_name, actions };
}



export default function BasicTable() {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    useEffect(async () => {
        const res = await api.get('product/get_all')
        if (res.data.data) {
            // alert(JSON.stringify(res.data.data))
            let temp = []
            res.data.data.map(x => {
                temp.push(createData(x._id, x.barcode, x.product_name, x.details, x.category, x.product_per_carton, x.sale_price, x.supplier_price, x.supplier_name))
            })
            setRows(temp)
        }
    }, [])
    return (<>
        <p style={{ fontSize: 18, marginLeft: 10, }}>Manage Product</p>
        <Divider />
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell >Barcode</TableCell>
                        <TableCell >Product Name</TableCell>
                        <TableCell >Details</TableCell>
                        <TableCell >Category</TableCell>
                        <TableCell >Product Per Carton</TableCell>
                        <TableCell >Sale Price</TableCell>
                        <TableCell >Supplier Price</TableCell>
                        <TableCell >Supplier Name</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell >{row.barcode}</TableCell>
                            <TableCell >{row.product_name}</TableCell>
                            <TableCell >{row.details}</TableCell>
                            <TableCell >{row.category}</TableCell>
                            <TableCell >{row.product_per_carton}</TableCell>
                            <TableCell >{row.sale_price}</TableCell>
                            <TableCell >{row.supplier_price}</TableCell>
                            <TableCell >{row.supplier_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    );
}
