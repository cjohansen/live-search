TestCase("XHRDataSourceTest", sinon.testCase({
    "test should make request": function () {
        var dataSource = new XHRDataSource();
        dataSource.get();

        assertEquals(1, this.server.requests.length);
    },

    "test should make get request to /search?q=query": function () {
        var dataSource = new XHRDataSource({
            url: "/search",
            method: "GET",
            param: "q"
        });

        dataSource.get("query");

        assertEquals("/search?q=query", this.server.requests[0].url);
        assertEquals("GET", this.server.requests[0].method);
    },

    "test should abort pending query": function () {
        var dataSource = new XHRDataSource({
            url: "/search",
            method: "GET",
            param: "q"
        });

        dataSource.get("query");
        sinon.spy(this.server.requests[0], "abort");
        dataSource.get("other query");

        assertEquals(2, this.server.requests.length);
        sinon.assert.called(this.server.requests[0].abort);
    },

    "test should call callback on success": function () {
        this.server.respondWith(
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
        this.server.respond();

        sinon.assert.calledWith(spy, ["Movie 1", "Movie 2"]);
    }
}));