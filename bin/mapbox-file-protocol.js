#!/usr/bin/env node

var filesniffer = require('..');
var fs = require('fs');
var path = require('path');
var filepath = path.resolve(process.argv[2]);

fs.exists(filepath, function(exists) {
    if (!exists) return console.error(new Error('File does not exist'));
    fs.readFile(filepath, function(err, buf) {
        if (err) return console.error(err);
        filesniffer.protocol(buf, function(err, protocol) {
            if (err) return console.error(err);
            console.log(protocol);
        });
    });
});
