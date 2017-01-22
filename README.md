# How to run the app
Make sure that git, node and npm are installed against your system.
In the terminal on MacOs or cmd on Windows execute the following commands
```
git clone https://github.com/sAbakumoff/sho5rt.git
cd sho5rt
npm install
npm start
```
The starter will automatically open the app in the default web-browser.

# Implementation notes
* After app loading only 5 recently shortened urls are displayed in the history. It's configurable though.
* The history stats update happens only for those 5 recent records immediately after loading.
* If error happens during shortening an url, the message appears on the top of the page. It could be easily reproducible if you try to shorten the long urls from google search result, for example https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwjm0snModXRAhUoQZoKHVbMC44QqUMIJjAC&url=http%3A%2F%2Fwww.nbcnews.com%2Fnews%2Fworld%2Fanalysis-russia-s-mideast-actions-show-bid-superpower-status-n709546&usg=AFQjCNHYZHtH9tSRG9XFevmZyqzhu3k7wQ&sig2=qQZLla7I0nEDQ1ivuxvKYQ&bvm=bv.144224172,d.bGs It seems that http://gymia-shorty.herokuapp.com returns server error 500 on such URL's
* Roboto and Montserrat fonts have been provided along with the specification, but the app loads web from Google Fonts API. Hope that it's not a big deal.
