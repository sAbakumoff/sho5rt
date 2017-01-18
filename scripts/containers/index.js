
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Provider } from 'react-redux';
import Store from '../store';
import {shortenLink, loadHistory} from '../actions';
import * as storage from '../storage';
import {ShortenLinkForm, History} from '../components';
const maxHistoryItems = 10;

class Root extends Component{
  render(){
    const onSubmit=(url)=>{
      this.props.dispatch(shortenLink(url));
    }
    return(
      <div>
        <ShortenLinkForm onSubmit={onSubmit} />
        <History items={this.props.history.slice(0, maxHistoryItems)} />
      </div>
    );
  }
  componentDidMount(){
    this.props.dispatch(loadHistory());
  }
}

var RootConnector = connect(state=>state)(Root);

export default (initialState)=>{
  return ()=>(
    <Provider store={Store(initialState)}>
      <RootConnector />
    </Provider>
  );
};
