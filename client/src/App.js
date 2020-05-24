import React, {Component} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';

import MainPage from './Components/Mainpage/mainPage.js';
import Login from './Components/Login/login.js';
import Logincust from './Components/Login/logincust.js';
import Loginshop from './Components/Login/loginshop.js'
import Register from './Components/Register/register.js';
import Registercust from './Components/Register/registercust.js'
import Registershop from './Components/Register/registershop.js';
import Seller from './Components/Seller/seller.js'
import addProduct from './Components/Seller/addProduct.js'
import ProductsDisplay from './Components/ProductsDisplay/productList.js'
import Pagenotfound from './Components/404/404.js'
import ProductDetails from './Components/ProductsDisplay/productDetails'
import AddReview from './Components/Reviews/addReview'
import Cart from './Components/Cart/cart.js'
import AdminHome from './Components/Admin/homepage'
import AdminSellers from './Components/Admin/sellers'
import AdminCustomers from './Components/Admin/customers'
import AdminProducts from './Components/Admin/products'
import LoginAdmin from './Components/Login/loginadmin'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                logedIn: false,
                user: {},
                account_type: ''// seller or customer 
            }
        }
        this.updateUserInfo = this.updateUserInfo.bind(this);
    }

    updateUserInfo(user, account_type) {
        console.log('updateUserInfo called', user, account_type);
        let {userInfo} = this.state;
        userInfo.logedIn = true;
        userInfo.user = user;
        userInfo.account_type = account_type;
        this.setState({ userInfo });
    }

    render() {
        console.log(this.state.userInfo);
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/Login' render={(props) => <Login {...props} updateUserInfo={this.updateUserInfo} />} />
                    <Route exact path='/Customer/Login' render={(props) => <Logincust {...props} updateUserInfo={this.updateUserInfo} />} />
                    <Route exact path='/Seller/Login' render={(props) => <Loginshop {...props} updateUserInfo={this.updateUserInfo} />} />
                    <Route exact path='/Register' component={Register} />
                    <Route exact path='/Customer/Register' component={Registercust} />
                    <Route exact path='/Seller/Register' component={Registershop} />
                    <Route exact path='/Seller' render={(props) => <Seller {...props} userInfo={this.state.userInfo} />} />
                    <Route exact path='/Seller/AddNew' component={addProduct} />
                    <Route exact path='/Products' component={ProductsDisplay} />
                    <Route exact path='/Product/ProductDetails' component={ProductDetails} />
                    <Route exact path='/Product/AddReview' component={AddReview} />
                    <Route exact path='/Seller/update_product*' component={addProduct} />
                    <Route exact path='/Seller/update_profile' component={Registershop} />
                    <Route exact path='/cart' component={Cart} />
                    <Route exact path='/Admin/HomePage' component={AdminHome} />
                    <Route exact path='/Admin/Sellers' component={AdminSellers} />
                    <Route exact path='/Admin/Customers' component={AdminCustomers} />
                    <Route exact path='/Admin/Products' component={AdminProducts} />
                    <Route exact path='/Admin/Login' component={LoginAdmin} />
                    <Route path='/*' component={Pagenotfound} />
                </Switch>
            </Router>
        );
    }
}


export default App;
