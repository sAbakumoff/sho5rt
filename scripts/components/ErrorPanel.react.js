import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

const ErrorPanel = (props)=>{
  let {newItemUrl, createError, resetInterval, onSubmit, onResetError} = props;
  let handleRetryClick=(ev)=>{
    ev.preventDefault();
    onSubmit(newItemUrl);
  }
  if(createError){
    setTimeout(onResetError, resetInterval);
    return(
      <div className='error'>
        <span className='error__text'>{createError}</span>
        <a className='error__retry' href='#' onClick={handleRetryClick}>Retry</a>
      </div>
    )
  }
  else{
    return false;
  }
}

ErrorPanel.defaultProps = {
  resetInterval : 5000
}

ErrorPanel.propTypes = {
  onResetError : PropTypes.func.isRequired,
  onSubmit : PropTypes.func.isRequired
}

const mapStateToProps = (state)=>{
  return{
    createError : state.createError,
    newItemUrl : state.itemToCreate && state.itemToCreate.url
  }
}

export default connect(mapStateToProps)(ErrorPanel);
