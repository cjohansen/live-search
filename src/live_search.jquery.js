jQuery.fn.liveSearch = function () {
    this.each(function () {
        var form = jQuery(this);
        var input = form.find("input[type=text]");
        var liveSearch = new LiveSearch();

        liveSearch.dataSource = new XHRDataSource({
            url: this.action,
            method: this.method,
            param: input.attr("name")
        });

        var renderer = new ListRenderer(this);
        liveSearch.onData = function (data) {
            renderer.render(data);
        };

        input.bind("keyup", function () {
            liveSearch.queue(this.value);
        });
    });
};
