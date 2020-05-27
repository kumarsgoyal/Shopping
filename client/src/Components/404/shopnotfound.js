import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import './style.css'

const Background = require("../images/demo-bg.jpg");
var demo = {
    className: "img-fluid",
    backgroundImage: `url(${Background})`,
    backgroundSize: '100% 100%',
    height: '100vh'
};



class Shopnotfound extends Component {
    render() {
        return (
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
                        <h id="main-title1"> 404</h>
                        <h id="main-title2"> Shop Not Found</h>
                    </div>
                </div>
            </div>

        )
    }
}

// ReactDOM.render(<Shopnotfound />, document.querySelector("#root"))
export default Shopnotfound;