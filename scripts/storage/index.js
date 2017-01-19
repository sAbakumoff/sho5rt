import localforage from 'localforage';

localforage.config({
  name : 'Shooooorten'
});

const dataId = "shorten_history";

export const getHistory = ()=>{
  return(
    localforage.getItem(dataId)
    .then(history=>history || [])
  );
}

export const deleteHistory = ()=>{
  return(
    localforage.setItem(dataId, [])
  );
}

export const addHistoryItem = (item)=>{
  return(
    localforage.getItem(dataId)
    .then((history)=>{
      history=history || [];
      history.unshift(item);
      return localforage.setItem(dataId, history);
    })
    .then(()=>item)
  );
}

export const updateHistoryItem = (item)=>{
  return(
    localforage.getItem(dataId)
    .then((history)=>{
      history=history || [];
      let updatedHistory = history.map(current=>{
        if(current.shortcode === item.shortcode)
          return item;
        else
          return current;
      });
      return localforage.setItem(dataId, updatedHistory);
    })
    .then(()=>item)
  );
}
