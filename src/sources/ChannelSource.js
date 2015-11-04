import Actions from '../actions';
import Firebase from 'firebase';

let firebaseRef = new Firebase('https://react-swan.firebaseio.com/channels');

let ChannelSource = {
	getChannels: {
		remote(state) {
			return new Promise((resolve, reject) => {
				firebaseRef.once('value', (dataSnapshot) => {
					var channels = dataSnapshot.val();
					resolve(channels);
				})
			});
		},
		success: Actions.channelsReceived,
		failed: Actions.channelsFailed
	}
};

export default ChannelSource;