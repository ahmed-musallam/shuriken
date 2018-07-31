/**
 * A wrapper for storage to save/retrieve scores
 */
module.exports = class ScoreStorage {
  constructor (storage) {
    this.storage = storage
  }
  /**
   * Get user data from storage
   * @param {String} id the user id
   */
  getUserData (id, type) {
    return new Promise((resolve, reject) => {
      this.storage.users.get(id, (err, data) => {
        console.log('getting existing data' + JSON.stringify(data))
        const isEmpty = !data || Object.keys(data).length === 0
        if (err || isEmpty) reject(new Error(err)) // resolving here because the case where a user does not exist is valid.. and we dont want to reject
        else resolve(data)
      })
    }).catch(err => {
      console.log(`An error occured getting data of user/thing with id ${id}.
                   If this is the first time this user/thing is recieving a score,
                   this error is normal. Here is the error anyway:`)
      console.log(err)
      return this.saveUserData(id, {type}) // this might be the first time a user/thing gets a score, so we add the type here
    })
  }
  /**
   * Save user data to storage
   * @param {String} id the user id
   */
  saveUserData (id, data) {
    return new Promise((resolve, reject) => {
      const toSave = Object.assign({id}, data)
      this.storage.users.save(toSave, (err) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
  /**
   * Saves the data and returns a promise that resolves to a score
   * @param {String} id the user id
   * @param {Object} data the data to store (includes score)
   */
  _setScore (id, data) {
    return this
      .saveUserData(id, data)
      .then(data => data.score)
  }
  /**
   * Add score to users existing score
   * @param {String} id the user id
   * @param {String} type (user, thing)
   * @param {Number} numToAddToScore the number to add to the existing score
   */
  _add (id, type, numToAddToScore) {
    return this
      .getUserData(id, type)
      .then(data => {
        const currentScore = (data && data.score) ? data.score : 0
        const score = currentScore + numToAddToScore
        data = Object.assign({}, data, {score, type})
        return this._setScore(id, data)
      })
  }
  /**
   * Add one to existing user/thing score
   * @param {String} id ther user/thing id
   * @param {String} type the type (user/thing)
   */
  plus (id, type) {
    return this._add(id, type, 1)
  }
  /**
   * minus one from existing user/thing score
   * @param {*} id ther user/thing  id
   * @param {String} type the type (user/thing)
   */
  minus (id, type) {
    return this._add(id, type, -1)
  }
}
