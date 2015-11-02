import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

//Needed for React Developer Tools
window.React = React;

require('./main.scss');

ReactDOM.render(<App />, document.getElementById('container'));