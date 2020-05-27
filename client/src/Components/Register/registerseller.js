import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import history from '../../history';
const Background = require("../images/particles4.jpg");
const BackgroundWhole = require("../images/particles3.jpg");

var Style = {
	className: "img-fluid",
	backgroundImage: `url(${Background})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: '100% 100%'
};

var StyleWhole = {
	className: "img-fluid",
	backgroundImage: `url(${BackgroundWhole})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: '100% 100%'
};

class Registercompshop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			mobile: '',
			shopname: '',
			address: '',
			password1: '',
			password2: '',
			show1: false,
			error: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

    componentDidMount() {
    	console.log(this.props);
        console.log(this.props, this.props.location && this.props.location.state && this.props.location.state.update);
        if(this.props.location && this.props.location.state && this.props.location.state.update) {
            let state = this.state;
            let user = this.props.location.state.user;
            let {first_name, last_name, email, address, phone_no: mobile} = user;
            console.log(first_name, last_name, email, address, mobile);
            this.setState({update: true, first_name, last_name, email, address, mobile});
        }
    }

	handleSubmit = (event) => {
		event.preventDefault();
		const newUser = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			mobile: this.state.mobile,
			shopname: this.state.shopname,
			address: this.state.address,
			password1: this.state.password1,
			password2: this.state.password2,
		};

		let url = 'http://localhost:5000/seller/';

		if(this.state.update) {
			url += 'update_profile';
			newUser.seller_id = this.props.location.state.user._id;
		}
		else {
			url += 'register';
		}
		fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newUser)
        }).then(res => {
			if (res.status === 200) {
				if(this.state.update) {
					history.goBack()
				}
				else
					history.push('/Seller/Login');
			}
			else if (res.status === 401) {
				this.setState({ show1: true, error: 'invalid credentials' });
			}
			else {
				this.setState({ show1: true, error: 'password should match' });
			}

		}).catch(err => {
			console.log(err);
		});
	};
	render() {
		return (
			<div>
				<section className="container-fluid" style={StyleWhole}>
					<div style={{ height: '70px' }}>

					</div>

					<div className="row">
						<div className="col-1">
						</div>
						<div className="col-10" style={{backgroundColor:'white'}}>
							<div style={{height:'30px'}}>
							</div>
							<Button size="large" disabled>
                				<h2 style={{fontFamily:'Courier New', textAlign:'center', color:'#031dad', fontWeight:'bold', verticalAlign:'middle'}}>
                    				Welcome to Shopping Cart.
                				</h2>
                    		</Button>
						</div>
						<div className="col-1">
						</div>
					</div>

					<div className="row">
						<div className="col-1">
						</div>

						<div className="col-1" style={{backgroundColor:'white'}}>
						</div>

						<div className="col-3" style={Style}>
						</div>

						<div className="col-2" style={{backgroundColor:'white'}}>
						</div>

						<div className="col-3" style={{backgroundColor:'white'}}>
							<div style={{ height: '30px' }}>
							</div>
							<Button size="large" disabled>
                				<h2 style={{fontFamily:'Courier New', textAlign:'center', color:'#031dad', fontWeight:'bold'}}>
                    				Register.
                				</h2>
                    		</Button>
							<div style={{ height: '30px' }}>
							</div>

							
						
							<form onSubmit={this.handleSubmit}>
								<TextField
									id="first"
									label="first Name"
									value={this.state.first_name}
									variant="outlined"
									autoFocus
									fullWidth
									required
									onChange={(event) => this.setState({ first_name: event.target.value })}
								/>
								<div style={{ height: '30px' }}>
								</div>
								<TextField
									id="last"
									label="last Name"
									value={this.state.last_name}
									variant="outlined"
									required
									fullWidth
									onChange={(event) => this.setState({ last_name: event.target.value })}
								/>
								<div style={{ height: '30px' }}>
								</div>
								<TextField
									id="email"
									label="email"
									value={this.state.email}
									variant="outlined"
									fullWidth
									required
									onChange={(event) => this.setState({ email: event.target.value })}
								/>
								<div style={{ height: '30px' }}>
								</div>
								<TextField
									id="mobile"
									label="mobile number"
									value={this.state.mobile}
									variant="outlined"
									fullWidth
									required
									onChange={(event) => this.setState({ mobile: event.target.value })}
								/>
								<div style={{ height: '30px' }}>
								</div>
								<TextField
									id="shopname"
									label="Shop Name"
									variant="outlined"
									value={this.state.shopname}
									fullWidth
									required
									onChange={(event) => this.setState({ shopname: event.target.value })}
								/>
								<div style={{ height: '30px' }}>
								</div>
								<TextField
									id="address"
									label="Shop Address"
									value={this.state.address}
									variant="outlined"
									fullWidth
									required
									onChange={(event) => this.setState({ address: event.target.value })}
								/>
								<div style={{ height: '30px' }}>
								</div>
								<TextField
									id="password1"
									label="Password"
									type="password"
									variant="outlined"
									fullWidth
									required
									onChange={(event) => this.setState({ password1: event.target.value })}
								/>
								<div style={{ height: '30px' }}>
								</div>
								<TextField
									id="password2"
									label="Password"
									type="password"
									variant="outlined"
									fullWidth
									required
									onChange={(event) => this.setState({ password2: event.target.value })}
								/>
								<div style={{ height: '50px' }}>
								</div>
								<Button color="primary" size="large" variant="contained" type="submit">
									Register
                                </Button>
							</form>
							<div style={{ height: '50px' }}>
							</div>
						</div>

						<div className="col-1" style={{backgroundColor:'white'}}>
						</div>

						<div className="col-1">
						</div>
					</div>

					<div className="row">
						<div className="col-1">
						</div>
						<div className="col-10" style={{height:'70px', backgroundColor:'white'}}>
							{this.state.show1 && <div style={{fontSize:'50px', color:'red'}}> 
								<h2 style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold'}}>
									{this.state.error} 
								</h2>
							</div>}
						</div>
						<div className="col-1">
						</div>
					</div>

					<div style={{ height: '100px' }}>

					</div>
				</section>
			</div>
		);
	}
}

export default Registercompshop;