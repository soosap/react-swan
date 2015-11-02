import React from 'react';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			messages: [
				'Hey there there are yoz',
				'ia m fine! Ok now 99999s'
			]
		};
	}

	render() {

		var messageNodes = this.state.messages.map((message) => {
			return (
				<div key={message}>{message}</div>
			);
		});

		return (
			<div style={{color: 'red'}}>{messageNodes}</div>
		);
	}
}

export default App;