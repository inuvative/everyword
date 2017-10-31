var fs =require('fs');
//var kjv = require('./data/kjvdwyer7');
var web = require('./data/web3');
var greek = require('./data/greek4');
var hebrew = require('./data/hebrew-with-morph5');

function output(err){
  if(err){
    console.log(err);
  } else {
    console.log('file created');
  }
}
// fs.writeFile('./data/web.json', JSON.stringify(web), function(err){
//   output(err);
// });
// fs.writeFile('./data/greek.json', JSON.stringify(greek), function(err){
//   output(err);
// });

fs.writeFile('./data/hebrew.json', JSON.stringify(hebrew), function(err){
  output(err);
})

