import React, {Component} from 'react';
import HomeNavbar from './navbar';
import SellerProfile from './sellerProfile.js';

class Seller extends Component {
    
    render() {
    	return (
            <div style={{textAlign:'center'}}>
                <HomeNavbar type='Welcome to Shop.'/>
                <SellerProfile {...this.props} />
            </div>
        );
    }
}


export default Seller;
