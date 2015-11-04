import Actions from '../actions';
import Firebase from 'firebase';
import _ from 'lodash';

let firebaseRef = new Firebase('https://react-swan.firebaseio.com/channels');

let ChannelSource = {
	getChannels: {
		remote(state, selectedChannelKey) {
			return new Promise((resolve, reject) => {
				firebaseRef.once('value', (dataSnapshot) => {
					var channels = dataSnapshot.val();
					selectedChannelKey = selectedChannelKey || _.keys(channels)[0];
					var selectedChannel = channels[selectedChannelKey];
					if (selectedChannel) {
						selectedChannel.selected = true;
					}
					resolve(channels);
				})
			});
		},
		success: Actions.channelsReceived,
		failed: Actions.channelsFailed
	}
};

export default ChannelSource;