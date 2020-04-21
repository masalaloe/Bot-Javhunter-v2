const Auth = require('../../Data/config.json')

module.exports = {
	name: 'ping',
	description: 'Ping!',
	usage: '<prefix> ping',
	auth: `${Auth.role.evr}`,
	args: false,
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Poang.');
	},
};