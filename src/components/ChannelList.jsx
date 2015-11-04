import React from 'react';
import Channel from './Channel.jsx';
import mui from 'material-ui';
import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../stores/ChatStore';

var {Card, List, CircularProgress} = mui;

/* As soon as we decorate the component w/ @connectToStores we need to specify static functions getStores() and getPropFromStores() */
/* If we bind components to a store, it will actually set data on props. */
@connectToStores
class ChannelList extends React.Component {

	constructor(props){
		super(props);
		/* Kicking-off an async functionality the store gets from the ChannelSource */
		// ChatStore.getChannels(); --> instead now handling this via react-router inside componentDidMount()
	}

	componentDidMount() {
		this.selectedChannel = this.props.params.channel;
		ChatStore.getChannels(this.selectedChannel);
	}

	componentWillReceiveProps(nextProps) {
		if (this.selectedChannel != nextProps.params.channel) {
			this.selectedChannel = nextProps.params.channel;
			ChatStore.getChannels(this.selectedChannel);
		}
	}

	static getStores() {
		return [ChatStore];
	}

	static getPropsFromStores() {
		/* In a production environment you would more selectively choose which props you want to populate your component with. */
		return ChatStore.getState();
	}

	render() {
		/* We return a circular progress while waiting for data to be returned from Firebase */
		if (!this.props.channels) {
			return (
				<Card style={{
					flexGrow: 1
				}}>
					<CircularProgress mode="indeterminate" style={{
					 paddingTop: '20px',
					 paddingBottom: '20px',
					 margin: '0 auto',
					 display: 'block',
					 width: '60px'
					}} />
				</Card>
			);
		}


		/* We wrap the channels w/ lodash because we used to have an array, but now Firebase returns one big object with a key for each channel. */
		/* The _() function returns that object back to an array upon which we can apply the map() function. */
		var channelNodes = _(this.props.channels)
			.keys()
			.map((k) => {
				let channel = this.props.channels[k];

				return (
					<Channel key={channel.key} channel={channel} />
				)
			})
			.value();

		return (
			<Card style={{
				flexGrow: 1
			}}>
				<List>
					{channelNodes}
				</List>
			</Card>
		);
	};
}

export default ChannelList;
