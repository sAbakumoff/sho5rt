const default_count = 10;
const STATS_UPDATE_INTERVAL = 30 * 60 * 1000; // 30 minutes
import * as storage from '../storage';
import * as services from '../services';

export const UPDATE_HISTORY = 'RECEIVE_HISTORY';

const updateHistory = (history, count=default_count)=>{
  return {
    type : UPDATE_HISTORY,
    history : history.slice(0, count)
  }
}

export const UPDATE_HISTORY_ITEM = 'UPDATE_HISTORY_ITEM';
const updateHistoryItemStats = (itemStats)=>(
  {
    type : UPDATE_HISTORY_ITEM,
    itemStats : itemStats
  }
)

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

const addItemToHistory = (item)=>{
  return (dispatch)=>{
    storage.addItemToHistory(item).then(updatedHistory=>{
      dispatch(updateHistory(updatedHistory));
    }).catch((err)=>{
      console.log("error", err);
    })
  }
}

export const shortenLink = (url)=>{
  return (dispatch)=>{
    services.shortenUrl(url).then((shortcode)=>{
      dispatch(addItemToHistory({url : url, shortcode : shortcode}));
    }).catch((err)=>{
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
