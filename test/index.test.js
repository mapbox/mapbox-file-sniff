var tape = require('tape');
var path = require('path');
var testData = path.dirname(require.resolve('mapnik-test-data'));
var filesniffer = require('../index.js');

/**
 * Testing filesniffer.sniff
 */
tape('[KML] Sniffing file: should return kml filetype', function(assert) {
	var file = testData + '/data/kml/1week_earthquake.kml';
    var expectedFiletype = 'kml';
    filesniffer.sniff(file, function(err, filetype) {
    	if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	console.log(err);
        }
        assert.end();
    });
});
tape('[KML BOM] Sniffing file: should return kml filetype', function(assert) {
	var file = path.resolve('./test/data/bom.kml');
    var expectedFiletype = 'kml';
    filesniffer.sniff(file, function(err, filetype) {
    	if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	console.log(err);
        }
        assert.end();
    });
});
tape('[GeoJson] Sniffing file: should return geojson filetype', function(assert) {
	var file = testData + '/data/geojson/DC_polygon.geo.json';
    var expectedFiletype = 'geojson';
    filesniffer.sniff(file, function(err, filetype) {
    	if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	console.log(err);
        }
        assert.end();
    });
});
tape('[GPX] Sniffing file: should return gpx filetype', function(assert) {
	var file = testData + '/data/gpx/fells_loop.gpx';
    var expectedFiletype = 'gpx';
    filesniffer.sniff(file, function(err, filetype) {
    	if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	console.log(err);
        }
        assert.end();
    });
});
tape('[ZIP] Sniffing file: should return shp filetype', function(assert) {
	var file = testData + '/data/zip/us_states.zip';
    var expectedFiletype = 'zip';
    filesniffer.sniff(file, function(err, filetype) {
    	if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	console.log(err);
        }
        assert.end();
    });
});
tape('[TIF] Sniffing file: should return tif filetype', function(assert) {
	var file = testData + '/data/geotiff/sample.tif';
    var expectedFiletype = 'tif';
    filesniffer.sniff(file, function(err, filetype) {
    	if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	console.log(err);
        }
        assert.end();
    });
});
tape('[tilejson good] Sniffing file: should return tilejson filetype', function(assert) {
	var file = path.resolve('./test/data/good.tilejson');
    var expectedFiletype = 'tilejson';
    filesniffer.sniff(file, function(err, filetype) {
    	if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	console.log(err);
        }
        assert.end();
    });
});
// tape('[tilejson Bad] Sniffing file: should return error', function(assert) {
// 	var file = path.resolve('./test/data/bad.tilejson');
//     filesniffer.sniff(file, function(err) {
//         console.log(err);
//         assert.ok(err instanceof Error);
//         assert.error(err, 'Unknown filetype.');
//         assert.equal('EINVALID', err.code);
//         assert.end();
//     });
// });
// tape('[mbtiles Bad] Sniffing file: should return error', function(assert) {
// 	var file = path.resolve('./test/data/bad.mbtiles');
//     filesniffer.sniff(file, function(err) {
//         assert.ok(err instanceof Error);
//         assert.error(err, 'Unknown filetype.');
//         assert.equal('EINVALID', err.code);
//         assert.end();
//     });
// });
tape('[mbtiles good] Sniffing file: should return mbtiles filetype', function(assert) {
	var file = path.resolve('./test/data/good.mbtiles');
    var expectedFiletype = 'mbtiles';
    filesniffer.sniff(file, function(err, filetype) {
    	if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	console.log(err);
        }
        assert.end();
    });
});