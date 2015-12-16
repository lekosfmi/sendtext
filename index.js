#!/usr/bin/env node

var shell = require('shelljs');
var program = require('commander');
var clc = require('cli-color');
var exec = require('child_process').exec;
var prompt = require('prompt');

var userArgs = process.argv.slice(2);

program
  .version(1.6)
  .option('-m, --message', "Send Text Messages")
  .parse(process.argv)

if(program.message) {

  prompt.message = ">".rainbow

  var schema = [
    {
      name: "numbers",
      type: 'number',
      maxLength: "10",
      description: "Number:".white,
      required: true
    },
    {
      name: "messages",
      type: "string",
      description: "Message:".white,
      required: true
    }
  ]

  prompt.start();

  prompt.get(schema, function(err, results) {
    exec("curl http://textbelt.com/text -d number=" + results.numbers + " -d " + "'message=" + results.messages + "'", function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log("Number sent to: " + clc.blue(results.numbers));
        console.log("Your Message: " + clc.blue(results.messages));
        console.log(clc.green("Sent Success!!"));
      }

    });
  });
}
