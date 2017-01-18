
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Provider } from 'react-redux';
import Store from '../store';
import {loadHistory, addLink} from '../actions';

class Root extends Component{
  onSubmit(ev){
    ev.preventDefault();
    this.props.dispatch(addLink(new Date().toString()));
  }
  renderLinks(){
    console.log('render fucking links!')
    console.log(this.props);
    return this.props.history.map((link, index)=><li key={index}>{link}</li>);
  }
  render(){
    return(
      <div>
        <a href="#" onClick={this.onSubmit.bind(this)}>Add Link</a>
        <ul>
          {this.renderLinks()}
        </ul>
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
