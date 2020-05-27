import React, {Component} from 'react';
import HomeNavbar from './navbar';
import Shopnotfound from './shopnotfound';

class Pagenotfound extends Component {
    
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <HomeNavbar /> 
                <Shopnotfound />
            </div>
        );
    }
}


export default Pagenotfound;