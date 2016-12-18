#!/usr/bin/env node

var filesniffer = require('..');
var path = require('path');
var argv = require('yargs').argv;
var filepath = path.resolve(process.argv[2]);

filesniffer(filepath, function(err, info) {
    if (err) {
        console.error(err.message);
        process.exit(err.code === 'EINVALID' ? 3 : 1);
    }

    if (argv.protocol || argv.p) {
        console.log(info.protocol);
    } else if (argv.type || argv.t) {
        console.log(info.type);
    } else {
        console.log(JSON.stringify(info));
    }
});
