import React, {Component} from 'react';
import Loader from 'react-loader';
import ImageSlides from './imageSlides'
import ReviewList from '../Reviews/reviewList'
import Navbar from './navbar';
import Button from '@material-ui/core/Button';
import history from '../../history'
class ProductsDetails extends Component {

    constructor(props){
        super(props);
        this.state={
            productDetails: {features:[]},
            left: '',
            images:[],
            loaded: true,
            isInCart: false,
            isInCartLoaded: true
        }
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }
    addToCart() {

        this.setState({isInCartLoaded: false})

        let obj = {product_id: this.props.location.state.id}
        
        fetch('http://localhost:5000/customer/addToCart', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(obj)

        })
            .then((res) =>{
                // console.log(res)
                this.setState({isInCartLoaded: true})
                if(res.status === 200){
                    this.setState({isInCart: true});
                    console.log('added');
                }
                else if(res.status === 401) {
                    // console.log('unauthorized');
                    history.push({
                        pathname: '/Customer/Login',
                        state: {
                            isRedirected: true
                        }
                    })
                }
                else {
                    throw 'error'
                }
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    removeFromCart() {
        this.setState({isInCartLoaded: false});
        let obj = {product_id: this.props.location.state.id}
    
        fetch('http://localhost:5000/customer/removeFromCart', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(obj)

        })
            .then((res) =>{
                this.setState({isInCartLoaded: true})
                // console.log(res)
                if(res.status === 200){
                    this.setState({isInCart: false});
                }
                else if(res.staus === 401) {
                    console.log('unauthorized');
                }
                else {
                    throw 'error'
                }
            })
            .catch((error) =>{
                console.log(error);
            })

    }

    componentDidMount(){
        this.setState({loaded1:false,loaded2:false, isInCartLoaded: false})
        let id=this.props.location.state.id
        let url = 'http://localhost:5000/product/details';
        url+='?product_id=';
        url+=id;
        fetch(url).then(res=>res.json())
        .then(res=>this.setState({loaded1:true, productDetails:res.product, left: res.product.stock-res.product.unit_sold}));
        url = 'http://localhost:5000/product/images';
        url+='?product_id=';
        url+=id;
        fetch(url).then(res=>res.json())
        .then(res=>this.setState({loaded2:true,images:res.images}));


        let params = {
            product_id: this.props.location.state.id
        }
        let url2 = 'http://localhost:5000/customer/isInCart'
        url2+='?';
        for(var key in params) {
            url2+=(key+'='+params[key]+'&');
        }
        url.substr(0, url2.length-2)
        fetch(url2, {
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            credentials: 'include',
            params: params
        })
            .then((res) =>{
                // console.log(res)
                if(res.status === 200){
                    // console.log(res.json());
                    return res.json();
                }
                else {
                    this.setState({isInCart: false, isInCartLoaded: true});
                    throw 'failed to check product is in cart';
                }
            })
            .then((res) => {
                this.setState({isInCart: res.isInCart, isInCartLoaded: true});
            })
            .catch((error) =>{
                console.log(error);
            })

            this.setState({left: this.state.productDetails.stock - this.state.productDetails.unit_sold});

    }
    buyNow=()=>{
        let productToBuy = []
        productToBuy.push(this.state.productDetails);
        history.push({pathname:'/Product/Buy',state:{products:productToBuy,throughCart:false}})
    }
    render(){
        let addToCart = <Button onClick={this.addToCart} variant="contained" color="primary" size="large">
            Add to Cart                
        </Button>

        if(this.state.isInCart) {
            addToCart = <Button onClick={this.removeFromCart} variant="contained" color="primary" size="large">
                remove from cart
            </Button>
        }

        let imagedis;
        if(this.state.images.length === 0)
            imagedis = <img src={this.state.productDetails.main_photo} height="100%"/>
        else
            imagedis = <ImageSlides images={this.state.images} />
            return <Loader loaded={this.state.loaded1&&this.state.loaded2}>
            <div className="container-fluid">
                <Navbar {...this.props} />
                <hr />
                <div style={{height:'10vh'}}>

                </div>
                <div className="row" style={{height:'40vh'}}>
                    <div className="col-1">

                    </div>
                    <div className="col-3" style={{height:'30vh'}}>
                        {imagedis}
                    </div>
                    <div className="col-1">

                    </div>
                    <div className="col-4" style={{height:'30vh'}}>
                        <h1 style={{ fontFamily: 'Courier New', textAlign: 'left', fontWeight: 'bold', verticalAlign: 'middle' }}>
                            {this.state.productDetails.name}
                        </h1>
                        <h3 style={{ fontFamily: 'Courier New', textAlign: 'left', fontWeight: 'bold', verticalAlign: 'middle' }}>
                            Rs. {this.state.productDetails.price}
                        </h3>
                    </div>
                    <div className="col-1">
                        
                    </div>
                    <div className="col-2" style={{textAlign:'center', height:'30vh'}}>
                        <div>
                            <div style={{height: '10vh'}}>

                            </div>
                            <div style={{height:'5vh', fontFamily: 'Courier New', textAlign: 'center', fontWeight: 'bold', verticalAlign: 'middle'}}>
                                <Loader loaded={this.state.isInCartLoaded} >
                                    {addToCart}
                                </Loader>
                            </div>
                            <div style={{height: '5vh'}}>

                            </div>
                            <div style={{height:'5vh'}}>
                                <Button variant="contained" color="secondary" size="large" onClick={this.buyNow}>
                                    Buy Now
                                </Button>
                            </div>
                            <div style={{height: '5vh'}}>

                            </div>
                        </div>
                        
                    </div>
                </div>
                <div style={{height:'30px'}}>

                </div>
                <div>
                    <hr />
                    <h2 style={{fontFamily: 'Courier New', fontWeight: 'bold', verticalAlign: 'middle'}}>
                        Description:
                    </h2>
                    {this.state.productDetails.description}
                    <hr />
                    <h2 style={{fontFamily: 'Courier New', fontWeight: 'bold', verticalAlign: 'middle'}}>
                        Features:
                    </h2>
                    <ul>{this.state.productDetails.features.map((elem,index)=>{
                        return <li key={index}>{elem}</li>
                    })}</ul>
                    <hr />
                    <h2 style={{fontFamily: 'Courier New', fontWeight: 'bold', verticalAlign: 'middle'}}>
                        Left in stock:
                    </h2>
                    {this.state.left}
                    <hr/>
                    <h2 style={{fontFamily: 'Courier New', fontWeight: 'bold', verticalAlign: 'middle'}}>
                        Reviews:
                    </h2>
                    <ReviewList id={this.state.productDetails._id} />
                </div>
                <div style={{height:'10vh'}}>

                </div>
            </div>
        </Loader>
    }
}

export default ProductsDetails
