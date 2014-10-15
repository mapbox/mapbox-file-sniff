var sniffer = require('./index.js'),
	fs = require('fs'),
	path = require('path');

var filepath = path.resolve('./test/data/bom.kml');
var buffer;

try {
	fs.statSync(filepath);
    buffer = new Buffer(512);
    var fd = fs.openSync(filepath, 'r');
    fs.readSync(fd, buffer, 0, 512, 0);
    fs.closeSync(fd);
} catch (err) {
    return console.log(err);
}

sniffer.sniff(buffer, function(err, filetype){
	if (err) console.log(err);
	else console.log('Filetype: ' + filetype);
});