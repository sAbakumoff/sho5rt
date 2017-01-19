import reduxCrud from 'redux-crud';
const baseReducers =  reduxCrud.reducersFor('history', {key: 'shortcode'});
const actionTypes    = reduxCrud.actionTypesFor('history');

export const history = function(state = [], action){
  switch (action.type) {
    case actionTypes.createStart : return state;
    case actionTypes.createSuccess: return [action.record, ...state.slice(0, state.length-1)]
    default: return baseReducers(state, action)
  }
}
