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
tape('[mbtiles] Sniffing file: should return mbtiles filetype', function(assert) {
    var file = path.resolve('./test/data/valid.mbtiles');
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
tape('[tilejson Valid] Sniffing file: should return tilejson filetype', function(assert) {
	var file = path.resolve('./test/data/valid.tilejson');
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
tape('[tilejson Invalid] Sniffing file: should return error', function(assert) {
	var file = path.resolve('./test/data/invalid.tilejson');
    filesniffer.sniff(file, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype.');
        assert.equal('EINVALID', err.code);
        assert.end();
    });
});
tape('[serialtiles] Sniffing file: should return serialtiles filetype', function(assert) {
    var file = path.resolve('./test/data/valid-serialtiles.gz');
    var expectedFiletype = 'serialtiles';
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
tape('[tm2z] Sniffing file: should return tm2z filetype', function(assert) {
    var file = path.resolve('./test/data/valid.tm2z');
    var expectedFiletype = 'tm2z';
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
tape('[tm2z Invalid malformed] Sniffing file: should return error', function(assert) {
    var file = path.resolve('./test/data/invalid-malformed.tm2z');
    filesniffer.sniff(file, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype.');
        assert.equal('EINVALID', err.code);
        assert.end();
    });
});
tape('[tm2z Invalid empty] Sniffing file: should return error', function(assert) {
    var file = path.resolve('./test/data/invalid-empty.tm2z');
    filesniffer.sniff(file, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype.');
        assert.equal('EINVALID', err.code);
        assert.end();
    });
});