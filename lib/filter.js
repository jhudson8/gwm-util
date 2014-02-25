var through = require('through2'),
    multimatch = require('multimatch');

module.exports = function(pattern, restoreFunction) {
  var buffer = [];
  pattern = typeof pattern === 'string' ? [pattern] : pattern;

  var filter = through.obj(function(file, enc, cb) {
        var match = typeof pattern === 'function' ? pattern(file) :
          multimatch(file.relative, pattern, {dot: true}).length > 0;

        if (match) {
          this.push(file);
          cb();
        } else {
          buffer.push(file);
          cb();
        }
      });

  var restore = through.obj(function(file, enc, cb) {
    this.push(file);
    cb();
  }, function(cb) {
    while (buffer.length > 0) {
      var file = buffer.pop();
      if (!restoreFunction || restoreFunction(file)) {
        this.push(buffer.pop());
      }
    }
    cb();
  });

  return {
    filter: filter,
    restore: restore
  }
};
