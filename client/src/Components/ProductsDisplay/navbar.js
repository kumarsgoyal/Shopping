import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Search from '../Search/search';
import SideBar from './drawer'
import { Drawer } from '@material-ui/core';
import history from '../../history'

class HomeNavbar extends Component {

    handleLogout=()=>{
        fetch('http://localhost:5000/logout',{
            method:"GET",
            credentials:"include"
        }).then(history.push('/Customer/Login'))
    }

    render() {
        // console.log(this.props);
        let cart = <Link to='/cart'>
            <Button color="primary" size="large" variant="contained">
                Your Cart
            </Button>
        </Link>

        if(this.props.forCart) {
            cart = <Link to={{
                pathname: '/Products',
                state: {
                    inputValue: ''
                }
            }}>
                <Button color="primary" size="large" variant="contained">
                    back
                </Button>
            </Link>
        }
        return (
        <div className="container-fluid" style={{height: '15vh'}}>
            <nav className="navbar navbar-expand-md   justify-content-between">
            <div className="col-sm-4">
            <ul className="navbar-nav">
                <li className='d-flex flex-row justify-content-center align-items-center'>    
                    <SideBar />
                </li>
                <li className="nav-item" style={{padding:'5px 25px'}}>
                	<Button size="large" disabled>
                		<h2 style={{fontFamily:'Courier New', textAlign:'center', color:'#f7a90c', fontWeight:'bold'}}>
                    		Shopping cart.
                		</h2>
                	</Button>
                </li>
            </ul>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item" style={{padding:'5px 25px'}}>
                	<Search {...this.props}/>
                </li>
                <li className='d-flex flex-row justify-content-center align-items-center'style={{padding:'5px 25px'}}>    
                    {cart}
                </li>
                <li className='d-flex flex-row justify-content-center align-items-center'>    
                    <Button color="primary" size="large" variant="contained" onClick={this.handleLogout}>
                        Logout
                    </Button>
                </li>
            </ul>
            </nav>
        </div>
        )
    }
}

export default HomeNavbar;
