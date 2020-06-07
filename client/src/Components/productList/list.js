import React, { Component } from 'react'
import './styles.css'
import { Button } from '@material-ui/core';

class Product extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        // console.log(this.props);
        this.props.history.push({
            pathname: `/Seller/update_product?product_id=${this.props.product._id}`,
            state: {
                product: this.props.product,
                update: true
            }
        })
    }
    render() {
        // console.log(this.props.product);
        let {_id, name, price, avg_rating, main_photo, stock, unit_sold} = this.props.product;
        return <div className='hover-blue row' style={{height: '40vh', overflow:'scroll'}}>
            <div className="col-1">
            </div>
            {/* image */}
            <div className="col-4" style={{height: '40vh'}}>
                <div>
                    <img alt="imagesrc" style={{width: "100%", height: "40vh", objectFit:'fill'}} src={main_photo} />
                </div>
            </div>
            <div className="col-1">
            </div>
            {/* details */}
            <div className="col-5" style={{height:'40vh'}}>
                <h3 className="row heading">
                    Name: {name}
                </h3>
                <h4 className="row heading">
                    Id: {_id}
                </h4>
                <div className="row heading">
                    <h5>Rating: </h5>
                        <span className='pl-2'></span>
                    <h5>{avg_rating}</h5>          
                </div>
                <div className='row heading'>
                    <h5>
                        Price: ₹{price}
                    </h5>
                </div>
                <div className="row heading">
                    <h5>Stock: </h5>
                    <span className='pl-2'></span>
                    <h5>{stock - unit_sold}</h5>
                </div>
            </div>
            <div className="col-1">
                <button onClick={this.handleClick} className='btn btn-primary'>UPDATE</button>
            </div>
        </div>
    }
}

class Order extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // console.log(this.props.order._id);

        let obj = {order_id: this.props.order._id};
        
        fetch('http://localhost:5000/seller/deliveredStatus', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(obj)

        }).then((res) =>{
                if(res.status === 200){
                    window.location.reload(false);
                }
                else if(res.status === 401) {
                    // console.log('unauthorized');
                    this.props.history.push({
                        pathname: '/Seller/Login',
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
    render() {
        let {_id, product_id, total_amount, units, expected_delivery_date, order_date, delivery_address, status} = this.props.order;
        let del_but=<div></div>
        if(this.props.button)
            del_but=<div className="col-2">
                <button onClick={this.handleClick} className='btn btn-primary'>DELIVERED</button>
            </div>
        return <div style={{textAlign:'justify'}} className="row hover-blue">
            <div className="col-1">
            </div>

            <div className="col-3" style={{textAlign:'justify'}}>
                <div className="row heading">
                    <h5 className='font-weight-bold'>Order Id:</h5>
                    <span style={{margin:'0px 20px'}}></span>
                </div>
                <div className='row heading' style={{textAlign:'justify'}}>
                    <h5 className='font-weight-bold'>Product Id: </h5>
                    <span style={{margin:'0px 20px'}}></span>
                </div>
                <div className='row heading' >
                    <h5 className='font-weight-bold'>Delivery Address:</h5>
                    <span style={{margin:'0px 20px'}}></span>
                </div>
                <div className='row heading' >
                    <h5 className='font-weight-bold'>Order Date:</h5>
                    <span style={{margin:'0px 20px'}}></span>
                </div>
                <div className='row heading' >
                    <h5 className='font-weight-bold'>Expected Date:</h5>
                    <span style={{margin:'0px 20px'}}></span>
                </div>
                <div className='row heading'>
                    <h4>Units purchased:</h4>
                    <span style={{margin:'0px 20px'}}></span>
                </div>
                <div className='row heading' >
                    <h5 className='font-weight-bold'>Total Amount</h5>
                    <span style={{margin:'0px 20px'}}></span>
                </div>
                <div className='row heading' >
                    <h5 className='font-weight-bold'>Delivery Status:</h5>
                    <span style={{margin:'0px 20px'}}></span>
                </div>
            </div>
            <div className="col-6" style={{textAlign:'justify'}}>
                <div className="row heading">
                    <h5 style={{textAlign:'inherit'}}>{_id}</h5>
                </div>
                <div className='row heading' style={{textAlign:'justify'}}>
                    <h5 style={{textAlign:'inherit'}}>{product_id}</h5>
                </div>
                <div className='row heading' >
                    <h5>{delivery_address}</h5>
                </div>
                <div className='row heading' >
                    <h5>{order_date.toLocaleString()}</h5>
                </div>
                <div className='row heading' >
                    <h5>{expected_delivery_date.toLocaleString()}</h5>
                </div>
                <div className='row heading'>
                    <h5>{units}</h5>
                </div>
                <div className='row heading' >
                    <h5>₹{total_amount}</h5>
                </div>
                <div className='row heading' >
                    <h5>{status}</h5>
                </div>
            </div>
            {del_but} 
        </div >
    }
}

class simpleList extends Component {
    constructor(props){
        super(props)
        // console.log(this.props)
        this.state={
            show_list: true,
            products: this.props.products,
            orders: this.props.orders
        }
    }
    static getDerivedStateFromProps(props,state){
        return {
            hotels: props.products
        }
    }
    static getDerivedStateFromProps(props, prevState) {
        if(props.type === 'order') {
            return {orders: props.orders}
        }
        else {
            return {
                products: props.products
            }
        }
    }
    render() {
        let list;
        console.log(this.props);
        if (this.state.show_list) {
            if(this.props.deliverButton==false){
                let bt = false;
                list = this.state.orders.map((x, index) => {
                    if(x.status == "delivery_pending") {
                        return <div>
                            <Order button={bt} key={index} order={x} history={this.props.history} />
                            <hr style={{width:'84%'}}/>
                        </div>
                    }
                })
            }
            else if(this.props.type == 'order') {
                let bt = true;
                list = this.state.orders.map((x, index) => {
                    if(x.status == "delivery_pending")
                        return <div>
                            <Order button={bt} key={index} order={x} history={this.props.history} />
                                <hr style={{width:'84%'}}/>
                        </div>
                })
            }
            else if(this.props.type == 'delivered') {
                let bt = false;
                list = this.state.orders.map((x, index) => {
                    if(x.status == "delivered") {
                        return <div>
                            <Order button={bt} key={index} order={x} history={this.props.history} />
                            <hr style={{width:'84%'}}/>
                        </div>
                    }
                })
            }
            else {
                list = this.state.products.map((x, index) => {
                    return <div>
                        <Product key={index} product={x} history={this.props.history}/>
                        <hr style={{width: '1%'}} />
                    </div>
                })
            }
        }
        return <div className='pl-2 rounded'>
            {this.state.show_list}
            {list}
        </div>
    }
}

export default simpleList
