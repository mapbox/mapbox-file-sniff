## 1.0.6

- Dependency update to resolve security issues [#65](https://github.com/mapbox/mapbox-file-sniff/pull/65)
  - Update dev dependencies eslint, tape
  - Update dependency yargs to latest 16.x version
  - Remove nyc and coverage utilities
  - Remove semver module

## 1.0.5

- Update eslint + yargs dependencies for security audit
- Use `Buffer.alloc()` instead of `Buffer()`
- Test on node v10 + v12
- Replace coveralls with codecov + upload coverage from travis file
- Update dev dependencies

## 1.0.4

- Bugfix: Remove unneeded "deflate" magic number [#63](https://github.com/mapbox/mapbox-file-sniff/pull/63)

## 1.0.3

- Bugfix: Properly detect `tiff+gz` files [#62](https://github.com/mapbox/mapbox-file-sniff/pull/62)

## 1.0.2

- Add check for zero byte files [#59](https://github.com/mapbox/mapbox-file-sniff/issues/59)

## 1.0.1

- Update to @mapbox namespace for detect-geocsv

## 1.0.0

- :tada: restructure the API into two methods: 1) `fromBuffer` and 2) `fromFile`, which makes mapbox-file-sniff more readable and simpler to use. Each method returns BOTH `protocol` and `type` information, which reduces redundancy. So long fun method names :(
- :tada: update CLI into a single command `mapbox-file-sniff` which returns a JSON of both file types. You can pass the `--protocol` or `--type` flags to get just a protocol or filetype back.
- :warning: remove support for Node 0.10.x
- :package: .npmignore file added to reduce package size
- :package: officially publishing under the `@mapbox/mapbox-file-sniff` namespace, which was introduced in version `0.5.3`.

## 0.5.3

- Bug: using `process.version` resulted in browserify incompatibility, adding a quick check for `process.version` fixes the issue. [#48](https://github.com/mapbox/mapbox-file-sniff/issues/48)

## 0.5.2

- expand GeoJSON filetype detection with smarter sniffing
- gunzip node v6 support by adding `{finishFlush: zlib.Z_SYNC_FLUSH}` option, but keeping support for node v0.10.x

## 0.5.1

- bump `detect-geocsv` to 0.1.0

## 0.5.0

- gzip support for single tiff uploads

## 0.4.4

- handle errors on non-string properties for particular JSONs

## 0.4.3

- add eslint
- fix global leak from missing `var`
- bump `detect-geocsv` module to 0.0.3

## 0.4.2

- fix handling for very small CSV files

## 0.4.1 (DEPRECATED)

## 0.4.0

- remove CSV internal support to use new module `detect-geocsv`

## 0.3.5

- CSV support
- use `Buffer.isBuffer` instead of `instanceof`

## 0.3.4

- allow JSON with spaces inbetween properties

## 0.3.3

- increase JSON validation for GeoJSON and TopoJSON
- fix `-1` bug with `indexOf`

## 0.3.2

- improved `ustar` check

## 0.3.1

- tm2z `ustar` check

## 0.3.0

- bigTIFF support

## 0.2.0

- TopoJSON support

## 0.1.0

- remove `run.js`
- VRT support

## 0.0.9

- increase buffer size to take certain GPX files into account [#50](https://github.com/mapbox/mapnik-omnivore/issues/50)

## 0.0.8

- use GDAL logic for validating geotiffs

## 0.0.7

- exit codes added to command line tools using `quaft`

## 0.0.6

- add `quaft` method to detect filepath vs buffer inputs
- `fs.close` the file after reading is complete
- add shapefile sniffing for unzipped shapefiles

## 0.0.5

- add `waft` method as a first-class citizen with `sniff`
- only partial read of a file in the command line tool
- adds `mapbox-file-type` and `mapbox-file-protocol` command line tools

## 0.0.4

- updated Buffer type check

## 0.0.3

- use Node core `zlib` instead of `pako`.

## 0.0.2

- `sniff` first parameter is a Buffer type instead of a filepath string

## 0.0.1

- initial release
