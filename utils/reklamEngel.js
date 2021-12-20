const db = require("quick.db")
module.exports = (client, Embed, Discord) => {
    const Array = [
        ".com", ".net", ".co", ".co.uk", ".is", ".net", ".istanbul", ".ist", ".org", ".biz", ".info", ".asia", ".tv", ".top"
        ,".blog", ".online", ".network", ".cc", ".in",
        ".global",
".guru",
".host", 
".media",
".moda",
".space",
".se"
    ]
    client.on("messageCreate", message => {
        let letaa = db.fetch(`reklam_${message.author.id}`)
        function sup(){
            message.author.send(`Yaptığın çok ayıp ${message.author}. Eğer ${3 - letaa} reklam daha yaparsan mute yersin.`)
} 
        
        if(Array.some(x => message.content.includes(x))) {
            if(!letaa == 3) {
                sup()
            } else if(letaa == 3) {
                function supraa() {
                    const member = message.guild.members.cache.get(message.author.id)
                member.roles.add(message.guild.roles.cache.get("922201143298388028"))
                
                setTimeout(() => {
                    message.guild.members.cache.get(message.author.id).roles.remove(message.guild.roles.cache.get("922201143298388028"))
                }, 1800000);
                message.guild.channels.cache.get("922177261719928872").send({ embeds: [Embed("Bir kişi ceza aldı.", `${message.author} adlı kullanıcı, ${letaa} kere reklam yaptığı için yarım saat boyunca kısıtlandı.`, "info")]})
                }
                supraa()
            } 
            if(letaa == 5) {
                const member_ = message.guild.members.cache.get(message.author.id)
                member_.ban({ days: 7, reason: "5. Kere reklam yaptı."})
                message.guild.channels.cache.get("922177261719928872").send({ embeds: [Embed("Yeni reklam olayı", `${message.author} adlı kullanıcı, 5. kere reklam yaptığı için sunucudan 1 saat boyunca yasaklandı. 1 saat sonra tekrar katılabilecek.`, "info")]})
                setTimeout(() => {
                    member_.unban(message.author.id, "Ban süresi bitti.")
                    message.guild.channels.cache.get("922177261719928872").send({ embeds: [Embed("Bir kişinin cezası bitti.", `<@${message.author.id}> adlı kullanıcının, 5. kere reklam yaptığı için aldığı 1 saatlik cezası sona erdi.` , "info")]})
                }, 3600000);
            } else if(letaa == 7) {
                const member__ = message.guild.members.cache.get(message.author.id)
                member__.ban({ days: 7, reason: "7. reklam"})
            }
            let terbiyesiz = new Discord.MessageEmbed()
        .setTitle("Bir kişi reklam yaptı.")
        .setDescription("Detaylar verilmiştir.")
        .addField(`Reklam yapan kullanıcı:`, `${message.author}`)
        .addField(`Edilen reklam:`, `||${message.content || "Bulunamadı."}||`)
        .addField(`Reklamın edildiği kanal:`, `${message.channel || "Bulunamadı"}`)
        .addField(`Reklamın uzunluğu`, `${message.content.length}`)
            message.delete()
            message.guild.channels.cache.get("922177261719928872").send({ embeds: [terbiyesiz]})

            db.add(`reklam_${message.author.id}`, 1); 
                  
        }

    })
}
