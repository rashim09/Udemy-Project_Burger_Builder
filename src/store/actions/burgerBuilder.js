import * as actionTypes from'./actionTypes';
import axios from '../../axios-orders';

export const addIngredients=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName:name
    };
};

export const removeIngredients=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName:name
    };
};

export const fetchIngredientsFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILS
    };
};

//sync action creator
export const setIngredients=(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients 
    }
}

//async AC using sync AC 
export const initIngredients=()=>{
    return dispatch=>{
  axios.get('https://react-my-burger-ec340.firebaseio.com/ingredients.json')
    .then(response=>{
        dispatch(setIngredients(response.data));
    }).catch(error=>{
        dispatch(fetchIngredientsFailed());
    });

    };
};