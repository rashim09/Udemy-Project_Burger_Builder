import React from 'react';
import classes from './CheckOutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from  '../../UI/Button/Button';


const CheckoutSummary=(props)=>{
return(<div className={classes.CheckoutSummary}>
    <h2>We hope it taste well</h2>

    <div style={{width:'80%',margin:'auto'}}>
    <Burger ingredients={props.ingredients}/>
<Button 
    btnType="Danger"
    clicked={props.oncheckoutCancelled}
    >Cancel</Button>
<Button 
    btnType="Success"
    clicked={props.oncheckoutContinued}>
    Continue</Button>

    </div>
</div>)
}

export default CheckoutSummary;