import React, {Component} from 'react';
import ProductList from '../ProductsDisplay/productList.js';
class cart extends Component {

	constructor(props) {
		super(props);
		// console.log(ProductList);
		this.state = {
			products: [],
			isLoading: true
		}
	}

	loadCartProducts() {
		return fetch('http://localhost:5000/customer/getCart', {
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            credentials: 'include'

        })
            .then((res) =>{
                // console.log(res)
                if(res.ok){
                    return res.json()
                }
                else {
                    throw 'error'
                }
            })
	}
	render() {
		return <ProductList forCart={true} loadCartProducts={this.loadCartProducts} />
	}
}

export default cart;