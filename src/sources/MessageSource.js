import Actions from '../actions';
import Firebase from 'firebase';

let firebaseRef = null;

let MessageSource = {

	sendMessage: {
		remote(state) {
			return new Promise((resolve, reject) => {
				if (!firebaseRef) {
					return resolve();
				}

				firebaseRef.push({
					"message": state.message,
					"date": new Date().toUTCString(),
					"author": state.user.google.displayName,
					"userId": state.user.uid,
					"profilePic": state.user.google.profileImageURL
				});

				resolve();
			});
		},
		success: Actions.sendMessageSucceeded,
		error: Actions.sendMessageFailed
	},

	getMessages: {
		remote(state) {

			/* We use the logic below to handle the case when clicking from one channel to another;
			 | switching the ref off if it has been set in a different context somewhere else.
			 */
			if (firebaseRef) {
				firebaseRef.off();
			}

			firebaseRef = new Firebase('https://react-swan.firebaseio.com/messages/' + state.selectedChannel.key);

			return new Promise((resolve, reject) => {
				firebaseRef.once('value', (dataSnapshot) => {
					var messages = dataSnapshot.val();
					resolve(messages);

					/* Once resolved let's subscribe to the 'child_added' event listener */
					firebaseRef.on('child_added', (msg) => {
						let msgVal = msg.val(); // Don't let it confuse you. msg.val() is the returned msg object.
						msgVal.key = msg.key();
						Actions.messageReceived(msgVal);
					});
				});
			});
		},
		success: Actions.messagesReceived,
		failed: Actions.messagesFailed,
		/* A hook that interact w/ the system while the promise has been started and it is waiting for data. */
		loading: Actions.messagesLoading
	}
};

export default MessageSource;