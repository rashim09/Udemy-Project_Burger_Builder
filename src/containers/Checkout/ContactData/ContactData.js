import React ,{Component} from'react';
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import {connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import checkValidity from '../../../shared/validation';

class ContactData extends Component{
    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your name'
                    },
                        value:'',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Street'
                    },
                        value:'',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                },
                zipcode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Zipcode'
                    },
                        value:'',
                        validation: {
                            required: true,
                            minLength: 5,
                            maxLength: 5,
                            isNumeric: true
                        },
                        valid: false,
                        touched: false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Country'
                    },
                        value:'',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your Email'
                    },
                        value:'',
                        validation: {
                            required: true,
                            isEmail: true
                        },
                        valid: false,
                        touched: false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            { value:'fastest', displayValue:'Fastest'},
                            { value:'Cheapest', displayValue:'Cheapest'}
                        ]
                    },
                        value:'Fastest',
                        validation: {},
                        valid: true
                }
        },
        formIsValid: false,
     
    }
    
    inputChangedHandler=(event,inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }



    orderHandler=(event)=>{
        // we are inside form i.e we have to prvent dafult behaviour...not to reload form
        event.preventDefault();
        console.log(this.props.ings);
            this.setState({loading:true});
            // we have to pass total price along with query param..
        //extract data wee need to submit .. we ahve all data in state by twoway binding..
        //get data from Orderform for name and value
        const formData={};
        for(let formElementIdentifier in this.state.orderForm ){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }

            const order={
                ingredients:this.props.ings,
                price:this.props.price,
                orderData:formData,
                userId:this.props.userId
            }
            this.props.onOrderBurger(order,this.props.token);
        }
 
    render(){
        // to have the value of orderform array we are creating new array to loop in and get the key as name/street/country and value as elemtType/ config{} and ...
        const formArrayElements=[];
        for(let key in this.state.orderForm){
            formArrayElements.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(                
            <form onSubmit={this.orderHandler}>
                {formArrayElements.map(formElement=>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
                ))}
                
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form=<Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4> Enter your Contact details</h4>
                {form}
            </div>
        );

    }
}
const mapStatetoProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    };

}
export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));