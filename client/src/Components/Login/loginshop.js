import React, {Component} from 'react';
import Loginshopcomp from './loginseller';
import HomeNavbar from './navbar';
class Login extends Component {
    
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <HomeNavbar />
            	<Loginshopcomp {...this.props} />
            </div>
        );
    }
}


export default Login;