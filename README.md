⚠️ This repository is no longer actively maintained by Mapbox.

![](mapbox-file-sniff.jpg)

## Mapbox File Sniff 

Node module that returns a spatial filetype and protocol.

File types:

- Zipped shapefile: `zip`
- Unziped shapefile: `shp`
- GPX: `gpx`
- KML: `kml`
- GeoJSON: `geojson`
- GeoTIFF: `tif`
- Zipped GeoTIFF: `tif`
- Mbtiles: `mbtiles`
- TileJSON: `tilejson`
- Serialtiles: `serialtiles`
- tm2z: `tm2z`
- csv: `csv`

Protocols (matching tilelive protocols):

- `omnivore:` [tilelive-omnivore](https://github.com/mapbox/tilelive-omnivore)
- `mbtiles:` [node-mbtiles](https://github.com/mapbox/node-mbtiles)
- `tilejson:` [node-tilejson](https://github.com/mapbox/node-tilejson)
- `serialtiles`: *special case*
- `tm2z`: [tilelive-vector](https://github.com/mapbox/tilelive-vector)

# Install

With npm:
```
npm install @mapbox/mapbox-file-sniff
```

# Usage

```Javascript
var sniffer = require('@mapbox/mapbox-file-sniff');
```

### Javascript

**`fromBuffer(Buffer)`** - Sniff a file from a buffer.

```javascript
var buffer = fs.readFileSync('path/to/data/file.geojson');
sniffer.fromBuffer(buffer, function(err, info) {
	if (err) throw err;
	console.log(info);
	// {
	//   protocol: 'omnivore:',
	//   type: 'geojson'
	// }
});
```

**`fromFile(String)`** - Sniff a file from a file path.

```javascript
var file = './path/to/data/file.geojson';
sniffer.fromFile(file, function(err, info) {
	if (err) throw err;
	console.log(info);
	// {
	//   protocol: 'omnivore:',
	//   type: 'geojson'
	// }
});
```

### CLI

```sh
$ mapbox-file-sniff path/to/data/file.geojson
# {"protocol":"omnivore:","type":"geojson"}
$ mapbox-file-sniff path/to/data/file.geojson --type
# geojson
$ mapbox-file-sniff path/to/data/file.geojson --protocol
# omnivore:
```

# Tests

Full test suite:

`npm test`
