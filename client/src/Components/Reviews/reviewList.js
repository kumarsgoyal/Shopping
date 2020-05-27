import React,{Component} from 'react';
import Loader from 'react-loader';
import Review from './review';
import history from '../../history';
import Button from '@material-ui/core/Button';
import StarRating from 'react-star-ratings';

class ReviewList extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            isReviewed:false,
            reviews:[],
            Review:{},
            loaded:true
        }
    }
    componentDidMount(){
        this.setState({id:this.props.id,loaded:false})
        let id=this.props.id;
        let url='http://localhost:5000/reviews/allReviews/'
        url+=id
        fetch(url).then(res=>res.json())
        .then(res=>this.setState({reviews:res.reviews,loaded:true}))
        .catch(()=>console.log('problem'))
        let url2='http://localhost:5000/customer/isReviewed/'
        url2+=id;
        fetch(url2,{
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            credentials: 'include'

        }).then(res=>res.json())
        .then(res=>this.setState({isReviewed:res.isReviewed,Review:res.Review}));
    }

    addReview=()=>{
        history.push({pathname:'/Product/AddReview',state:{id:this.state.id}})
    }
    
    deleteReview=()=>{
        let id=this.state.Review._id;
        let url='http://localhost:5000/reviews/deleteReview/'
        url+=id;
        fetch(url,{
            method:'DELETE',
            headers:{
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res=>window.location.reload())
    }

    editReview=()=>{
        history.push({pathname:'/Product/EditReview',state:{Review:this.state.Review}})
    }
    render(){
        if(this.state.loaded&&this.state.reviews.length===0){
            return<div>
                <p>No reviews yet,Be the first to review</p>
                <Button variant="contained" color="secondary" size="medium" onClick={this.addReview}>
                    Add Review
                </Button>

            </div>
        }
        else{
            let userrev=<Button variant="contained" color="secondary" size="medium" onClick={this.addReview}>
                Add Review
            </Button>
            if(this.state.isReviewed){
                console.log(this.state.Review)
                userrev=<div>
                    <hr />
                    <div><h3>Your review</h3></div>
                    <div>Name:{this.state.Review.customer_name}</div>
                    <StarRating 
                    starRatedColor="red"
                    rating={this.state.Review.rating}
                    starDimension="20px"
                    starSpacing="10px"
                    />
                    <div>Message:{this.state.Review.message}</div>
                    <div>
                        <button onClick={this.deleteReview}>Delete Review</button>
                        <button onClick={this.editReview}>Edit Review</button>
                    </div>
                </div>
            }

            return <Loader loaded={this.state.loaded}>
                {/* {console.log(this.state.reviews)} */}
                {this.state.reviews.map((review,index)=><Review key={index} rev={review}/>)}
                {userrev}
            </Loader>
        }
    }
}

export default ReviewList
