'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_PATH: '"http://lottery.3243243242.com"'
  // BASE_PATH: '"https://api.playerone.ai"'
});
