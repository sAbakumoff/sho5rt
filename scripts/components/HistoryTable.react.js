import React, {PropTypes} from 'react';
import hdate from 'human-date';
import HistoryItem from './HistoryItem.react';
import { connect } from 'react-redux';

const HistoryTable = ({items, newItemId})=>{
  return (
    <table className='history-table'>
      <thead className='history-table__header'>
        <tr>
          <th>Link</th>
          <th>Visits</th>
          <th>Last Visited</th>
        </tr>
      </thead>
      <tbody className='history-table__body'>
        {items.map((item, index)=>
          <tr key={item._id}>
            <td className={'history-table__link-col'}>
              {!item.pendingCreate && item._id === newItemId && <div className='history-table__highlight'></div> }
              <HistoryItem  {...item} />
            </td>
            <td className='history-table__visits-col'>
              {item.stats && (item.stats.redirectCount || 0)}
            </td>
            <td className='history-table__last-seen-col'>
              {item.stats && item.stats.lastSeenDate && hdate.relativeTime(item.stats.lastSeenDate)}
            </td>
          </tr>)}
      </tbody>
    </table>
  );
}

HistoryTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
     _id: PropTypes.string.isRequired,
     url : PropTypes.string.isRequired,
     shortcode: PropTypes.string,
     stats: PropTypes.shape({
       lastSeenDate : PropTypes.date,
       redirectCount : PropTypes.number
     })
   }).isRequired).isRequired
}


const mapStateToProps = (state)=>{
  return{
    newItemId : state.newItemId,
    items : state.history
  }
}

export default connect(mapStateToProps)(HistoryTable);
