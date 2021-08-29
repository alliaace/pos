import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PeopleIcon from '@material-ui/icons/People';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListIcon from '@material-ui/icons/List';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        backgroundColor: '#002447'
    },
}));

export default function NestedList() {
    const classes = useStyles();
    const history = useHistory();
    const [customer, setCustomer] = React.useState(true);
    const [supplier, setSupplier] = React.useState(true);
    const [stock, setStock] = React.useState(true);

    const handleClickCustomer = () => {
        setCustomer(!customer);
    };
    const handleClickSupplier = () => {
        setSupplier(!supplier);
    };
    const handleClickStock = () => {
        setStock(!stock);
    };


    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" >
                    <h1 style={{ color: '#f5f5f5' }}>Dashboard</h1>
                </ListSubheader>
            }
            style={{ backgroundColor: '#003366', color: '#f5f5f5' }}

            className={classes.root}
        >

            <ListItem button onClick={handleClickCustomer}>
                <ListItemIcon>
                    <PeopleIcon style={{ color: 'f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="Customers" />
                {customer ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={customer} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/customerlist'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="List" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/addcustomer'}>
                        <ListItemIcon>
                            <AddIcon style={{ color: 'f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Add Customer" />
                    </ListItem>

                </List>
            </Collapse>


            <ListItem button onClick={handleClickSupplier}>
                <ListItemIcon>
                    <PeopleIcon style={{ color: '#f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="Suppliers" />
                {supplier ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={supplier} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/supplierlist'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="List" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/addsupplier'}>
                        <ListItemIcon>
                            <AddIcon style={{ color: 'f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Add Supplier" />
                    </ListItem>

                </List>
            </Collapse>




            <ListItem button onClick={handleClickStock}>
                <ListItemIcon>
                    <ShowChartIcon style={{ color: '#f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="Stocks" />
                {stock ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={stock} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/stocklist'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="List" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/addstock'}>
                        <ListItemIcon>
                            <AddIcon style={{ color: 'f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Add Stock" />
                    </ListItem>

                </List>
            </Collapse>




        </List>
    );
}
