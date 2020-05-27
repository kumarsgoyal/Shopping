import React, {Component} from 'react';
import List from './../productList/list.js';

// let orders = [
// 	{
// 		_id: 'akfjlkaj10i12ie90jd',
// 		delivery_address: 'abc, def, ghi',
// 		status: 'pending',
// 		total_amount: '2000',
// 		units: '2',
// 		order_date: new Date(),
// 		product_id: 'ajsfj9012jdfasu01'
// 	},
// 	{
// 		_id: 'akfjlkaj10i12ie90jd',
// 		delivery_address: 'abc, def, ghi',
// 		status: 'pending',
// 		total_amount: '2000',
// 		units: '2',
// 		order_date: new Date(),
// 		product_id: 'ajsfj9012jdfasu01'
// 	},
// 	{
// 		_id: 'akfjlkaj10i12ie90jd',
// 		delivery_address: 'abc, def, ghi',
// 		status: 'pending',
// 		total_amount: '2000',
// 		units: '2',
// 		order_date: new Date(),
// 		product_id: 'ajsfj9012jdfasu01'
// 	},
// 	{
// 		_id: 'akfjlkaj10i12ie90jd',
// 		delivery_address: 'abc, def, ghi',
// 		status: 'pending',
// 		total_amount: '2000',
// 		units: '2',
// 		order_date: new Date(),
// 		product_id: 'ajsfj9012jdfasu01'
// 	},
// 	{
// 		_id: 'akfjlkaj10i12ie90jd',
// 		delivery_address: 'abc, def, ghi',
// 		status: 'pending',
// 		total_amount: '2000',
// 		units: '2',
// 		order_date: new Date(),
// 		product_id: 'ajsfj9012jdfasu01'
// 	}
// ]

class SellerProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			loading: true
		}
	}
	componentDidMount() {
		fetch(`http://localhost:5000/seller/orders`, {
	            method: 'GET',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            credentials: 'include'
	        })
	            .then((res) => {
	                if (res.ok) {
	                	return res.json();
	                }
	                else {
	                    if(res.status === 401) {
	                        this.props.history.push({
	                            pathname: '/seller/login',
	                            state: {
	                                isRedirected: true
	                            }
	                        })
	                    }
	                    throw 'error'
                	}
                })
	            .then((res) => {
	                this.setState({orders: res.orders, loading: false})
	                console.log(res)
	                //this.setState({ products: res.products })
	            })
	            .catch((err) => {
	                console.log(err)
	            })
	}
	render() {

		
		let item = <h4>No Orders Found</h4>
		if(this.state.loading) {
			item = <h4>Loading....</h4>
		}
		else if(this.state.orders.length > 0)
			item = <List type='order' orders={this.state.orders} history={this.props.history} />;

		return <div className='container-fluid' style={{backgroundColor: 'rgba(234, 234, 234, 0.86)'}}>
			<div className='row pl-2 py-2'>
				<h1 className='col-12 m-0 text-center font-weight-bold bg-white rounded'>
					Orders
				</h1>
			</div>
			<div style={{minHeight: '25vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
				{item}
			</div>
		</div>
	}
}

export default SellerProduct;