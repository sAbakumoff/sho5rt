import React from 'react';
import HistoryHeader from './HistoryHeader.react';
import HistoryTable from './HistoryTable.react'

const History = ()=>{
  return(
    <div className='history'>
      <HistoryHeader />
      <HistoryTable />
    </div>
  )
}

export default History;
