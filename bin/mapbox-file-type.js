#!/usr/bin/env node

var filesniffer = require('..');
var path = require('path');
var filepath = path.resolve(process.argv[2]);

filesniffer.quaff(filepath, function(err, type) {
    if (err) {
        console.error(err.message);
        process.exit(err.code === 'EINVALID' ? 3 : 1);
    }
    console.log(type);
});
