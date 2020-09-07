#! /usr/bin/env node
var docBuilder = require('../dist/docBuilder');

console.log("Welcome to jest docs");
// console.log(docBuilder.getDocs);


docBuilder.getDocs("./test/two.test.ts").then(result => {
    console.log(result[0])
});