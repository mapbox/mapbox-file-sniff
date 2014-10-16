var zlib = require('zlib');
var invalid = require('./lib/invalid');
module.exports.sniff = sniff;

function sniff(buffer, callback) {
    if(Buffer.isBuffer(buffer) === false) return callback(invalid('Must pass in type Buffer object.'));

    var head = buffer.toString().substring(0,50);
    if (head.indexOf('SQLite format 3') === 0){
        return callback(null, 'mbtiles');
    }
    if ((head[0] + head[1]) === 'PK'){
        return callback(null, 'zip');
    }
    // check if geotiff
    if ((head.slice(0, 2).toString() === 'II' || head.slice(0, 2).toString() === 'MM') && buffer[2] === 42) {
        return callback(null, 'tif');
    }
    // check for kml, gpx, tiljson or geojson
    if (head.indexOf('\"type\":') !== -1){
        return callback(null, 'geojson');
    }
    // take into account BOM char at index 0
    if (((head.indexOf('<?xml') === 1) || (head.indexOf('<?xml') === 0)) && (head.indexOf('<kml') !== -1)){
        return callback(null, 'kml');
    }
    // take into account BOM char at index 0
    if (((head.indexOf('<?xml') === 1) || (head.indexOf('<?xml') === 0)) && (head.indexOf('<gpx') !== -1)){
        return callback(null, 'gpx');
    }
    if (head.indexOf('\"tilejson\":') !== -1){
        return callback(null, 'tilejson');
    }

    zlib.gunzip(buffer, function(err, output) {
        if (err) return callback(invalid('Unknown filetype.'));
        //check for tm2z
        if (output.toString().slice(257, 262) === 'ustar') return callback(null, 'tm2z');
        //check for serial tiles
        head = output.slice(0,50);
        if (head.toString().indexOf('JSONBREAKFASTTIME') === 0) return callback(null, 'serialtiles');
        else return callback(invalid('Unknown filetype.'));
    });
}
