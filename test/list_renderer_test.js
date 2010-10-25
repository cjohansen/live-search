function assertIsOl(element) {
    assertTagName("ol", element);
    assertClassName("live-search-results", element);
}

TestCase("ListRendererTest", {
    "test should add ol element to root": function () {
        /*:DOC root = <div></div>*/
        var renderer = new ListRenderer(this.root);
        renderer.render(["Robocop"]);

        assertEquals(1, this.root.childNodes.length);
        assertIsOl(this.root.firstChild);
    },

    "test should add li element per data item": function () {
        /*:DOC root = <div></div>*/
        var renderer = new ListRenderer(this.root);
        renderer.render(["Robocop", "Robocop 2"]);

        var list = this.root.firstChild;
        assertEquals(2, list.childNodes.length);
        assertEquals("Robocop", list.childNodes[0].innerHTML);
        assertEquals("Robocop 2", list.childNodes[1].innerHTML);
    },

    "test should not replace existing content": function () {
        /*:DOC root = <div><h2>Hey</h2><p>FrontTrends</p></div>*/
        var renderer = new ListRenderer(this.root);
        renderer.render(["Robocop", "Robocop 2"]);

        assertEquals(3, this.root.childNodes.length);
        assertIsOl(this.root.childNodes[2]);
    },

    "test should reuse existing list": function () {
        /*:DOC root = <div></div>*/
        var renderer = new ListRenderer(this.root);
        renderer.render(["Robocop", "Robocop 2"]);
        renderer.render(["Terminator", "Police Academy", "Planet of the Apes"]);

        assertEquals(1, this.root.childNodes.length);
        var list = this.root.firstChild;
        assertEquals("Terminator", list.childNodes[0].innerHTML);
        assertEquals("Police Academy", list.childNodes[1].innerHTML);
        assertEquals("Planet of the Apes", list.childNodes[2].innerHTML);
    }
});