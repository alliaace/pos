import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { lighten, makeStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import AppBar from '@material-ui/core/AppBar';
import { useHistory } from 'react-router-dom';

import { Container, Grid } from '@material-ui/core';
import ReactToPrint from "react-to-print";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button'






const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();


    return (
        <Toolbar

        >
            <AppBar position="absolute" className={classes.appBar} style={{ backgroundColor: '#002447' }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Invoice Details
                    </Typography>
                </Toolbar>
            </AppBar>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    table: {
        minWidth: 650,
    },
}));



function createData(si, item, qty, rate, amount) {
    return { si, item, qty, rate, amount };
}

const rows = [
    createData(1, "Adx(RT)", 1000, 2700, 270000),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function DenseTable() {
    const classes = useStyles();

    return (

        <TableContainer component={Paper}>
            <Grid item xs={12}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SI</TableCell>
                            <TableCell align="right">Item</TableCell>
                            <TableCell align="right">QTY SUTE</TableCell>
                            <TableCell align="right">Rate</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.si}>
                                <TableCell component="th" scope="row">
                                    {row.si}
                                </TableCell>
                                <TableCell align="right">{row.item}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">{row.rate}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </TableContainer>
    );
}


class ComponentToPrint extends React.Component {
    render() {
        return (
            <Grid container spacing={3}>

                <Grid item xs={12}  >
                    <div style={{ lineHeight: 0, padding: '0 10px 10px 10px' }}>
                        <div style={{ textAlign: 'center', }}>
                            <p style={{ fontSize: 32, fontWeight: 'bold' }}>Tech Lab</p>
                            <p style={{ fontSize: 18, lineHeight: 1 }}>Uttara</p>
                            <p style={{ fontSize: 18 }}>0171123567</p>
                            <hr style={{ height: 2, border: 'none', backgroundColor: 'black' }} />
                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }}>IBNUSEENA Medicals Karma dubai</p>
                            <p style={{ fontSize: 18 }}>Karama shopping Complex Karama</p>
                            <p style={{ fontSize: 18, lineHeight: 1 }}>0171123567</p>
                            <p style={{ fontSize: 18 }}>0171123567</p>
                        </div>
                        <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }}>Sell No: 1894</p>
                        <DenseTable />
                        <hr style={{ height: 2, border: 'none', backgroundColor: 'black' }} />
                        <div style={{ height: 20, marginBottom: 16 }}>

                            <p style={{
                                fontSize: 18,
                                float: 'left',
                                // display: 'inline'
                            }}>Total</p>
                            <p style={{
                                fontSize: 18,
                                float: 'right',
                                // display: 'inline',

                            }}>$27000000</p>
                        </div>

                        <hr style={{ height: 2, border: 'none', backgroundColor: 'black' }} />
                        <div style={{ height: 20, marginBottom: 20 }}>
                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 0, float: 'left' }}>Grand Total</p>
                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 0, float: 'right' }}>$270000</p>
                        </div>
                        <hr style={{ height: 2, border: 'none', backgroundColor: 'black' }} />
                        <div style={{ height: 20, marginBottom: 30 }}>
                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 0, float: 'left' }}>Due</p>
                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 0, float: 'right' }}>$270000</p>
                        </div>
                        <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 0 }}>Powered By: Umdah</p>


                    </div>
                </Grid>


            </Grid>
        );
    }
}


export default class EnhancedTable extends React.Component {
    // history = useHistory()
    // classes = useStyles();

    render() {

        return (
            <div
            // className={this.classes.root} 
            >

                <Paper
                // className={this.classes.paper}
                >

                    <EnhancedTableToolbar />

                    <Container maxWidth="lg"
                    // className={this.classes.container}
                    >
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>

                                    <div style={{}}>
                                        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
                                        <ReactToPrint
                                            trigger={() =>
                                                <Button
                                                    style={{ marginLeft: 10 }}
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    // className={classes.button}
                                                    // startIcon={}
                                                    onClick={() => window.location = '/addstock'}
                                                >
                                                    <PrintIcon />
                                                </Button>}
                                            content={() => this.componentRef}
                                        />
                                    </div>
                                </Paper>
                            </Grid>

                        </Grid>

                    </Container>



                </Paper>


            </div>
        )
    }
}