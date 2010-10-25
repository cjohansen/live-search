function LiveSearch() {}

LiveSearch.prototype.queue = function (query) {
    if (this.timerId) {
        clearTimeout(this.timerId);
    }

    var self = this;

    this.timerId = setTimeout(function () {
        self.dataSource.get(query, self.onData);
    }, 150);
};