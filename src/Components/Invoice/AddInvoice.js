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
    const [allCustomers, setAllCustomers] = useState([])
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
    const [allItems, setAllItems] = useState([{ id: 1 }])
    const [paidAmount, setPaidAmount] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const history = useHistory()

    useEffect(async () => {
        const res = await api.get('stock/get_all')
        if (res.data.data)
            setAllProducts(res.data.data)
        const res1 = await api.get("customer/get_all")
        if (res1.data.data)
            setAllCustomers(res1.data.data)
    }, [])
    const addItem = () => {
        setAllItems(
            [
                ...allItems,
                {
                    product_id: selectedProduct._id,
                    product_name: selectedProduct.product_name,
                    carton: selectedCartons,
                    sale_price: price,
                    selectedProduct: selectedProduct.quantity,
                    item: selectedProduct.product_per_carton,
                    quantity: selectedCartons,
                    price,
                    total,
                    discount
                }
            ]
        )
    }

    const handleSubmit = async () => {
        let temp = []
        allItems.map((item, index) => {
            if (index != 0) {
                temp.push({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    sale_price: item.sale_price
                })
            }
        })
        temp.push({
            product_id: selectedProduct._id,
            product_name: selectedProduct.product_name,
            quantity: selectedCartons,
            sale_price: price
        })
        try {
            const res = await api.post('invoice/add', {
                customer_name: CName,
                date,
                products: temp,
                grand_total: total - discount,
                paid_amount: total - discount
            })
            if (res.data.data) {

                setToast(false)
                setToast(true)
                setType('success')
                setTitle('Added Succesfully')
                // let temp = allItems
                // temp.splice(0, 1)

                history.push({ pathname: '/printinvoice', state: { allItems: temp, grand_total: grandTotal } })
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
            {/* {JSON.stringify(allItems)} */}
            {/* {console.log(allItems)} */}
            {/* yahan {JSON.stringify(allItems[1]?.products[0]?.quantity)} */}

            {toast &&

                <Toast open={true} title={title} type={type} />
            }
            <Container style={{ padding: '10px 10px 10px 10px' }}>
                <p style={{ fontSize: 18 }}>Add new Invoice</p>
                <Divider />

                <Grid container xs={12}>

                    <Grid container xs={6}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={allCustomers}
                            getOptionLabel={(option) => option.customer_name}
                            // style={{ marginTop: 10 }}
                            onChange={(e, newValue) => {
                                // alert((newValue.customer_name))
                                setCName(newValue.customer_name)
                            }}
                            renderInput={(params) =>
                                <>
                                    <div ref={params.InputProps.ref} style={{}}>
                                        {/* <TextField
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
                                        {...params.inputProps}
                                    /> */}
                                        Customer Name
                                        <input style={{ height: 35, marginLeft: 48, width: 453 }} type="text" placeholder='Customer Name' {...params.inputProps} />
                                    </div>
                                </>
                            }
                        />
                    </Grid>
                    <Grid container xs={6}>

                        <Button onClick={() => history.push('/addcustomer')}>New Customer</Button>
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
                            {allItems.map((item, index) =>
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
                                                let total = 0
                                                allItems.map((item, index) => {
                                                    if (index != 0)
                                                        total += item.total
                                                })
                                                total += newValue ? newValue.sale_price * selectedCartons : 0
                                                setGrandTotal(total)
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
                                        <input disabled style={{ width: '100%', height: 35 }} value={selectedProduct && allItems[index + 1]?.selectedProduct ? allItems[index + 1]?.selectedProduct : selectedProduct.quantity} />
                                    </td>
                                    <td style={{ width: '10%' }}>

                                        <input type='number' style={{ width: '100%', height: 35 }} value={allItems[index + 1]?.carton ? allItems[index + 1]?.carton : selectedCartons} onChange={(e) => { e.target.value < 1 ? setSelectedCartons(1) : setSelectedCartons(e.target.value); setTotal(e.target.value * price) }} />
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <input disabled style={{ width: '100%', height: 35 }} value={selectedProduct && allItems[index + 1]?.item ? allItems[index + 1]?.item : selectedProduct.product_per_carton} />
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <input disabled type='number' style={{ width: '100%', height: 35 }} value={allItems[index + 1]?.quantity ? allItems[index + 1]?.quantity : selectedCartons} />
                                    </td>
                                    <td style={{ width: '10%' }}>

                                        <input style={{ width: '100%', height: 35 }} value={allItems[index + 1]?.price ? allItems[index + 1]?.price : price} onChange={e => {
                                            // alert('here')
                                            setPrice(e.target.value);
                                            let total1 = 0
                                            let discount1 = 0
                                            allItems.map((x, index) => {
                                                // alert(x)
                                                if (index != 0) {

                                                    total1 = x.total
                                                    discount1 = x.discount
                                                }
                                            })
                                            total1 += (selectedCartons * e.target.value)
                                            // alert(total1)
                                            setGrandTotal(total1)
                                            setTotal((selectedCartons * e.target.value))
                                        }} />
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <input type='number' style={{ width: '100%', height: 35 }} value={allItems[0]?.discount ? allItems[0]?.discount : discount} onChange={e => setDiscount(e.target.value)} />
                                    </td>
                                    <td style={{ width: '10%' }}>
                                        <input disabled type='number' style={{ width: '100%', height: 35 }} value={allItems[index + 1]?.total ? allItems[index + 1]?.total : total} />
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
                            )}

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
                                {/* <th scope="row" style={{ width: '20%' }}>
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
                                        onClick={(e) => addItem()}
                                    >
                                        Add Item
                                    </Button>
                                    {/* <p style={{ float: 'left' }}></p> */}
                                {/* </th> */}
                                <th scope="row" style={{ width: '80%' }}><p style={{ float: 'right' }}>Paid Amount</p></th>
                                <th scope="row" style={{ width: '20%' }}>
                                    <input value={paidAmount} onChange={e => setPaidAmount(e.target.value)} type="number" />
                                </th>
                            </tr>








                            <tr>
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
                                        onClick={(e) => addItem()}
                                    >
                                        Add Item
                                    </Button>
                                    {/* <p style={{ float: 'left' }}></p> */}
                                    <p style={{ float: 'right' }}>Grand Total</p>
                                </th>
                                {/* <th scope="row" style={{ width: '60%' }}>
                                    </th> */}
                                <th scope="row" style={{ width: '20%' }}>
                                    <input disabled value={
                                        grandTotal - discount

                                    } />
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
