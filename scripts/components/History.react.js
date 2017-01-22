import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import HistoryHeader from './HistoryHeader.react';
import HistoryTable from './HistoryTable.react'

const History = (props)=>{
  if(props.items && props.items.length){
    return(
      <div className='history'>
        <HistoryHeader {...props} />
        <HistoryTable {...props} />
      </div>
    )
  }
  else{
    return false;
  }
}

const mapStateToProps = (state)=>{
  return{
    newItemId : state.itemToCreate && state.itemToCreate._id,
    items : state.history
  }
}

export default connect(mapStateToProps)(History);
