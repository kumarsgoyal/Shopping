import React,{Component} from 'react'
import history from '../../history'
import StarRatings from 'react-star-ratings'

class Product extends Component{
    handleClick=(event)=>{
        event.preventDefault();
        history.push({pathname:'/Product/ProductDetails',state:{id:this.props.product._id}})
    }
    render(){
        return <tr>
            <td>
                    <div className="row" style={{height:'40vh'}}>
                        <div className="col-1">

                        </div>
                        <div className="col-3" style={{height:'40vh'}}>
                            <img alt="imagesrcc" width="100%" height="100%" src={this.props.product.main_photo} />
                        </div>
                        <div className="col-1">
                        </div>
                        <div className="col-6">
                            <button style={{backgroundColor:"transparent",border:"none",outline:"none"}} onClick={this.handleClick}>
                                <h1 style={{ fontFamily: 'Courier New', textAlign: 'left', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                    {this.props.product.name}
                			    </h1>
                            </button>
                            <div style={{height:'20px'}}></div>
                            <h3 style={{ fontFamily: 'Courier New', textAlign: 'left', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                Rs. {this.props.product.price}
                            </h3>
                            <div style={{height:'20px'}}></div>
                            <StarRatings starRatedColor="red" rating={this.props.product.avg_rating} />

                            <div style={{height:'20px'}}></div>
                            <h3 style={{ fontFamily: 'Courier New', textAlign: 'left', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                Order Place. {this.props.product.unit_sold}
                            </h3>

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
            </td>
        </tr>
            
    }
}

export default Product
