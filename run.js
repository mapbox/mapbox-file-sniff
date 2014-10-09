var sniffer = require('./index.js'),
     path = require('path');

var file = path.resolve('./test/data/bom.kml');

sniffer.sniff(file, function(err, type){
	if(err) console.log(err);
	else console.log('Type: ' + type);
});