import 'dotenv/config' 
import { Client, Events, GatewayIntentBits, EmbedBuilder, Embed, ActionRowBuilder, ButtonBuilder,ButtonStyle } from 'discord.js';

//client through which we will interact with the Discord server
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
] });

const roles =[
    {
        id:process.env.ROLE1,
        label: 'Red',
    },
    {
        id:process.env.ROLE2,
        label: 'Blue',
    },
    {
        id:process.env.ROLE3,
        label: 'Green',
    },
];

client.on("ready", async(c) => {
    try{
        const channel = await c.channels.fetch(process.env.CHANNEL_ID);
        if(!channel) return;
        const row = new ActionRowBuilder();
        roles.forEach(role => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
            );
        });
        await channel.send({
            content: 'Claim or remove a role below',
            components: [row],
        });
        process.exit;
    }
    catch(e){
        console.log(e);
    }
});

client.on("interactionCreate", async(interaction) => {
    try{
    if(!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });
    const role =interaction.guild.roles.cache.get(interaction.customId);
    if(!role){
        return interaction.editReply({ content: 'Role not found', ephemeral: true });
    }
    const hasRole = interaction.member.roles.cache.has(role.id);
    if(hasRole){
        await interaction.member.roles.remove(role);
        return interaction.editReply({ content: `Role ${role.name} removed`, ephemeral: true });
    }

    await interaction.member.roles.add(role);
    await interaction.editReply({ content: `Role ${role.name} added`});
}
catch(e){
    console.log(e);
}

});

client.login(process.env.TOKEN);