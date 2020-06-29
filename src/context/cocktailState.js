import React, {useReducer} from 'react';
import {CocktailContext} from './cocktailContext';
import {cocktailReducer} from './cocktailReducer';
import axios from 'axios';
import {ADD_CATEGORY, APPLY_CATEGORY, GET_CATEGORY, GET_DRINKS} from './types';

export const CocktailState = ({children}) => {
  const initialState = {
    category: [],
    applyCategory: [],
    checkCategory: [],
    drinks: [],
  };
  const [state, dispatch] = useReducer(cocktailReducer, initialState);

  const getCategory = async () => {
    await axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then(res => {
        dispatch({
          type: GET_CATEGORY,
          payload: res.data.drinks,
        });
      });
  };

  const getDrinks = list => {
    let data = [];
    list.map(async name => {
      await axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`)
        .then(res => {
          let categ = {
            name,
            drinks: res.data.drinks,
          };
          data.push(categ);
          dispatch({
            type: GET_DRINKS,
            payload: data,
          });
        });
    });
  };

  const addCategory = str => {
    checkCategory.push(str);
    dispatch({
      type: ADD_CATEGORY,
      payload: checkCategory,
    });
  };

  const appCategory = str => {
    dispatch({
      type: APPLY_CATEGORY,
      payload: str,
    });
  };

  const removeCategory = str => {
    const index = checkCategory.findIndex(n => n === str);
    if (index !== -1) {
      checkCategory.splice(index, 1);
    }
  };

  const {category, checkCategory, applyCategory, drinks} = state;

  return (
    <CocktailContext.Provider
      value={{
        category,
        checkCategory,
        applyCategory,
        drinks,
        getCategory,
        addCategory,
        removeCategory,
        appCategory,
        getDrinks,
      }}>
      {children}
    </CocktailContext.Provider>
  );
};
