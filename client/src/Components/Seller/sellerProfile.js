import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import image from '../images/avatar.png'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

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


class SellerProfile extends Component {
	constructor(props){
		super(props);
		// console.log(this.props);
		this.state = {
			user: {
			}
		}
		this.redirectUpdateProfile = this.redirectUpdateProfile.bind(this);
	}

	redirectUpdateProfile() {
		this.props.history.push({
			pathname: '/Seller/update_profile',
			state: {
				isRedirected: true,
				user: this.state.user,
				update: true
			}
		})
	}

	componentDidMount() {
		// console.log(this.props);
		fetch(`http://localhost:5000/seller/getLoggedInUserInfo`, {
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
                    pathname: '/Seller/Login',
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
		console.log(this.state)
		let {user} = this.state;
		return <div className='container-fluid' style={{height:'100vh'}}>
			<Link to='/Seller/AddNew'>
                <Button color="primary" size="large" variant="contained">
                    ADD NEW
                </Button>
            </Link>
			<span style={{margin:'40px'}}>
			</span>
			<Link to='/Seller/Products'>
                <Button color="primary" size="large" variant="contained">
                    PRODUCTS
                </Button>
            </Link>
			<span style={{margin:'40px'}}>
			</span>
			<Link to='/Seller/Orders'>
                <Button color="primary" size="large" variant="contained">
                    ORDER
                </Button>
            </Link>
			<span style={{margin:'40px'}}>
			</span>
			<Link to='/Seller/Delivered'>
                <Button color="primary" size="large" variant="contained">
                    TRANSACTION
                </Button>
            </Link>
			<hr/>
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
					<p style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold', fontSize: '70px'}}>
						{user.first_name + ' ' + user.last_name}
                	</p>
					<br />
					<br />
					<br />
					<p style={{fontFamily:'Courier New', textAlign:'center', fontWeight:'bold', fontSize: '70px'}}>
						{user.phone_no}
                	</p>
					<div style={{height: '20vh'}}>
					</div>
					<div>
						<button onClick={this.redirectUpdateProfile} className='btn btn-primary'>UPDATE PROFILE</button>		
					</div>
				</div>
				<div className="col-1">
				</div>
			</div>
			<div style={{height: '10vh'}}>
			</div>
		</div>
	}
}

export default SellerProfile;
