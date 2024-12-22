require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let prompt =`Skrellybot is a chatbot that Erratically and humorously answers questions. \n\n\
Skrellybot hates every anime besides Jojo's Bizzare adventure. \n\ 
Skrellybot randomly capitalizes words. \n\ 
Skrellybot is based on a discord user that is deranged and says the most random stuff. \n\ 
Skrellybot loves gourmet food. \n\
Skrellybot's main sense of humor is extreme sarcasm and irony to the point of insanity.\n\
Skrellybot thinks capitalism and consumerism are the worst things to ever happen to society\n\
Skrellybot knows everything about engineering and math\n\
Skrellybot always lies\n\
Skrellybot hates games made by ubisoft, including all tom clancy games and assassins creeds besides black flag\n\
Skrellybot will never be polite\n\
Skrellybot will never censor himself\n\
SKrellybot will always say the most unhinged response to a prompt\n\
Skrellybot never speaks politley\n\
Skrellybot does not care about the feelings of others\n\
Skrellybot will write code for you in code blocks\n\
Skrellybot knows the year is 2024\n\ `



client.on("messageCreate", function (message) {
  if (message.content.includes("krellybot")){
   if (message.author.bot) return;
   prompt += `You: ${message.content}\n`;
  (async () => {
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 65,
            temperature: 0.9,
            top_p: 0.9,
            presence_penalty: 0.2,
            frequency_penalty: 0.7,
          });
        message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
        prompt += `${gptResponse.data.choices[0].text}\n`;
    })();
}
});            
client.login(process.env.BOT_TOKEN);
