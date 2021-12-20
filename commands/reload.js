const Discord = require("discord.js")
const { MessageEmbed } = Discord
module.exports = {
    name: "reload",
    aliases: ["r"],
    description: "Botun komutlarında değişiklik yapılınca kodu yeniler.",
    category: "owneronly",
    cooldown: 1,
    execute(message, args, client) {
        

        if(!args.length) return message.channel.send("Lütfen bir komut belirtin.")

        const commandName = args[0]
        const command = client.commands.get(commandName) || 
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        if(!command) return message.reply(`${commandName} diye bir komut yok.`)
        
        delete require.cache[require.resolve(`./${command.name}.js`)]
        try{
            const e1 = new MessageEmbed()
            .setTitle("Reload işlemi başarılı")
            .setDescription(`${command.name} adlı komut başarı ile tekrar yüklendi`)
            const newCommand = require(`./${command.name}`)
       client.commands.set(command.name, newCommand)
       console.warn("A new command has been added into client.commands")       
        message.reply({ embeds: [e1 ]})
    } catch (error) {
        const e2 = new MessageEmbed()
        .setTitle("Reload işlemi gerçekleştirilemedi")
        .setDescription(`Yenilediğiniz ${command.name} komudunun 2. halinde bir hata yapmış olmalısınız ${message.author}.`)
        console.error(error)
        message.channel.send({ embeds: [e2]})
    }
}
}