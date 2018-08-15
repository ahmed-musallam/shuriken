const ScoreStorage = require('../score_storage')
const NinjaType = require('../ninja_type')

module.exports = function (controller) {
  controller.score_service = new ScoreService(controller)
}

class ScoreService {
  constructor (controller) {
    this.controller = controller
    this.storage = new ScoreStorage(this.controller.storage)
  }
  plusUser (userid) {
    return this
      .storage
      .plus(userid, NinjaType.user)
  }
  minusUser (userid) {
    return this
      .storage
      .minus(userid, NinjaType.user)
  }
  plusThing (thing) {
    return this
      .storage
      .plus(thing, NinjaType.thing)
  }
  minusThing (thing) {
    return this
      .storage
      .minus(thing, NinjaType.thing)
  }
  /**
   * lookup all users and get the highest 5 users and 5 things
   */
  getHighestFive () {
    return new Promise((resolve, reject) => {
      this
        .controller
        .storage
        .users
        .all((err, ninjas) => {
          if (err) reject(err)
          else {
            let users = []
            let things = []
            ninjas.forEach(ninja => {
              if (ninja.score) {
                if (ninja.type === NinjaType.user) users.push(ninja)
                else if (ninja.type === NinjaType.thing) things.push(ninja)
              }
            })
            users = users.sort((a, b) => b.score - a.score).slice(0, 5)
            things = things.sort((a, b) => b.score - a.score).slice(0, 5)
            resolve({users, things})
          }
        })
    })
  }
}
