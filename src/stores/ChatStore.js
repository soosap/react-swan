import alt from '../alt';
import Actions from '../actions';
import {decorate, bind, datasource} from 'alt/utils/decorators';
import ChannelSource from '../sources/ChannelSource';
import MessageSource from '../sources/MessageSource';
import _ from 'lodash';

@datasource(ChannelSource, MessageSource)
@decorate(alt)
class ChatStore {
	constructor() {
		this.state = {
			user: null,
			messages: null,
			messagesLoading: true
		};
	};

	/* Whenever the channelsReceived event is emitted, the function that is bound (bind) to it will be executed. */
	/* Nice way to reduce boilerplate code */
	@bind(Actions.channelsReceived)
	onChannelsReceived(channels) {
		let selectedChannel;

		_(channels)
		.keys()
		.each((key, index) => {
				channels[key].key = key;
				if (index == 0) {
					channels[key].selected = true;
					selectedChannel = channels[key];
				}
			})
		.value();

		/* ES6 enhanced object literals; if attributes are not defined explicitly, it will use the variable name as the default */
		/* channels: channels, selectedChannel: selectedChannel */
		this.setState({
		  channels,
			selectedChannel
		});

		/* It is no good practice to fire an action as a result of another action. Either way the line below is more of a hack. */
		setTimeout(this.getInstance().getMessages, 100);
	}

	@bind(Actions.messagesReceived)
	onMessagesReceived(messages) {
		_(messages)
			.keys()
			.each((k) => {
				messages[k].key = k;
			})
			.value();

		this.setState({
		  messages,
			messagesLoading: false
		});
	}

	@bind(Actions.messageReceived)
	onMessageReceived(msg) {
		if (this.state.messages[msg.key]) {
			return;
		}

		this.state.messages[msg.key] = msg;
		this.setState({
		  messages: this.state.messages
		});
	}

	@bind(Actions.messagesLoading)
	onMessagesLoading() {
		this.setState({
		  messagesLoading: true
		});
	}

	@bind(Actions.messagesFailed)
	onMessagesFailed(response) {
		console.log(response);
		debugger;
	}

	@bind(Actions.channelOpened)
	onChannelOpened(selectedChannel) {
		/* Set all channels to be unselected so that we have a clean state */
		_(this.state.channels)
			.values()
			.each((channel) => {
				channel.selected = false
			})
			.value();

		selectedChannel.selected = true;
		
		this.setState({
		  selectedChannel,
			channels: this.state.channels
		});

		/* Hack */
		setTimeout(this.getInstance().getMessages, 100);
	}

	@bind(Actions.sendMessage)
	onSendMessage(message) {
		this.state.message = message;
		/* sendMessage() is a function defined in the MessageSource and exposed to the ChatStore via the @datasource decorator^ */
		setTimeout(this.getInstance().sendMessage, 10);
	}

	@bind(Actions.login)
	onLogin(user) {
		this.setState({
		  user: user
		});
	}

}

export default alt.createStore(ChatStore);