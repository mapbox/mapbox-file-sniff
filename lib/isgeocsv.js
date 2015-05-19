var geocsvinfo = require('geocsv-info');

module.exports = function(buf) {
    var lines = buf.toString().split(/\r\n|\r|\n/g);
    var firstline = lines[0];

    var separator = geocsvinfo.detectSeparator(firstline);
    if (!separator) {
        return false;
    }

    headers = firstline.split(separator);

    var geometryField = geocsvinfo.detectGeometryField(headers);
    if (!geometryField) {
        return false;
    }

    return true;
};
