
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Provider } from 'react-redux';
import Store from '../store';
import actions from '../actions';
import {ShortenLinkForm, History, AppHeader} from '../components';

class Root extends Component{
  render(){
    return (
      <div>
        <AppHeader />
        <ShortenLinkForm {...this.props} />
        <History {...this.props} />
      </div>
    );
  }
  componentDidMount(){
    this.props.onLoad();
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onDeleteHistory : ()=>{
      dispatch(actions.deleteAll());
    },
    onAddItem : (url)=>{
      dispatch(actions.create(url));
    },
    onLoad : ()=>{
      dispatch(actions.fetch());
    }
  }
}

const mapStateToProps = (state)=>{
  return{
    newItemId : state.newItemId,
    items : state.history
  }
}

var RootConnector = connect(mapStateToProps, mapDispatchToProps)(Root);

export default (initialState)=>{
  return ()=>(
    <Provider store={Store(initialState)}>
      <RootConnector />
    </Provider>
  );
};
