var through = require('through2');

module.exports = function(fileFormat, buffer, flush) {
  var pattern = new RegExp(fileFormat.replace('.', '\\.').replace('*', '.*'));

  return through.obj(function(file, enc, cb) {
    if (file.path.match(pattern)) {
      buffer.call(this, file, enc, cb);
    } else {
      this.push(file);
      cb();
    }
  }, flush);
};
