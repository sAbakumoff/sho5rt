import 'whatwg-fetch';

export const shortenUrl = '/shorten';
export const getStatsUrl = '/stats';

export const shorten = function(url){
  return fetch(shortenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url
    })
  }).then(response=>{
    if (response.status >= 400)
      throw new Error('request failed with status ' + response.statusText);
    return  response.json();
  }).then(jsonData=>jsonData.shortcode);
}


export const getStats = function(shortcode){
  return fetch(`${getStatsUrl}/${shortcode}`).then(response=>{
    if (response.status >= 400)
      throw new Error('request failed with status ' + response.statusText);
    return  response.json();
  }).then(jsonData =>Object.assign({shortcode : shortcode}, jsonData));
}
