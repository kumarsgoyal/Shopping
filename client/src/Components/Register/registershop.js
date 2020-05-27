import React, { Component } from 'react';
import HomeNavbar from './navbar';
import Registercompshop from './registerseller';

class Registershop extends Component{
    
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <HomeNavbar />
                <Registercompshop/>
            </div>
        );           
    }
}
export default Registershop;