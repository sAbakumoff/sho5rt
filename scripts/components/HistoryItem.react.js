import React, {PropTypes} from 'react';
import copy from 'copy-to-clipboard';

const HistoryItem = ({url, shortcode, displayUrlMaxLen = 50, shortcodeDomen='shooooort.com'})=>{

  const shortenUrl = 'http://gymia-shorty.herokuapp.com/' + shortcode;

  let displayUrl = url;
  if(url && url.length > displayUrlMaxLen){
      displayUrl =  url.substring(0, displayUrlMaxLen) + "...";
  }

  const handleMouseClick = (ev)=>{
    ev.preventDefault();
    copy(shortenUrl, {debug : true});
  }

  let linkCopy;

  return (
    <div>
      <div
        className='history-table__shortcode'
        onMouseEnter={()=>{linkCopy.style.visibility='visible'}}
        onClick={handleMouseClick}
        onMouseLeave={()=>{linkCopy.style.visibility='hidden'}}>
          <span className='history-table__domen'>{shortcodeDomen}/</span>
          <span>{shortcode}</span>
          <a
            href='#'
            style = {{visibility : 'hidden'}}
            ref={el=>{linkCopy=el}}
            className='history-table__btn-copy'>
              Click to copy this link
          </a>
      </div>
      <div className='history-table__url'>{displayUrl}</div>
    </div>
  )
}

HistoryItem.propTypes = {
  url : PropTypes.string.isRequired,
  shortcode : PropTypes.string
};

export default HistoryItem;
