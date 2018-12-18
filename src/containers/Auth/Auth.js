import React ,{Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import{connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect } from 'react-router-dom';
import checkValidity from '../../shared/validation';


class Auth extends Component{

    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                    value:'',
                    validation: {
                        required: true,
                        isEmail:true
                    },
                    valid: false,
                    touched: false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                    value:'',
                    validation: {
                        required: true,
                        minLength:6
                    },
                    valid: false,
                    touched: false
            },
        }
    }
    inputChangedHandler=(event,controlName) => {
        console.log(event.target.value);
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            },
            isSignup:true
        };
        this.setState({controls:updatedControls});
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath){
            this.props.onSetRedirectPath();
        }
    }

submitHandler=(event)=>{
event.preventDefault();
this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
}

switchAuthModeHandler = () => {
    this.setState(prevState => {
        return{
            isSignup:!prevState.isSignup
        };
    })
}
    render(){
        const formArrayElements=[];
        for(let key in this.state.controls){
            formArrayElements.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form = formArrayElements.map(formElement=>(
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
        ));

        if(this.props.loading){
            form=<Spinner/>
        }
        let errorMessage=null;

        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            );
        }

let authRedirect=null;
if(this.props.token){
    authRedirect=<Redirect to ={this.props.authRedirectPath}/>;
}
        return(
        <div className={classes.Auth}>
        {authRedirect}
            <form onSubmit={this.submitHandler}>
                {errorMessage}
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">
                Switch TO {this.state.isSignup ? 'SIGNIN':'SIGNUP'}
            </Button>
        </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        token:state.auth.token,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath

    }
}
const mapDispatchToProps=dispatch=>{
return{
    onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
    onSetRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);