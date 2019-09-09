import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    bulding: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const modifyIngredient = (state, action, operation) => {
    /* default is add ingredient */
    let updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    /* default is add total price */
    let updatedTotalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
    if (operation === 'remove') {
        updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
        updatedTotalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    /* const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }; */
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: updatedTotalPrice,
        building: true
    };
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFail = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return modifyIngredient(state, action, 'add');
        case actionTypes.REMOVE_INGREDIENT: return modifyIngredient(state, action, 'remove');
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail(state, action);
        default: return state;
    }
};

export default reducer;
