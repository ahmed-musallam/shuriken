
const Message = require('../components/message')

module.exports = function (controller) {
  controller.hears('help', 'direct_mention', (bot, message) => {
    bot.reply(
      message,
      {
        attachments: [ // using attachments as a different way to display ranking response (no actul attachments)
          {
            title: 'General Usage',
            text: (new Message())
              .add('I keep track of shurikens for your team.')
              .addLine(`Mention a user followed by a ${'++'.code} or ${'--'.code} and I'll add/subtract shurikens`)
              .addLine(`example ${'@johndoe ++'.code} or ${'@johndoe --'.code}`)
              .addLine(`I can also keep track of things:`)
              .addLine(`example ${'@beer ++'.code} or ${'@work --'.code}`)
              .toString(),
            color: '#7B1FA2'
          },
          {
            title: 'ranking',
            text: (new Message())
              .add('Shows the ranking for the top 5 users/things ')
              .addLine(`E.g. ${'@shuriken ranking'.code}`)
              .toString(),
            color: '#009688'
          },
          {
            title: 'uptime',
            text: (new Message())
              .add('Shows my uptime and other stats')
              .addLine(`E.g. ${'@shuriken uptime'.code}`)
              .toString(),
            color: '#E64A19'
          }
        ]
      }
    )
  })
}
