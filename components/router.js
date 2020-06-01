
function Route(name, defaultRoute) {
    try {
        if(!name ) {
            throw 'Error: "name" is a required parameter';
        }
        this.constructor(name, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    navElement: undefined,
    default: false,
    constructor: function (name, defaultRoute) {
        this.name = name;
        this.navElement = document.getElementById('nav-'+name);
        this.default = defaultRoute;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}

function Router(routes) {
    try {
        if (!routes) {
            throw 'Error: "routes" is a required parameter';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },

    init: function () {
        var r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },

    hasChanged: function(scope, routes){
        if (window.location.hash.length > 0) {
            for (var route of routes) {
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.updateActiveNav(route.navElement)
                    scope.goToRoute(route.name);
                }
            }
        } else {
            for (var route of routes) {
                if(route.default) {
                    scope.updateActiveNav(route.navElement)
                    scope.goToRoute(route.name);
                }
            }
        }
    },

    goToRoute: function (name) {
        (function(scope) {
            const url = 'views/' + name + '.html';
            const jsFile = 'js/' + name + '.js';
            const xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;

                    const previousScript = document.querySelector('#route-js');
                    if (previousScript) {
                      previousScript.remove();
                    }

                    const body = document.querySelector('body');
                    const script = document.createElement('script');
                    script.id = 'route-js'
                    script.src = jsFile;
                    body.appendChild(script);
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    },

    updateActiveNav: function(navElement) {
        (function(scope) {
            var previousRoute = scope.routes.find(e => e.navElement.classList.contains('active'));
            if (previousRoute) {
                previousRoute.navElement.classList.remove('active');
            }
            navElement.classList.add('active');
        })(this);
    }
};


