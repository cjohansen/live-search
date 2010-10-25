function ListRenderer(root) {
    this.root = root;
}

ListRenderer.prototype.render = function (data) {
    var html = "";

    for (var i = 0, l = data.length; i < l; ++i) {
        html += "<li>" + data[i] + "</li>";
    }

    if (!this.list) {
        this.list = document.createElement("ol");
        this.list.className = "live-search-results";
        this.root.appendChild(this.list);
    }

    this.list.innerHTML = html;
};