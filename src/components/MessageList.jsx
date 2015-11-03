import React from 'react';
import Message from './Message.jsx';
import mui from 'material-ui';
import Firebase from 'firebase';
import _ from 'lodash';

var {Card, List} = mui;

class MessageList extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			messages: {}
		};

		this.firebaseRef = new Firebase('https://react-swan.firebaseio.com/messages');
		/* We tell firebase that we are only interested in receiving this data once and not again if the underlying
		 * data changes. We need to call the .val() to only receive the body without meta data. The callback function
		 * is fired once the data is brought back from firebase. */
		//this.firebaseRef.once('value', (dataSnapshot) => {

		// Wasting a lot of resources below. Whenever a change occurs we parse the entire data stack...
		// this.firebaseRef.on('value', (dataSnapshot) => {
		//	var messagesVal = dataSnapshot.val();
		//	var messages = _(messagesVal)
		//		.keys()
		//		.map((messageKey) => {
		//			var cloned = _.clone(messagesVal[messageKey]);
		//			cloned.key = messageKey;
		//			return cloned;
		//		})
		//		.value();
		//
		//	this.setState({
		//	  messages: messages
		//	});
		// });

		this.firebaseRef.on('child_added', (msg) => {
			if (this.state.messages[msg.key()]) {
				return;
			}

			let msgVal = msg.val();
			msgVal.key = msg.key();
			this.state.messages[msgVal.key] = msgVal;

			this.setState({
			  messages: this.state.messages
			});

		});

		this.firebaseRef.on('child_removed', (msg) => {
			var key = msg.key();
			delete this.state.messages[key];
			this.setState({
			  messages: this.state.messages
			});
		});

	}

	render() {
		// var messageNodes = this.state.messages.map((message) => {
		var messageNodes = _.values(this.state.messages).map((message) => {
			return (
				<Message key={message.key} message={message} />
			);
		});

		return (
			<Card style={{
				flexGrow: 2,
				marginLeft: 30
			}}>
				<List>
					{messageNodes}
				</List>
			</Card>
		);
	};
}

export default MessageList;
