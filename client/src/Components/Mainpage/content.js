import React from "react";
import FontAwesome from 'react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@material-ui/core/Button';


const Background = require("../images/particles2.png");
const Background1 = require("../images/particles1.jpg");

var sectionStylequotes = {
	className: "img-fluid",
	backgroundImage: `url(${Background1})`,
	backgroundRepeat:'no-repeat',
	backgroundSize:'100% 100%'
};

var sectionStyle = {
	className: "img-fluid",
	backgroundImage: `url(${Background})`,
	backgroundRepeat:'no-repeat',
	backgroundSize:'100% 100%'
};
const Content = ()=> (
	<div>

		<section className="container-fluid" style={sectionStyle}>
			<div style={{height:'800px'}}></div>
		</section>

		<section className="container-fluid" style={sectionStylequotes}>
			<div style={{height:'250px'}}> </div>
				<div className="container-fluid">
					<h1  style={{fontFamily:'Courier New', fontSize:'50px', color: 'white'}}>
						Whoever said that <br />
						money can't buy <br />
						happiness simply <br />
						didn't know Where <br />
						to got shopping. <br />
					</h1>
				</div>
			<div style={{height:'250px'}}> </div>
		</section>

		<div style={{height:'4px'}}> 
					{/* dummy div */}
			</div>

		<section className="contact" style={{backgroundColor:"#f7a90c"}}>
			<div style={{height:'50px'}}> 
				{/* dummy div */}
			</div>

			<div className="container-fluid">
				<h2 style={{fontFamily:'Courier New', textAlign:'center', fontSize:'40px'}}>Contact the developer's.
						I <FontAwesome name="heart" size="lg"/>
						{" "} new friends!
				</h2>
			</div>

			<div style={{height:'20px'}}> 
					{/* dummy div */}
			</div>

			<div className="container-fluid">
				<p style={{textAlign:'center'}}>
					<Button size="large" disabled>
						<h2 style={{fontFamily:'Courier New', color:'#031dad', fontWeight:'bold'}}>
							Sahil.
						</h2>
					</Button>
				</p>
				<ul className="list-inline list-social" style={{textAlign:'center'}}>
					<li className="list-inline-item social-linkedin">
						<a style={{padding:'25px'}} target="blank" href="https://www.linkedin.com/in/kumarsgoyal/">
						<FontAwesome name="linkedin" className="mb-3" size="4x"/>
						</a>
					</li>
					<li className="list-inline-item social-github">
						<a style={{padding:'25px'}} target="blank" href="https://github.com/kumarsgoyal">
						<FontAwesome name="github" className="mb-3" size="4x"/>
						</a>
					</li>
				</ul>

				<p style={{textAlign:'center'}}>
					<Button size="large" disabled>
						<h2 style={{fontFamily:'Courier New', color:'#031dad', fontWeight:'bold'}}>
						Rishabhveer.
						</h2>
					</Button>
				</p>
				<ul className="list-inline list-social" style={{textAlign:'center'}}>
					<li className="list-inline-item social-linkedin">
						<a style={{padding:'25px'}} target="blank" href="https://www.linkedin.com/in/rishabhveer-singh-993bb917a/">
						<FontAwesome name="linkedin" className="mb-3" size="4x"/>
						</a>
					</li>
					<li className="list-inline-item social-github">
						<a style={{padding:'25px'}} target="blank" href="https://github.com/rishabhkailey">
						<FontAwesome name="github" className="mb-3" size="4x"/>
						</a>
					</li>
				</ul>	

				<p style={{textAlign:'center'}}>
					<Button size="large" disabled>
						<h2 style={{fontFamily:'Courier New', color:'#031dad', fontWeight:'bold'}}>
						Puneet.
						</h2>
					</Button>
				</p>
				<ul className="list-inline list-social" style={{textAlign:'center'}}>
					<li className="list-inline-item social-linkedin">
						<a style={{padding:'25px'}} target="blank" href="https://www.linkedin.com/in/puneet-mittal-01a593199/">
						<FontAwesome name="linkedin" className="mb-3" size="4x"/>
						</a>
					</li>
					<li className="list-inline-item social-github">
						<a style={{padding:'25px'}} target="blank" href="https://github.com/PM74367">
						<FontAwesome name="github" className="mb-3" size="4x"/>
						</a>
					</li>
				</ul>	
			</div> 

			<div style={{height:'20px'}}> 
					{/* dummy div */}
			</div>
		</section>

	</div>

);
 export default Content; 