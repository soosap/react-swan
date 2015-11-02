import React from 'react';
import mui from 'material-ui';

var {ListItem} = mui;

class Message extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<ListItem>
				{this.props.message}
			</ListItem>
		)
	}
}

export default Message;