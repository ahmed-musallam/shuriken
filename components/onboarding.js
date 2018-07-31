const debug = require('debug')('botkit:onboarding')

module.exports = function (controller) {
  controller.on('onboard', function (bot) {
    debug('Starting an onboarding experience!')
    bot.startPrivateConversation({ user: bot.config.createdBy }, function (err, convo) {
      if (err) console.log(err)
      else {
        convo.say('**throws smoke bomb** then poof! **appears from thin air!**')
        convo.say('I am shuriken, son of kunai.. blah blah blah')
        convo.say('you can now /invite me to the channel where all the ninjas hide!')
      }
    })
  })
}
