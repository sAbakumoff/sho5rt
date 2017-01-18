import localforage from 'localforage';

localforage.config({
  name : 'Shooooorten'
});

const dataId = "shorten_history";

export const getHistory = function(){
  return localforage.getItem(dataId);
}

export const addItemToHistory = function(item){
  return getHistory().then(function(history){
    history = history || [];
    history.unshift(item);
    return localforage.setItem(dataId, history);
  });
}
