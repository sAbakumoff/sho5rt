import React, {Component, PropTypes} from 'react';
import actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppHeader from './AppHeader.react';
import ShortenLinkForm from './ShortenLinkForm.react';
import History from './History.react';

class App extends Component{
  render(){
    return (
      <div>
        <AppHeader />
        <ShortenLinkForm />
        <History />
      </div>
    );
  }
  componentDidMount(){
    this.props.onLoad();
  }
}

App.propTypes = {
  onLoad : PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return  bindActionCreators({ onLoad : actions.fetch }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
