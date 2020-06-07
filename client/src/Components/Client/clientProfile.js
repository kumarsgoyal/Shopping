import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import image from '../images/avatar.png';
import HomeNavbar from './../ProductsDisplay/navbar.js';

let styles = {
	flexColumn: {
		display: 'flex',
		flexDirection: 'column'
	},
	flexRow: {
		display: 'flex',
		flexDirection: 'row'
	},
	image: {
		height: '100%',
		width: '100%',
		borderRadius: '50%',
		border: '2px solid black'
	},
	imageContainer: {
		position: 'relative',
		paddingTop: '100%'
	},
	profile: {
		backgroundColor: '#050f1a'
	}
};


class ClientProfile extends Component {
	constructor(props){
		super(props);
		// console.log(this.props);
		this.state = {
			user: {
				name: ''
			}
		}
	}

	redirectUpdateProfile=()=> {
		this.props.history.push({
			pathname: '/Customer/update_profile',
			state: {
				isRedirected: true,
				user: this.state.user,
				update: true
			}
		})
	}

	componentDidMount() {
		// console.log(this.props);
		fetch(`http://localhost:5000/customer/getLoggedInUserInfo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
	    })
	    .then((res) => {
	    	if(res.status === 200) {
	    		return res.json();
	    	}
	    	if(res.status === 401) {
	    		this.props.history.push({
                    pathname: '/Customer/Login',
                    state: {
                        isRedirected: true
                    }
                })
	    	}
	    })
	    .then((res) => {
	    	if(res)
	    		this.setState({user: res.user});
	    })

	}
	render() {
		// console.log(this.state)
		let {user} = this.state;
		console.log(user);
		return <div className='container-fluid' style={{height:'100vh'}}>
			<HomeNavbar />
			<div >
				<div style={{height: '20vh'}}>

				</div>
				<div className='row' style={{height: '70vh'}}>
					<div className="col-1">

					</div>
					<div className="col-3" style={{height:'50vh'}}>	
						<img style={styles.image} src={image} />
					</div>
					<div className="col-1">

					</div>
					<div className="col-6" style={{height:'80vh'}}>
						<span style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold', fontSize: '50px'}}>
							{user.first_name + ' ' + user.last_name}
                		</span>
						<br />
						<span style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold', fontSize: '50px'}}>
							{user.phone_no}
                		</span>
						<br />
						<span style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold', fontSize: '50px'}}>
							{user.email}
                		</span>
						<br />
						<span style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold', fontSize: '50px'}}>
							{user.address}
                		</span>
						<div style={{height: '20vh'}}>

						</div>
					</div>
					<div className="col-1">

					</div>

				</div>

				<div style={{height: '10vh'}}>

				</div>



			</div>

		</div>
	}
}

export default ClientProfile;