import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component{
    state={
        showSideDrawer:false
    }

    sideDraweClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer:!prevState.showSideDrawer}
        });
    }
    
    render(){
        return(
                //higher adjacent JSX element i.e  We need to have auxillary HOC to wrap them immediate output JSX
                <Aux>
                    <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer 
                     isAuth={this.props.isAuthenticated}
                    closed={this.sideDraweClosedHandler} 
                    open={this.state.showSideDrawer}
                    />
                    Backdrop,
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </Aux>
        );
    }
}
   
const mapStatetoProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    };
}

export default connect(mapStatetoProps)(Layout);