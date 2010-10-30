(function () {
    function assertIsOl(element) {
        ok(/^ol$/i.test(element.tagName));
        ok(jQuery(element).hasClass("live-search-results"));
    }
    
    module("ListRendererTest");

    test("should add ol element to root", function () {
        var root = document.createElement("div");
        var renderer = new ListRenderer(root);
        renderer.render(["Robocop"]);

        equal(1, root.childNodes.length);
        assertIsOl(root.firstChild);
    });

    test("should add li element per data item", function () {
        var root = document.createElement("div");
        var renderer = new ListRenderer(root);
        renderer.render(["Robocop", "Robocop 2"]);

        var list = root.firstChild;
        equal(2, list.childNodes.length);
        equal("Robocop", list.childNodes[0].innerHTML);
        equal("Robocop 2", list.childNodes[1].innerHTML);
    });

    test("should not replace existing content", function () {
        var root = jQuery("<div><h2>Hey</h2><p>FrontTrends</p></div>").get(0);
        var renderer = new ListRenderer(root);
        renderer.render(["Robocop", "Robocop 2"]);

        equal(3, root.childNodes.length);
        assertIsOl(root.childNodes[2]);
    });

    test("should reuse existing list", function () {
        var root = document.createElement("div");
        var renderer = new ListRenderer(root);
        renderer.render(["Robocop", "Robocop 2"]);
        renderer.render(["Terminator", "Police Academy", "Planet of the Apes"]);

        equal(1, root.childNodes.length);
        var list = root.firstChild;
        equal("Terminator", list.childNodes[0].innerHTML);
        equal("Police Academy", list.childNodes[1].innerHTML);
        equal("Planet of the Apes", list.childNodes[2].innerHTML);
    });
}());
