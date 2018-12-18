import React from 'react';
import Aux from '../../../containers/hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


const ordersummary = (props) =>{
    const ingredientsSummary= Object.keys(props.ingredients)
    .map(igKey => {
        return (<li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}</li>);
    });
    return(
        <Aux>
            <h3> ORDER SUMMARY</h3>
            <p>A delicious burger with following order Summary :</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to checkout</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>
                Cancel
            </Button>
            <Button btnType= 'Success' clicked={props.purchaseContinue}>
                Continue
            </Button>
        </Aux>
    );
};

export default ordersummary;