import React, {Component, PropTypes} from 'react';
import actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppHeader from './AppHeader.react';
import ShortenLinkForm from './ShortenLinkForm.react';
import History from './History.react';
import ErrorPanel from './ErrorPanel.react';

class App extends Component{
  render(){
    let actionCreators = bindActionCreators({
      onSubmit : actions.create,
      onDeleteAll :   actions.deleteAll,
      onResetError : actions.resetCreateError
    }, this.props.dispatch);
    return (
      <div>
        <ErrorPanel {...actionCreators} />
        <AppHeader />
        <ShortenLinkForm {...actionCreators} />
        <History {...actionCreators} />
      </div>
    );
  }
  componentDidMount(){
    this.props.dispatch(actions.fetch(this.props.displayHistoryLen));
  }
}

App.defaultProps = {
  displayHistoryLen : 5
}

export default connect()(App);
