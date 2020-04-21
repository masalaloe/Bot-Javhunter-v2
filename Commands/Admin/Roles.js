const { role } = require('../../Data/config.json')
const { checkRole } = require('../../Helper/RolePermission.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'rolelvl',
	description: 'Reboot the bot!',
	usage: '<prefix> rb',
	auth: `${role[0].value},${role[1].value}`,
	args: true,
	cooldown: 5,
	execute(message, args) {

		var strMsg = "";

		const tempArray = [];
		const numberArray = [];
		const finalArray = [];

		//strMsg = Auth.role.lv1;



		//const as = fs.lstatSync('././Data/config.json').isDirectory();

		if (args[0].toLowerCase() == "v") {
			message.channel.send({ embed: View_(message) });
		} else if (args[0].toLowerCase() == "a") {
			//const sf = JSON.parse(fs.readFileSync('././Data/config.json', "utf8"))
			//sf.role[1].value.push('701727368162574336');
			//fs.writeFileSync('././Data/config.json', JSON.stringify(sf));
			if (args.length < 2) { message.channel.send("Noepe"); return }

			const _te = args.shift().toLowerCase();
			console.log(args);

		} else if (args[0].toLowerCase() == "u") {

		} else if (args[0].toLowerCase() == "d") {

		}

		//if (checkRole(message, this.auth) || Auth.owner.split(",").includes(message.author.id)) {
		//	console.log("execute");

		//}
	},
};

function View_(message) {
	const _roleLength = role.length;

	var _tempRole = new Array();
	var embed = null;

	for (var idx = 0; idx < _roleLength; ++idx) {
		var _temp = new Array();
		for (var idk = 0; idk < role[idx].value.length; ++idk) {
			_temp[idk] = message.guild.roles.cache.find(r => r.id === role[idx].value[idk]).name;
		}	
		_tempRole[idx] = _temp;
	}

	return {
		fields: [
			{
				name: '**Level ' + role[0].level + ' - ' + role[0].desc + '**',
				value: _tempRole[0]
			},
			{
				name: '**Level ' + role[1].level + ' - ' + role[1].desc + '**',
				value: _tempRole[1]
			},
			{
				name: '**Level ' + role[2].level + ' - ' + role[2].desc + '**',
				value: _tempRole[2]
			}
		]
	};

	//message.channel.send({embed});
	//channel.send({ embed: exampleEmbed });

	//str = "```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```"


	//const slvl1 = Auth.role.lv1;
	//var _tempLv1 = [];
	//for (var idx = 0; idx < nLvl1.length; ++idx) {
	//	_tempLv1[idx] = message.guild.roles.cache.find(r => r.id === nLvl1[idx]).name;
	//}

	//const nLvl2 = Auth.role.lv2;
	//var _tempLv2 = [];
	//for (var idx = 0; idx < nLvl2.length; ++idx) {
	//	_tempLv2[idx] = message.guild.roles.cache.find(r => r.id === nLvl2[idx]).name;
	//}

	//const nLvl3 = Auth.role.lv3;
	//var _tempLv3 = [];
	//for (var idx = 0; idx < nLvl3.length; ++idx) {
	//	_tempLv3[idx] = message.guild.roles.cache.find(r => r.id === nLvl3[idx]).name;
	//}

	//var totalArray = _tempLv1.length + _tempLv2.length + _tempLv3.length;

	//for (var idx = 0; idx < totalArray; ++idx) {
	//	finalArray[idx] = 
	//}

}
