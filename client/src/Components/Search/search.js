import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField';
import history from '../../history'

class Search extends Component{

	constructor(props){
		super(props)
		this.state={
			inputValue:''
		}
	}
  
  
	itemFilterOnChange=(event)=>{
		this.setState({
			inputValue:event.target.value
		})
	}
  
	  handleSubmit=(event)=>{
	    event.preventDefault();
		if(this.state.inputValue.length>0)
		{
			history.push({pathname:'/Products',state:{inputValue:this.state.inputValue}});
		}
	  }
  
	render(){
  
		return <div>
				
    			<form onSubmit={this.handleSubmit}>
				<TextField
					id="search"
					label="Search"
					variant="outlined"
					value={this.state.inputValue}
					onChange={(event) => this.setState({ inputValue: event.target.value })}
				/>
   			</form>
		</div>
    
	}
  
}
export default Search
