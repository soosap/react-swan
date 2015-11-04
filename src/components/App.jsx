import React from 'react';
import mui from 'material-ui';
import {RouteHandler} from 'react-router';

var ThemeManager = mui.Styles.ThemeManager;
var LightRawTheme = mui.Styles.LightRawTheme;
var Colors = mui.Styles.Colors;

var {AppBar} = mui;

class App extends React.Component {
	constructor() {
		super();

		// This is the equivalent to getInitialState()
		this.state = {
			muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
		}

	}

	static childContextTypes = {
		muiTheme: React.PropTypes.object
	};

	getChildContext() {
		return {
			muiTheme: this.state.muiTheme
		};
	}

	componentWillMount() {
		let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
			primary1Color: Colors.blue400,
			primary2Color: Colors.blue700,
			primary3Color: Colors.blue100,
			accent1Color: Colors.pink400
			//accent2Color: Colors.yellow400,
			//accent3Color: Colors.yellow400,
			//textColor: Colors.grey500
		});

		this.setState({
			muiTheme: newMuiTheme
		})
	}

	render() {
		return (
			<div>
				<AppBar title="React Chat App" />
				<RouteHandler />
			</div>
		)
	}
}

export default App;