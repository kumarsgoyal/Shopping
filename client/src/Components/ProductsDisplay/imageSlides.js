import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
}

class imageSlides extends Component {
    constructor(props){
        super(props);
        this.state={images:[]}
    }
    componentDidMount(){
        let img=this.props.images;
        this.setState({images:img})
    }
    render(){
        return (
        <div className="slide-container">
            <Slide {...properties}>
                {this.state.images.map((image,index)=>{
                    return <img key={index} alt="can't be loaded" width="100%" src={image} height="100%"/>
                })}
            </Slide>
        </div>
        )
    }
}
export default imageSlides 