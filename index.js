var zlib = require('zlib');
var fs = require('fs');
var invalid = require('./lib/invalid');
module.exports.sniff = sniff;

function sniff(filepath, callback) {
    try {
        fs.statSync(filepath);
        var buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return callback(err);
    }
   
    var head = buffer.toString().substring(0,50);
    if (head.indexOf('SQLite format 3') === 0){
        return callback(null, 'mbtiles');
    }
    if ((head[0] + head[1]) === "PK"){
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
    if (/^\s*\{/.test(head)){
        return callback(null, 'tilejson');
    }
    zlib.gunzip(buffer, function(err, tar) {
        if (err) return callback(invalid('Unknown filetype.'));
        //check for tm2z
        if (tar.slice(257, 262).toString() === 'ustar') return callback(null, 'tm2z');
        //check for serial tiles
        head = tar.slice(0,50).toString();
        if (head.indexOf('JSONBREAKFASTTIME') === 0) return callback(null, 'serialtiles');
        return callback(invalid('Unknown filetype.'));
    });
}