
const Message = require('../components/message')

// returns a formatted line from a ninja
// example return: "1) @user [2 shurikens]"
function getRankingLine (ninja, index) {
  const shuriken = ninja.score > 1 || ninja.score < -1 ? 'shurikens' : 'shuriken'
  const fire = index === 0 ? ':fire:' : ''
  const count = index + 1
  return `${count}) ${ninja.id.mention} [${ninja.score} ${shuriken}] ${fire}`
}

function getPrettyRanking (ninjas) {
  return (new Message())
    .add(
      // convert ninjas to a list
      ninjas.reduce((acc, ninja, index) => {
        return acc.addLine(getRankingLine(ninja, index))
      }, new Message())
        .toString()
    )
    .addLine()
    .toString()
}

module.exports = function (controller) {
  controller.hears('ranking', 'direct_mention', (bot, message) => {
    controller
      .score_service
      .getHighestFive()
      .then(topNinjas => {
        const prettyUsers = topNinjas.users && topNinjas.users.length
          ? getPrettyRanking(topNinjas.users)
          : `[no users have any scores yet]`
        const prettyThings = topNinjas.things && topNinjas.things.length
          ? getPrettyRanking(topNinjas.things)
          : `[no things have any scores yet]`

        bot.reply(
          message,
          {
            attachments: [ // using attachments as a different way to display ranking response (no actul attachments)
              {
                title: 'Top Users',
                text: prettyUsers,
                color: '#7B1FA2'
              },
              {
                title: 'Top Things',
                text: prettyThings,
                color: '#E64A19'
              }
            ]
          }
        )
      }).catch(err => {
        bot.reply(message, `outch! an error occured, I'm sure my creator is on it!`)
        throw new Error(err)
      })
  })
}
