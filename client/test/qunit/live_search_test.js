(function () {
    module("LiveSearchTest");

    function createLiveSearch() {
        var liveSearch = new LiveSearch();
        liveSearch.dataSource = {
            get: sinon.spy()
        };

        return liveSearch;
    };

    test("should not trigger request immediately", function () {
        var liveSearch = createLiveSearch();
        liveSearch.queue("Robocop");

        sinon.assert.notCalled(liveSearch.dataSource.get);
    });

    test("should trigger request after 150ms", function () {
        var liveSearch = createLiveSearch();
        liveSearch.queue("Robocop");
        liveSearch.onData = function () {};
        this.clock.tick(150);

        sinon.assert.calledOnce(liveSearch.dataSource.get);
        sinon.assert.calledWith(liveSearch.dataSource.get, "Robocop", liveSearch.onData);
    });

    test("should discard old queued searches", function () {
        var liveSearch = createLiveSearch();
        liveSearch.queue("Robocop");
        this.clock.tick(100);
        liveSearch.queue("Terminator");
        this.clock.tick(150);

        sinon.assert.calledOnce(liveSearch.dataSource.get);
        sinon.assert.calledWith(liveSearch.dataSource.get, "Terminator");
    });

    test("should call onData callback on success", function () {
        var liveSearch = createLiveSearch();
        liveSearch.onData = sinon.spy();
        liveSearch.queue("Terminator");
        this.clock.tick(150);
        var data = ["Terminator", "Judgement Day"];
        liveSearch.dataSource.get.getCall(0).args[1](data);

        sinon.assert.calledOnce(liveSearch.onData);
        sinon.assert.calledWith(liveSearch.onData, data);
    });
}());