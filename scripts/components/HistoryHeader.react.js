import React, {PropTypes} from 'react';

const HistoryHeader = ({onDeleteAll})=>{
  const onClearClick=(ev)=>{
    ev.preventDefault();
    onDeleteAll();
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
  onDeleteAll : PropTypes.func.isRequired
}

export default HistoryHeader;
