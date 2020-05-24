import React,{Component} from 'react';
import Loader from 'react-loader';
import Review from './review';
import history from '../../history';
import Button from '@material-ui/core/Button';

class ReviewList extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            reviews:[],
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
    }

    addReview=()=>{
        history.push({pathname:'/Product/AddReview',state:{id:this.state.id}})
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
            return <Loader loaded={this.state.loaded}>
                {/* {console.log(this.state.reviews)} */}
                {this.state.reviews.map((review,index)=><Review key={index} rev={review}/>)}
                <Button variant="contained" color="secondary" size="medium" onClick={this.addReview}>
                    Add Review
                </Button>
            </Loader>
        }
    }
}

export default ReviewList
