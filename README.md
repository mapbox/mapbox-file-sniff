![](mapbox-file-sniff.jpg)

## Mapbox File Sniff [![Build Status](https://travis-ci.org/mapbox/mapbox-file-sniff.svg?branch=master)](https://travis-ci.org/mapbox/mapbox-file-sniff)

Node module that returns a spatial filetype and protocol.

File types:

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

Protocols:

- `omnivore:` [tilelive-omnivore](https://github.com/mapbox/tilelive-omnivore)
- `mbtiles:` [node-mbtiles](https://github.com/mapbox/node-mbtiles)
- `tilejson:` [node-tilejson](https://github.com/mapbox/node-tilejson)
- `serialtiles`: *special case*
- `tm2z`: [tilelive-vector](https://github.com/mapbox/tilelive-vector)

### Install

With npm:
```
npm install -g mapbox-file-sniff
```

### Javascript example

One method that can take either a _filepath_ or _buffer_.

```javascript
var filesniffer = require('mapbox-file-sniff');
var buffer = fs.readFileSync('path/to/data/file.geojson');

filesniffer(buffer, function(err, info) {
		if (err) throw err;
		console.log(info);
		// {
		//   protocol: 'omnivore:',
		//   type: 'geojson'
		// }
});
```

### CLI example
```sh
$ mapbox-file-sniff path/to/data/file.geojson
# {"protocol":"omnivore:","type":"geojson"}
$ mapbox-file-sniff path/to/data/file.geojson --type
# geojson
$ mapbox-file-sniff path/to/data/file.geojson --protocol
# omnivore:
```

## Tests

Full test suite:

`npm test`

Run an individual test:

`tape test/name.of.test.js`
