import React from 'react';
import HistoryHeader from './HistoryHeader.react';
import HistoryTable from './HistoryTable.react'

const History = (props)=>{
  return(
    <div className='history'>
      <HistoryHeader {...props} />
      <HistoryTable {...props} />
    </div>
  )
}

export default History;
