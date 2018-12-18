import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false // this state is set/used when user is not signup and has build a burger to keep its ingredients save we have use this property
}

const INGREDIENTS_PRICE={
    salad:0.6,
    meat:1.3,
    bacon:0.4,
    cheese:0.5,
}

const reducer = (state = initialState, action) => {
switch (action.type){
    case actionTypes.ADD_INGREDIENTS:
    const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]+1};
    const updatedIngredients=updateObject(state.ingredients,updatedIngredient);
    const updatedState={
        ingredients:updatedIngredients,
        totalPrice:state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
        building:true
    }
        return updateObject(state,updatedState);


        // { to make it more leaner..
        //     ...state,// its just copy the doesn't deep clown object we fix this by below re-distributing
        //     // ingredients:{
        //     //     ...state.ingredients,// should be new js object 
        //     //     [action.ingredientName]:state.ingredients[action.ingredientName]+1
        //     // },
        //     ingredients:updatedIngredients,// now utility function is used to amkedreducer leaner
        //     totalPrice:state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
    
        // };

        
    case actionTypes.REMOVE_INGREDIENTS:
        console.log(state);
        if(state.totalPrice<4){
            state.purchaseable=false;
        }
        return{
            ...state,// its just copy the doesn't deep clown object we fix this by below re-distributing
            ingredients:{
                ...state.ingredients,// should be new js object 
                [action.ingredientName]:state.ingredients[action.ingredientName]-1
            },
            totalPrice:state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
            building:true      
        };
    case actionTypes.SET_INGREDIENTS:
        return{
            ...state,
            // ingredients:action.ingredients :-  if you want to get data in format as store in backend or you can map format from UI 
            ingredients:{
            salad: action.ingredients.salad,
            bacon:action.ingredients.bacon,
            cheese:action.ingredients.cheese,
            meat:action.ingredients.meat
        },
            error:false,
            totalPrice:4,
            building:false
        }
    case actionTypes.FETCH_INGREDIENTS_FAILS:
        return{
            ...state,
            error:true
        }
    default:
        return state;
    }
}

export default reducer;