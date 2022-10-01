const Discord = require("discord.js")
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]})

client.login('----')

client.on("ready", () => {
    client.user.setActivity("JavaScript", {
        type: "PLAYING",
        name: "JavaScript"
    })
})

client.on("ready", () => {
    const loadingBotDiscord = "loadingBot"
    console.log(loadingBotDiscord + " is online")
})

const {DisTube} = require("distube")
const {SpotifyPlugin} = require("@distube/spotify")

const distube = new DisTube(client, {
    youtubeDL: false,
    plugins: [new SpotifyPlugin()],
    leaveOnEmpty: true,
    leaveOnStop: true
})

client.on("messageCreate", message => {
    if(message.content.startsWith("!play")) {
        const voiceChannel = message.member.voice.channel
        if(voiceChannel != 980214038229315624 && voiceChannel != 978020237603655682 && voiceChannel != 882979379947376640) {
            return message.channel.send("You are not in the 'listen-music'")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if(voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("They are playing the music")
        }

        let args = message.content.split(/\s+/)
        let query = args.slice(1).join(" ")

        if(!query) {
            return message.channel.send("Put your favore music")
        }

        distube.play(voiceChannelBot || voiceChannel, query, {
            member: message.member,
            textChannel: message.channel,
            message: message
        })

        distube.on("addSong", (queue, song) => {
            var embed = new Discord.MessageEmbed()
                .setTitle("Song added")
                .addField("Playing :notes:", song.name)
                .addField("Requested by", song.user.toString())

            queue.textChannel.send({embeds: [embed]})
        })

    }

    if(message.content == "!pause") {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) {
            return message.channel.send("You're not in the voice channel")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if(voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("They are listening the music")
        }

        try {
            distube.pause(message)
        }
        catch {
            return message.channel.send("....")
        }
    }

    if(message.content == "!infomusic") {
        var embedMusic = new Discord.MessageEmbed()
            .setAuthor("by: @ツ𝕣𝕒𝕗𝕗𝕒𝟘𝟟𝟛𝟚ツ")
            .setTitle("HOW TO PUT A MUSIC")
            .setDescription(`(!play singer's name - song's name) or (!play song's name) \nSent by: ${message.author.username}`) 
        message.channel.send({embeds: [embedMusic]})
    }

});

client.on('messageCreate', message => {
    if(message.content == "!developer") {
        var developerEmbed = new Discord.MessageEmbed()
            .setAuthor("by: @ツ𝕣𝕒𝕗𝕗𝕒𝟘𝟟𝟛𝟚ツ")
            .setTitle("SOCIAL RAFFA0732")
            .setDescription("Instagram: instagram.com/raffa0732")
        message.channel.send({embeds: [developerEmbed]})
    }
});