import React, {Component} from 'react';
import Product from './product';
import Loader from 'react-loader';
import Navbar from './navbar';
import Button from '@material-ui/core/Button';
import history from '../../history'
class ProductsList extends Component {

    constructor(props){
        super(props);
        this.state={
            products: [],
            loaded: true
        }
    }
    
    componentDidMount(){
        this.setState({loaded:false})
        if(this.props.forCart) {
            this.props.loadCartProducts()
            .then((res) => {
                console.log(res.products);
                this.setState({products: res.products, loaded: true})
            })
            return;
        }
        let inputValue = this.props.location.state.inputValue
        console.log(this)
        let filters = {} 
        
		let params = {
			search: inputValue,
			...filters
		}
        
		let url = 'http://localhost:5000/product/search'
		url+='?';
        
		for(var key in params) {
			url+=(key+'='+params[key]+'&');
		}
        
		url.substr(0, url.length-2);

		fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json', 'Content-Type': 'application/json'
			},
			credentials: 'include',
			params: params
		})
		.then(res=>res.json())
		.then((res) =>{
            this.setState({products:res.products,loaded:true})
		})
		.catch((error) =>{
			console.log(error);
		})
    }
    buyNow=()=>{
        let productToBuy=[]
        productToBuy=this.state.products
        history.push({pathname:'/Product/Buy',state:{products:productToBuy}})
    }
    render(){
        if(this.state.loaded&&this.state.products.length==0)
            return <div>
		    <Navbar {...this.props} />
            <hr />
		    <h3>No items match your search</h3>
	    </div>
        else
        {
            let buyComp=<div></div>
            if(this.props.forCart)
                buyComp=<center><Button variant="contained" color="secondary" size="large" onClick={this.buyNow}>
                	Buy Now
            	</Button></center>
            return <Loader loaded={this.state.loaded} >
                <Navbar {...this.props} />
                <hr />
                <table style={{width:'100%'}}>
                    <tbody>
                        {this.state.products.map((elem,index)=>{
                            return <Product key={index} product={elem}/>
                        })}
                    </tbody>
                </table>
                {buyComp}
            </Loader>
      }
    }
}


export default ProductsList;
