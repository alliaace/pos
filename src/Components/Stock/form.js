import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import PeopleIcon from '@material-ui/icons/People'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import api from '../../api/api';




const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function Form() {
    const history = useHistory()
    const classes = useStyles();
    const [prodcutName, setProductName] = useState('')
    const [supplierName, setSupplierName] = useState('')
    const [buyDate, setBuyDate] = useState(new Date())
    const [productPerCarton, setProductPerCarton] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [buyPrice, setBuyPrice] = useState(0)
    const [salePrice, setSalePrice] = useState(0)



    useEffect(() => {
        if (history.location.pathname == '/editstock')
            getStock(history.location.state.id)
    }, [])

    const getStock = async (id) => {
        try {
            const res = await api.get(`stock/get/${id}`)
            const data = res.data.data
            setProductName(data.product_name)
            setSupplierName(data.supplier_name)
            setBuyDate(data.buy_date)
            setProductPerCarton(data.product_per_carton)
            setQuantity(data.quantity)
            setBuyPrice(data.buy_price)
            setSalePrice(data.sale_price)


            // alert(JSON.stringify(res.data.data.customer_name))
        } catch (error) {

        }
    }
    const checkApiCall = () => {
        if (history.location.pathname == '/addstock')
            addStock()
        else
            editStock()

    }

    const addStock = async () => {
        const res = await api.post(`stock/add`, {
            product_name: prodcutName,
            supplier_name: supplierName,
            buy_date: buyDate,
            product_per_carton: productPerCarton,
            quantity,
            buy_price: buyPrice,
            sale_price: salePrice,

        });

        if (res.status === 200) {
            alert("Saved successfully");
            // alert(JSON.stringify(res.data))
            // this.props.history.push("/customers");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }
    const editStock = async () => {
        const res = await api.put(`stock/update/${history.location.state.id}`, {
            // const res = await api.post(`stock/add`, {
            product_name: prodcutName,
            supplier_name: supplierName,
            buy_date: buyDate,
            product_per_carton: productPerCarton,
            quantity,
            buy_price: buyPrice,
            sale_price: salePrice,

        });

        if (res.status === 200) {
            alert("Saved successfully");
            // alert(JSON.stringify(res.data))
            // this.props.history.push("/customers");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }

    return (
        <React.Fragment>

            <Grid container spacing={3}>
                {/* <form onSubmit > */}

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="productname"
                        name="productname"
                        label="Product Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="filled"
                        value={prodcutName}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="suppliername"
                        name="suppliername"
                        label="Supplier name"
                        fullWidth
                        autoComplete="family-name"
                        variant="filled"
                        value={supplierName}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                        onChange={(e) => setSupplierName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="date"
                        name="date"
                        label="Buy Date"
                        fullWidth
                        type="datetime-local"
                        autoComplete="shipping address-line1"
                        variant="filled"
                        value={buyDate}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                        onChange={(e) => setBuyDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="productpercarton"
                        name="productpercarton"
                        label="Product per carton"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="filled"
                        value={productPerCarton}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                        onChange={(e) => setProductPerCarton(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="quantity"
                        name="quantity"
                        label="Quantity"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="filled"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="buyprice"
                        name="buyprice"
                        label="Buy Price"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="filled"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="saleprice"
                        name="saleprice"
                        label="Sale Price"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="filled"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={() => checkApiCall()}
                    >
                        Save
                    </Button>
                </Grid>


                {/* </form> */}
            </Grid>
        </React.Fragment>
    );
}