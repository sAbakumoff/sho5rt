import 'whatwg-fetch';

var postUrl = '/shorten';
var getUrl = '/statistics';
const getStatsUrl = shortcode => `${getUrl}/${shortcode}/stats`;

export const shortenUrl = function(url){
  return fetch(postUrl, {
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
  return fetch(getStatsUrl(shortcode)).then(response=>{
    if (response.status >= 400)
      throw new Error('request failed with status ' + response.statusText);
    return  response.json();
  }).then(jsonData =>Object.assign({shortcode : shortcode}, jsonData));
}
