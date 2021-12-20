const { MessageEmbed } = require("discord.js");
const { measureMemory } = require("vm");

module.exports = {
    name: "rolver",
    aliases: ["rv"],
    guildOnly: true,
    cooldown: 3,
    category: "moderasyon",
    async execute(message, args, client, Embed) {
        let member = message.mentions.members.first(); 
        let role = message.mentions.roles.first()
        let siu = new MessageEmbed()
        .setTitle("İşlem başarılı")
        .setDescription("İlgili bilgiler aşağıda verilmiştir.")
        .addField(`Rol verilen kişi:`, `${member}`)
        .addField(`Verilen rol:`,`${role}`)
       
        if(!member) return message.reply({ embeds: [Embed("Argüman hatası tespit edildi.", "Dostum, bir kişi girmelisin.", "error")]})
        if(!role) return message.reply({ embeds: [Embed("Argüman hatası tespit edildi.", "Dostum, bir rol girmelisin.", "error")]})
    member.roles.add(role)
        message.reply({ embeds: [siu]})
    }
}