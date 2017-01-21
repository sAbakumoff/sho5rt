import React, {PropTypes} from 'react';

const HistoryHeader = ({onDeleteHistory})=>{
  const onClearClick=(ev)=>{
    ev.preventDefault();
    onDeleteHistory();
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
  onDeleteHistory : PropTypes.func.isRequired
};

export default HistoryHeader;
