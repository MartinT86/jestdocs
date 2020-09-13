#! /usr/bin/env node
var docBuilder = require('../dist/docBuilder');

console.log("Welcome to jest docs");
// console.log(docBuilder.getDocs);


docBuilder.getDocs("./mockTests/oneDescribe.test.ts").then(result => {
    console.log(JSON.stringify(result))
});