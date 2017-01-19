import reduxCrud from 'redux-crud';
import * as api from '../api';

const baseActionCreators = reduxCrud.actionCreatorsFor('history', {key : 'shortcode'});
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
      dispatch(baseActionCreators.createStart({shortcode : new Date().getTime()}));
      api.addItem(url).then((item)=>{
        dispatch(baseActionCreators.createSuccess(item));
      }, error=>{
        dispatch(baseActionCreators.createError(error));
      });
    }
  },
  update(item){
    return (dispatch)=>{
      dispatch(baseActionCreators.updateStart({shortcode : item.shortcode}));
      api.updateItemStats(item).then(item=>{
        dispatch(baseActionCreators.updateSuccess(item));
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
