import React, { Component } from 'react';
import Layout from '../src/containers/hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import{Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Logout from '../src/containers/Auth/Logout/Logout';
import {connect } from 'react-redux';
import * as actions from '../src/store/actions/index';
import asyncComponent from './containers/hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('../src/containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('../src/containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('../src/containers/Auth/Auth');
});

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render() {
    let routes=(
      <Switch>
         <Route path="/auth" component={asyncAuth} ></Route>
         <Route path="/" exact component={BurgerBuilder}></Route>
         <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuthenticated){
    routes=(
      <Switch>
      <Route path="/checkout" component={asyncCheckout}></Route>
      <Route path="/orders" component={asyncOrders} ></Route>
      <Route path="/logout" component={Logout} ></Route>
      <Route path="/auth" component={asyncAuth} ></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/"/>
      </Switch>
    );
    }
    return (
      <div>   
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token !== null
  }
}
const mapDispatchToProps=dispatch=>{
  return{
  onTryAutoSignup:()=>dispatch(actions.checkAuthTimeout())
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (App));
