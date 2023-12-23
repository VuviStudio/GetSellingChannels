const { Client, Intents } = require('discord.js-selfbot-v13');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
    ],
});

const excludedServerId = '1152754867769708584'; // this is carti's market shit has allat off selling channels

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content === '!sellchannels') {
        const maxChars = 3900;
        let channelsInfo = 'Channels with "selling" keyword:\n';
        let chunks = [];

        client.guilds.cache.forEach(guild => {
            if (guild.id === excludedServerId) return;

            const sellingChannels = guild.channels.cache.filter(channel => channel.name.toLowerCase().includes('selling'));
            if (sellingChannels.size > 0) {
                sellingChannels.forEach(chan => {
                    const channelInfo = `Server: ${guild.name} - Channel: ${chan.name}\n`;
                    const channelLink = `Link: https://discord.com/channels/${guild.id}/${chan.id}\n\n`;

                    const channelDetails = channelInfo + channelLink;

                    if (channelsInfo.length + channelDetails.length > maxChars) {
                        chunks.push(channelsInfo);
                        channelsInfo = '';
                    }

                    channelsInfo += channelDetails;
                });
            }
        });

        if (channelsInfo.trim().length > 0) {
            chunks.push(channelsInfo);
        } else {
            message.reply('No channels with "selling" found in other servers.');
            return;
        }

        chunks.forEach((chunk, index) => {
            setTimeout(() => {
                message.reply(chunk);
            }, index * 500); 
        });
    }
});




client.login('urtoken');
