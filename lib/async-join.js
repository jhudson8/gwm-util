module.exports = function(callback) {
  var callbacks = {},
      id = 0
      complete = false;;

  function markAndCheckStatus(id, err) {
    callbacks[id]
  }

  function genCallback(id, localCallback) {
    return function (err) {
      localCallback && localCallback.apply(this, arguments);

      callbacks[id] = err || 'success';
      if (!complete) {
        return;
      }

      var err;
      for (var i in callbacks) {
        if (callbacks[i] === 'pending') {
          return;
        } else if (callbacks[i] != 'success') {
          err = callbacks[i];
        }
      }
      callback && callback(err);
    }
  }

  return {
    // register the callback as a blocker for the source callback
    newCallback: function(callback) {
      var _id = id++;
      callbacks[id] = 'pending';
      return genCallback(id, callback);
    },

    // notify that all callbacks have been registered
    complete: function() {
      complete = true;
    }
  }
};
