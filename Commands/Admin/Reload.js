const fs = require('fs');
const modules = ['Admin', 'Members'];
const { role } = require('../../Data/config.json')

module.exports = {
	name: 'rl',
	description: 'Reload a command inside class',
	usage: '<prefix> rl <command_name>',
	auth: `${role[1].value},${role[0].value}`,
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.reply(`There is no command with name or alias \`${commandName}\`!`);
		}

		try {
			modules.forEach(c => {
				fs.readdir(`./Commands/${c}/`, (err, files) => {
					if (err) throw err;
					files.forEach(f => {
						const props = require(`../../Commands/${c}/${f}`);
						if (props.name == commandName) {
							delete require.cache[require.resolve(`../../Commands/${c}/${f}`)];
							const newCommand = require(`../../Commands/${c}/${f}`);
							message.client.commands.set(newCommand.name, newCommand);
						}
					});
				});
			});
		} catch (err) {
			console.log(err);
			return message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${err.message}\``);
		}
		message.channel.send(`Command \`${command.name}\` was reloaded!`);
	},
};