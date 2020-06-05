import React, {Component} from 'react';
import List from './../productList/list.js';
import HomeNavbar from './navbar';

class SellerDelivered extends Component {
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
	                // console.log(res)
	            })
	            .catch((err) => {
	                console.log(err)
	            })
	}
	render() {

		
		let item = <p style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold', fontSize:'50px'}}>
            No Orders Found
		</p>

		if(this.state.loading) {
			item = <p style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold', fontSize:'50px'}}>
                Loading....
            </p>
		}
		else if(this.state.orders.length > 0)
			item = <List type='delivered' orders={this.state.orders} history={this.props.history} />;

		return <div className='container-fluid' >
			<HomeNavbar type='Delivered.'/>
			<hr />
			<div style={{minHeight: '25vh', justifyContent: 'center'}}>
				{item}
			</div>
		</div>
	}
}

export default SellerDelivered;