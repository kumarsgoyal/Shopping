import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@material-ui/core/Button';
import history from '../../history'

class HomeNavbar extends Component {
    getSellers=(event)=>{
        event.preventDefault();
        history.push('/Admin/Sellers');
    }
    getCustomers=(event)=>{
        event.preventDefault();
        history.push('/Admin/Customers');
    }
    render() {
        if(this.props.name == 'NULL') {
            return (
                <div className="container-fluid" style={{height: '15vh'}}>
                    <nav className="navbar navbar-expand-md   justify-content-between">
                    <div className="col-sm-4">
                    <ul className="navbar-nav">
                        <li className="nav-item" style={{padding:'5px 25px'}}>
                            <Button size="large" disabled>
                                <h2 style={{fontFamily:'Courier New', textAlign:'center', color:'#f7a90c', fontWeight:'bold'}}>
                                    Shopping cart.
                                </h2>
                            </Button>
                        </li>
                    </ul>
                    </div>
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-4">
                        <Button color="primary" size="large" variant="contained" onClick={this.getSellers}>
                            Sellers
                        </Button>
                        <span style={{margin:'10px'}}>
        
                        </span>
                        <Button color="primary" size="large" variant="contained" onClick={this.getCustomers}>
                            Customers
                        </Button>
                    </div>
                    </nav>
                </div>
            )
        }
        else {
            return (
                <div className="container-fluid" style={{height: '15vh'}}>
                    <nav className="navbar navbar-expand-md   justify-content-between">
                    <div className="col-sm-4">
                    <ul className="navbar-nav">
                        <li className="nav-item" style={{padding:'5px 25px'}}>
                            <Button size="large" disabled>
                                <h2 style={{fontFamily:'Courier New', textAlign:'center', color:'#f7a90c', fontWeight:'bold'}}>
                                    Shopping cart.
                                </h2>
                            </Button>
                        </li>
                    </ul>
                    </div>
                    <div className="col-sm-4">
                        <p style={{fontFamily:'Courier New', textAlign:'center', color:'#031dad', fontWeight:'bold', fontSize:'30px'}}>
                            {this.props.name}
                        </p>
                    </div>
                    <div className="col-sm-4">
                    </div>
                    </nav>
                </div>
            )
        }
    }
}

export default HomeNavbar;
