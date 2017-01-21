import reduxCrud from 'redux-crud';
const baseReducers =  reduxCrud.reducersFor('history', {key: '_id'});
const actionTypes    = reduxCrud.actionTypesFor('history');

const promoteNewItems = (items)=>{
  var newItems = items.filter(item=>item.pendingCreate);
  var restItems = items.filter(item=>!item.pendingCreate);
  return newItems.concat(restItems);
}

export const history = function(state = [], action){
  switch (action.type) {
    case actionTypes.createStart :
      return promoteNewItems(baseReducers(state, action));
    default: return baseReducers(state, action)
  }
}

export const newItemId = function(id=null, action){
  if(action.type === actionTypes.createStart){
    return action.record._id;
  }
  return id;
}
