var debug = require('debug')('botkit:channel_join')
var Message = require('../components/message')

module.exports = function (controller) {
  controller.on('bot_channel_join', function (bot, message) {
    debug('joined a new channel')
    bot.reply(
      message,
      (new Message())
        .add('**throws smoke bomb** then poof! **appears from thin air!**')
        .addLine(`somebody give ${message.inviter.mention} a shuriken for inviting me!`)
        .addLine('dont know how? ask for help: ' + `${message.user.mention} help`.code)
        .toString()
        .quote
    )
  })
}
