# mapbox-file-sniff
Node module that returns spatial filetype.

Version format follows [Semantic Version](http://semver.org/)

[![Build Status](https://travis-ci.org/mapbox/mapbox-file-sniff.svg?branch=master)](https://travis-ci.org/mapbox/mapbox-file-sniff)

## Install
With npm:
```
npm install -g mapbox-file-sniff
```

## Example, in JavaScript
```javascript
var filesniffer = require('mapbox-file-sniff');
var buffer = fs.readFileSync('path/to/data/file.geojson');

filesniffer.filetype(buffer, function(err, filetype){
	assert.equal(filetype, 'geojson');
});

filesniffer(buffer, function(err, protocol) {
	assert.equal(protocol, 'omnivore:');
});
```

## Example, in bash
```sh
$ mapbox-file-type path/to/data/file.geojson
# geojson
$ mapbox-file-protocol path/to/data/file.geojson
# omnivore:
```

- `buffer`: Buffer object of file contents (at least length 300)

## `.filetype` returns a `string` for the following filetypes:
- Zipped shapefile: `zip`
- GPX: `gpx`
- KML: `kml`
- GeoJSON: `geojson`
- GeoTIFF: `tif`
- Mbtiles: `mbtiles`
- TileJSON: `tilejson`
- Serialtiles: 'serialtiles'
- tm2z: `tm2z`

## `.protocol` returns a `string` for the following tilelive protocols:
- `omnivore:` tilelive-omnivore (coming soon!)
- `mbtiles:` [node-mbtiles](https://github.com/mapbox/node-mbtiles)
- `tilejson:` [node-tilejson](https://github.com/mapbox/node-tilejson)
- `serialtiles`: *special case*
- `tm2z`: [tilelive-vector](https://github.com/mapbox/tilelive-vector)

## Tests
`npm test`
