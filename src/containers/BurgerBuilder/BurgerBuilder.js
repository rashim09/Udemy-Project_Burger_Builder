import React, {Component} from 'react';
import{connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Aux from '../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../containers/hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component{
    state = { 
    totalPrice : 5,
    // purchaseable:false,
    // purchasing:false,
    // loading:false,
    // error:false,
}

componentDidMount(){
  this.props.onInitIngredients();
}

updatePurchaseState=(ingredients)=>{
//getting updatedIngredients used as argument Ingredients in thi fumnc..     value from add & remove method
    //Now we need to sum the price so we can comapre it with base ablue
    const sum =Object.keys(ingredients)
    .map(igKey=>{
        return ingredients[igKey];// here geeting value for each key
    })
    .reduce((sum, el)=>{
        return sum+el;
    },0);
   return sum>0;
}

purchasehandler=()=>{
    if(this.props.isAuthenticated){
        this.setState({purchasing:true});
    }else{
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }
   
}

purchaseCancelHandler=()=>{
    // console.log('I am clicked');
    this.setState({purchasing:false});
}


purchaseContinueHandler=()=>{
    this.props.onInitPurchase();
    this.props.history.push('/checkout' );
}

render(){
    const disabledInfo = {
        ...this.props.ings
    }
    for(let key in disabledInfo){
        disabledInfo[key]=disabledInfo[key]<=0
    }
    let orderSummary=null;
    let burger=this.props.error ? <p>Ingredients can't be loaded </p>: <Spinner/>
    if(this.props.ings)
    {
      burger= (<Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
            ingredientsAdded={this.props.onIngredientsAdded}
            ingredientsRemoved={this.props.onIngredientsRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchasehandler}
            />
     </Aux>
      );
      orderSummary= <OrderSummary 
      ingredients={this.props.ings}
      purchaseContinue={this.purchaseContinueHandler}
      purchaseCancel={this.purchaseCancelHandler}
      price={this.props.price.toFixed(2)}
      />;
}
    //{salad:true,meat :false, ...}
    return(
        <Aux>
            <Modal 
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}
}

const mapStatetoProps=state=>{
return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuthenticated:state.auth.token!=null
};
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientsAdded:(ingName)=>dispatch(actions.addIngredients(ingName)),
        onIngredientsRemoved:(ingName)=>dispatch(actions.removeIngredients(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=> dispatch(actions.setAuthRedirectPath(path))    };


}

export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));