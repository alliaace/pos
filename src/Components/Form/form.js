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
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [state, setState] = useState('addcustomer')
    const getCustomer = async (id) => {
        try {
            const res = await api.get(`customer/get/${id}`)
            setFirstName(res.data.data.customer_name)
            setAddress(res.data.data.address)
            setContact(res.data.data.contact_no)
            // alert(JSON.stringify(res.data.data.customer_name))
        } catch (error) {

        }
    }
    const getsupplier = async (id) => {
        try {
            const res = await api.get(`supplier/get/${id}`)
            setFirstName(res.data.data.supplier_name)
            setAddress(res.data.data.address)
            setContact(res.data.data.contact_no)
            // alert(JSON.stringify(res.data.data.customer_name))
        } catch (error) {

        }
    }

    useEffect(() => {
        if (history.location.pathname == "/editcustomer") {
            getCustomer(history.location.state.id)
            setState('editcustomer')
        }
        if (history.location.pathname == "/editsupplier") {
            getsupplier(history.location.state.id)
            setState('editsupplier')
        }
        if (history.location.pathname == "/addsupplier") {
            // getCustomer(history.location.state.id)
            setState('addsupplier')
        }

    }, [])


    const checkApiCall = () => {
        if (state == "addcustomer")
            addCustomer()
        else if (state == "editcustomer")
            editCustomer()
        else if (state == "editsupplier")
            editSupplier()
        else if (state == "addsupplier")
            addSupplier()

    }

    const addCustomer = async () => {
        const res = await api.post(`customer/add`, {
            customer_name: firstName + ' ' + lastName,
            contact_no: JSON.stringify(contact),
            address
        });

        if (res.status === 200) {
            alert("Saved successfully");

            // this.props.history.push("/customers");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }
    const editCustomer = async () => {
        const res = await api.put(`customer/update/${history.location.state.id}`, {
            customer_name: firstName + ' ' + lastName,
            contact_no: JSON.stringify(contact),
            address
        });
        // alert(JSON.stringify(res.data))

        if (res.status === 200) {
            alert("Saved successfully");

            // this.props.history.push("/customers");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }
    const addSupplier = async () => {
        // alert('i am at add supplier')
        const res = await api.post(`supplier/add`, {
            supplier_name: firstName + ' ' + lastName,
            contact_no: [JSON.stringify(contact)],
            address
        });

        if (res.status === 200) {
            // alert("Saved successfully");
            // alert(JSON.stringify(res.data))
            history.push("/supplierlist");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }
    const editSupplier = async () => {
        const res = await api.put(`supplier/update/${history.location.state.id}`, {
            customer_name: firstName + ' ' + lastName,
            contact_no: JSON.stringify(contact),
            address
        });
        // alert(JSON.stringify(res.data))

        if (res.status === 200) {
            alert("Saved successfully");

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
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="filled"
                        value={firstName}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="filled"
                        value={lastName}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="filled"
                        value={address}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="filled"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
                        }}
                    />
                </Grid>

                <Grid item xs={12} >
                    <TextField
                        required
                        id="contact"
                        name="contact"
                        label="Contact Number"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="filled"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
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