import {RECEIVE_HISTORY} from '../actions';

export const history = function(state = [], action){
  if(action.type === RECEIVE_HISTORY)
    return action.history;
  return state;
}
