![](mapbox-file-sniff.jpg)

## Mapbox File Sniff [![Build Status](https://travis-ci.org/mapbox/mapbox-file-sniff.svg?branch=master)](https://travis-ci.org/mapbox/mapbox-file-sniff)

Node module that returns spatial filetype.

### Install

With npm:
```
npm install -g mapbox-file-sniff
```

### Javascript example
```javascript
var filesniffer = require('mapbox-file-sniff');
var buffer = fs.readFileSync('path/to/data/file.geojson');

filesniffer.sniff(buffer, function(err, filetype){
	console.log(filetype); // => 'geojson'
});

filesniffer.waft(buffer, function(err, protocol) {
  console.log(protocol); // 'omnivore:'
});

filesniffer.quaff('path/to/data/file.geojson', true, function(err, protocol) {
  console.log(protocol); // => 'geojson'
});
```

### CLI example
```sh
$ mapbox-file-type path/to/data/file.geojson
# geojson
$ mapbox-file-protocol path/to/data/file.geojson
# omnivore:
```

- `buffer`: Buffer object of file contents (at least length 300)

## API

### `sniff(buffer, callback)` 

Returns a `string` for the following filetypes:

- Zipped shapefile: `zip`
- Unziped shapefile: `shp`
- GPX: `gpx`
- KML: `kml`
- GeoJSON: `geojson`
- GeoTIFF: `tif`
- Mbtiles: `mbtiles`
- TileJSON: `tilejson`
- Serialtiles: `serialtiles`
- tm2z: `tm2z`
- csv: `csv`

### `waft(buffer, callback)` 

Returns a `string` for the following tilelive protocols:

- `omnivore:` [tilelive-omnivore](https://github.com/mapbox/tilelive-omnivore)
- `mbtiles:` [node-mbtiles](https://github.com/mapbox/node-mbtiles)
- `tilejson:` [node-tilejson](https://github.com/mapbox/node-tilejson)
- `serialtiles`: *special case*
- `tm2z`: [tilelive-vector](https://github.com/mapbox/tilelive-vector)

### `quaff(filepath, protocol, callback)`

A wrapper around `waft` and `sniff` that lets you pass in a file path (read as a buffer) and protocol to either return the protocol (waft) or the file type (sniff).

## Tests

Full test suite:

`npm test`

Run an individual test:

`tape test/name.of.test.js`