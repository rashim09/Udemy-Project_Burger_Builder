import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger=(props)=>{
let transformedIngredients = Object.keys(props.ingredients) //returns an array of keys i.e salad/bacon
.map(igKey => { // creating an array with length og igkey like salad 2 no matter value only arraylegth matters
    return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey+i} type={igKey} />
    }) ; 
})
//now we want to have a single array(flattetend array) where we can check length if 0 to give msg
.reduce((arr,el) => {
    return arr.concat(el) // loop all elements and add to inititial vaule ..arr will always updated root array which we will return ..take el and add to arr 
}, [] );
if(transformedIngredients.length===0){
transformedIngredients=<p>Please start adding ingredients</p>
}
// console.log(transformedIngredients); // Now will get Array of arrays so we can't rely on length of this.
return(<div className={classes.Burger}>
<BurgerIngredients type="bread-top"/>
 {transformedIngredients}
<BurgerIngredients type="bread-bottom"/>

</div>);
}

export default burger;