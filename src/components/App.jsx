import React from 'react';
import MessageList from './MessageList.jsx';
import MessageBox from './MessageBox.jsx';
import ChannelList from './ChannelList.jsx';
import mui from 'material-ui';

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
		});

		this.setState({
			muiTheme: newMuiTheme
		})
	}

	render() {
		return (
			<div>
				<AppBar title="Awesome Chat App" />

				<div style={{
					display: 'flex',
					flexFlow: 'row wrap',
					maxWidth: 1200,
					width: '100%',
					margin: '30px auto 30px'
				}}>
					<ChannelList />
					<MessageList />
				</div>

				<MessageBox />
			</div>
		)
	}
}

export default App;