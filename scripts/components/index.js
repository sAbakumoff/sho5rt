import React, {Component} from 'react';
import hdate from 'human-date';

export class ShortenLinkForm extends Component{
  constructor(props){
    super(props);
    this.state = {value : ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(ev){
    ev.preventDefault();
    this.props.onSubmit(this.state.value);
  }
  handleChange(ev){
    this.setState({value: ev.target.value});
  }
  render(){
    let submitBtnProps ={
      type : 'submit'
    };
    if(!this.state.value){
      submitBtnProps.disabled = true;
    }
    return(
      <form className='form' onSubmit={this.handleSubmit}>
        <div className='form__group'>
          <input
            className='form__input'
            type='url'
            required
            placeholder='Paste the link you want to shorten here'
            value={this.state.value}
            onChange={this.handleChange} />
        </div>
        <div className='form__group'>
          <button className='form__submit' {...submitBtnProps}>
            Shorten this link
          </button>
        </div>
      </form>
    )
  }
}

export const History = (props)=>{
  return(
    <div className='history'>
      <HistoryHeader {...props} />
      <HistoryItems {...props} />
    </div>
  )
}

const HistoryHeader = ({onClearClick})=>{
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

const HistoryItems = ({items})=>{
  return(
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
          <tr key={item.shortcode}>
            <td className='history-table__link-col'>
              <div className='history-table__shortcode'>{item.shortcode}</div>
              <div className='history-table__url'>{item.url}</div>
            </td>
            <td className='history-table__last-seen-col'>
              {item.stats && item.stats.startDate && hdate.relativeTime(item.stats.startDate)}
            </td>
            <td className='history-table__visits-col'>
              {item.stats && (item.redirectCount || 0)}
            </td>
          </tr>)}
      </tbody>
    </table>
  );
}
