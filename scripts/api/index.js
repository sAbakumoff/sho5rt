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

export const addItem=(newItem)=>{
  return(
    services.shorten(newItem.url)
    .then(shortcode=>Object.assign({}, newItem, {shortcode : shortcode}))
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
