import 'dotenv/config';
import { ApplicationCommandOptionType, REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'add',
    description: 'Adds two numbers',
    options: [
      {
        name: 'num1',
        description: 'The first number',
        required: true,
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: 'One',
            value: 1,
          },
          {
            name: 'Two',
            value: 2,
          },
          {
            name: 'Three',
            value: 3,
          },
        ],
      },
      {
        name: 'num2',
        description: 'The second number',
        required: true,
        type: ApplicationCommandOptionType.Number,
      },
    ],
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }