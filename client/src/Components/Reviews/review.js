import React,{Component} from 'react'
import StarRating from 'react-star-ratings'
class Review extends Component{
    render(){
        return <div>
            <div>{this.props.rev.customer_name}</div>
        <StarRating 
        starRatedColor="red"
        rating={this.props.rev.rating}
        starDimension="20px"
        starSpacing="15px"
        />
        <div><h3>{(this.props.rev.message)}</h3></div>
        </div>
    }
}

export default Review
