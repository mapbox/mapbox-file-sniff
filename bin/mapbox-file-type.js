#!/usr/bin/env node

var filesniffer = require('..');
var fs = require('fs');
var path = require('path');
var filepath = path.resolve(process.argv[2]);

fs.open(filepath, 'r', function(err, fd) {
    if (err) return console.error(err);
    var buf = new Buffer(512);
    fs.read(fd, buf, 0, 512, 0, function(err, bytes, buffer) {
        if (bytes.length < 300)
          return console.error(new Error('File too small'));
        filesniffer.sniff(buffer, function(err, type) {
            if (err) return console.error(err);
            console.log(type);
        });
    });
});
