import React,{Component} from 'react';
import Navbar from './navbar'
import {Helmet} from "react-helmet";
import './style.css'

const Background = require("../images/demo-bg.jpg");
var demo = {
    className: "img-fluid",
    backgroundImage: `url(${Background})`,
    backgroundSize: '100% 100%',
    height: '85vh'
};

class HomePage extends Component{
    render(){
        console.log(this.props);
        return ( <div>
            <Navbar />
            <div style={demo}>  
                <Helmet>
                    <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js" type="text/javascript" />
                    <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js" type="text/javascript" />
                    <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js" type="text/javascript" />
                </Helmet>
                <div id="demo">
                    <div id="large-header" className="large-header">
                        <canvas id="demo-canvas">
                        </canvas>
                        <h id="main-title1"> Welcome</h>
                        <h id="main-title2"> Admin</h>
                    </div>
                </div>
             </div>
        </div>)
    }
}

export default HomePage
