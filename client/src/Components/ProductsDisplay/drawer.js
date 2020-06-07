import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import history from '../../history'



class SideBar extends Component{

constructor(props){
    super(props);
    this.state={
        open:false
    }
}

handleDrawerOpen = () => {
    this.setState({open:true});
  };

 handleDrawerClose = () => {
    this.setState({open:false});
  };
showProfile=()=>{
    history.push('/Customer/Profile')
}
pendingOrders=()=>{
  history.push('/Customer/PendingOrders')
}
deliveredOrders=()=>{
  history.push('/Customer/DeliveredOrders')
}
render(){
  return (
    <div>
     <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          </Toolbar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={this.state.open}
        classes={{
        }}
      >
        <div>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={this.showProfile}>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={this.pendingOrders}>
              <ListItemText primary="Your orders" />
            </ListItem>
            <ListItem button onClick={this.deliveredOrders}>
              <ListItemText primary="Deliverd Orders" />
            </ListItem>
        </List>

      </Drawer>
    </div>
  );
    }
}

export default SideBar;
