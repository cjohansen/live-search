function XHRDataSource(options) {
    options = options || {};
    this.url = options.url;
    this.method = options.method;
    this.param = options.param;
}

XHRDataSource.prototype.get = function (query, callback) {
    if (this.request) {
        this.request.abort();
    }

    var data = {};
    data[this.param] = query;
    
    this.request = jQuery.ajax({
        url: this.url,
        type: this.method,
        data: data,
        success: callback
    });
};
