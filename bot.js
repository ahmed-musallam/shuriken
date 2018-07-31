
const env = require('node-env-file')
const path = require('path')
const Botkit = require('botkit')
env(path.join(__dirname, '/.env'))

if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
  usageTip()
  // process.exit(1);
}

var botOptions = {
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  debug: true,
  scopes: ['bot']
}

// Use a mongo database if specified, otherwise store in a JSON file local to the app.
// Mongo is automatically configured when deploying to Heroku
if (process.env.MONGO_URI) {
  var mongoStorage = require('botkit-storage-mongo')({ mongoUri: process.env.MONGO_URI })
  botOptions.storage = mongoStorage
} else {
  botOptions.json_file_store = path.join(__dirname, '/.data/db/') // store user data in a simple JSON format
}

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot(botOptions)

controller.startTicking()

// Set up an Express-powered webserver to expose oauth and webhook endpoints
const webserver = require(path.join(__dirname, '/components/express_webserver.js'))(controller)

webserver.get('/', function (req, res) {
  res.render('index', {
    domain: req.get('host'),
    protocol: req.protocol,
    layout: 'layouts/default'
  })
})

// Set up a simple storage backend for keeping a record of customers
// who sign up for the app via the oauth
require(path.join(__dirname, '/components/user_registration.js'))(controller)

// Send an onboarding message when a new team joins
require(path.join(__dirname, '/components/onboarding.js'))(controller)

// require ALL Services in services dir
var servicesPath = require('path').join(__dirname, 'components/services')
require('fs').readdirSync(servicesPath).forEach(function (file) {
  require('./components/services/' + file)(controller)
})

// require ALL skills in skills dir
var skillsPath = require('path').join(__dirname, 'skills')
require('fs').readdirSync(skillsPath).forEach(function (file) {
  require('./skills/' + file)(controller)
})

function usageTip () {
  console.log('~~~~~~~~~~')
  console.log('Botkit Starter Kit')
  console.log('Execute your bot application like this:')
  console.log('clientId=<MY SLACK CLIENT ID> clientSecret=<MY CLIENT SECRET> PORT=3000  node bot.js')
  console.log('Get Slack app credentials here: https://api.slack.com/apps')
  console.log('~~~~~~~~~~')
}
