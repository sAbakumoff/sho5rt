import React from 'react';
import hdate from 'human-date';

export const ShortenLinkForm = (props)=>{
  let urlInput = null;
  function handleSubmit(ev){
    ev.preventDefault();
    props.onSubmit(urlInput.value);
  }
  return(
    <form onSubmit={handleSubmit}>
      <input
        type='url'
        required
        placeholder='type url to shorten'
        ref={(input) => { urlInput = input; }} />
      <input
        type='submit'
        value='Shorten' />
    </form>
  )
}

export const History = ({items})=>{
  return(
    <ul>
      {items.map((item, index)=>
        <li key={item.shortcode}>
          {item.shortcode}<br/>
          {item.url}<br/>
          {item.stats && item.stats.startDate && hdate.relativeTime(item.stats.startDate)}<br/>
          {item.stats && (item.redirectCount || 0)}
        </li>)}
    </ul>
  );
}
