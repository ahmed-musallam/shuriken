/*
  Slack message helper
*/

if (!''.hasSlackShortcuts) {
  // Add slack formatting shortcuts
  let stringProto = String.prototype
  Object.defineProperties(stringProto, {
    hasSlackShortcuts: {
      get: function () { return true }
    },
    bold: {
      get: function () { return `*${this.trim()}*` }
    },
    quote: { // add ">" to beginning and also after every new line
      get: function () { return `>${this.trim().replace(/\n+/g, '\n>')}` }
    },
    italic: {
      get: function () { return `_${this.trim()}_` }
    },
    code: {
      get: function () { return `\`${this.trim()}\`` }
    },
    preformat: {
      get: function () { return `\`\`\`${this.trim()}\`\`\`` }
    },
    strike: {
      get: function () { return `~${this.trim()}~` }
    },
    indent: {
      get: function () { return `  ${this}` }
    },
    mention: {
      get: function () { return `<@${this.trim()}>` }
    }
  })
}

// export a simple Message helper (prettier lines)
module.exports = class Message {
  constructor () {
    this.str = ''
  }
  add (newstr = '') {
    this.str += newstr
    return this
  }
  toString () {
    return this.str
  }
  addLine (newstr = '') {
    const toAdd = '\n' + newstr
    this.str += toAdd
    return this
  }
}
