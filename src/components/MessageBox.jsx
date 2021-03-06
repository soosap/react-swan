import React from 'react';
import mui from 'material-ui';
import trim from 'trim';
import Actions from '../actions';

var {Card} = mui;

class MessageBox extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			message: ''
		};

		/* In the flux world we would not involve in any database interaction in the components themselves. */
		// this.firebaseRef = new Firebase('https://react-swan.firebaseio.com/messages');
	}

	onChange(evt) {
		this.setState({
		  message: evt.target.value
		});
	}

	onKeyUp(evt) {
		if (evt.keyCode === 13 && trim(evt.target.value) !== '') {
			evt.preventDefault();

			Actions.sendMessage(this.state.message);

			/* Clearing the input box after submit */
			this.setState({
			  message: ''
			});

		}
	}

	render(){
		return (
			<Card style={{
				maxWidth: 1200,
				margin: '30px auto',
				paddingTop: 20,
				paddingBottom: 20,
				paddingLeft: 20,
				paddingRight: 25
			}}>
				<textarea
					value={this.state.message}
					onChange={this.onChange.bind(this)}
					onKeyUp={this.onKeyUp.bind(this)}

					style={{
						width: '100%',
						borderColor: '#D0D0D0',
						resize: 'none',
						borderRadius: 3,
						minHeight: 50,
						color: '#555',
						fontSize: 16,
						outline: 'auto 0px'
					}}
				/>
			</Card>
		)
	}
}

export default MessageBox;
