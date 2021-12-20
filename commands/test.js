module.exports = {
    name: "t",
    execute(message) {
        let db = require("quick.db")
        db.set(`reklam_${message.author.id}`, 0)
    }
}