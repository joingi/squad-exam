'use strict';
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PATH: '"http://localhost:3000"',
  BORGUN_KEY: '"586145_puPdUpTJirzjHDrixVeKTcuyLf1cThlNik"',
  GOOGLE_KEY: '"AIzaSyCbWYAUC4YTlj6j9uevYXsN9tq0o_aXeeU"'
})
