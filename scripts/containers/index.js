
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Provider } from 'react-redux';
import Store from '../store';
import actions from '../actions';
import {ShortenLinkForm, History} from '../components';

class Root extends Component{
  render(){
    const onSubmit=(url)=>{
      this.props.dispatch(actions.create(url));
    }
    const onDeleteHistory=()=>{
      this.props.dispatch(actions.deleteAll());
    }
    return(
      <div>
        <ShortenLinkForm onSubmit={onSubmit} />
        <History items={this.props.history} onClearClick={onDeleteHistory} />
      </div>
    );
  }
  componentDidMount(){
    this.props.dispatch(actions.fetch());
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
