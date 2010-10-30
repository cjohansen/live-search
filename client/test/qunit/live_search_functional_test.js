module("LiveSearchFunctionalTest");

test("should display suggestions as user types", function () {
    var server = this.sandbox.useFakeServer();

    server.respondWith(
        "GET", "/search?q=Robo",
        [200, { "Content-Type": "application/json" },
         '["Robocop", "Robocop 2", "Robocop 3"]']
    );

    server.respondWith(
        "GET", "/search?q=Roboc",
        [200, { "Content-Type": "application/json" },
         '["Robocop", "Robocop 2", "Robocop 3"]']
    );

    var form = jQuery("#qunit-fixture");
    form.liveSearch();
    var input = form.find("input[type=text]");

    input.val("R");
    input.trigger("keyup");
    this.clock.tick(89);

    input.val("Ro");
    input.trigger("keyup");
    this.clock.tick(98);

    input.val("Rob");
    input.trigger("keyup");
    this.clock.tick(69);

    input.val("Robo");
    input.trigger("keyup");
    this.clock.tick(109);

    var results = form.find("ol.live-search-results li");
    equal(0, results.length);

    input.val("Roboc");
    input.trigger("keyup");
    this.clock.tick(150);

    server.respond();

    results = form.find("ol.live-search-results li");
    equal(3, results.length);
    equal("Robocop", results.get(0).innerHTML);
    equal("Robocop 2", results.get(1).innerHTML);
    equal("Robocop 3", results.get(2).innerHTML);
});
