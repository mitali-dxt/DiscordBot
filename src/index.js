import 'dotenv/config' 
import { Client, Events, GatewayIntentBits } from 'discord.js';

//client through which we will interact with the Discord server
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
] });

client.on("messageCreate", (message) => {
    if(!message.author.bot){
        message.reply("Heylo There!");
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });

client.login(process.env.TOKEN);