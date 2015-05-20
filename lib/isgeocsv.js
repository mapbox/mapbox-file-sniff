var geocsvinfo = require('geocsv-info');

module.exports = function(buf) {
    var lines = buf.toString().split(/\r\n|\r|\n/g);

    var i = 0;

    while (lines[i] == '')
        i++;

    var firstline = lines[i];

    var separator = geocsvinfo.detectSeparator(firstline);

    var headers = firstline.split(separator);

    headers = headers.map(function(header) {
        return header.replace(/"/g, '');
    });

    var geometryField = geocsvinfo.detectGeometryField(headers);
    if (!geometryField) {
        return false;
    }

    return true;
};
