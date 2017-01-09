var tape = require('tape');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var testData = path.dirname(require.resolve('mapnik-test-data'));
var sniffer = require('../index.js');

function getBuffer(path) {
    var buffer;
    try {
        fs.statSync(path);
        buffer = new Buffer(512);
        var fd = fs.openSync(path, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
        return buffer;
    } catch (err) {
        throw err;
    }
}

/**
 * Testing filesniffer
 */
tape('error: no callback', function(assert) {
    var filepath = testData + '/data/kml/1week_earthquake.kml';
    try {
        sniffer.fromFile(filepath);
        assert.fail(); // do not get here
    } catch (err) {
        assert.ok(err);
        assert.equal(err.message, 'Invalid callback. Must be a function.', 'expected error message');
        assert.end();
    }
});
tape('error: file does not exist', function(assert) {
    var filepath = 'not/here/file.geojson';
    sniffer.fromFile(filepath, function(err, result) {
        assert.ok(err);
        assert.equal(err.code, 'ENOENT');
        assert.equal(err.message, 'ENOENT: no such file or directory, open \'not/here/file.geojson\'', 'expected message');
        assert.end();
    });
});
tape('error: small file', function(assert) {
    var filepath = path.resolve('./test/data/small.csv');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'File too small', 'expected error message');
        assert.equal(err.code, 'EINVALID', 'expected error code');
        assert.end();
    });
});

tape('[KML] success: file path', function(assert) {
    var filepath = testData + '/data/kml/1week_earthquake.kml';
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'kml', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[KML] success: buffer', function(assert) {
    var filepath = testData + '/data/kml/1week_earthquake.kml';
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'kml', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[KML BOM] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/bom.kml');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'kml', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[KML BOM] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/bom.kml');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'kml', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[VRT] success: file path', function(assert) {
    var filepath = testData + '/data/vrt/sample.vrt';
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'vrt', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[VRT] success: buffer', function(assert) {
    var filepath = testData + '/data/vrt/sample.vrt';
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'vrt', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[GEOJSON - basic] success: file path', function(assert) {
    var filepath = testData + '/data/geojson/DC_polygon.geo.json';
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[GEOJSON - basic] success: buffer', function(assert) {
    var filepath = testData + '/data/geojson/DC_polygon.geo.json';
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[GEOJSON - crs] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/crs-geojson.json');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[GEOJSON - crs] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/crs-geojson.json');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[GEOJSON - geometries] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-geometries.json');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[GEOJSON - geometries] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-geometries.json');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[GEOJSON - coordinates] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-coordinates.json');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[GEOJSON - coordinates] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-coordinates.json');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[GEOJSON - extra characters] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/xtracharacters.json');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[GEOJSON - extra characters] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/xtracharacters.json');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[GEOJSON - valid nested type] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-nested-type.json');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[GEOJSON - valid nested type] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-nested-type.json');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'geojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[GEOJSON - invalid type value] errors', function(assert) {
    var filepath = path.resolve('./test/data/invalid-type.json');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'Unknown filetype', 'expected error message');
        assert.equal(err.code, 'EINVALID', 'expected error code');
        assert.end();
    });
});

tape('[TOPOJSON] success: file path', function(assert) {
    var filepath = testData + '/data/topojson/topo.json';
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'topojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[TOPOJSON] success: buffer', function(assert) {
    var filepath = testData + '/data/topojson/topo.json';
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'topojson', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[GPX] success: file path', function(assert) {
    var filepath = testData + '/data/gpx/fells_loop.gpx';
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'gpx', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[GPX] success: buffer', function(assert) {
    var filepath = testData + '/data/gpx/fells_loop.gpx';
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'gpx', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[ZIP] success: file path', function(assert) {
    var filepath = testData + '/data/zip/us_states.zip';
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'zip', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[ZIP] success: buffer', function(assert) {
    var filepath = testData + '/data/zip/us_states.zip';
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'zip', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[SHP] success: file path', function(assert) {
    var filepath = testData + '/data/shp/world_merc/world_merc.shp';
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'shp', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[SHP] success: buffer', function(assert) {
    var filepath = testData + '/data/shp/world_merc/world_merc.shp';
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'shp', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[TIF] success: file path', function(assert) {
    var filepath = testData + '/data/geotiff/sample.tif';
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tif', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[TIF] success: buffer', function(assert) {
    var filepath = testData + '/data/geotiff/sample.tif';
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tif', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[TIF - gzip] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/atiff.tif.gz');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tif+gz', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[TIF - gzip] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/atiff.tif.gz');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tif+gz', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[BIGTIFF] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-bigtiff.tif');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tif', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[BIGTIFF] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-bigtiff.tif');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tif', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});

