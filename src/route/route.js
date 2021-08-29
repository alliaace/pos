import React from "react";
import { Switch, Route } from "react-router";
import Checkout from "../Components/Form/Checkout";
import CustomerList from '../Components/Customer/CustomerList'
import StockList from "../Components/Stock/StockList";
import StockCheckout from '../Components/Stock/Checkout'

export default function App() {
    return (
        <Switch>
            <Route exact path="/" component={CustomerList} />
            <Route exact path="/customerlist" component={CustomerList} />
            <Route exact path="/addcustomer" component={Checkout} />
            <Route exact path="/editcustomer" component={Checkout} />



            <Route exact path="/supplierlist" component={CustomerList} />
            <Route exact path="/addsupplier" component={Checkout} />
            <Route exact path="/editsupplier" component={Checkout} />



            <Route exact path="/stocklist" component={StockList} />
            <Route exact path="/addstock" component={StockCheckout} />
            <Route exact path="/editstock" component={StockCheckout} />
        </Switch>
    );
}

