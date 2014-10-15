# mapbox-file-sniff
Node module that returns type of spatial file.

Version format follows [Semantic Version](http://semver.org/)

[![Build Status](https://travis-ci.org/mapbox/mapbox-file-sniff.svg?branch=master)](https://travis-ci.org/mapbox/mapbox-file-sniff)

# Example
```
filesniffer.sniff(buffer, function(err, filetype){
	if(err) console.log(err);
	//returns filetype as a string value
	else console.log(filetype);
});
```
- `buffer` type Buffer object of file contents of at least length 300

## Returns a `string` for the following filetypes:
- Zipped shapefile: `zip`
- GPX: `gpx`
- KML: `kml`
- GeoJSON: `geojson`
- GeoTIFF: `tif`
- Mbtiles: `mbtiles`
- TileJSON: `tilejson`
- tm2z: `tm2z`


## Install
With npm:
```
npm install mapbox-file-sniff
```

## Tests
`npm test`
