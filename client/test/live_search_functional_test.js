TestCase("LiveSearchFunctionalTest", sinon.testCase({
    "test should display suggestions as user types": function () {
        /*:DOC form = <form action="/search" method="get">
            <fieldset>
              <input type="text" name="q">
              <input type="submit" value="Go!">
            </fieldset>
          </form>*/

        this.server.respondWith(
            "GET", "/search?q=Robo",
            [200, { "Content-Type": "application/json" },
             '["Robocop", "Robocop 2", "Robocop 3"]']
        );

        this.server.respondWith(
            "GET", "/search?q=Roboc",
            [200, { "Content-Type": "application/json" },
             '["Robocop", "Robocop 2", "Robocop 3"]']
        );

        var form = jQuery(this.form);
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
        assertEquals(0, results.length);

        input.val("Roboc");
        input.trigger("keyup");
        this.clock.tick(150);

        this.server.respond();

        results = form.find("ol.live-search-results li");
        assertEquals(3, results.length);
        assertEquals("Robocop", results.get(0).innerHTML);
        assertEquals("Robocop 2", results.get(1).innerHTML);
        assertEquals("Robocop 3", results.get(2).innerHTML);
    }
}));