import React ,{Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import {connect } from 'react-redux';


class checkout extends Component{

    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
render(){
        let summary =<Redirect to="/"/>
        if(this.props.ings){
            const purchasedRedirect= this.props.purchased ? <Redirect to="/"/> : null;
            summary=(
            <div>
                {purchasedRedirect}
                  <CheckOutSummary 
                        ingredients={this.props.ings}
                        oncheckoutContinued={this.checkoutContinueHandler}
                        oncheckoutCancelled={this.checkoutCancelHandler}
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        // component={ContactData}/>
                        // to pass ingredient from this comp to Contact data we do render instead of component and can pass props 
                        component={ContactData}
                    />
            </div>
            );
        }
    return summary;
}
}

const mapStatetoProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    };
}

export default connect(mapStatetoProps)(checkout);