tape('[MBTILES] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid.mbtiles');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'mbtiles', 'expected file type');
        assert.equal(result.protocol, 'mbtiles:', 'expected protocol');
        assert.end();
    });
});
tape('[MBTILES] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid.mbtiles');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'mbtiles', 'expected file type');
        assert.equal(result.protocol, 'mbtiles:', 'expected protocol');
        assert.end();
    });
});

tape('[TILEJSON - valid] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid.tilejson');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tilejson', 'expected file type');
        assert.equal(result.protocol, 'tilejson:', 'expected protocol');
        assert.end();
    });
});
tape('[TILEJSON - valid] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid.tilejson');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tilejson', 'expected file type');
        assert.equal(result.protocol, 'tilejson:', 'expected protocol');
        assert.end();
    });
});
tape('[TILEJSON - invalid] errors', function(assert) {
    var filepath = path.resolve('./test/data/invalid.tilejson');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'Unknown filetype', 'expected file type');
        assert.end();
    });
});

tape('[SERIALTILES] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-serialtiles.gz');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'serialtiles', 'expected file type');
        assert.equal(result.protocol, 'serialtiles:', 'expected protocol');
        assert.end();
    });
});
tape('[SERIALTILES] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-serialtiles.gz');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'serialtiles', 'expected file type');
        assert.equal(result.protocol, 'serialtiles:', 'expected protocol');
        assert.end();
    });
});


tape('[SERIALTILES - not csv] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-not-csv.serialtiles.gz');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'serialtiles', 'expected file type');
        assert.equal(result.protocol, 'serialtiles:', 'expected protocol');
        assert.end();
    });
});
tape('[SERIALTILES - not csv] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-not-csv.serialtiles.gz');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'serialtiles', 'expected file type');
        assert.equal(result.protocol, 'serialtiles:', 'expected protocol');
        assert.end();
    });
});


tape('[TM2Z] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid.tm2z');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tm2z', 'expected file type');
        assert.equal(result.protocol, 'tm2z:', 'expected protocol');
        assert.end();
    });
});
tape('[TM2Z] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid.tm2z');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tm2z', 'expected file type');
        assert.equal(result.protocol, 'tm2z:', 'expected protocol');
        assert.end();
    });
});
tape('[TM2Z - valid paxheader] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-paxheader.gz');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tm2z', 'expected file type');
        assert.equal(result.protocol, 'tm2z:', 'expected protocol');
        assert.end();
    });
});
tape('[TM2Z - valid paxheader] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-paxheader.gz');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'tm2z', 'expected file type');
        assert.equal(result.protocol, 'tm2z:', 'expected protocol');
        assert.end();
    });
});
tape('[TM2Z - invalid malformed] errors', function(assert) {
    var filepath = path.resolve('./test/data/invalid-malformed.tm2z');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'Unknown filetype', 'expected error message');
        assert.end();
    });
});
tape('[TM2Z - invalid empty] errors', function(assert) {
    var filepath = path.resolve('./test/data/invalid-empty.tm2z');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'Unknown filetype', 'expected error message');
        assert.end();
    });
});

