module.exports = {
	name: 'rb',
	description: 'Reboot the bot!',
	usage: '<prefix> rb',
	args: false,
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Poang.');
	},
};