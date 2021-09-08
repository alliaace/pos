import { Container, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CountCard from './Components/customCountCard'
import HomeIcon from '@material-ui/icons/Home'
import api from '../../api/api'

export default function Home() {

    const [totalCustomers, setTotalCustomers] = useState(0)
    const [totalSuppliers, setTotalSuppliers] = useState(0)
    const [totalStock, setTotalStock] = useState(0)
    const [totalInvoice, setTotalInvoice] = useState(0)
    useEffect(async () => {
        var count = 0
        var res = await api.get('supplier/get_all')
        if (res.status == 200)
            setTotalSuppliers(res.data.data.length)

        res = null
        res = await api.get('customer/get_all')
        if (res.status == 200)
            setTotalCustomers(res.data.data.length)

        res = null
        res = await api.get('stock/get_all')
        if (res.status == 200)
            setTotalStock(res.data.data.length)

        res = null
        res = await api.get('invoice/get_all')
        if (res.status == 200)
            setTotalInvoice(res.data.data.length)


    }, [])
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={3} ><CountCard countCard={true} title="Total Customer" count={totalCustomers} icon={<HomeIcon style={{ marginTop: 20 }} />} /></Grid>
                <Grid item xs={3} ><CountCard countCard={true} title="Total Product" count={totalStock} icon={<HomeIcon style={{ marginTop: 20 }} />} /></Grid>
                <Grid item xs={3} ><CountCard countCard={true} title="Total Supplier" count={totalSuppliers} icon={<HomeIcon style={{ marginTop: 20 }} />} /></Grid>
                <Grid item xs={3} ><CountCard countCard={true} title="Total Invoice" count={totalInvoice} icon={<HomeIcon style={{ marginTop: 20 }} />} /></Grid>

                <Grid item xs={3} ><CountCard link='/invoice' title="Create POS Invoice" icon={<HomeIcon style={{ marginTop: 20 }} />} /></Grid>

            </Grid>
        </Container>
    )
}
