import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@material-ui/core/Button';


class HomeNavbar extends Component {
    render() {
        return (
        <div className="container-fluid">
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
                <div className="col-sm-8">

                </div>
            </nav>
        </div>
        )
    }
}

export default HomeNavbar;