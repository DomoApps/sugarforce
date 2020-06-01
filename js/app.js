(function () {
    function init() {
        var router = new Router([
            new Route('home', true),
            new Route('leads'),
            new Route('opportunities'),
            new Route('reports')
        ]);
    }
    init();
}());