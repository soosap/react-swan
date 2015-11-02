import React from 'react';
import Message from './Message.jsx';
import mui from 'material-ui';

var {Card, List} = mui;

class MessageList extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			messages: [
				'Hey there there are yoz',
				'ia m fine! Ok now 9999988887777777766666655555555s',
				'hey now',
				'other than that'
			]
		};
	}

	render() {
		var messageNodes = this.state.messages.map((message) => {
			return (
				<Message key={message} message={message} />
			);
		});

		return (
			<Card>
				<List>
					{messageNodes}
				</List>
			</Card>
		);
	};
}

export default MessageList;
