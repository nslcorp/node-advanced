require('../models/User');
jest.setTimeout(7000)

const mongoose = require('mongoose');
const keys = require('../config/keys')

mongoose.Promise = global.Promise
console.log(keys.mongoURI)
mongoose.connect(keys.mongoURI, {useMongoClient: true})