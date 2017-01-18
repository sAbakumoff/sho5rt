
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Provider } from 'react-redux';
import Store from '../store';
import {loadHistory, shortenLink, updateHistoryStats} from '../actions';
import {ShortenLinkForm, History} from '../components';

class Root extends Component{
  render(){
    const onSubmit=(url)=>{
      this.props.dispatch(shortenLink(url));
    }
    return(
      <div>
        <ShortenLinkForm onSubmit={onSubmit} />
        <History items={this.props.history} />
      </div>
    );
  }
  componentDidMount(){
    this.props.dispatch(loadHistory());
    this.props.dispatch(updateHistoryStats());
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
