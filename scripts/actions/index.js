import * as storage from '../storage';
import * as services from '../services';

export const UPDATE_HISTORY = 'UPDATE_HISTORY';
const updateHistory = history=>({
  type : UPDATE_HISTORY,
  history : history
})

export const UPDATE_HISTORY_ITEM = 'UPDATE_HISTORY_ITEM';
const updateHistoryItemStats = itemStats=>({
  type : UPDATE_HISTORY_ITEM,
  itemStats : itemStats
})

export const ADD_HISTORY_ITEM = 'ADD_HISTORY_ITEM';
const addHistoryItem = item=>({
  type : ADD_HISTORY_ITEM,
  item : item
})

export const shortenLink = (url)=>{
  return (dispatch, getState)=>{
    services.shorten(url).then((shortcode)=>{
      dispatch(addHistoryItem({
        url : url,
        shortcode : shortcode,
        lastSeenDate : new Date(),
        redirectCount : 0
      }))
    }).then(()=>{
      storage.setHistory(getState().history.map(item=>({shortcode : item.shortcode, url : item.url})));
    }).catch((err)=>{
      console.log("error", err);
    })
  }
}


export const loadHistory = ()=>{
  return (dispatch)=>{
    storage.getHistory().then(function(history){
      history = history || [];
      dispatch(updateHistory(history));
    }).then(()=>dispatch(updateHistoryStats()))
    .catch(function(err){
      console.log("error", err);
    })
  }
}

export const updateHistoryStats = ()=>{
  return (dispatch, getState)=>{
    getState().history.forEach((item)=>{
      services.getStats(item.shortcode).then(itemStats=>{
        dispatch(updateHistoryItemStats(itemStats));
      });
    });
  }
}
