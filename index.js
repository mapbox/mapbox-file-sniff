var zlib = require('zlib');
var invalid = require('./lib/invalid');
var fs = require('fs');

module.exports.sniff = sniff;
module.exports.waft = waft;
module.exports.quaff = quaff;

function sniff(buffer, callback) {
    if (buffer instanceof Buffer === false) return callback(invalid('Must pass in type Buffer object.'));

    var head = buffer.toString().substring(0,100);
    if (head.indexOf('SQLite format 3') === 0){
        return callback(null, 'mbtiles');
    }
    if ((head[0] + head[1]) === 'PK'){
        return callback(null, 'zip');
    }
    // check if geotiff
    // matches gdal validation logic: https://github.com/OSGeo/gdal/blob/trunk/gdal/frmts/gtiff/geotiff.cpp#L6892-L6893
    if ((head.slice(0, 2).toString() === 'II' || head.slice(0, 2).toString() === 'MM') && ((buffer[2] === 42) || buffer[3] === 42)) {
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
    // check for unzipped .shp
    if (buffer.readUInt32BE(0) === 9994) {
        return callback(null, 'shp');
    }

    zlib.gunzip(buffer, function(err, output) {
        if (err) return callback(invalid('Unknown filetype'));
        //check for tm2z
        if (output.toString().slice(257, 262) === 'ustar') return callback(null, 'tm2z');
        //check for serial tiles
        head = output.slice(0,50);
        if (head.toString().indexOf('JSONBREAKFASTTIME') === 0) return callback(null, 'serialtiles');
        else return callback(invalid('Unknown filetype'));
    });
}

function waft(buffer, callback) {
    var mapping = {
        mbtiles: 'mbtiles:',
        shp: 'omnivore:',
        zip: 'omnivore:',
        tif: 'omnivore:',
        geojson: 'omnivore:',
        kml: 'omnivore:',
        gpx: 'omnivore:',
        tilejson: 'tilejson:',
        tm2z: 'tm2z:',
        serialtiles: 'serialtiles:'
    };

    sniff(buffer, function(err, type) {
        if (err) return callback(err);
        callback(null, mapping[type]);
    });
}

function quaff(input, protocol, callback) {
  if (!callback) {
    callback = protocol;
    protocol = false;
  }

  var action = protocol ? waft : sniff;

  if (input instanceof Buffer) return action(input, callback);

  fs.open(input, 'r', function(err, fd) {
      if (err) return callback(err);

      fs.read(fd, new Buffer(512), 0, 512, 0, function(err, bytes, buffer) {
          if (bytes.length < 300)
              err = err || new Error('File too small');

          fs.close(fd, function(closeErr) {
              if (err || closeErr) return callback(err || closeErr);
              action(buffer, callback);
          });
      });
  });
}
