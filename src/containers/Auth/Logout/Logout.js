import React ,{Component} from 'react';
import {Redirect } from 'react-router-dom';
import {connect} from'react-redux'
import * as actions from '../../../store/actions/index';


 class Logout extends Component{
     componentDidMount(){
        //  console.log('I am called in Logout');
         this.props.onLogout();
     }
    render(){
        return <Redirect to= "/"/>;      
    }
}

const mapDispatchToprops = dispatch =>{
    return{
        onLogout:()=> dispatch(actions.logout())
    };
};

export default connect(null,mapDispatchToprops)(Logout);