"use strict";

function checkMemory(){
  try {
    console.log("Forcing Garbage collection")
    global.gc();
  } catch (e) {
    console.log("You must run program with 'node --expose-gc index.js' or 'npm start'");
    process.exit();
  }
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log('This script used approx. '+Math.round(used*100)/100+' MB');
}

function heapDump(){
  checkMemory();
  process.kill(process.pid, 'SIGINT');
}

function loadWithRequire(jsonfile){
  console.log("Start loading with require")
  var js = require(jsonfile);
  checkJSON(js);
  console.log("Finish loading with require")
}

function loadWithFS(jsonfile){
  console.log("Start loading with fs")
  var js = JSON.parse(require('fs').readFileSync(jsonfile, 'utf8'));
  checkJSON(js);
  console.log("Finish loading with fs");
  return js;
}

function checkJSON(json){
  var count = Object.keys(json).length;
  console.log("JSON size: "+count);
}

checkMemory();
var javascripture = require('../javascripture');
// javascripture.data.hebrew = require('./data/hebrew-with-morph5');
// javascripture.data.bible = require('./data/bible');
// checkMemory();
//javascripture.data.kjv = loadWithFS('./data/kjv.json');
checkMemory();
// javascripture.api = {};
// require('./api/reference')(javascripture);
// require('./api/searchApi')
var reference = {
  book : 'Matthew',
  chapter : 10,
  verse : 11,
  rightData : 'greek',
  leftData : 'greek'
}
var prev = javascripture.api.reference.getOffsetChapter(reference,-1);
console.log(JSON.stringify(prev));
var chapterData = javascripture.api.reference.getChapterData(reference);
checkMemory();
var next = javascripture.api.reference.getOffsetChapter(reference,1);
console.log(JSON.stringify(next));
checkMemory();
console.log("done");