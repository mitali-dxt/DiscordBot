import 'dotenv/config' 
import { Client, Events, GatewayIntentBits, EmbedBuilder, Embed } from 'discord.js';

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
    if (interaction.commandName === 'add') {
      const num1 = interaction.options.get('num1')?.value;
      const num2 = interaction.options.get('num2')?.value;
  
      await interaction.reply(`The sum is: ${num1 + num2}`);
      
    }if(interaction.commandName === 'embed'){
      const embed = new EmbedBuilder();
      embed.setTitle('This is a title');
      embed.setDescription('This is a description');
      embed.setColor('Random');
      interaction.reply({ embeds: [embed] });
    }
  });

client.login(process.env.TOKEN);