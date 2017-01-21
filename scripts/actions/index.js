import reduxCrud from 'redux-crud';
import * as api from '../api';
import cuid from 'cuid';

const baseActionCreators = reduxCrud.actionCreatorsFor('history', {key : '_id'});

const initializeNew = (url)=>{
  return {
    _id : cuid(),
    url : url,
    shortcode : '',
    stats : {
      startDate : new Date(),
      lastSeenDate : new Date(),
      redirectCount : 0
    }
  }
}


const asyncActionCreators = {
  fetch(limit=5){
    return (dispatch)=>{
      dispatch(baseActionCreators.fetchStart());
      api.getItems(limit).then(historyItems=>{
        dispatch(baseActionCreators.fetchSuccess(historyItems));
        historyItems.forEach(item=>{
          dispatch(asyncActionCreators.update(item));
        });
      }, error=>{
        dispatch(baseActionCreators.fetchError(error));
      });
    }
  },
  create(url){
    return (dispatch)=>{
      let newItem = initializeNew(url);
      dispatch(baseActionCreators.createStart(newItem));
      api.addItem(newItem).then((item)=>{
        setTimeout(()=>{
        dispatch(baseActionCreators.createSuccess(item, item._id));
        }, 2000);
      }, error=>{
        dispatch(baseActionCreators.createError(error, newItem));
      });
    }
  },
  update(item){
    return (dispatch)=>{
      dispatch(baseActionCreators.updateStart(item));
      api.updateItemStats(item).then(item=>{
        dispatch(baseActionCreators.updateSuccess(item))
      }, error=>{
        dispatch(baseActionCreators.updateError(error));
      })
    }
  },
  deleteAll(){
    return (dispatch)=>{
      api.deleteItems().then((history)=>{
        dispatch(baseActionCreators.fetchSuccess(history));
      }, error=>{
        dispatch(baseActionCreators.deleteError(error));
      })
    }
  }
}

export default Object.assign({}, asyncActionCreators, baseActionCreators);
