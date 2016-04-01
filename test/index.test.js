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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[KML Valid] quaff and sniff', function(assert) {
    filesniffer.quaff(testData + '/data/kml/1week_earthquake.kml', function(err, result) {
        assert.ifError(err, 'quaffed valid kml');
        assert.equal(result, 'kml', 'smells right');
        assert.end();
    });
});
tape('[KML Valid] quaff and waft', function(assert) {
    filesniffer.quaff(testData + '/data/kml/1week_earthquake.kml', true, function(err, result) {
        assert.ifError(err, 'quaffed valid kml');
        assert.equal(result, 'omnivore:', 'smells right');
        assert.end();
    });
});
tape('[VRT] Sniffing file: should return vrt filetype and omnivore protocol', function(assert) {
    var filepath = testData + '/data/vrt/sample.vrt';
    var expectedFiletype = 'vrt';
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[VRT Valid] quaff and sniff', function(assert) {
    filesniffer.quaff(testData + '/data/vrt/sample.vrt', function(err, result) {
        assert.ifError(err, 'quaffed valid vrt');
        assert.equal(result, 'vrt', 'smells right');
        assert.end();
    });
});
tape('[VRT Valid] quaff and waft', function(assert) {
    filesniffer.quaff(testData + '/data/vrt/sample.vrt', true, function(err, result) {
        assert.ifError(err, 'quaffed valid vrt');
        assert.equal(result, 'omnivore:', 'smells right');
        assert.end();
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[GeoJson] Sniffing file with nested type property: should return geojson filetype and omnivore protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid-nested-type.json');
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[TopoJson] Sniffing file: should return topojson filetype and omnivore protocol', function(assert) {
    var filepath = testData + '/data/topojson/topo.json';
    var expectedFiletype = 'topojson';
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[SHP] Sniffing file: should return shp filetype and omnivore protocol', function(assert) {
    var filepath = testData + '/data/shp/world_merc/world_merc.shp';
    var expectedFiletype = 'shp';
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[BIGTIFF] Sniffing file: should return tif filetype and omnivore protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid-bigtiff.tif');
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
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
    filesniffer.sniff(buffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype');
        assert.equal('EINVALID', err.code);
        filesniffer.waft(buffer, function(err) {
            assert.ok(err instanceof Error);
            assert.equal(err.message, 'Unknown filetype');
            assert.equal('EINVALID', err.code);
            assert.end();
        });
    });
});
tape('[tilejson Invalid] quaff and sniff', function(assert) {
    filesniffer.quaff(path.resolve('./test/data/invalid.tilejson'), function(err, result) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype');
        assert.equal('EINVALID', err.code);
        assert.end();
    });
});
tape('[tilejson Invalid] quaff and waft', function(assert) {
    filesniffer.quaff(path.resolve('./test/data/invalid.tilejson'), true, function(err, result) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype');
        assert.equal('EINVALID', err.code);
        assert.end();
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'serialtiles:');
            assert.end();
        });
    });
});
tape('[serialtiles] Sniffing file: should return serialtiles filetype and serialtiles protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid-not-csv.serialtiles.gz');
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'tm2z:');
            assert.end();
        });
    });
});
tape('[tm2z] Sniffing file with extended header: should return tm2z filetype and tm2z protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid-paxheader.gz');
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
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
    filesniffer.sniff(buffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype');
        assert.equal('EINVALID', err.code);
        filesniffer.waft(buffer, function(err) {
            assert.ok(err instanceof Error);
            assert.equal(err.message, 'Unknown filetype');
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
    filesniffer.sniff(buffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype');
        assert.equal('EINVALID', err.code);
        filesniffer.waft(buffer, function(err) {
            assert.ok(err instanceof Error);
            assert.equal(err.message, 'Unknown filetype');
            assert.equal('EINVALID', err.code);
            assert.end();
        });
    });
});
tape('[Not Buffer object] Passing in invalid parameter: should return error', function(assert) {
    var invalidBuffer = 'invalid';
    filesniffer.sniff(invalidBuffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Must pass in type Buffer object.');
        assert.equal('EINVALID', err.code);
        filesniffer.waft(invalidBuffer, function(err) {
            assert.ok(err instanceof Error);
            assert.equal(err.message, 'Must pass in type Buffer object.');
            assert.equal('EINVALID', err.code);
            assert.end();
        });
    });
});
tape('[Invalid type value] Passing in an invalid value for the type property: should return error', function(assert) {
    var filepath = path.resolve('./test/data/invalid-type.json')
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
    filesniffer.sniff(buffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype');
        filesniffer.waft(buffer, function(err) {
            assert.ok(err instanceof Error);
            assert.equal(err.code, 'EINVALID');
            assert.end();
        });
    });
});
tape('[No such file] empty gulp', function(assert) {
    filesniffer.quaff(path.resolve('./test/data/fake'), function(err, result) {
        assert.ok(err instanceof Error);
        assert.equal('ENOENT', err.code);
        assert.end();
    });
});
tape('[Small file] small gulp', function(assert) {
    filesniffer.quaff(path.resolve('./test/data/small.csv'), function(err, result) {
        assert.ok(err instanceof Error);
        assert.equal('EINVALID', err.code);
        assert.end();
    });
});
tape('[CSV] Sniffing file: should return csv filetype and omnivore protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid-points.csv');
    var expectedFiletype = 'csv';
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[CSV] Sniffing file with blank first line: should return csv filetype and omnivore protocol', function(assert) {
    var filepath = path.resolve('./test/data/blank_rows.csv');
    var expectedFiletype = 'csv';
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[CSV] Sniffing file with one field: should return csv filetype and omnivore protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid-one-field.csv');
    var expectedFiletype = 'csv';
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[CSV] Sniffing file with empty rows: should return csv filetype and omnivore protocol', function(assert) {
    var filepath = path.resolve('./test/data/valid-empty_rows.csv');
    var expectedFiletype = 'csv';
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
    filesniffer.sniff(buffer, function(err, filetype) {
        if (err) return assert.end(err);
        assert.ok(err === null);
        try {
            assert.equal(filetype, expectedFiletype);
        } catch (err) {
            return assert.end(err);
        }
        filesniffer.waft(buffer, function(err, protocol) {
            assert.ifError(err);
            assert.equal(protocol, 'omnivore:');
            assert.end();
        });
    });
});
tape('[CSV Invalid empty] Sniffing file: should return error', function(assert) {
    var filepath = path.resolve('./test/data/invalid-blank.csv');
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
    filesniffer.sniff(buffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype');
        assert.equal('EINVALID', err.code);
        filesniffer.waft(buffer, function(err) {
            assert.ok(err instanceof Error);
            assert.equal(err.message, 'Unknown filetype');
            assert.equal('EINVALID', err.code);
            assert.end();
        });
    });
});
tape('[CSV Invalid Geometries] Sniffing file: should return error', function(assert) {
    var filepath = path.resolve('./test/data/invalid_geometries.csv');
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
    filesniffer.sniff(buffer, function(err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Unknown filetype');
        assert.equal('EINVALID', err.code);
        filesniffer.waft(buffer, function(err) {
            assert.ok(err instanceof Error);
            assert.equal(err.message, 'Unknown filetype');
            assert.equal('EINVALID', err.code);
            assert.end();
        });
    });
});
