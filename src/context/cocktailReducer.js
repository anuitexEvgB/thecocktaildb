import {ADD_CATEGORY, APPLY_CATEGORY, GET_CATEGORY, GET_DRINKS} from './types';

const handlers = {
  [GET_CATEGORY]: (state, {payload}) => ({...state, category: payload}),
  [GET_DRINKS]: (state, {payload}) => ({...state, drinks: payload}),
  [ADD_CATEGORY]: (state, {payload}) => ({...state, checkCategory: payload}),
  [APPLY_CATEGORY]: (state, {payload}) => ({...state, applyCategory: payload}),
  DEFAULT: state => state,
};

export const cocktailReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
