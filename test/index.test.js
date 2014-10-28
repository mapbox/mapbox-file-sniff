var tape = require('tape');
var path = require('path');
var fs = require('fs');
var testData = path.dirname(require.resolve('mapnik-test-data'));
var filesniffer = require('../index.js');

/**
 * Testing filesniffer
 */
tape('[KML] Sniffing file: should return kml filetype and omnivore protocol', function(assert) {
		var filepath = testData + '/data/kml/1week_earthquake.kml';
    var expectedFiletype = 'kml';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
    		if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'omnivore:');
						assert.end();
				});
    });

});
tape('[KML BOM] Sniffing file: should return kml filetype and omnivore protocol', function(assert) {
		var filepath = path.resolve('./test/data/bom.kml');
    var expectedFiletype = 'kml';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
    		if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'omnivore:');
						assert.end();
				});
    });
});
tape('[GeoJson] Sniffing file: should return geojson filetype and omnivore protocol', function(assert) {
		var filepath = testData + '/data/geojson/DC_polygon.geo.json';
    var expectedFiletype = 'geojson';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
    		if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'omnivore:');
						assert.end();
				});
    });
});
tape('[GPX] Sniffing file: should return gpx filetype and omnivore protocol', function(assert) {
		var filepath = testData + '/data/gpx/fells_loop.gpx';
    var expectedFiletype = 'gpx';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
    		if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'omnivore:');
						assert.end();
				});
    });
});
tape('[ZIP] Sniffing file: should return shp filetype and omnivore protocol', function(assert) {
		var filepath = testData + '/data/zip/us_states.zip';
    var expectedFiletype = 'zip';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
    		if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'omnivore:');
						assert.end();
				});
    });
});
tape('[TIF] Sniffing file: should return tif filetype and omnivore protocol', function(assert) {
		var filepath = testData + '/data/geotiff/sample.tif';
    var expectedFiletype = 'tif';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
    		if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'omnivore:');
						assert.end();
				});
    });
});
tape('[mbtiles] Sniffing file: should return mbtiles filetype and mbtiles protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid.mbtiles');
    var expectedFiletype = 'mbtiles';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'mbtiles:');
						assert.end();
				});
    });
});
tape('[tilejson Valid] Sniffing file: should return tilejson filetype and tilejson protocol', function(assert) {
		var filepath = path.resolve('./test/data/valid.tilejson');
    var expectedFiletype = 'tilejson';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
    		if (err) return assert.end(err);
        assert.ok(err === null);
        try {
	        assert.equal(filetype, expectedFiletype);
        } catch (err) {
        	return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'tilejson:');
						assert.end();
				});
    });
});
tape('[tilejson Invalid] Sniffing file: should return error', function(assert) {
	var filepath = path.resolve('./test/data/invalid.tilejson');
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype.');
        assert.equal('EINVALID', err.code);
        filesniffer.protocol(buffer, function(err) {
						assert.ok(err instanceof Error);
						assert.equal(err.message, 'Unknown filetype.');
						assert.equal('EINVALID', err.code);
						assert.end();
				});
    });
});
tape('[serialtiles] Sniffing file: should return serialtiles filetype and serialtiles protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid-serialtiles.gz');
    var expectedFiletype = 'serialtiles';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
		console.log('hi');
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'serialtiles:');
						assert.end();
				});
    });
});
tape('[tm2z] Sniffing file: should return tm2z filetype and tm2z protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid.tm2z');
    var expectedFiletype = 'tm2z';
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.protocol(buffer, function(err, protocol) {
						assert.ifError(err);
						assert.equal(protocol, 'tm2z:');
						assert.end();
				});
    });
});
tape('[tm2z Invalid malformed] Sniffing file: should return error', function(assert) {
    var filepath = path.resolve('./test/data/invalid-malformed.tm2z');
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype.');
        assert.equal('EINVALID', err.code);
        filesniffer.protocol(buffer, function(err) {
						assert.ok(err instanceof Error);
						assert.equal(err.message, 'Unknown filetype.');
						assert.equal('EINVALID', err.code);
						assert.end();
				});
    });
});
tape('[tm2z Invalid empty] Sniffing file: should return error', function(assert) {
    var filepath = path.resolve('./test/data/invalid-empty.tm2z');
    var buffer;
    try {
        fs.statSync(filepath);
        buffer = new Buffer(512);
        var fd = fs.openSync(filepath, 'r');
        fs.readSync(fd, buffer, 0, 512, 0);
        fs.closeSync(fd);
    } catch (err) {
        return assert.end(err);
    }
    filesniffer.filetype(buffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype.');
        assert.equal('EINVALID', err.code);
        filesniffer.protocol(buffer, function(err) {
						assert.ok(err instanceof Error);
						assert.equal(err.message, 'Unknown filetype.');
						assert.equal('EINVALID', err.code);
						assert.end();
				});
    });
});
tape('[Not Buffer object] Passing in invalid parameter: should return error', function(assert) {
    var invalidBuffer = 'invalid';
    filesniffer.filetype(invalidBuffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Must pass in type Buffer object.');
        assert.equal('EINVALID', err.code);
        filesniffer.protocol(invalidBuffer, function(err) {
						assert.ok(err instanceof Error);
						assert.equal(err.message, 'Must pass in type Buffer object.');
						assert.equal('EINVALID', err.code);
						assert.end();
				});
    });
});
