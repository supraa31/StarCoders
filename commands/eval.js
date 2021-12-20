let Discord = require('discord.js')
module.exports = {
    name: "eval",
    aliases: ["e"],
    description: "Bir kodu denersiniz.",
    category: "owneronly",
    cooldown: 0,
    async execute(message, args, client) {
            if (message.author.id !== "658665326258683932" && message.author.id !== "829778241396408360") return message.channel.send("knk bunu sadece sahibim kullanabilir")
      try {
    let codein = args.join(" ");
    let code = eval(codein)
    if (codein.length < 1) return message.channel.send('Bir kod girmelisin !')
    if (typeof code !== 'string')    
      code = require('util').inspect(code, { depth: 0 });
code = code.replace(process.env.token, "Benim tokenim yok")
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField('Sonuç', `\`\`\`js\n${code}\n\`\`\``)
    message.channel.send({embeds: [embed]})
  } catch(e) {
    let embed2 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField('Hata', " ``\`js\n"+e+"\n\`\`\`")
    message.channel.send({embeds: [embed2]});
  }
    }
}