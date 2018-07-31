# Shuriken
A bot that gives out ninja start! (aka `shuriken`)

> based on [botkit-starter-slack](https://github.com/howdyai/botkit-starter-slack) the docs should contain helpful tips

#### Set up your Slack Application 
Once you have setup your Botkit development enviroment, the next thing you will want to do is set up a new Slack application via the [Slack developer portal](https://api.slack.com/). This is a multi-step process, but only takes a few minutes. 

* [Read this step-by-step guide](https://botkit.ai/docs/provisioning/slack-events-api.html) to make sure everything is set up. 

Update the `.env` file with your newly acquired tokens.

Launch your bot application by typing:

`node .`

Now, visit your new bot's login page: http://localhost:3000/login

while developing, you can expose the port via [ngrok](https://ngrok.com/)
If you want to see debug logs, run this bot as follows: `DEBUG:* node .`


### Deploying to cloud host
if using the default filesystem storage, make sure your host allows filesystem modifications


### Customize Storage

By default, this bot uses a simple file-system based storage mechanism to record information about the teams and users that interact with the bot. While this is fine for development, or use by a single team, most developers will want to customize the code to use a real database system.

There are [Botkit plugins for all the major database systems](https://botkit.ai/readme-middlewares.html#storage-modules) which can be enabled with just a few lines of code.

We have enabled our [Mongo middleware]() for starters in this project. To use your own Mongo database, just fill out `MONGO_URI` in your `.env` file with the appropriate information. For tips on reading and writing to storage, [check out these medium posts](https://botkit.groovehq.com/knowledge_base/categories/build-a-bot)
