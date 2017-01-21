import React, {PropTypes} from 'react';
import actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const HistoryHeader = ({onDelete})=>{
  const onClearClick=(ev)=>{
    ev.preventDefault();
    onDelete();
  }
  return(
    <div>
      <div className='history-title'>
        Previously shortened by you
      </div>
      <a href='#' onClick={onClearClick} className='btn-history-clear'>
        Clear history
      </a>
    </div>
  )
}

HistoryHeader.propTypes = {
  onDelete : PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({onDelete : actions.deleteAll}, dispatch);
}

export default connect(null, mapDispatchToProps)(HistoryHeader);
