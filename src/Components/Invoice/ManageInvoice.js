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

function createData(id, sellno, name, date, amount, actions) {
    return { id, sellno, name, date, amount, actions };
}



export default function BasicTable() {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    useEffect(async () => {
        const res = await api.get('invoice/get_all')
        if (res.data.data) {
            // alert(JSON.stringify(res.data.data))
            let temp = []
            res.data.data.map(x => {
                temp.push(createData(x._id, 1, x.customer_name, x.date, x.grand_total))
            })
            setRows(temp)
        }
    }, [])
    return (<>
        <p style={{ fontSize: 18, marginLeft: 10, }}>Manage Invoice</p>
        <Divider />
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell >Sell No</TableCell>
                        <TableCell >Customer Name</TableCell>
                        <TableCell >Date</TableCell>
                        <TableCell >Amount</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell >{row.sellno}</TableCell>
                            <TableCell >{row.name}</TableCell>
                            <TableCell >{row.date}</TableCell>
                            <TableCell >{row.amount}</TableCell>
                            <TableCell ></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    );
}