tape('[CSV] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-points.csv');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'csv', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[CSV] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-points.csv');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'csv', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[CSV - blank rows] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/blank_rows.csv');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'csv', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[CSV - blank rows] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/blank_rows.csv');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'csv', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[CSV - valid one field] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-one-field.csv');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'csv', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[CSV - valid one field] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-one-field.csv');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'csv', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[CSV - valid empty rows] success: file path', function(assert) {
    var filepath = path.resolve('./test/data/valid-empty_rows.csv');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'csv', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[CSV - valid empty rows] success: buffer', function(assert) {
    var filepath = path.resolve('./test/data/valid-empty_rows.csv');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.notOk(err, 'no error');
        assert.equal(result.type, 'csv', 'expected file type');
        assert.equal(result.protocol, 'omnivore:', 'expected protocol');
        assert.end();
    });
});
tape('[CSV - invalid empty] errors filepath', function(assert) {
    var filepath = path.resolve('./test/data/invalid-blank.csv');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'File too small', 'expected error message');
        assert.equal(err.code, 'EINVALID', 'expected error code');
        assert.end();
    });
});
tape('[CSV - invalid empty] errors buffer', function(assert) {
    var filepath = path.resolve('./test/data/invalid-blank.csv');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'Unknown filetype', 'expected error message');
        assert.equal(err.code, 'EINVALID', 'expected error code');
        assert.end();
    });
});
tape('[CSV - invalid geometries] errors filepath', function(assert) {
    var filepath = path.resolve('./test/data/invalid_geometries.csv');
    assert.notOk(Buffer.isBuffer(filepath));
    sniffer.fromFile(filepath, function(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'Unknown filetype', 'expected error message');
        assert.equal(err.code, 'EINVALID', 'expected error code');
        assert.end();
    });
});
tape('[CSV - invalid geometries] errors buffer', function(assert) {
    var filepath = path.resolve('./test/data/invalid_geometries.csv');
    var buffer = getBuffer(filepath);
    assert.ok(Buffer.isBuffer(buffer));
    sniffer.fromBuffer(buffer, function(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'Unknown filetype', 'expected error message');
        assert.equal(err.code, 'EINVALID', 'expected error code');
        assert.end();
    });
});

tape('cli - success', function(assert) {
    var filepath = path.resolve('./test/data/valid-lines.csv');
    exec([__dirname + '/../bin/mapbox-file-sniff.js', filepath].join(' '), {
        env: process.env,
        timeout: 2000
    }, function(err, stdout) {
        assert.ifError(err);
        assert.equal(stdout, '{"type":"csv","protocol":"omnivore:"}\n', 'expected output');
        assert.end();
    });
});
tape('cli - success, --protocol flag', function(assert) {
    var filepath = path.resolve('./test/data/valid-lines.csv');
    exec([__dirname + '/../bin/mapbox-file-sniff.js', filepath, '--protocol'].join(' '), {
        env: process.env,
        timeout: 2000
    }, function(err, stdout) {
        assert.ifError(err);
        assert.equal(stdout, 'omnivore:\n', 'expected output');
        assert.end();
    });
});
tape('cli - success, --type flag', function(assert) {
    var filepath = path.resolve('./test/data/valid-lines.csv');
    exec([__dirname + '/../bin/mapbox-file-sniff.js', filepath, '--type'].join(' '), {
        env: process.env,
        timeout: 2000
    }, function(err, stdout) {
        assert.ifError(err);
        assert.equal(stdout, 'csv\n', 'expected output');
        assert.end();
    });
});
tape('cli - error, invalid file', function(assert) {
    var filepath = path.resolve('./test/data/invalid_geometries.csv');
    exec([__dirname + '/../bin/mapbox-file-sniff.js', filepath].join(' '), {
        env: process.env,
        timeout: 2000
    }, function(err, stdout, stderr) {
        assert.ok(err);
        assert.notOk(stdout);
        assert.equal(stderr, 'Unknown filetype\n', 'expected output');
        assert.end();
    });
});
