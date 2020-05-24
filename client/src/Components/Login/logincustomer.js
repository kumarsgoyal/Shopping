import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import history from '../../history';
const Background = require("../images/particles5.jpg");
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


class Logincomp extends Component {
	constructor(props) {
		super(props);
		// console.log(this.props);
		this.state = {
			email: '',
			password: '',
			show1: false,
			error: ''
		}
		this.clickHandler = this.clickHandler.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this);
	}

	renderRedirect = () => {
		this.props.history.push({pathname:'/Products', state:{inputValue:""}});
	}

	clickHandler = (event) => {
		event.preventDefault();
		this.setState({ show2: false, show1: false });
		const User = {
			email: this.state.email,
			password: this.state.password
		};

		fetch("http://localhost:5000/customer/login", {
			credentials: 'include',
			method: "POST",
			headers: {
				Accept: 'application/json', 'Content-Type': 'application/json'
			},
			body: JSON.stringify(User)
		}).then(res => {
			if (res.status === 200) {
				// return res.json();
				this.renderRedirect();
				
			}
			else {
				this.setState({ show1: true, error: 'Credentials are invalid' });
			}
		})
		

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
						<div className="col-10" style={{ backgroundColor: 'white' }}>
							<div style={{ height: '30px' }}>
							</div>
							<Button size="large" disabled>
								<h2 style={{ fontFamily: 'Courier New', textAlign: 'center', color: '#031dad', fontWeight: 'bold', verticalAlign: 'middle' }}>
									So Glad You're Back !
                				</h2>
							</Button>
						</div>
						<div className="col-1">
						</div>
					</div>

					<div className="row">
						<div className="col-1">
						</div>

						<div className="col-1" style={{ backgroundColor: 'white' }}>
						</div>

						<div className="col-3" style={Style}>
						</div>

						<div className="col-2" style={{ backgroundColor: 'white' }}>
						</div>

						<div className="col-3" style={{ backgroundColor: 'white' }}>
							<div style={{ height: '30px' }}>
							</div>
							<Button size="large" disabled>
								<h2 style={{ fontFamily: 'Courier New', textAlign: 'center', color: '#031dad', fontWeight: 'bold' }}>
									Login.
                				</h2>
							</Button>
							<div style={{ height: '30px' }}>
							</div>

							<form onSubmit={this.clickHandler}>
								<TextField
									id="email"
									label="email"
									variant="outlined"
									autoFocus
									fullWidth
									required
									onChange={(event) => this.setState({ email: event.target.value })}
								/>
								<div style={{ height: '30px' }}>
								</div>
								<TextField
									id="password"
									label="Password"
									type="password"
									variant="outlined"
									required
									fullWidth
									onChange={(event) => this.setState({ password: event.target.value })}
								/>
								<div style={{ height: '25px' }}>
								</div>
								<Button color="primary" size="large" variant="contained" type="submit">
									Login
                            </Button>
							</form>
							<div style={{ height: '50px' }}>
							</div>
						</div>

						<div className="col-1" style={{ backgroundColor: 'white' }}>
						</div>

						<div className="col-1">
						</div>
					</div>

					<div className="row">
						<div className="col-1">
						</div>
						<div className="col-10" style={{ height: '70px', backgroundColor: 'white' }}>
							{this.state.show1 && <div style={{ fontSize: '50px', color: 'red' }}>
								<h2 style={{ fontFamily: 'Courier New', textAlign: 'center', fontWeight: 'bold' }}>
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

export default Logincomp;
