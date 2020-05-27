import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import StarRating from 'react-star-ratings'
import history from '../../history'

var demo = {
	className: "img-fluid",
    // backgroundSize: '100% 100%' ,
};


class EditReview extends Component{
    constructor(props){
        super(props);
        this.state={
            review_id:"",
            product_id:"",
            customer_name:"",
            review:"",
            rating:0
        }
    }
    componentDidMount(){
        this.setState({
            review_id:this.props.location.state.Review._id,
            product_id:this.props.location.state.Review.product_id,
            customer_name:this.props.location.state.Review.customer_name,
            review:this.props.location.state.Review.message,
            rating:this.props.location.state.Review.rating
        });
    }
    
	handleSubmit=(event)=>{
        event.preventDefault();
        let review_obj={
            review_id:this.state.review_id,
            product_id:this.state.product_id,
            customer_name:this.state.customer_name,
            review:this.state.review,
            rating:this.state.rating
        }
        
        fetch(`http://localhost:5000/customer/editProductReview`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(review_obj)
            })
                .then((res) => {
                    history.push({pathname:'/Product/ProductDetails',state:{id:this.state.product_id}})
                })
                .catch((err) => {
                    console.log(err)
                })
                
    }
	
	
	
	
    changeRating=( newRating )=> {
        this.setState({
          rating: newRating
        });
      }
    render(){
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
                                    Write Review
                                </h2>
                                <TextField
                                    id="cust_name"
                                    label="Your Public Name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={this.state.customer_name}
                                    onChange={(event) => this.setState({ customer_name: event.target.value })}
                                />
                                <div style={{ height: '30px' }}>

                                </div>
                                <StarRating starRatedColor="red" rating={this.state.rating} starDimension="30px" changeRating={this.changeRating}  />
                                <div style={{height:'30px'}}>

                                </div>
                                <TextField
                                    id="review"
                                    label="Write your review"
                                    variant="outlined"
                                    multiline
                                    required
                                    fullWidth
                                    value={this.state.review}
                                    onChange={(event) => this.setState({ review: event.target.value })}
                                />
                                <div style={{ height: '30px' }}>

                                </div>
                                
                            </div>
                            <div style={{ height: '30px' }}>

                            </div>
                            <label htmlFor="raised-button-file">
                                <Button color="primary" size="large" variant="contained" type="submit" fullWidth>
                                    Save Changes
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

export default EditReview
