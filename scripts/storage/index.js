import localforage from 'localforage';

localforage.config({
  name : 'Shooooorten'
});

const dataId = "shorten_history";

export const getHistory = function(){
  return localforage.getItem(dataId);
}

export const setHistory = function(history){
  return localforage.setItem(dataId, history);
}
