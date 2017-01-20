import reduxCrud from 'redux-crud';
const baseReducers =  reduxCrud.reducersFor('history', {key: '_id'});
const actionTypes    = reduxCrud.actionTypesFor('history');

export const history = function(state = [], action){
  switch (action.type) {
    case actionTypes.createStart : return state;
    case actionTypes.createSuccess:
      let updatedCollection = state.map(current=>{
        return current._new ? Object.assign({},current, {_new : false}) : current;
      })
      return [Object.assign({_new : true}, action.record), ...updatedCollection];
    case actionTypes.fetchSuccess : return action.records.slice();
    default: return baseReducers(state, action)
  }
}
