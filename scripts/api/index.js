import * as storage from '../storage';
import * as services from '../services';

const sortHistory = (a,b)=>{
  try{
    return new Date(b.stats.startDate) - new Date(a.stats.startDate);
  }
  catch(err){
    return 0;
  }
}

export const getItems=(limit)=>{
  return(
    storage.getHistory()
    .then(history=>history.sort(sortHistory).slice(0,limit))
  );
}

const initItem = (url, shortcode)=>({
  url : url,
  shortcode : shortcode,
  stats : {
    startDate : new Date(),
    lastSeenDate : new Date()
  }
});

export const addItem=(url)=>{
  return(
    services.shorten(url)
    .then(shortcode=>initItem(url, shortcode))
    .then(storage.addHistoryItem)
  );
}

export const updateItemStats = (item)=>{
  return(
    services.getStats(item.shortcode)
    .then(stats=>Object.assign({}, item,{stats : stats}))
    .then(storage.updateHistoryItem)
  );
}

export const deleteItems = ()=>{
  return(
    storage.deleteHistory()
  );
}
