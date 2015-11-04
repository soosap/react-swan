import React from 'react';
import Message from './Message.jsx';
import mui from 'material-ui';
import Firebase from 'firebase';
import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../stores/ChatStore'

var {Card, List, CircularProgress} = mui;

@connectToStores
class MessageList extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			messages: {}
		};
	}

	static getStores() {
		return [ChatStore];
	}

	static getPropsFromStores() {
		/* In a production environment you would more selectively choose which props you want to populate your component with. */
		return ChatStore.getState();
	}

	render() {
		var messageNodes = null;

		if (!this.props.messagesLoading) {
			messageNodes = _.values(this.props.messages).map((message) => {
				return (
					<Message key={message.key} message={message} />
				);
			});
		} else {
			messageNodes = <CircularProgress mode="indeterminate" style={{
				paddingTop: 20,
				paddingBottom: 20,
				margin: '0 auto',
				display: 'block',
				width: '60px'
			}} />
		}

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


///* We took this out of the constructor as we now have this handled by the MessageStore
// * this.firebaseRef = new Firebase('https://react-swan.firebaseio.com/messages');
// * We tell firebase that we are only interested in receiving this data once and not again if the underlying
// * data changes. We need to call the .val() to only receive the body without meta data. The callback function
// * is fired once the data is brought back from firebase.
////this.firebaseRef.once('value', (dataSnapshot) => {
//
//// Wasting a lot of resources below. Whenever a change occurs we parse the entire data stack...
//// this.firebaseRef.on('value', (dataSnapshot) => {
////	var messagesVal = dataSnapshot.val();
////	var messages = _(messagesVal)
////		.keys()
////		.map((messageKey) => {
////			var cloned = _.clone(messagesVal[messageKey]);
////			cloned.key = messageKey;
////			return cloned;
////		})
////		.value();
////
////	this.setState({
////	  messages: messages
////	});
//// });
////
////this.firebaseRef.on('child_added', (msg) => {
////	if (this.state.messages[msg.key()]) {
////		return;
////	}
////
////	let msgVal = msg.val();
////	msgVal.key = msg.key();
////	this.state.messages[msgVal.key] = msgVal;
////
////	this.setState({
////	  messages: this.state.messages
////	});
////
////});
////
////this.firebaseRef.on('child_removed', (msg) => {
////	var key = msg.key();
////	delete this.state.messages[key];
////	this.setState({
////	  messages: this.state.messages
////	});
////});