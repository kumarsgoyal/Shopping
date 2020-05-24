import React, { Component } from 'react'
import './styles.css'

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
        let {name, price, avg_rating, main_photo} = this.props.product;
        return <div className='pt-0 mb-2 row rounded hover-blue' to={{
                }} style={{ textDecoration: 'none', backgroundColor: 'white' }}>
                    {/* image */}
                    <div className="col-4 col-md-4"> 
                        <div style={{ paddingTop: "100%", overflow: "hidden" }}>
                            <img alt="imagesrc" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", objectFit: "cover" }} src={main_photo} />
                        </div>
                        
                    </div>
                    {/* details */}
                    <div className="col-8 col-md-6 pl-4">
                        <h3 className="row heading">
                            {name}
                        </h3>
                        <div className="row">
                            <h5>Rating</h5>
                            <span className='pl-2'></span>
                            <h5>{avg_rating}</h5>
                              
                        </div>
                        <div className='row'>
                            <h5>
                                ₹{price}
                            </h5>
                        </div>
                    </div>
                    <div className='row col-md-2 p-0 m-0 d-flex flex-row align-items-end justify-content-end'>
                        <button onClick={this.handleClick} className='btn btn-primary'>Update</button>
                    </div>
                </div>
    }
}

class Order extends Component {
    render() {
        let {_id, product_id, total_amount, units, order_date, delivery_address, status} = this.props.order;
        // console.log(this.props.product);
        return <div style={{ textDecoration: 'none', backgroundColor: 'white' }} className="pt-0 mb-2 row rounded hover-blue">

                    <div className="col-8 pl-4">
                        <div className="row heading">
                            <div style={{display: 'flex', flexDirectoin: 'row', alignItems: 'center'}}>
                                <h5 className='font-weight-bold'>Order Id</h5>
                                <span className='pl-2'></span>
                                <h5>{_id}</h5>
                            </div>
                        </div>
                        <div className='row' style={{display: 'flex', flexDirectoin: 'row', alignItems: 'center'}}>
                            <h5 className='font-weight-bold'>Delivery Address</h5>
                            <span className='pl-2'></span>
                            <h5>{delivery_address}</h5>
                        </div>
                        <div className='row' style={{display: 'flex', flexDirectoin: 'row', alignItems: 'center'}}>
                            <h5 className='font-weight-bold'>Order Date</h5>
                            <span className='pl-2'></span>
                            <h5>{order_date.toLocaleString()}</h5>
                        </div>

                        {/* <div className='row' style={{display: 'flex', flexDirectoin: 'row', alignItems: 'center'}}> */}
                        {/*     <h4>Units purchased</h4> */}
                        {/*     <span className='pl-2'></span> */}
                        {/*     <h5>{units}</h5> */}
                        {/* </div> */}
                        <div className='row' style={{display: 'flex', flexDirectoin: 'row', alignItems: 'center'}}>
                            <h5 className='font-weight-bold'>Total Amount</h5>
                            <span className='pl-2'></span>
                            <h5>₹{total_amount}</h5>
                        </div>
                    </div>
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
        if (this.state.show_list) {
            if(this.props.type=='order') {
                list = this.state.orders.map((x, index) => {
                    return <Order key={index} order={x} history={this.props.history} />
                })
            }
            else {
                list = this.state.products.map((x, index) => {
                    return <Product key={index} product={x} history={this.props.history}/>
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
