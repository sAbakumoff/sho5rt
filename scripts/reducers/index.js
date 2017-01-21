import reduxCrud from 'redux-crud';
const baseReducers =  reduxCrud.reducersFor('history', {key: '_id'});
const actionTypes    = reduxCrud.actionTypesFor('history');

export const history = function(state = [], action){
  switch (action.type) {
    // the built-in redux-crud reducers use the "pending update items" on create/update start, prevent that to happen!
    case actionTypes.updateStart :
    case actionTypes.createStart : return state;
    // always put the new records on the top of the displayed history
    case actionTypes.createSuccess : return [action.record, ...state];
    default: return baseReducers(state, action)
  }
}

export const newItemId = function(id=null, action){
  if(action.type === actionTypes.createSuccess){
    return action.record._id;
  }
  return id;
}
