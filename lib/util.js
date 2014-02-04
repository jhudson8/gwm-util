module.exports = {
  endsWith: function(s, suffix) {
    return s.indexOf(suffix, s.length - suffix.length) !== -1
  },
  priorityIndex: function(s, priorityList) {
    if (!priorityList || !priorityList.length) {
      return 0;
    }
    priorityList = priorityList.map(function(item) {
      return new RegExp(item.replace('*', '.*').replace('(', '\\(').replace(')', '\\)'));
    });

    for (var i in priorityList) {
      var priority = priorityList[i];
      if (s.match(priority)) {
        return priorityList.length - i;
      }
    }
    return 9999;
  }
}