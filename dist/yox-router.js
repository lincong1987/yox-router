(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.YoxRouter = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var shared = void 0;
var is = void 0;
var dom = void 0;
var array = void 0;
var object = void 0;
var string = void 0;
var logger = void 0;
var Component = void 0;

var PREFIX_HASH = '#!';

var PREFIX_PARAM = ':';

var SEPARATOR_PATH = '/';

var SEPARATOR_QUERY = '&';

var SEPARATOR_PAIR = '=';

var FLAG_ARRAY = '[]';

function parseValue(value) {
  if (is.numeric(value)) {
    value = +value;
  } else if (is.string(value)) {
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (value === 'null') {
      value = null;
    } else if (value === 'undefined') {
      value = undefined;
    } else {
      value = decodeURIComponent(value);
    }
  }
  return value;
}

function stringifyPair(key, value) {
  var result = [key];
  if (is.string(value)) {
    array.push(result, encodeURIComponent(value));
  } else if (is.number(value) || is.boolean(value)) {
    array.push(result, value.toString());
  } else if (value === null) {
    array.push(result, 'null');
  } else if (value === undefined) {
    array.push(result, 'undefined');
  }
  return result.join(SEPARATOR_PAIR);
}

function parseQuery(query) {
  var result = void 0,
      terms = void 0,
      key = void 0,
      value = void 0;
  if (query) {
    array.each(query.split(SEPARATOR_QUERY), function (term) {
      terms = term.split(SEPARATOR_PAIR);
      key = string.trim(terms[0]);
      value = terms[1];
      if (key) {
        if (!result) {
          result = {};
        }
        value = parseValue(value);
        if (string.endsWith(key, FLAG_ARRAY)) {
          key = string.slice(key, 0, -FLAG_ARRAY.length);
          var list = result[key] || (result[key] = []);
          array.push(list, value);
        } else {
          result[key] = value;
        }
      }
    });
  }
  return result;
}

function stringifyQuery(query) {
  var result = [];
  object.each(query, function (value, key) {
    if (is.array(value)) {
      array.each(value, function (value) {
        value = stringifyPair(key + FLAG_ARRAY, value);
        if (value) {
          array.push(result, value);
        }
      });
    } else {
      value = stringifyPair(key, value);
      if (value) {
        array.push(result, value);
      }
    }
  });
  return result.join(SEPARATOR_QUERY);
}

function parseParams(realpath, path) {

  var result = void 0;

  var realpathTerms = realpath.split(SEPARATOR_PATH);
  var pathTerms = path.split(SEPARATOR_PATH);

  if (realpathTerms.length === pathTerms.length) {
    array.each(pathTerms, function (item, index) {
      if (string.startsWith(item, PREFIX_PARAM)) {
        if (!result) {
          result = {};
        }
        result[item.slice(PREFIX_PARAM.length)] = parseValue(realpathTerms[index]);
      }
    });
  }

  return result;
}

function getPathByRealpath(path2Route, realpath) {

  var result = void 0;

  var realpathTerms = realpath.split(SEPARATOR_PATH);
  object.each(path2Route, function (route, path) {
    var pathTerms = path.split(SEPARATOR_PATH);
    if (realpathTerms.length === pathTerms.length) {
      array.each(pathTerms, function (item, index) {
        if (!string.startsWith(item, PREFIX_PARAM) && item !== realpathTerms[index]) {
          path = null;
          return false;
        }
      });
      if (path) {
        result = path;
        return false;
      }
    }
  });

  return result;
}

function parseHash(path2Route, hash) {
  var realpath = void 0,
      search = void 0;
  var index = hash.indexOf('?');
  if (index >= 0) {
    realpath = hash.substring(0, index);
    search = hash.slice(index + 1);
  } else {
    realpath = hash;
  }

  var result = { realpath: realpath };

  var path = getPathByRealpath(path2Route, realpath);
  if (path) {
    result.path = path;
    result.params = parseParams(realpath, path);
    result.query = parseQuery(search);
  }
  return result;
}

function stringifyHash(path, params, query) {

  var realpath = [],
      search = '';

  array.each(path.split(SEPARATOR_PATH), function (item) {
    array.push(realpath, string.startsWith(item, PREFIX_PARAM) ? params[item.slice(PREFIX_PARAM.length)] : item);
  });

  realpath = realpath.join(SEPARATOR_PATH);

  if (query) {
    query = stringifyQuery(query);
    if (query) {
      search = '?' + query;
    }
  }

  return PREFIX_HASH + realpath + search;
}

var Chain = function () {
  function Chain() {
    classCallCheck(this, Chain);

    this.list = [];
  }

  createClass(Chain, [{
    key: 'use',
    value: function use(fn, context) {
      if (is.func(fn)) {
        array.push(this.list, { fn: fn, context: context });
      }
    }
  }, {
    key: 'run',
    value: function run(to, from, success, failure) {
      var list = this.list;

      var i = -1;
      var next = function next(value) {
        if (value == null) {
          i++;
          if (list[i]) {
            list[i].fn.call(list[i].context, to, from, next);
          } else if (success) {
            success();
          }
        } else if (failure) {
          failure(value);
        }
      };
      next();
    }
  }]);
  return Chain;
}();

var Router = function () {
  function Router(routes) {
    classCallCheck(this, Router);


    var router = this;

    router.name2Path = {};

    router.path2Route = {};

    router.handleHashChange = router.onHashChange.bind(router);

    var _object = object,
        each = _object.each,
        has = _object.has;
    var ROUTE_DEFAULT = Router.ROUTE_DEFAULT,
        ROUTE_404 = Router.ROUTE_404;

    if (!has(routes, ROUTE_DEFAULT)) {
      logger.error('Route for default["' + ROUTE_DEFAULT + '"] is required.');
      return;
    }
    if (!has(routes, ROUTE_404)) {
      logger.error('Route for 404["' + ROUTE_404 + '"] is required.');
      return;
    }

    each(routes, function (data, path) {
      if (has(data, 'name')) {
        router.name2Path[data.name] = path;
      }
      router.path2Route[path] = data;
    });
  }

  createClass(Router, [{
    key: 'go',
    value: function go(data) {
      if (is.string(data)) {
        location.hash = stringifyHash(data);
      } else if (is.object(data)) {
        if (object.has(data, 'component')) {
          this.setComponent(data);
        } else if (object.has(data, 'name')) {
          var path = this.name2Path[data.name];
          if (!is.string(path)) {
            logger.error('Name[' + data.name + '] of the route is not found.');
            return;
          }
          location.hash = stringifyHash(path, data.params, data.query);
        }
      }
    }
  }, {
    key: 'onHashChange',
    value: function onHashChange() {

      var router = this;
      var path2Route = router.path2Route;
      var _location = location,
          hash = _location.hash;

      hash = string.startsWith(hash, PREFIX_HASH) ? hash.slice(PREFIX_HASH.length) : '';

      var data = parseHash(path2Route, hash);
      if (!object.has(data, 'path')) {
        data.path = hash ? Router.ROUTE_404 : Router.ROUTE_DEFAULT;
      }
      this.setComponent(data);
    }
  }, {
    key: 'setComponent',
    value: function setComponent(data) {

      var router = this;

      var path2Route = router.path2Route,
          currentRoute = router.currentRoute,
          currentComponent = router.currentComponent;


      if (!currentComponent) {
        currentComponent = {};
      }

      var _currentComponent = currentComponent,
          options = _currentComponent.options,
          instance = _currentComponent.instance;
      var path = data.path,
          realpath = data.realpath,
          params = data.params,
          query = data.query,
          component = data.component,
          props = data.props;


      var route = void 0;
      if (!component) {
        route = path2Route[path];
        component = route.component;
      }

      var failure = function failure(value) {
        if (value === false) {
          if (currentRoute && currentRoute.path) {
            location.hash = stringifyHash(currentRoute.path, currentRoute.params, currentRoute.query);
          }
        } else {
          router.go(value);
        }
      };

      var callHook = function callHook(name, success, failure) {
        var chain = new Chain();
        chain.use(options && options[name], instance);
        chain.use(route && route[name], route);
        chain.use(router && router[name], router);
        chain.run(data, currentRoute, success, failure);
      };

      var createComponent = function createComponent(component) {
        options = component;
        callHook(Router.HOOK_BEFORE_ENTER, function () {

          if (params || query) {
            props = object.extend({}, params, query);
          }

          instance = new Component(object.extend({
            el: router.el,
            props: props,
            extensions: {
              $router: router
            }
          }, component));

          callHook(Router.HOOK_AFTER_ENTER);

          router.currentRoute = data;
          router.currentComponent = { options: options, instance: instance };
        }, failure);
      };

      var changeComponent = function changeComponent(component) {
        callHook(Router.HOOK_BEFORE_LEAVE, function () {
          instance.destroy();
          instance = null;
          callHook(Router.HOOK_AFTER_LEAVE);
          createComponent(component);
        }, failure);
      };

      currentComponent.name = component;

      shared.component(component, function (componentOptions) {
        if (component === currentComponent.name) {
          if (instance) {
            if (options === componentOptions) {
              callHook(Router.HOOK_REFRESHING, function () {
                changeComponent(componentOptions);
              }, function () {
                router.currentRoute = data;
              });
            } else {
              changeComponent(componentOptions);
            }
          } else {
            createComponent(componentOptions);
          }
        }
      });
    }
  }, {
    key: 'start',
    value: function start(el) {
      this.el = is.string(el) ? dom.find(el) : el;
      dom.on(window, 'hashchange', this.handleHashChange);
      this.handleHashChange();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.el = null;
      dom.off(window, 'hashchange', this.handleHashChange);
    }
  }]);
  return Router;
}();

Router.version = '0.20.0';

Router.ROUTE_DEFAULT = '';

Router.ROUTE_404 = '*';

Router.HOOK_REFRESHING = 'refreshing';

Router.HOOK_BEFORE_ENTER = 'beforeEnter';

Router.HOOK_AFTER_ENTER = 'afterEnter';

Router.HOOK_BEFORE_LEAVE = 'beforeLeave';

Router.HOOK_AFTER_LEAVE = 'afterLeave';

Router.register = function (name, component) {
  shared.component(name, component);
};

Router.install = function (Yox) {
  shared = new Yox({});
  Component = Yox;
  is = Yox.is;
  dom = Yox.dom;
  array = Yox.array;
  object = Yox.object;
  string = Yox.string;
  logger = Yox.logger;
};

if (typeof Yox !== 'undefined' && Yox.use) {
  Yox.use(Router);
}

return Router;

})));
