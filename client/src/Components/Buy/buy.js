import React,{Component} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import history from '../../history'

var demo = {
	className: "img-fluid",
    // backgroundSize: '100% 100%' ,
};

class Buy extends Component{
    constructor(props){
        super(props);
        this.state={
            del_add:"",
            products:[]
        }
    }
    componentDidMount(){
        console.log(this.props.location.state)
        let prodt=this.props.location.state.products
        prodt.map(elem=>{
            console.log(elem);
            let prod_obj={};
            prod_obj.units=1;
            prod_obj.product=elem;
            let prds=this.state.products;
            prds.push(prod_obj);
            this.setState({products:prds});
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        console.log(this.state.products)
        this.state.products.map((elem)=>{
            let order={};
            order.product=elem.product;
            order.units=elem.units;
            order.delivery_address=this.state.del_add;
            fetch('http://localhost:5000/customer/addOrder',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(order)
            }).then(res=>{
                history.push({pathname:'/Products', state:{inputValue:""}})
                if(this.props.location.state.throughCart){
                    let obj = {product_id: elem.product._id}
                    fetch('http://localhost:5000/customer/removeFromCart', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json', 'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(obj)
                    }).then(res=>console.log('done'))
                    .catch(res=>console.log('failed to remove from cart'))
                }
            })
        })
    }
    totalAmount=()=>{
        let total=0;
        this.state.products.map(elem=>{
            total=eval(total+elem.product.price*elem.units)
        })
        return total;
    }
    render(){
        console.log(this.state.products)
        return(
            <div style={demo}>
                <div style={{height:'100px'}}>

                </div>

                <div>
                <div className="row">
                    <div className="col-sm-1">

                    </div>

                    <div className="col-sm-4" style={{backgroundColor:'white'}}>
                        <form onSubmit={this.handleSubmit} style={{paddingBottom: '10px'}}>
                            <hr />
                            <div>
                                <h2 style={{ fontFamily: 'Courier New', textAlign: 'left', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                    Enter details
                                </h2>
                                <TextField
                                    id="del_add"
                                    label="Enter delivery address"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={this.state.del_add}
                                    onChange={(event) => this.setState({ del_add: event.target.value })}
                                />
                                <div style={{ height: '30px' }}>

                                </div>
                                {this.state.products.map((elem,index)=>{
                                    return <div style={{border:"1px solid black",padding:"10px"}}>
                                        <div className="row">
                                            <div className="col-1">

                                            </div>
                                            <div className="col-3">
                                                <img alt="imagesrcc" width="150%" height="100%" src={this.state.products[index].product.main_photo} />
                                            </div>
                                            <div className="col-1">
                                            </div>
                                            <div className="col-6">
                                                    <h1 style={{ fontFamily: 'Courier New', textAlign: 'left', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                                        {this.state.products[index].product.name}
                                                    </h1>
                                                <div style={{height:'20px'}}></div>
                                                <h3 style={{ fontFamily: 'Courier New', textAlign: 'left', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                                    Rs. {this.state.products[index].product.price}
                                                </h3>
                                                <div style={{height:'20px'}}></div>


                                            </div>
                                            <div className="col-1">
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-1">

                                            </div>
                                            <div className="col-10">
                                                    <hr />
                                            </div>

                                            <div className="col-1">
                                            </div>
                                        </div>
                                        
                                        <TextField
                                        type="number"
                                        id="units"
                                        label="No. of units"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={this.state.products[index].units}
                                        onChange={(event) => {
                                        if (event.target.value <= 0)
                                            return
                                        else
                                        {
                                            let prods=this.state.products;
                                            prods[index].units=event.target.value;
                                            this.setState({products:prods})
                                        }
                                    }}
                                />
                                </div>
                                })}
                                
                                
                            </div>
                            <div style={{ height: '30px' }}>

                            </div>
                                <h4>Your total amount is {this.totalAmount()}</h4>
                            <div style={{ height: '30px' }}>

                            </div>
                            <label htmlFor="raised-button-file">
                                <Button color="primary" size="large" variant="contained" type="submit" fullWidth>
                                    Place Order
                                </Button>
                            </label>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            
        )
    }
}

export default Buy
