const { role } = require('../../Data/config.json')

module.exports = {
	name: 'aa',
	description: 'Ping!',
	auth: '',
	cooldown: 5,
	args: false,
	execute(message) {
		message.channel.send('rodle.');
	},
};