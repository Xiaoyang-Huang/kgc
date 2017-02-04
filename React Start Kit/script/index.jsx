var React = require('react');
var ReactDOM = require('react-dom')

var Header = require('./page/Header.jsx');
var Footer = require('./page/Footer.jsx');

// var Timer = require('./component/Timer.jsx');
// var Editor = require('./component/Editor.jsx');

var Main = React.createClass({
  render: function(){
    return (
    <div>
      <Header />
      <Footer />
    </div>
    )
  }
})

console.log(React, ReactDOM);

ReactDOM.render(<Main />, document.getElementById('main'));
