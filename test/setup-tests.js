'use strict';

require('babel-register');
require('babel-polyfill');

let chai = require('chai');
chai.expect;

global.expect = chai.expect;
