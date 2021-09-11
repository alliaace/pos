import { AppBar, Button, Container, Divider, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import TextField from '../Form/TextField'
import InputField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../api/api';
import Toast from '../Toast/toast'
import { useHistory } from 'react-router';

export default function AddInvoice() {
    const [allProducts, setAllProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const [CName, setCName] = useState('');
    const [date, setDate] = useState(null);
    const [PName, setPName] = useState('');
    const [selectedCartons, setSelectedCartons] = useState(1)
    const [price, setPrice] = useState(null)
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(selectedCartons * price)
    const [toast, setToast] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('success')
    const history = useHistory()

    useEffect(async () => {
        const res = await api.get('stock/get_all')
        if (res.data.data)
            setAllProducts(res.data.data)
    }, [])

    const handleSubmit = async () => {

        try {
            const res = await api.post('invoice/add', {
                customer_name: CName,
                date,
                products: [{
                    product_id: selectedProduct._id,
                    product_name: selectedProduct.product_name,
                    quantity: selectedCartons,
                    sale_price: price
                }],
                grand_total: total - discount,
                paid_amount: total - discount
            })
            if (res.data.data) {

                setToast(false)
                setToast(true)
                setType('success')
                setTitle('Added Succesfully')
                history.push({ pathname: '/printinvoice', state: { name: selectedProduct.product_name, price, quantity: selectedCartons, grand_total: total - discount } })
            }
            else {

                setToast(false)
                setToast(true)
                setType('error')
                setTitle(res.data.message)

            }
        } catch (error) {
            // alert('i')
        }

    }
    return (
        <>

            {toast &&

                <Toast open={true} title={title} type={type} />
            }
            <Container style={{ padding: '10px 10px 10px 10px' }}>
                <p style={{ fontSize: 18 }}>Add new Invoice</p>
                <Divider />

                <Grid container xs={12}>

                    <Grid container xs={6}>

                        <TextField
                            required
                            id="customername"
                            name="customername"
                            label="Customer Name"
                            fullWidth
                            title='Customer Name'
                            placeholder='Customer Name'
                            autoComplete="given-name"
                            variant="filled"
                            style={{ height: 35, marginBottom: 10 }}
                            onChange={(e) => setCName(e.target.value)}
                        />
                    </Grid>
                    <Grid container xs={6}>

                        <Button>New Customer</Button>
                    </Grid>



                    <Grid container xs={6}>

                        <TextField
                            required
                            id="date"
                            name="date"
                            label="Date"
                            fullWidth
                            title='Date'
                            placeholder='Date'
                            autoComplete="given-name"
                            variant="filled"
                            style={{ height: 35, marginBottom: 10 }}
                            inputType='date'
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Grid>






                </Grid>
                <form xs={12} onSubmit={(e) => handleSubmit(e)}>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Item Information</th>
                                <th scope="col">Available Ctn.</th>
                                <th scope="col">Carton</th>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Rate</th>
                                <th scope="col">Discount/Pcs.</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td style={{ width: '20%' }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={allProducts}
                                        getOptionLabel={(option) => option.product_name}
                                        // style={{ marginTop: 10 }}
                                        onChange={(e, newValue) => {
                                            setSelectedProduct(newValue)
                                            setPrice(newValue ? newValue.sale_price : 0)
                                            setTotal(newValue ? newValue.sale_price * selectedCartons : 0)
                                        }}
                                        renderInput={(params) =>
                                            <div ref={params.InputProps.ref}>
                                                <input style={{ height: 35 }} type="text" {...params.inputProps} />
                                            </div>
                                        }
                                    />
                                </td>

                                <td style={{ width: '10%' }}>
                                    <input disabled style={{ width: '100%', height: 35 }} value={selectedProduct && selectedProduct.quantity} />
                                </td>
                                <td style={{ width: '10%' }}>
                                    <input type='number' style={{ width: '100%', height: 35 }} value={selectedCartons} onChange={(e) => { e.target.value < 1 ? setSelectedCartons(1) : setSelectedCartons(e.target.value); setTotal(e.target.value * price) }} />
                                </td>
                                <td style={{ width: '10%' }}>
                                    <input disabled style={{ width: '100%', height: 35 }} value={selectedProduct && selectedProduct.product_per_carton} />
                                </td>
                                <td style={{ width: '10%' }}>
                                    <input disabled type='number' style={{ width: '100%', height: 35 }} value={selectedCartons} />
                                </td>
                                <td style={{ width: '10%' }}>
                                    <input style={{ width: '100%', height: 35 }} value={price} onChange={e => { setPrice(e.target.value); setTotal(selectedCartons * e.target.value) }} />
                                </td>
                                <td style={{ width: '10%' }}>
                                    <input type='number' style={{ width: '100%', height: 35 }} value={discount} onChange={e => setDiscount(e.target.value)} />
                                </td>
                                <td style={{ width: '10%' }}>
                                    <input disabled type='number' style={{ width: '100%', height: 35 }} value={total} />
                                </td>
                                <td style={{ width: '10%' }}>
                                    <Button
                                        variant="contained"
                                        // color="danger"
                                        size="small"
                                        // className={classes.button}
                                        // startIcon={<SaveIcon />}
                                        style={{
                                            marginLeft: 10,
                                            backgroundColor: 'red',
                                            color: 'white'

                                        }}
                                    // onClick={() => window.location = '/addcustomer'}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    {/* <div style={{ display: 'table-cell' }}>helo</div> */}

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="row" style={{ width: '80%' }}><p style={{ float: 'right' }}>Total Discount</p></th>
                                <th scope="row" style={{ width: '20%' }}>
                                    <input disabled value={discount} />
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" style={{ width: '80%' }}><p style={{ float: 'right' }}>Grand Total</p></th>
                                <th scope="row" style={{ width: '20%' }}>
                                    <input disabled value={total - discount} />
                                </th>
                            </tr>

                        </thead>

                    </table>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="row" style={{ width: '80%' }}><p style={{ float: 'right' }}></p></th>
                                <th scope="row" style={{ width: '20%' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        // className={classes.button}
                                        // startIcon={<SaveIcon />}
                                        style={{
                                            marginLeft: 10,
                                            backgroundColor: '#003366'
                                        }}
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        Submit
                                    </Button>
                                </th>
                            </tr>


                        </thead>

                    </table>

                </form>
            </Container>
        </>
    )
}
