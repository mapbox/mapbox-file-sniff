# mapbox-file-sniff
Node module that returns type of spatial file.

Version format follows [Semantic Version](http://semver.org/)

[![Build Status](https://travis-ci.org/mapbox/mapbox-file-sniff.svg?branch=master)](https://travis-ci.org/mapbox/mapbox-file-sniff)

# Example
```
filesniffer.sniff(filepath, function(err, type){
	if(err) console.log(err);
	else console.log(type);
});
```

## Returns a `string` for the following filetypes:
- zipped shapefile: `zip`
- GPX: `gpx`
- KML: `kml`
- GeoJSON: `geojson`
- GeoTIFF: `tif`
- Mbtiles: `mbtiles`
- TileJSON: `tilejson`


## Install
With npm:
```
npm install mapbox-file-sniff
```

## Tests
`npm test`
