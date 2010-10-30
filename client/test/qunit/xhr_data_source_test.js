module("XHRDataSourceTest");

test("should make request", function () {
    var server = this.sandbox.useFakeServer();
    var dataSource = new XHRDataSource();
    dataSource.get();

    equal(1, server.requests.length);
});

test("should make get request to /search?q=query", function () {
    var server = this.sandbox.useFakeServer();

    var dataSource = new XHRDataSource({
        url: "/search",
        method: "GET",
        param: "q"
    });

    dataSource.get("query");

    equal("/search?q=query", server.requests[0].url);
    equal("GET", server.requests[0].method);
});

test("should abort pending query", function () {
    server = this.sandbox.useFakeServer();

    var dataSource = new XHRDataSource({
        url: "/search",
        method: "GET",
        param: "q"
    });

    dataSource.get("query");
    sinon.spy(server.requests[0], "abort");
    dataSource.get("other query");

    equal(2, server.requests.length);
    sinon.assert.called(server.requests[0].abort);
});

test("should call callback on success", function () {
    server = this.sandbox.useFakeServer();

    server.respondWith(
        "GET", "/search?q=query",
        [200, { "Content-Type": "application/json" }, '["Movie 1", "Movie 2"]']
    );

    var dataSource = new XHRDataSource({
        url: "/search",
        method: "GET",
        param: "q"
    });

    var spy = sinon.spy();
    dataSource.get("query", spy);
    server.respond();

    sinon.assert.calledWith(spy, ["Movie 1", "Movie 2"]);
});
