
/**
 * Listens for ++ and -- for users and things
 */

const Message = require('../components/message')

// Regex matchers
const GENERAL = /(<?@[^ >]+>?)[ ]*(\+\+|--)/g
const USER = '<@([^ >]+)>+'
const THING = '@([^ >]+)'
const PLUS = '[ ]*\\+\\+'
const MINUS = '[ ]*--'
const PLUS_USER = new RegExp(USER + PLUS, 'i')
const PLUS_THING = new RegExp(THING + PLUS, 'i')
const MINUS_USER = new RegExp(USER + MINUS, 'i')
const MINUS_THING = new RegExp(THING + MINUS, 'i')

module.exports = function (controller) {
  controller.hears('\\+\\+', 'direct_mention', (bot, message) => {
    controller
      .score_service
      .plusUser(bot.identity.id)
      .then(newScore => bot.reply(message, `:tada:. [${bot.identity.id.mention}] now at ${newScore} points`))
  })

  controller.hears('--', 'direct_mention', (bot, message) => {
    controller
      .score_service
      .minusUser(bot.identity.id)
      .then(newScore => bot.reply(message, `fine. [${bot.identity.id.mention}] now at ${newScore} points`))
  })

  controller.hears(GENERAL.source, 'direct_mention,mention,ambient', (bot, message) => {
    message
      .text
      .match(GENERAL)
      .forEach((matchedString, i) => {
        // Case: Plus User
        if (matchedString.match(PLUS_USER)) {
          const userid = PLUS_USER.exec(matchedString)[1]
          controller.score_service
            .plusUser(userid)
            .then(newScore => bot.reply(message, `superb. [${userid.mention}] now at ${newScore} points`))
          // Case: Minus User
        } else if (matchedString.match(MINUS_USER)) {
          const userid = MINUS_USER.exec(matchedString)[1]
          controller
            .score_service
            .minusUser(userid)
            .then(newScore => bot.reply(message, `womp womp. [${userid.mention}] now at ${newScore} points`))
          // Case: Plus Thing
        } else if (matchedString.match(PLUS_THING)) {
          const thingid = PLUS_THING.exec(matchedString)[1]
          controller
            .score_service
            .plusThing(thingid)
            .then(newScore => bot.reply(message, `fantastic. [${thingid}] now at ${newScore} points`))
          // Case: Minus Thing
        } else if (matchedString.match(MINUS_THING)) {
          const thingid = MINUS_THING.exec(matchedString)[1]
          controller
            .score_service
            .minusThing(thingid)
            .then(newScore => bot.reply(message, `oh... ok... [${thingid}] now at ${newScore} points`))
          // Case we could not hande for some reason?
        } else {
          bot.reply(
            message,
            (new Message())
              .add(`I've listened to the follwing message: `)
              .addLine(message.text.quote)
              .addLine(`and I found this match ${matchedString} but not quite sure what to do with it.`)
              .addLine(`maybe my **cough** founder can help :wink:`)
              .toString()
          )
        }
      })
  })
}
