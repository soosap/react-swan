import React from 'react';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			messages: [
				'Hey there there are yoz',
				'ia m fine! Ok now 00000000000000'
			]
		};
	}

	render() {


		var messageNodes = this.state.messages.map((message) => {
			return (
				<div key={message}>{message}</div>
			);
		});

		debugger;

		return (
			<div>{messageNodes}</div>
		);
	}
}

export default App;