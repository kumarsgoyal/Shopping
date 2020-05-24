import React, {Component} from 'react';
import List from './../productList/list.js';

// let products = [
// 	{
// 		_id: 'akfsjakl234fkdl',
// 		name: 'lala lala',
// 		price: '200',
// 		avg_rating: 4,
// 		no_of_reviews: 10,
// 		main_photo: image
// 	},
// 	{
// 		_id: 'akfsjakl234fkdl',
// 		name: 'lala lala',
// 		price: '200',
// 		avg_rating: 4,
// 		no_of_reviews: 10,
// 		main_photo: image	
// 	},
// 	{
// 		_id: 'akfsjakl234fkdl',
// 		name: 'lala lala',
// 		price: '200',
// 		avg_rating: 4,
// 		no_of_reviews: 10,
// 		main_photo: image
// 	},
// 	{
// 		_id: 'akfsjakl234fkdl',
// 		name: 'lala lala',
// 		price: '200',
// 		avg_rating: 4,
// 		no_of_reviews: 10,
// 		main_photo: image
// 	}
// ]

class SellerProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			loading: true
		}
	}
	componentDidMount() {
	  	fetch(`http://localhost:5000/seller/products`, {
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
	                this.setState({products: res.products, loading: false})
	                // console.log(res)
	                //this.setState({ products: res.products })
	            })
	            .catch((err) => {
	                console.log(err)
	            })
	}
	render() {
		
		let item = <h4>No Products Found</h4>
		if(this.state.loading) {
			item = <h4>Loading....</h4>
		}
		else if(this.state.products && this.state.products.length > 0)
			item = <List type='product' products={this.state.products} history={this.props.history}/>
			
		return <div className='container-fluid' style={{backgroundColor: 'rgba(234, 234, 234, 0.86)'}}>
			<div className='row pl-2 py-2'>
				<h1 className='col-12 m-0 text-center font-weight-bold bg-white rounded'>
					Products
				</h1>
			</div>
			<div style={{minHeight: '25vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
				{item}
			</div>
		</div>
	}
}

export default SellerProduct;