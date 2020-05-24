import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


class HomeNavbar extends Component {
    render() {
        return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-md   justify-content-between">
            <ul className="navbar-nav">
                <li className="nav-item" style={{padding:'5px 25px'}}>
                	<Button size="large" color="primary" disabled>
                		<h2 style={{fontFamily:'Courier New', textAlign:'center', color:'#f7a90c', fontWeight:'bold'}}>
                    		Shopping cart.
                		</h2>
                	</Button>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item" style={{padding:'5px 20px', float:'right'}}>
                        <Link to='/Login'>
                            <Button color="primary" size="large" variant="contained">
                                Login
                            </Button>
                        </Link>
                    </li>
                    <li className="nav-item" style={{padding:'5px 20px', float:'right'}}>
                        <Link to='/Register'>
                            <Button color="primary" size="large" variant="contained">
                                Register
                            </Button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        )
    }
}

export default HomeNavbar;