import reduxCrud from 'redux-crud';
import {actionTypes} from '../actions';
const baseReducers =  reduxCrud.reducersFor('history', {key: '_id'});

const promoteNewItems = (items)=>{
  var newItems = items.filter(item=>item.pendingCreate);
  var restItems = items.filter(item=>!item.pendingCreate);
  return newItems.concat(restItems);
}

export const history = (state = [], action)=>{
  switch (action.type) {
    case actionTypes.createStart :
      return promoteNewItems(baseReducers(state, action));
    case actionTypes.deleteAll:
      return [];
    default: return baseReducers(state, action)
  }
}

export const itemToCreate = (item=null, action)=>{
  if(action.type === actionTypes.createStart){
    return action.record;
  }
  return item;
}

export const createError = (error = null, action)=>{
  switch(action.type){
    case actionTypes.createStart:
    case actionTypes.resetCreateError:
      return null;
    case actionTypes.createError:
      return action.error;
  }
  return error;
}
