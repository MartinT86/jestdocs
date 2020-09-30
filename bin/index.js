#! /usr/bin/env node
var docBuilder = require('../dist/docBuilder');
var appRoot = require('app-root-path');
var package = require(process.cwd() + '/package.json');
// var package = require('./package.json')

console.log("Welcome to jest docs");
// console.log(docBuilder.getDocs);
console.log('Project: ', package.name)

docBuilder.getDocs("./mockTests/oneDescribe.test.ts").then(result => {
    console.log(JSON.stringify(result))
});