import React,{Component} from 'react'
import Loader from 'react-loader'
import Navbar from './navbar'

class Customers extends Component{
    constructor(props){
        super(props);
        this.state={
            loaded:true,
            customers:[]
        }
    }
    componentDidMount(){
        this.setState({loaded:false});
        fetch('http://localhost:5000/admin/getAllCustomers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(res=>res.json())
        .then(res=>{this.setState({loaded:true,customers:res.response})})
        .catch(err=>{
            console.log(err);
            this.setState({loaded:true})
        });
    }
    render(){
        let sel=<div>not authorised</div>;
        if(this.state.loaded&&this.state.customers)
        {
            sel = <table id="customers">
                <tbody> 
                    <tr> 
                        <th>Customer Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                    </tr>
                    {this.state.customers.map((elem,index)=>{
                        return <tr key={index}>
                            <td>{elem.first_name} {elem.last_name} </td>
                            <td>{elem.phone_no} </td>
                            <td> {elem.email} </td>
                        </tr>
                    })}
                </tbody>
            </table>
        }

        return <Loader loaded={this.state.loaded}>
            <Navbar name="Customer Details" />
            <div className="container-fluid">
                {sel}
            </div>
        </Loader>
    }
}

export default Customers
