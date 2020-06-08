import React, {Component} from 'react';
import List from './../productList/list.js';
import HomeNavbar from './../ProductsDisplay/navbar.js';

class pendingOrders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			loading: true
		}
	}
	
	componentDidMount() {
		fetch(`http://localhost:5000/customer/pendingOrders`, {
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
	                            pathname: '/customer/login',
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
	                //this.setState({ products: res.products })
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
			item = <List type='order' orders={this.state.orders} history={this.props.history} deliverButton={false}/>;

		return <div className='container-fluid' >
		<HomeNavbar type='Order.'/>
		<hr />
		<div style={{minHeight: '25vh', justifyContent: 'center'}}>
			{item}
		</div>
		</div>
	}
}

export default pendingOrders;
