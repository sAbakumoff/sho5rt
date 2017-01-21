import React, {PropTypes} from 'react';
import copy from 'copy-to-clipboard';

const HistoryItem = ({pendingCreate, url, shortcode, displayUrlMaxLen = 50, shortcodeDomen='shooooort.com'})=>{

  const shortenUrl = 'http://gymia-shorty.herokuapp.com/' + shortcode;

  let displayUrl = url;
  if(url && url.length > displayUrlMaxLen){
      displayUrl =  url.substring(0, displayUrlMaxLen) + "...";
  }

  let linkCopy;

  const isAlive = !pendingCreate;

  const handleMouseClick = (ev)=>{
    ev.preventDefault();
    if(pendingCreate)
      return;
    copy(shortenUrl, {debug : true});
  }

  const handleMouseEnter = ()=>{
    if(linkCopy && linkCopy.style)
      linkCopy.style.visibility='visible';
  }

  const handleMouseLeave = ()=>{
    if(linkCopy && linkCopy.style)
      linkCopy.style.visibility='hidden';
  }

  return (
    <div>
      <div
        className='history-table__shortcode'
        onMouseEnter={handleMouseEnter}
        onClick={handleMouseClick}
        onMouseLeave={handleMouseLeave}>
          {!isAlive && <div className='history-table__newItem'></div>}
          {isAlive && <span className='history-table__domen'>{shortcodeDomen}/</span>}
          {isAlive && <span>{shortcode}</span>}
          {isAlive && <a
            href='#'
            style = {{visibility : 'hidden'}}
            ref={el=>{linkCopy=el}}
            className='history-table__btn-copy'>
              Click to copy this link
          </a>
          }
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
