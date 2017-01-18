var local_history = ["abc"];
var default_count = 10;

export const RECEIVE_HISTORY = 'RECEIVE_HISTORY';
export const receiveHistory = function(history){
  return {
    type : RECEIVE_HISTORY,
    history : history
  }
}

export const loadHistory=function(count=default_count){
  return (dispatch, getState)=>{
    dispatch(receiveHistory(local_history));
  }
}

export const addLink=function(link){
  return (dispatch, getState)=>{
    local_history.unshift(link);
    dispatch(loadHistory());
  }
}
