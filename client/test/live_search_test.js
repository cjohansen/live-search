TestCase("LiveSearchTest", sinon.testCase({
    setUp: function () {
        this.liveSearch = new LiveSearch();
        this.liveSearch.dataSource = {
            get: sinon.spy()
        };
    },

    "test should not trigger request immediately": function () {
        this.liveSearch.queue("Robocop");

        sinon.assert.notCalled(this.liveSearch.dataSource.get);
    },

    "test should trigger request after 150ms": function () {
        this.liveSearch.queue("Robocop");
        this.liveSearch.onData = function () {};
        this.clock.tick(150);

        sinon.assert.calledOnce(this.liveSearch.dataSource.get);
        sinon.assert.calledWith(this.liveSearch.dataSource.get, "Robocop", this.liveSearch.onData);
    },

    "test should discard old queued searches": function () {
        this.liveSearch.queue("Robocop");
        this.clock.tick(100);
        this.liveSearch.queue("Terminator");
        this.clock.tick(150);

        sinon.assert.calledOnce(this.liveSearch.dataSource.get);
        sinon.assert.calledWith(this.liveSearch.dataSource.get, "Terminator");
    },

    "test should call onData callback on success": function () {
        this.liveSearch.onData = sinon.spy();
        this.liveSearch.queue("Terminator");
        this.clock.tick(150);
        var data = ["Terminator", "Judgement Day"];
        this.liveSearch.dataSource.get.getCall(0).args[1](data);

        sinon.assert.calledOnce(this.liveSearch.onData);
        sinon.assert.calledWith(this.liveSearch.onData, data);
    }
}));
