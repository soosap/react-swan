import React from 'react';

class App extends React.Component {
	constructor() {
		super();
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
				<div key={message}>{message}</div>
			);
		});

		return (
			<div style={{color: 'purple'}}>{messageNodes}</div>
		);
	}
}

export default App;