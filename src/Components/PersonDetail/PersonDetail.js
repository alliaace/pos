import React, { Component, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import api from '../../api/api'


import { Container, Divider, Grid } from '@material-ui/core';
import ReactToPrint from "react-to-print";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button'







class ComponentToPrint extends React.Component {
    render() {
        var data = this.props.data
        var type = this.props.type
        return (
            <Grid container style={{ marginTop: 10 }}>


                <Grid item xs={12} style={{ textAlign: 'center', lineHeight: 0.2, padding: '10px 10px 10px 10px' }}>
                    <p style={{ fontSize: 12, marginBottom: 20, textDecoration: 'underline' }}>DHAKACARDS</p>
                    <p style={{ fontSize: 14 }}>{type == "customer" ? "Customer" : "Supplier"} Name: {type == "customer" ? data.customer_name : data.supplier_name}</p>
                    <p style={{ fontSize: 14 }}>{type == "customer" ? "Customer" : "Supplier"} Address: {data.address}</p>
                    <p style={{ fontSize: 14 }}>Mobile: {data.contact_no}</p>

                </Grid>


            </Grid>
        );
    }
}



export default class PersonDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],

        }
    }
    // query = new URLSearchParams(this.props.history.location.search)
    async componentDidMount() {
        // this.setState({ query: new URLSearchParams(this.props.history.location.search) })
        if ((new URLSearchParams(this.props.history.location.search).get('type')) == 'customer') {
            const res = await api.get(`customer/get/${(new URLSearchParams(this.props.history.location.search).get('id'))}`)
            // alert(JSON.stringify(res.data.data))
            this.setState({ data: res.data.data })
            // setData(res.data.data)
        }
        else {
            const res = await api.get(`supplier/get/${(new URLSearchParams(this.props.history.location.search).get('id'))}`)
            // alert(JSON.stringify(res.data.data))
            this.setState({ data: res.data.data })
        }
    }
    render() {

        return (
            <>
                <p style={{ fontSize: 18, marginLeft: 10, padding: "10px 0 10px 0" }}>Ledger
                    <span style={{ float: 'right', marginRight: 10 }}>

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
                    </span>
                </p>
                <Divider />
                <div style={{}}>
                    {/* {JSON.stringify(this.state.data)} */}
                    <ComponentToPrint ref={(el) => (this.componentRef = el)} data={this.state.data} type={(new URLSearchParams(this.props.history.location.search).get('type'))} />
                </div >
            </>
        )
    }
}
