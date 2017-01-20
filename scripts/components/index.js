import React, {Component} from 'react';
import hdate from 'human-date';
import copy from 'copy-to-clipboard';

export const Header = ()=>(
  <div className="header">
    <div className="header__title">Shooooort</div>
    <div className="header__subtitle">The link shortener with a long name</div>
  </div>
)

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

class LinkInfo extends Component{
  constructor(props){
    super(props);
    this.state = {active : false};
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }
  handleMouseEnter(ev){
    this.setState({active:true});
  }
  handleMouseLeave(ev){
    this.setState({active:false});
  }
  handleMouseClick(ev){
    copy(this.shortenUrl, {debug : true});
  }
  get shortenUrl(){
    return " http://gymia-shorty.herokuapp.com/" + this.props.shortcode;
  }
  get displayUrl(){
    let maxLen = 50;
    if(this.props.url && this.props.url.length > maxLen){
      return this.props.url.substring(0, maxLen) + "...";
    }
    return this.props.url;
  }
  get copyEnabled(){
    return this.state.active;
  }
  render(){
    return(
      <div>
        <div
          className='history-table__shortcode'
          onMouseEnter={this.handleMouseEnter}
          onClick={this.handleMouseClick}
          onMouseLeave={this.handleMouseLeave}>
            <span className='history-table__domen'>shooooort.com/</span>
            <span>{this.props.shortcode}</span>
            {this.copyEnabled && <a href='#' className='history-table__btn-copy'>Click to copy this link</a>}
        </div>
        <div className='history-table__url'>{this.displayUrl}</div>
      </div>
    )
  }
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
          <tr key={item._id}>
            <td className={'history-table__link-col'}>
              {item._new && <div className='history-table__highlight'></div> }
              <LinkInfo {...item} />
            </td>
            <td className='history-table__visits-col'>
              {item.stats && (item.stats.redirectCount || 0)}
            </td>
            <td className='history-table__last-seen-col'>
              {item.stats && item.stats.startDate && hdate.relativeTime(item.stats.startDate)}
            </td>
          </tr>)}
      </tbody>
    </table>
  );
}
