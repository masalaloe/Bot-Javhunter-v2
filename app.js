require('dotenv').config();
const { prefix, owner } = require('./Data/config.json');
const { checkRole } = require('./Helper/RolePermission.js');

const fs = require('fs');

const Discord = require('discord.js');

const bot = new Discord.Client({
    disableMentions: "all"
});

bot.commands = new Discord.Collection(); // Collection for all commands

const modules = ['Admin', 'Members'];

modules.forEach(c => {
    fs.readdir(`./Commands/${c}/`, (err, files) => {
        console.log(`\t[${c}] - ${files.length} File.`)
        files.forEach(f => {
            try {
                const props = require(`./Commands/${c}/${f}`);
                bot.commands.set(props.name, props);
                console.log(`\t  [${f}] Loaded!`);
            } catch (e) {
                console.log(`\t  [${f}] Failed to Load : ${err} + ${e.stack}`);
            }
        });
    });
});

bot.once("ready", () => {
    console.log("Iam Online!");

    bot.user.setPresence({
        status: "dnd",
        afk: false,
        activity: {
            name: "Work In Proggress.",
            type: "PLAYING",
            url: "https://github.com/masalaloe"
        }
    })

})

bot.on('message', message => {
    //console.log(`USER ID : ${message.author.id}`);
    //var arrayRoles = message.member.roles.cache.array();

    //const f = role[0].desc;

    const args = message.content.slice(prefix.length).split(/ +/); // [arg, arg, arg]
    const commandName = args.shift().toLowerCase(); 

    if (!bot.commands.has(commandName)) return;

    if (!message.content.startsWith(prefix)/* || message.author.bot*/) return; // Jika tidak menggunakan prefix, dan menghindari bot sebagai pengirim

    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    var c = message.author.username;

    //const g = command.auth.split(",");

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${c}!`;

	    if (command.usage) {
		    reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
	    }

	    return message.channel.send(reply);
	}


    try {
        if (checkRole(message, command.auth) || owner.includes(message.author.id) || command.auth == "") {
            command.execute(message, args);
        } else {
            message.reply('You dont have spesific role.');  
        }
        
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

bot.login(process.env.TOKEN);

//const fs = require('fs');
//const Discord = require('discord.js');
//const { prefix } = require('./config.json');

//const client = new Discord.Client();
//client.commands = new Discord.Collection(); // Collection for all commands
//client.aliases = new Discord.Collection(); // Collection for all aliases of every command

//const modules = ['Admin', 'Members'];

//const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js'));

//for (const file of commandFiles) {
//	const command = require(`./commands/${file}`);
//	client.commands.set(command.name, command);
//}

//const cooldowns = new Discord.Collection();

//client.once('ready', () => {
//	console.log('Ready!');
//});

//client.on('message', message => {
//	if (!message.content.startsWith(prefix) || message.author.bot) return;

//	const args = message.content.slice(prefix.length).split(/ +/);
//	const commandName = args.shift().toLowerCase();

//	const command = client.commands.get(commandName)
//		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

//	if (!command) return;

//	if (command.guildOnly && message.channel.type !== 'text') {
//		return message.reply('I can\'t execute that command inside DMs!');
//	}

//	if (command.args && !args.length) {
//		let reply = `You didn't provide any arguments, ${message.author}!`;

//		if (command.usage) {
//			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
//		}

//		return message.channel.send(reply);
//	}

//	if (!cooldowns.has(command.name)) {
//		cooldowns.set(command.name, new Discord.Collection());
//	}

//	const now = Date.now();
//	const timestamps = cooldowns.get(command.name);
//	const cooldownAmount = (command.cooldown || 3) * 1000;

//	if (timestamps.has(message.author.id)) {
//		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

//		if (now < expirationTime) {
//			const timeLeft = (expirationTime - now) / 1000;
//			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
//		}
//	}

//	timestamps.set(message.author.id, now);
//	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

//	try {
//		command.execute(message, args);
//	} catch (error) {
//		console.error(error);
//		message.reply('there was an error trying to execute that command!');
//	}
//});

//client.login(token);