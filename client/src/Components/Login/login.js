import React, {Component} from 'react';
import HomeNavbar from './navbar';
import { Link } from 'react-router-dom'
import image1 from '../images/avatar1.png';
import image2 from '../images/avatar2.png';
import image3 from '../images/avatar3.png';

let styles = {
	image: {
		height: '100%',
		width: '100%',
		borderRadius: '50%',
		border: '2px solid black'
	}
};

class Login extends Component {
    render() {
        return (
            <div style={{textAlign:'center', height: '100vh'}}>
                <HomeNavbar />
                <div style={{height: '15vh'}}>

                </div>
                <div className="row" style={{height: '40vh'}}>
                    <div className="col-1">

                    </div>
                    <div className="col-2">
                        <h1 style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold'}}>
                            CUSTOMER
                        </h1>
                        <Link to='/Customer/Login'>
                            <img alt="imagesrc" style={styles.image} src={image1} />
                        </Link>
                        
                    </div>
                    <div className="col-2">

                    </div>
                    <div className="col-2">
                        <h1 style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold'}}>
                            SELLER
                        </h1>
                        <Link to='/Seller/Login'>
                            <img alt="imagesrc" style={styles.image} src={image2} />
                        </Link>
                    </div>
                    <div className="col-2">

                    </div>
                    <div className="col-2">
                        <h1 style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold'}}>
                            Admin
                        </h1>
                        <Link to='/Admin/Login'>
                            <img alt="imagesrc" style={styles.image} src={image3} />
                        </Link>
                    </div>
                    <div className="col-1">

                    </div>
                </div>
                <div style={{height: '15vh'}}>

                </div>
            </div>
        );
    }
}


export default Login;