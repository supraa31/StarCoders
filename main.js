const Discord = require("discord.js");
const client = new Discord.Client({
    shards: "auto",
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});
const config = require("./config.json");
const fs = require("fs");
const db = require("quick.db"); 
const { token, prefix } = config;
const { readdirSync } = fs;
client.on("ready", () => {
    console.log("Hizmet verilen kanal sayısı:", client.channels.cache.size)
    console.log("Hizmet verilen kişi sayısı:", client.users.cache.size)
    console.log("Toplam emoji sayısı:", client.emojis.cache.size)
})
//Util

const Embed = require("./utils/embed.js")
const reklamEngel = require("./utils/reklamEngel.js")
const küfürEngel = require("./utils/küfürEngel.js")
reklamEngel(client, Embed, Discord)
küfürEngel(client, Embed)
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = readdirSync("./commands").filter((file) =>
    file.endsWith(".js")
);
commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});
client.on("messageCreate", async (message) => {
     if(message.content == "deneme.test") {
        
   

     }
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (!message.content.startsWith(prefix) || !command) return;
    if (command.guildOnly && message.channel.type == "DM")
        return message.channel.send(
            `Bu komudu sadece herhangi bir sunucuda kullanabilirsin.`
        );


    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const timestamp = cooldowns.get(command.name);
    const now = Date.now()
    
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamp.has(message.author.id)) {
        const expirationTime =
            timestamp.get(message.author.id) + cooldownAmount;
        if (expirationTime > now) {
            const timeLeft = (expirationTime - now) / 1000;
            const embed = new Discord.MessageEmbed()
                .setTitle("Cooldown aşımı tespit edildi")
                .setDescription(
                    `Bu komudu tekrar kullanabilmek için ${parseInt(
                        timeLeft
                    )} saniye bekleyin.`
                );
            return message.channel.send({ embeds: [embed] });
        }
    }
    timestamp.set(message.author.id, now);
    setTimeout(() => {
        timestamp.delete(message.author.id);
    }, cooldownAmount);
    const Embed = require("./utils/embed.js")

    try {
        command.execute(message, args, client, Embed, Discord);
    } catch (e) {
        console.error(e);
        message.channel.send("Bu kodda bir hata var galiba.");
    }
});

client.on("messageCreate", message => {
    if(message.content == `<@921804774255505408>`) return message.reply({ content: `${message.author} merhaba. Benim prefixim \`sc!\``})
    
    if(message.content == 'siu') {
        message.delete()
        message.channel.bulkDelete(Number(100))
        .catch(e => {})
    }
    if(message.content == "_._") {
        let row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("erkekButton")
            .setLabel("Erkek Rolü")
            .setStyle("SECONDARY")
            .setEmoji("👨")
        )
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("buttonBayan")
            .setLabel("Bayan rolü")
            .setStyle("SECONDARY")
            .setEmoji("👩")
        )
        message.guild.channels.cache.get("921854811538870294").send({ embeds: [Embed("Rol alma menüsü", "Dostum gerekli butonlara tıklayarak kendini doğrulayabilirsin.", "info")], components: [row]})
    }
})
client.on("guildMemberAdd", m => {
    m.roles.add(m.guild.roles.cache.get("921783124067754016"))
})
client.on("interactionCreate", async interaction => {
    if(!interaction.isButton()) return
    if(interaction.customId == "erkekButton"){
        interaction.member.roles.remove(interaction.guild.roles.cache.get("921783124067754016"))
        interaction.member.roles.add(interaction.guild.roles.cache.get("921852270650490950"))
        interaction.guild.channels.cache.get("922034146010857492").send({ embeds: [Embed("Yeni biri kayıt oldu.", `${interaction.member} adlı kullanıcı, kendini \`Erkek Üye\` olarak kayıt etti.`, "info")]})
        interaction.member.send({content: `${interaction.member} dostum, başarı ile rollerini düzenledim.`, ephemeral: true})
        interaction.guild.channels.cache.get("921801878004695120").send(`<@${interaction.user.id}>`).then(a => {
            setTimeout(() => {
                a.delete()
            }, 1);
        })
    }
    if(interaction.customId == "buttonBayan") {
        interaction.member.roles.remove(interaction.guild.roles.cache.get("921783124067754016"))
        interaction.member.roles.add(interaction.guild.roles.cache.get("921852517636276254"))
        interaction.guild.channels.cache.get("922034146010857492").send({ embeds: [Embed("Yeni biri kayıt oldu.", `${interaction.member} adlı kullanıcı, kendini \`Bayan Üye\` olarak kayıt etti.`, "info")]})
        interaction.member.send({content: `${interaction.member} dostum, başarı ile rollerini düzenledim.`, ephemeral: true})
        interaction.guild.channels.cache.get("921801878004695120").then(a => {
            setTimeout(() => {
                a.delete()
            }, 1);
        })
    }
})

client.login(token)