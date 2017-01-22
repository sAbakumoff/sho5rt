import React, {PropTypes} from 'react';

const ShortenLinkForm=({onSubmit})=>{
  var urlInput, submitBtn;

  const handleSubmit = (ev)=>{
    ev.preventDefault();
    onSubmit(urlInput.value);
    urlInput.value = '';
    submitBtn.setAttribute('disabled', null);
  }

  const handleChange = (ev)=>{
    if(urlInput.value && urlInput.value.length)
      submitBtn.removeAttribute('disabled');
    else
      submitBtn.setAttribute('disabled', null);
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form__group'>
        <input
          ref={el=>{urlInput=el}}
          className='form__input'
          type='url' required
          placeholder='Paste the link you want to shorten here'
          onChange={handleChange} />
      </div>
      <div className='form__group'>
        <button
          className='form__submit'
          ref={el=>{submitBtn=el}}
          disabled>
            Shorten this link
        </button>
      </div>
    </form>
  )
}

ShortenLinkForm.propTypes = {
  onSubmit : PropTypes.func.isRequired
};

export default ShortenLinkForm;
