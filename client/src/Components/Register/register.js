import React, { Component } from 'react';
import HomeNavbar from './navbar';
import { Link } from 'react-router-dom'
import image1 from '../images/avatar1.png';
import image2 from '../images/avatar2.png';

let styles = {
	image: {
		height: '100%',
		width: '100%',
		borderRadius: '50%',
		border: '2px solid black'
	}
};

class Register extends Component{
    
    render() {
        return (
            <div style={{textAlign:'center', height: '100vh'}}>
                <HomeNavbar />
                <div style={{height: '15vh'}}>

                </div>
                <div className="row" style={{height: '55vh'}}>
                    <div className="col-2">

                    </div>
                    <div className="col-3">
                        <h1 style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold'}}>
                            CUSTOMER
                        </h1>
                        <Link to='/Customer/Register'>
                            <img alt="imagesrc" style={styles.image} src={image1} />
                        </Link>
                        
                    </div>
                    <div className="col-2">

                    </div>
                    <div className="col-3">
                        <h1 style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold'}}>
                            SELLER
                        </h1>
                        <Link to='/Seller/Register'>
                            <img alt="imagesrc" style={styles.image} src={image2} />
                        </Link>
                    </div>
                    <div className="col-2">

                    </div>
                </div>
                <div style={{height: '15vh'}}>

                </div>
            </div>

        );           
    }
}
export default Register;