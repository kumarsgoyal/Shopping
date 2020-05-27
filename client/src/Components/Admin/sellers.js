import React,{Component} from 'react'
import Loader from 'react-loader'
import history from '../../history'
import Navbar from './navbarheading'
import './style.css'

class Sellers extends Component{
    constructor(props){
        super(props);
        this.state={
            loaded:true,
            sellers:[]
        }
    }
    componentDidMount(){
        this.setState({loaded:false});
        fetch('http://localhost:5000/admin/getAllSellers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(res=>res.json())
        .then(res=>{this.setState({loaded:true,sellers:res.response})})
        .catch(err=>{
            console.log(err);
            this.setState({loaded:true})
        });
    }
    clickHandler=(event,id)=>{
        history.push({pathname:'/Admin/Products',state:{id:id}})
    }
    render(){
        let sel=<div>not authorised</div>;
        if(this.state.loaded&&this.state.sellers)
            {
                sel = <table id="customers">
                <tbody>
                    <tr>
                        <th>Seller Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                    </tr>
                    {this.state.sellers.map((elem,index)=>{
                        return <tr key={index}>
                            <td><button onClick={(event)=>{this.clickHandler(event,elem._id)}} style={{backgroundColor:"transparent",border:"none",outline:"none"}}>{elem.first_name} {elem.last_name}</button></td>
                            <td><button onClick={(event)=>{this.clickHandler(event,elem._id)}} style={{backgroundColor:"transparent",border:"none",outline:"none"}}> {elem.phone_no}</button></td>
                            <td><button onClick={(event)=>{this.clickHandler(event,elem._id)}} style={{backgroundColor:"transparent",border:"none",outline:"none"}}> {elem.email}</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        }
        return <Loader loaded={this.state.loaded}>
            <Navbar name="Seller Details"/>
            <div className="container-fluid">
                {sel}
            </div>
        </Loader>
    }
}

export default Sellers
