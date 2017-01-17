const
React = require('react'),
ReactDOM = require('react-dom');

class App extends React.Component{
  render(){
    var css = {
      color : '#cecece'
    };
    return <h1 style={css}>Here I am, turn the page</h1>
  }
}

ReactDOM.render(<App />, document.getElementById("app-container"));
