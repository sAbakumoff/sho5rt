import {UPDATE_HISTORY, UPDATE_HISTORY_ITEM } from '../actions';

export const history = function(state = [], action){
  if(action.type === UPDATE_HISTORY){
    return action.history;
  }
  if(action.type === UPDATE_HISTORY_ITEM){
    var newHistory = [];
    let itemStats = action.itemStats;
    state.forEach(function(item){
      if(item.shortcode === itemStats.shortcode){
        newHistory.push(Object.assign({}, item, itemStats));
      }
      else{
        newHistory.push(item);
      }
    })
    return newHistory;
  }
  return state;
}
