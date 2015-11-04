import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App.jsx';
import Chat from '../components/Chat.jsx';
import Login from '../components/Login.jsx';
import Router from 'react-router';
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

let routes = (
	<Route path="/" handler={App}>
		<DefaultRoute handler={Chat} />
		<Route path="/chat" handler={Chat} />
		<Route path="/chat/:channel" handler={Chat} />
		<Route path="/login" handler={Login} />
	</Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
	ReactDOM.render(<Root />, document.getElementById('container'));
});