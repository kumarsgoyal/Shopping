import React,{Component} from 'react'
import Loader from 'react-loader'
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
class Products extends Component{
    constructor(props){
        super(props);
        this.state={
            loaded:true,
            id:"",
            id_found:true,
            products:[]
        }
    }
    onDelete=(event,id)=>{
        event.preventDefault();
        let url='http://localhost:5000/admin/deleteProduct/'
        url+=id;
        console.log(url);
        fetch(url,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            },credentials:'include'
        })
        .then(window.location.reload());
    }
    componentDidMount(){
        if(this.props&&this.props.location&&this.props.location.state&&this.props.location.state.id)
        {
            let propsid=this.props.location.state.id;
            this.setState({id:propsid,loaded:false});
            let url='http://localhost:5000/admin/getAllProducts/'
            url+=propsid;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            .then(res=>res.json())
            .then(res=>{this.setState({loaded:true,products:res.response})})
            .catch(err=>{
                console.log(err);
                this.setState({loaded:true})
            });
        }
        else{
            this.setState({id_found:false})
        }
    }
    
    render(){
        if(this.state.id_found)
        {
            let sel=<div>not authorised</div>;
            if(this.state.loaded&&this.state.products)
            {
                console.log(this.state.products)
                sel = <table id="customers">
                    <tbody>
                        <tr>
                            <th>Seller Name</th>
                            <th>Contact</th>
                            <th>Rating</th>
                            <th>Unit Sold</th>
                            <th>Thumbnail</th>
                            <th> Delete </th>
                        </tr>
                        {this.state.products.map((elem,index)=>{
                            return <tr key={index}>
                                <td> {elem.name}</td>
                                <td> {elem.price} </td>
                                <td> {elem.avg_rating}  </td>
                                <td> {elem.unit_sold} </td>
                                <td> <img height="100px" src={elem.main_photo}/></td>
                                <td> <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={(event)=>this.onDelete(event,elem._id)}
                                    >
                                        Delete
                                    </Button> </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                
            }
            return <Loader loaded={this.state.loaded}>
                {sel}
            </Loader>
        }
        else{
            return<div>go to sellers page first to select seller</div>
        }
    }
}

export default Products
