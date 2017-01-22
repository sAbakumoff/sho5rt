import reduxCrud from 'redux-crud';
import * as api from '../api';
import cuid from 'cuid';

const baseActionCreators = reduxCrud.actionCreatorsFor('history', {key : '_id'});

export const actionTypes = Object.assign({}, reduxCrud.actionTypesFor('history'), {
  deleteAll  : 'HISTORY_DELETE_ALL',
  resetCreateError : 'RESET_CREATE_ERROR'
});

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
        }, 300); //to demo the optimistic updates approach
      }, error=>{
        dispatch(baseActionCreators.createError('The error occurred while shortening the url', newItem));
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
      dispatch({type : actionTypes.deleteAll})
      api.deleteItems().then((history)=>{
      }, error=>{
        // ignore any errors, but maybe show a warning
      })
    }
  },
  resetCreateError(){
    return {type : actionTypes.resetCreateError};
  }
}

export default Object.assign({}, asyncActionCreators, baseActionCreators);
