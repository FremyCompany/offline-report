"use strict";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<input\n    id=\"user\"\n    name=\"user\"\n    autofocus=", "\n    value=", "\n    placeholder=", "\n    onkeydown=", "\n    onkeyup=", "\n    autocorrect=\"off\"\n    autocapitalize=\"off\"\n    spellcheck=\"false\"\n  />"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    <label for=\"user\">", "</label>\n    ", "\n    ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(function (cache, modules) {
  function require(i) {
    return cache[i] || get(i);
  }

  function get(i) {
    var exports = {},
        module = {
      exports: exports
    };
    modules[i].call(exports, window, require, module, exports);
    return cache[i] = module.exports;
  }

  var main = require(0);

  return main.__esModule ? main.default : main;
})([], [function (global, require, module, exports) {
  // index.js
  require(1);

  var DOMContentLoaded = require(2);

  var load = require(24);

  var online = require(25);

  var options = {
    once: true
  };
  document.addEventListener('DOMContentLoaded', DOMContentLoaded, options);
  addEventListener('load', load, options);
  addEventListener('online', online, false);
}, function (global, require, module, exports) {
  // serviceWorker.js
  if ('serviceWorker' in navigator) {
    addEventListener('beforeinstallprompt', function (event) {
      event.preventDefault();
      window.installPrompt = event;
    });
    navigator.serviceWorker.register('/sw.js?' + encodeURIComponent(location.pathname + location.search));
  }
}, function (global, require, module, exports) {
  // domcontentloaded.js
  var _require = require(3),
      hyper = _require.hyper;

  var _require2 = require(20),
      CONNECTION_ERROR = _require2.CONNECTION_ERROR,
      SEARCH_PLACEHOLDER = _require2.SEARCH_PLACEHOLDER;

  var _require3 = require(21),
      $ = _require3.$;

  var statusHTML = require(22);

  var view = {
    input: require(23)
  };
  var wire = {
    input: hyper.wire()
  };

  var render = function render(what, how) {
    return view[what](wire[what], how);
  };

  var createUser = function createUser(status) {
    switch (status) {
      case 'online':
        return {
          gray: '25%',
          opacity: 1,
          status: statusHTML(status)
        };

      case 'offline':
        return {
          gray: '0%',
          opacity: 1,
          status: statusHTML(status)
        };

      default:
        return {
          gray: '50%',
          opacity: .7,
          status: statusHTML(status)
        };
    }
  };

  var cache = Object.create(null);
  var html = document.documentElement;

  module.exports = function () {
    var output = $('output');
    var form = $('main > form');

    var setOutput = function setOutput(info) {
      output.innerHTML = info.status;
      output.style.opacity = info.opacity;
    };

    var update = function update(info) {
      clearTimeout(opacityTimer);

      if (output.style.opacity != 0) {
        output.style.opacity = 0;
        opacityTimer = setTimeout(setOutput, 600, info);
      } else setOutput(info);

      try {
        html.style.setProperty('--grayscale', info.gray);
      } catch (o_O) {}
    };

    var onkeydown = function onkeydown(e) {
      if (e.key === ' ') e.preventDefault();
    };

    var onkeyup = function onkeyup(e) {
      var user = e.currentTarget.value.replace(/\s+/, '');
      var find = user.length && user !== text.replace(/\s+/, '');
      text = user;

      if (find) {
        if (user in cache) update(cache[user]);else {
          update({
            gray: '25%',
            status: '&nbsp;',
            opacity: 0
          });

          if (xhr) {
            xhr.abort();
            xhr = null;
          }

          clearTimeout(userTimer);
          userTimer = setTimeout(function () {
            xhr = new XMLHttpRequest();
            xhr.open('get', "/status/".concat(user, ".txt"), true);

            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (199 < xhr.status && xhr.status < 400) {
                  cache[user] = createUser(xhr.responseText);

                  if (user === text) {
                    // setup an automatic refresh for the same user
                    // or clean the cache for old one in a minute
                    setTimeout(function () {
                      delete cache[user];

                      if (user === text) {
                        text = '';
                        onkeyup({
                          currentTarget: {
                            value: user
                          }
                        });
                      }
                    }, 60000);
                    update(cache[user]);
                  }
                } else {
                  update({
                    gray: '75%',
                    status: CONNECTION_ERROR,
                    opacity: 1
                  });
                }
              }
            };

            xhr.send(null);
          }, 250);
        }
      } else if (text.length < 1) update({
        gray: '25%',
        status: '&nbsp;',
        opacity: 0
      });
    }; // mutable variables


    var text = $('input').value;
    var xhr = null;
    var userTimer = 0;
    var opacityTimer = 0;
    var autofocus = text.length < 1; // basic setup

    if (autofocus) output.style.opacity = 0;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var user = text;
      text = '';
      onkeyup({
        currentTarget: {
          value: user
        }
      });

      try {
        history.replaceState({
          user: user
        }, document.title, "/?user=".concat(user));
      } catch (o_O) {}
    });
    hyper(form)(_templateObject(), SEARCH_PLACEHOLDER, render('input', {
      autofocus: autofocus,
      onkeydown: onkeydown,
      onkeyup: onkeyup,
      value: text,
      placeholder: SEARCH_PLACEHOLDER
    }), output);
  };
}, function (global, require, module, exports) {
  // ../../node_modules/hypermorphic/index.js

  /**
   * Original solution proposed by László Balogh
   * after my reply in Stack Overflow
   * https://stackoverflow.com/questions/49638355/isomorphic-hyperhtml-components-without-passing-in-wires/49647934#49647934
   * Readapted as module by Andrea Giammarchi
   * to be installed and consumed as regular module
   */
  module.exports = (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' ? require(4) : null;
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/index.js
  'use strict';
  /*! (c) Andrea Giammarchi (ISC) */

  var Component = function (m) {
    return m.__esModule ? m.default : m;
  }(require(5));

  var _require4 = require(5),
      setup = _require4.setup;

  var Intent = function (m) {
    return m.__esModule ? m.default : m;
  }(require(8));

  var wire = function (m) {
    return m.__esModule ? m.default : m;
  }(require(9));

  var _require5 = require(9),
      content = _require5.content,
      weakly = _require5.weakly;

  var render = function (m) {
    return m.__esModule ? m.default : m;
  }(require(15));

  var diff = function (m) {
    return m.__esModule ? m.default : m;
  }(require(19)); // all functions are self bound to the right context
  // you can do the following
  // const {bind, wire} = hyperHTML;
  // and use them right away: bind(node)`hello!`;


  var bind = function bind(context) {
    return render.bind(context);
  };

  var define = Intent.define;
  hyper.Component = Component;
  hyper.bind = bind;
  hyper.define = define;
  hyper.diff = diff;
  hyper.hyper = hyper;
  hyper.wire = wire; // the wire content is the lazy defined
  // html or svg property of each hyper.Component

  setup(content); // everything is exported directly or through the
  // hyperHTML callback, when used as top level script

  exports.Component = Component;
  exports.bind = bind;
  exports.define = define;
  exports.diff = diff;
  exports.hyper = hyper;
  exports.wire = wire; // by default, hyperHTML is a smart function
  // that "magically" understands what's the best
  // thing to do with passed arguments

  function hyper(HTML) {
    return arguments.length < 2 ? HTML == null ? content('html') : typeof HTML === 'string' ? hyper.wire(null, HTML) : 'raw' in HTML ? content('html')(HTML) : 'nodeType' in HTML ? hyper.bind(HTML) : weakly(HTML, 'html') : ('raw' in HTML ? content('html') : hyper.wire).apply(null, arguments);
  }

  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = hyper;
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/classes/Component.js
  'use strict';

  var _require6 = require(6),
      Map = _require6.Map,
      WeakMap = _require6.WeakMap; // hyperHTML.Component is a very basic class
  // able to create Custom Elements like components
  // including the ability to listen to connect/disconnect
  // events via onconnect/ondisconnect attributes
  // Components can be created imperatively or declaratively.
  // The main difference is that declared components
  // will not automatically render on setState(...)
  // to simplify state handling on render.


  function Component() {
    return this; // this is needed in Edge !!!
  }

  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = Component; // Component is lazily setup because it needs
  // wire mechanism as lazy content

  function setup(content) {
    // there are various weakly referenced variables in here
    // and mostly are to use Component.for(...) static method.
    var children = new WeakMap();
    var create = Object.create;

    var createEntry = function createEntry(wm, id, component) {
      wm.set(id, component);
      return component;
    };

    var get = function get(Class, info, context, id) {
      var relation = info.get(Class) || relate(Class, info);

      switch (_typeof(id)) {
        case 'object':
        case 'function':
          var wm = relation.w || (relation.w = new WeakMap());
          return wm.get(id) || createEntry(wm, id, new Class(context));

        default:
          var sm = relation.p || (relation.p = create(null));
          return sm[id] || (sm[id] = new Class(context));
      }
    };

    var relate = function relate(Class, info) {
      var relation = {
        w: null,
        p: null
      };
      info.set(Class, relation);
      return relation;
    };

    var set = function set(context) {
      var info = new Map();
      children.set(context, info);
      return info;
    }; // The Component Class


    Object.defineProperties(Component, {
      // Component.for(context[, id]) is a convenient way
      // to automatically relate data/context to children components
      // If not created yet, the new Component(context) is weakly stored
      // and after that same instance would always be returned.
      for: {
        configurable: true,
        value: function value(context, id) {
          return get(this, children.get(context) || set(context), context, id == null ? 'default' : id);
        }
      }
    });
    Object.defineProperties(Component.prototype, {
      // all events are handled with the component as context
      handleEvent: {
        value: function value(e) {
          var ct = e.currentTarget;
          this['getAttribute' in ct && ct.getAttribute('data-call') || 'on' + e.type](e);
        }
      },
      // components will lazily define html or svg properties
      // as soon as these are invoked within the .render() method
      // Such render() method is not provided by the base class
      // but it must be available through the Component extend.
      // Declared components could implement a
      // render(props) method too and use props as needed.
      html: lazyGetter('html', content),
      svg: lazyGetter('svg', content),
      // the state is a very basic/simple mechanism inspired by Preact
      state: lazyGetter('state', function () {
        return this.defaultState;
      }),
      // it is possible to define a default state that'd be always an object otherwise
      defaultState: {
        get: function get() {
          return {};
        }
      },
      // dispatch a bubbling, cancelable, custom event
      // through the first known/available node
      dispatch: {
        value: function value(type, detail) {
          var _wire$ = this._wire$;

          if (_wire$) {
            var event = new CustomEvent(type, {
              bubbles: true,
              cancelable: true,
              detail: detail
            });
            event.component = this;
            return (_wire$.dispatchEvent ? _wire$ : _wire$.childNodes[0]).dispatchEvent(event);
          }

          return false;
        }
      },
      // setting some property state through a new object
      // or a callback, triggers also automatically a render
      // unless explicitly specified to not do so (render === false)
      setState: {
        value: function value(state, render) {
          var target = this.state;
          var source = typeof state === 'function' ? state.call(this, target) : state;

          for (var key in source) {
            target[key] = source[key];
          }

          if (render !== false) this.render();
          return this;
        }
      }
    });
  }

  exports.setup = setup; // instead of a secret key I could've used a WeakMap
  // However, attaching a property directly will result
  // into better performance with thousands of components
  // hanging around, and less memory pressure caused by the WeakMap

  var lazyGetter = function lazyGetter(type, fn) {
    var secret = '_' + type + '$';
    return {
      get: function get() {
        return this[secret] || setValue(this, secret, fn.call(this, type));
      },
      set: function set(value) {
        setValue(this, secret, value);
      }
    };
  }; // shortcut to set value on get or set(value)


  var setValue = function setValue(self, secret, value) {
    return Object.defineProperty(self, secret, {
      configurable: true,
      value: typeof value === 'function' ? function () {
        return self._wire$ = value.apply(this, arguments);
      } : value
    })[secret];
  };
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/shared/poorlyfills.js
  'use strict';

  var _require7 = require(7),
      G = _require7.G,
      UID = _require7.UID; // you know that kind of basics you need to cover
  // your use case only but you don't want to bloat the library?
  // There's even a package in here:
  // https://www.npmjs.com/package/poorlyfills
  // used to dispatch simple events


  var Event = G.Event;

  try {
    new Event('Event');
  } catch (o_O) {
    Event = function Event(type) {
      var e = document.createEvent('Event');
      e.initEvent(type, false, false);
      return e;
    };
  }

  exports.Event = Event; // used to store template literals

  /* istanbul ignore next */

  var Map = G.Map || function Map() {
    var keys = [],
        values = [];
    return {
      get: function get(obj) {
        return values[keys.indexOf(obj)];
      },
      set: function set(obj, value) {
        values[keys.push(obj) - 1] = value;
      }
    };
  };

  exports.Map = Map; // used to store wired content

  var ID = 0;

  var WeakMap = G.WeakMap || function WeakMap() {
    var key = UID + ID++;
    return {
      get: function get(obj) {
        return obj[key];
      },
      set: function set(obj, value) {
        Object.defineProperty(obj, key, {
          configurable: true,
          value: value
        });
      }
    };
  };

  exports.WeakMap = WeakMap; // used to store hyper.Components

  var WeakSet = G.WeakSet || function WeakSet() {
    var wm = new WeakMap();
    return {
      add: function add(obj) {
        wm.set(obj, true);
      },
      has: function has(obj) {
        return wm.get(obj) === true;
      }
    };
  };

  exports.WeakSet = WeakSet; // used to be sure IE9 or older Androids work as expected

  var isArray = Array.isArray || function (toString) {
    return function (arr) {
      return toString.call(arr) === '[object Array]';
    };
  }({}.toString);

  exports.isArray = isArray;

  var trim = UID.trim || function () {
    return this.replace(/^\s+|\s+$/g, '');
  };

  exports.trim = trim;
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/shared/constants.js
  'use strict';

  var G = document.defaultView;
  exports.G = G; // Node.CONSTANTS
  // 'cause some engine has no global Node defined
  // (i.e. Node, NativeScript, basicHTML ... )

  var ELEMENT_NODE = 1;
  exports.ELEMENT_NODE = ELEMENT_NODE;
  var ATTRIBUTE_NODE = 2;
  exports.ATTRIBUTE_NODE = ATTRIBUTE_NODE;
  var TEXT_NODE = 3;
  exports.TEXT_NODE = TEXT_NODE;
  var COMMENT_NODE = 8;
  exports.COMMENT_NODE = COMMENT_NODE;
  var DOCUMENT_FRAGMENT_NODE = 11;
  exports.DOCUMENT_FRAGMENT_NODE = DOCUMENT_FRAGMENT_NODE; // HTML related constants

  var VOID_ELEMENTS = /^area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr$/i;
  exports.VOID_ELEMENTS = VOID_ELEMENTS; // SVG related constants

  var OWNER_SVG_ELEMENT = 'ownerSVGElement';
  exports.OWNER_SVG_ELEMENT = OWNER_SVG_ELEMENT;
  var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  exports.SVG_NAMESPACE = SVG_NAMESPACE; // Custom Elements / MutationObserver constants

  var CONNECTED = 'connected';
  exports.CONNECTED = CONNECTED;
  var DISCONNECTED = 'dis' + CONNECTED;
  exports.DISCONNECTED = DISCONNECTED; // hyperHTML related constants

  var EXPANDO = '_hyper: ';
  exports.EXPANDO = EXPANDO;
  var SHOULD_USE_TEXT_CONTENT = /^style|textarea$/i;
  exports.SHOULD_USE_TEXT_CONTENT = SHOULD_USE_TEXT_CONTENT;
  var UID = EXPANDO + (Math.random() * new Date() | 0) + ';';
  exports.UID = UID;
  var UIDC = '<!--' + UID + '-->';
  exports.UIDC = UIDC;
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/objects/Intent.js
  'use strict';

  var attributes = {};
  var intents = {};
  var keys = [];
  var hasOwnProperty = intents.hasOwnProperty;
  var length = 0;
  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = {
    // used to invoke right away hyper:attributes
    attributes: attributes,
    // hyperHTML.define('intent', (object, update) => {...})
    // can be used to define a third parts update mechanism
    // when every other known mechanism failed.
    // hyper.define('user', info => info.name);
    // hyper(node)`<p>${{user}}</p>`;
    define: function define(intent, callback) {
      if (intent.indexOf('-') < 0) {
        if (!(intent in intents)) {
          length = keys.push(intent);
        }

        intents[intent] = callback;
      } else {
        attributes[intent] = callback;
      }
    },
    // this method is used internally as last resort
    // to retrieve a value out of an object
    invoke: function invoke(object, callback) {
      for (var i = 0; i < length; i++) {
        var key = keys[i];

        if (hasOwnProperty.call(object, key)) {
          return intents[key](object[key], callback);
        }
      }
    }
  };
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/hyper/wire.js
  'use strict';

  var _require8 = require(7),
      ELEMENT_NODE = _require8.ELEMENT_NODE,
      SVG_NAMESPACE = _require8.SVG_NAMESPACE;

  var _require9 = require(6),
      WeakMap = _require9.WeakMap,
      trim = _require9.trim;

  var _require10 = require(10),
      fragment = _require10.fragment;

  var _require11 = require(11),
      append = _require11.append,
      slice = _require11.slice,
      unique = _require11.unique;

  var Wire = function (m) {
    return m.__esModule ? m.default : m;
  }(require(14));

  var render = function (m) {
    return m.__esModule ? m.default : m;
  }(require(15)); // all wires used per each context


  var wires = new WeakMap(); // A wire is a callback used as tag function
  // to lazily relate a generic object to a template literal.
  // hyper.wire(user)`<div id=user>${user.name}</div>`; => the div#user
  // This provides the ability to have a unique DOM structure
  // related to a unique JS object through a reusable template literal.
  // A wire can specify a type, as svg or html, and also an id
  // via html:id or :id convention. Such :id allows same JS objects
  // to be associated to different DOM structures accordingly with
  // the used template literal without losing previously rendered parts.

  var wire = function wire(obj, type) {
    return obj == null ? content(type || 'html') : weakly(obj, type || 'html');
  }; // A wire content is a virtual reference to one or more nodes.
  // It's represented by either a DOM node, or an Array.
  // In both cases, the wire content role is to simply update
  // all nodes through the list of related callbacks.
  // In few words, a wire content is like an invisible parent node
  // in charge of updating its content like a bound element would do.


  var content = function content(type) {
    var wire, container, content, template, updates;
    return function (statics) {
      statics = unique(statics);
      var setup = template !== statics;

      if (setup) {
        template = statics;
        content = fragment(document);
        container = type === 'svg' ? document.createElementNS(SVG_NAMESPACE, 'svg') : content;
        updates = render.bind(container);
      }

      updates.apply(null, arguments);

      if (setup) {
        if (type === 'svg') {
          append(content, slice.call(container.childNodes));
        }

        wire = wireContent(content);
      }

      return wire;
    };
  }; // wires are weakly created through objects.
  // Each object can have multiple wires associated
  // and this is thanks to the type + :id feature.


  var weakly = function weakly(obj, type) {
    var i = type.indexOf(':');
    var wire = wires.get(obj);
    var id = type;

    if (-1 < i) {
      id = type.slice(i + 1);
      type = type.slice(0, i) || 'html';
    }

    if (!wire) wires.set(obj, wire = {});
    return wire[id] || (wire[id] = content(type));
  }; // a document fragment loses its nodes as soon
  // as it's appended into another node.
  // This would easily lose wired content
  // so that on a second render call, the parent
  // node wouldn't know which node was there
  // associated to the interpolation.
  // To prevent hyperHTML to forget about wired nodes,
  // these are either returned as Array or, if there's ony one entry,
  // as single referenced node that won't disappear from the fragment.
  // The initial fragment, at this point, would be used as unique reference.


  var wireContent = function wireContent(node) {
    var childNodes = node.childNodes;
    var length = childNodes.length;
    var wireNodes = [];

    for (var i = 0; i < length; i++) {
      var child = childNodes[i];

      if (child.nodeType === ELEMENT_NODE || trim.call(child.textContent).length !== 0) {
        wireNodes.push(child);
      }
    }

    return wireNodes.length === 1 ? wireNodes[0] : new Wire(wireNodes);
  };

  exports.content = content;
  exports.weakly = weakly;
  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = wire;
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/shared/easy-dom.js
  'use strict'; // these are tiny helpers to simplify most common operations needed here

  var create = function create(node, type) {
    return doc(node).createElement(type);
  };

  exports.create = create;

  var doc = function doc(node) {
    return node.ownerDocument || node;
  };

  exports.doc = doc;

  var fragment = function fragment(node) {
    return doc(node).createDocumentFragment();
  };

  exports.fragment = fragment;

  var text = function text(node, _text) {
    return doc(node).createTextNode(_text);
  };

  exports.text = text;
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/shared/utils.js
  'use strict';

  var _require12 = require(12),
      attrName = _require12.attrName,
      attrSeeker = _require12.attrSeeker;

  var _require13 = require(7),
      G = _require13.G,
      ELEMENT_NODE = _require13.ELEMENT_NODE,
      OWNER_SVG_ELEMENT = _require13.OWNER_SVG_ELEMENT,
      SVG_NAMESPACE = _require13.SVG_NAMESPACE,
      UID = _require13.UID,
      UIDC = _require13.UIDC;

  var _require14 = require(13),
      hasAppend = _require14.hasAppend,
      hasContent = _require14.hasContent,
      hasDoomedCloneNode = _require14.hasDoomedCloneNode,
      hasImportNode = _require14.hasImportNode;

  var _require15 = require(10),
      create = _require15.create,
      doc = _require15.doc,
      fragment = _require15.fragment;

  var _require16 = require(6),
      Map = _require16.Map,
      WeakMap = _require16.WeakMap; // appends an array of nodes
  // to a generic node/fragment
  // When available, uses append passing all arguments at once
  // hoping that's somehow faster, even if append has more checks on type


  var append = hasAppend ? function (node, childNodes) {
    node.append.apply(node, childNodes);
  } : function (node, childNodes) {
    var length = childNodes.length;

    for (var i = 0; i < length; i++) {
      node.appendChild(childNodes[i]);
    }
  };
  exports.append = append;
  var findAttributes = new RegExp('(' + attrName + '=)([\'"]?)' + UIDC + '\\2', 'gi');

  var comments = function comments($0, $1, $2, $3) {
    return '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
  };

  var replaceAttributes = function replaceAttributes($0, $1, $2) {
    return $1 + ($2 || '"') + UID + ($2 || '"');
  }; // given a node and a generic HTML content,
  // create either an SVG or an HTML fragment
  // where such content will be injected


  var createFragment = function createFragment(node, html) {
    return (OWNER_SVG_ELEMENT in node ? SVGFragment : HTMLFragment)(node, html.replace(attrSeeker, comments));
  };

  exports.createFragment = createFragment; // IE/Edge shenanigans proof cloneNode
  // it goes through all nodes manually
  // instead of relying the engine to suddenly
  // merge nodes together

  var cloneNode = hasDoomedCloneNode ? function (node) {
    var clone = node.cloneNode();
    var childNodes = node.childNodes || // this is an excess of caution
    // but some node, in IE, might not
    // have childNodes property.
    // The following fallback ensure working code
    // in older IE without compromising performance
    // or any other browser/engine involved.

    /* istanbul ignore next */
    [];
    var length = childNodes.length;

    for (var i = 0; i < length; i++) {
      clone.appendChild(cloneNode(childNodes[i]));
    }

    return clone;
  } : // the following ignore is due code-coverage
  // combination of not having document.importNode
  // but having a working node.cloneNode.
  // This shenario is common on older Android/WebKit browsers
  // but basicHTML here tests just two major cases:
  // with document.importNode or with broken cloneNode.

  /* istanbul ignore next */
  function (node) {
    return node.cloneNode(true);
  }; // IE and Edge do not support children in SVG nodes

  /* istanbul ignore next */

  var getChildren = function getChildren(node) {
    var children = [];
    var childNodes = node.childNodes;
    var length = childNodes.length;

    for (var i = 0; i < length; i++) {
      if (childNodes[i].nodeType === ELEMENT_NODE) children.push(childNodes[i]);
    }

    return children;
  };

  exports.getChildren = getChildren; // used to import html into fragments

  var importNode = hasImportNode ? function (doc, node) {
    return doc.importNode(node, true);
  } : function (doc, node) {
    return cloneNode(node);
  };
  exports.importNode = importNode; // just recycling a one-off array to use slice
  // in every needed place

  var slice = [].slice;
  exports.slice = slice; // lazy evaluated, returns the unique identity
  // of a template literal, as tempalte literal itself.
  // By default, ES2015 template literals are unique
  // tag`a${1}z` === tag`a${2}z`
  // even if interpolated values are different
  // the template chunks are in a frozen Array
  // that is identical each time you use the same
  // literal to represent same static content
  // around its own interpolations.

  var unique = function unique(template) {
    return _TL(template);
  };

  exports.unique = unique; // TL returns a unique version of the template
  // it needs lazy feature detection
  // (cannot trust literals with transpiled code)

  var _TL = function TL(t) {
    if ( // TypeScript template literals are not standard
    t.propertyIsEnumerable('raw') || // Firefox < 55 has not standard implementation neither
    /Firefox\/(\d+)/.test((G.navigator || {}).userAgent) && parseFloat(RegExp.$1) < 55) {
      var T = {};

      _TL = function TL(t) {
        var k = '^' + t.join('^');
        return T[k] || (T[k] = t);
      };
    } else {
      // make TL an identity like function
      _TL = function TL(t) {
        return t;
      };
    }

    return _TL(t);
  }; // used to store templates objects
  // since neither Map nor WeakMap are safe


  var TemplateMap = function TemplateMap() {
    try {
      var wm = new WeakMap();
      var o_O = Object.freeze([]);
      wm.set(o_O, true);
      if (!wm.get(o_O)) throw o_O;
      return wm;
    } catch (o_O) {
      // inevitable legacy code leaks due
      // https://github.com/tc39/ecma262/pull/890
      return new Map();
    }
  };

  exports.TemplateMap = TemplateMap; // create document fragments via native template
  // with a fallback for browsers that won't be able
  // to deal with some injected element such <td> or others

  var HTMLFragment = hasContent ? function (node, html) {
    var container = create(node, 'template');
    container.innerHTML = html;
    return container.content;
  } : function (node, html) {
    var container = create(node, 'template');
    var content = fragment(node);

    if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
      var selector = RegExp.$1;
      container.innerHTML = '<table>' + html + '</table>';
      append(content, slice.call(container.querySelectorAll(selector)));
    } else {
      container.innerHTML = html;
      append(content, slice.call(container.childNodes));
    }

    return content;
  }; // creates SVG fragment with a fallback for IE that needs SVG
  // within the HTML content

  var SVGFragment = hasContent ? function (node, html) {
    var content = fragment(node);
    var container = doc(node).createElementNS(SVG_NAMESPACE, 'svg');
    container.innerHTML = html;
    append(content, slice.call(container.childNodes));
    return content;
  } : function (node, html) {
    var content = fragment(node);
    var container = create(node, 'div');
    container.innerHTML = '<svg xmlns="' + SVG_NAMESPACE + '">' + html + '</svg>';
    append(content, slice.call(container.firstChild.childNodes));
    return content;
  };
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/shared/re.js
  'use strict'; // TODO:  I'd love to code-cover RegExp too here
  //        these are fundamental for this library

  var spaces = ' \\f\\n\\r\\t';
  var almostEverything = '[^ ' + spaces + '\\/>"\'=]+';
  var attrName = '[ ' + spaces + ']+' + almostEverything;
  var tagName = '<([A-Za-z]+[A-Za-z0-9:_-]*)((?:';
  var attrPartials = '(?:=(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything + '))?)';
  var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([ ' + spaces + ']*/?>)', 'g');
  var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([ ' + spaces + ']*/>)', 'g');
  exports.attrName = attrName;
  exports.attrSeeker = attrSeeker;
  exports.selfClosing = selfClosing;
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/shared/features-detection.js
  'use strict';

  var _require17 = require(10),
      create = _require17.create,
      fragment = _require17.fragment,
      text = _require17.text;

  var testFragment = fragment(document); // DOM4 node.append(...many)

  var hasAppend = 'append' in testFragment;
  exports.hasAppend = hasAppend; // detect old browsers without HTMLTemplateElement content support

  var hasContent = 'content' in create(document, 'template');
  exports.hasContent = hasContent; // IE 11 has problems with cloning templates: it "forgets" empty childNodes

  testFragment.appendChild(text(testFragment, 'g'));
  testFragment.appendChild(text(testFragment, ''));
  var hasDoomedCloneNode = testFragment.cloneNode(true).childNodes.length === 1;
  exports.hasDoomedCloneNode = hasDoomedCloneNode; // old browsers need to fallback to cloneNode
  // Custom Elements V0 and V1 will work polyfilled
  // but native implementations need importNode instead
  // (specially Chromium and its old V0 implementation)

  var hasImportNode = 'importNode' in document;
  exports.hasImportNode = hasImportNode;
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/classes/Wire.js
  'use strict';

  var _require18 = require(11),
      append = _require18.append;

  var _require19 = require(10),
      doc = _require19.doc,
      fragment = _require19.fragment;

  function Wire(childNodes) {
    this.childNodes = childNodes;
    this.length = childNodes.length;
    this.first = childNodes[0];
    this.last = childNodes[this.length - 1];
  }

  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = Wire; // when a wire is inserted, all its nodes will follow

  Wire.prototype.insert = function insert() {
    var df = fragment(this.first);
    append(df, this.childNodes);
    return df;
  }; // when a wire is removed, all its nodes must be removed as well


  Wire.prototype.remove = function remove() {
    var first = this.first;
    var last = this.last;

    if (this.length === 2) {
      last.parentNode.removeChild(last);
    } else {
      var range = doc(first).createRange();
      range.setStartBefore(this.childNodes[1]);
      range.setEndAfter(last);
      range.deleteContents();
    }

    return first;
  };
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/hyper/render.js
  'use strict';

  var _require20 = require(6),
      Map = _require20.Map,
      WeakMap = _require20.WeakMap;

  var _require21 = require(7),
      G = _require21.G,
      UIDC = _require21.UIDC,
      VOID_ELEMENTS = _require21.VOID_ELEMENTS;

  var Updates = function (m) {
    return m.__esModule ? m.default : m;
  }(require(16));

  var _require22 = require(11),
      createFragment = _require22.createFragment,
      importNode = _require22.importNode,
      unique = _require22.unique,
      TemplateMap = _require22.TemplateMap;

  var _require23 = require(12),
      selfClosing = _require23.selfClosing; // a weak collection of contexts that
  // are already known to hyperHTML


  var bewitched = new WeakMap(); // all unique template literals

  var templates = TemplateMap(); // better known as hyper.bind(node), the render is
  // the main tag function in charge of fully upgrading
  // or simply updating, contexts used as hyperHTML targets.
  // The `this` context is either a regular DOM node or a fragment.

  function render(template) {
    var wicked = bewitched.get(this);

    if (wicked && wicked.template === unique(template)) {
      update.apply(wicked.updates, arguments);
    } else {
      upgrade.apply(this, arguments);
    }

    return this;
  } // an upgrade is in charge of collecting template info,
  // parse it once, if unknown, to map all interpolations
  // as single DOM callbacks, relate such template
  // to the current context, and render it after cleaning the context up


  function upgrade(template) {
    template = unique(template);
    var info = templates.get(template) || createTemplate.call(this, template);
    var fragment = importNode(this.ownerDocument, info.fragment);
    var updates = Updates.create(fragment, info.paths);
    bewitched.set(this, {
      template: template,
      updates: updates
    });
    update.apply(updates, arguments);
    this.textContent = '';
    this.appendChild(fragment);
  } // an update simply loops over all mapped DOM operations


  function update() {
    var length = arguments.length;

    for (var i = 1; i < length; i++) {
      this[i - 1](arguments[i]);
    }
  } // a template can be used to create a document fragment
  // aware of all interpolations and with a list
  // of paths used to find once those nodes that need updates,
  // no matter if these are attributes, text nodes, or regular one


  function createTemplate(template) {
    var paths = [];
    var html = template.join(UIDC).replace(SC_RE, SC_PLACE);
    var fragment = createFragment(this, html);
    Updates.find(fragment, paths, template.slice());
    var info = {
      fragment: fragment,
      paths: paths
    };
    templates.set(template, info);
    return info;
  } // some node could be special though, like a custom element
  // with a self closing tag, which should work through these changes.


  var SC_RE = selfClosing;

  var SC_PLACE = function SC_PLACE($0, $1, $2) {
    return VOID_ELEMENTS.test($1) ? $0 : '<' + $1 + $2 + '></' + $1 + '>';
  };

  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = render;
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/objects/Updates.js
  'use strict';

  var _require24 = require(7),
      CONNECTED = _require24.CONNECTED,
      DISCONNECTED = _require24.DISCONNECTED,
      COMMENT_NODE = _require24.COMMENT_NODE,
      DOCUMENT_FRAGMENT_NODE = _require24.DOCUMENT_FRAGMENT_NODE,
      ELEMENT_NODE = _require24.ELEMENT_NODE,
      TEXT_NODE = _require24.TEXT_NODE,
      OWNER_SVG_ELEMENT = _require24.OWNER_SVG_ELEMENT,
      SHOULD_USE_TEXT_CONTENT = _require24.SHOULD_USE_TEXT_CONTENT,
      UID = _require24.UID,
      UIDC = _require24.UIDC;

  var Component = function (m) {
    return m.__esModule ? m.default : m;
  }(require(5));

  var Wire = function (m) {
    return m.__esModule ? m.default : m;
  }(require(14));

  var Path = function (m) {
    return m.__esModule ? m.default : m;
  }(require(17));

  var Style = function (m) {
    return m.__esModule ? m.default : m;
  }(require(18));

  var Intent = function (m) {
    return m.__esModule ? m.default : m;
  }(require(8));

  var domdiff = function (m) {
    return m.__esModule ? m.default : m;
  }(require(19)); // see /^script$/i.test(nodeName) bit down here
  // import { create as createElement, text } from '../shared/easy-dom.js';


  var _require25 = require(10),
      text = _require25.text;

  var _require26 = require(6),
      Event = _require26.Event,
      WeakSet = _require26.WeakSet,
      isArray = _require26.isArray,
      trim = _require26.trim;

  var _require27 = require(11),
      createFragment = _require27.createFragment,
      getChildren = _require27.getChildren,
      slice = _require27.slice; // hyper.Component have a connected/disconnected
  // mechanism provided by MutationObserver
  // This weak set is used to recognize components
  // as DOM node that needs to trigger connected/disconnected events


  var components = new WeakSet(); // a basic dictionary used to filter already cached attributes
  // while looking for special hyperHTML values.

  function Cache() {}

  Cache.prototype = Object.create(null); // returns an intent to explicitly inject content as html

  var asHTML = function asHTML(html) {
    return {
      html: html
    };
  }; // returns nodes from wires and components


  var asNode = function asNode(item, i) {
    return 'ELEMENT_NODE' in item ? item : item.constructor === Wire ? // in the Wire case, the content can be
    // removed, post-pended, inserted, or pre-pended and
    // all these cases are handled by domdiff already

    /* istanbul ignore next */
    1 / i < 0 ? i ? item.remove() : item.last : i ? item.insert() : item.first : asNode(item.render(), i);
  }; // returns true if domdiff can handle the value


  var canDiff = function canDiff(value) {
    return 'ELEMENT_NODE' in value || value instanceof Wire || value instanceof Component;
  }; // updates are created once per context upgrade
  // within the main render function (../hyper/render.js)
  // These are an Array of callbacks to invoke passing
  // each interpolation value.
  // Updates can be related to any kind of content,
  // attributes, or special text-only cases such <style>
  // elements or <textarea>


  var create = function create(root, paths) {
    var updates = [];
    var length = paths.length;

    for (var i = 0; i < length; i++) {
      var info = paths[i];
      var node = Path.find(root, info.path);

      switch (info.type) {
        case 'any':
          updates.push(setAnyContent(node, []));
          break;

        case 'attr':
          updates.push(setAttribute(node, info.name, info.node));
          break;

        case 'text':
          updates.push(setTextContent(node));
          node.textContent = '';
          break;
      }
    }

    return updates;
  }; // finding all paths is a one-off operation performed
  // when a new template literal is used.
  // The goal is to map all target nodes that will be
  // used to update content/attributes every time
  // the same template literal is used to create content.
  // The result is a list of paths related to the template
  // with all the necessary info to create updates as
  // list of callbacks that target directly affected nodes.


  var find = function find(node, paths, parts) {
    var childNodes = node.childNodes;
    var length = childNodes.length;

    for (var i = 0; i < length; i++) {
      var child = childNodes[i];

      switch (child.nodeType) {
        case ELEMENT_NODE:
          findAttributes(child, paths, parts);
          find(child, paths, parts);
          break;

        case COMMENT_NODE:
          if (child.textContent === UID) {
            parts.shift();
            paths.push( // basicHTML or other non standard engines
            // might end up having comments in nodes
            // where they shouldn't, hence this check.
            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ? Path.create('text', node) : Path.create('any', child));
          }

          break;

        case TEXT_NODE:
          // the following ignore is actually covered by browsers
          // only basicHTML ends up on previous COMMENT_NODE case
          // instead of TEXT_NODE because it knows nothing about
          // special style or textarea behavior

          /* istanbul ignore if */
          if (SHOULD_USE_TEXT_CONTENT.test(node.nodeName) && trim.call(child.textContent) === UIDC) {
            parts.shift();
            paths.push(Path.create('text', node));
          }

          break;
      }
    }
  }; // attributes are searched via unique hyperHTML id value.
  // Despite HTML being case insensitive, hyperHTML is able
  // to recognize attributes by name in a caseSensitive way.
  // This plays well with Custom Elements definitions
  // and also with XML-like environments, without trusting
  // the resulting DOM but the template literal as the source of truth.
  // IE/Edge has a funny bug with attributes and these might be duplicated.
  // This is why there is a cache in charge of being sure no duplicated
  // attributes are ever considered in future updates.


  var findAttributes = function findAttributes(node, paths, parts) {
    var cache = new Cache();
    var attributes = node.attributes;
    var array = slice.call(attributes);
    var remove = [];
    var length = array.length;

    for (var i = 0; i < length; i++) {
      var attribute = array[i];

      if (attribute.value === UID) {
        var name = attribute.name; // the following ignore is covered by IE
        // and the IE9 double viewBox test

        /* istanbul ignore else */

        if (!(name in cache)) {
          var realName = parts.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/, '$1');
          cache[name] = attributes[realName] || // the following ignore is covered by browsers
          // while basicHTML is already case-sensitive

          /* istanbul ignore next */
          attributes[realName.toLowerCase()];
          paths.push(Path.create('attr', cache[name], realName));
        }

        remove.push(attribute);
      }
    }

    var len = remove.length;

    for (var _i = 0; _i < len; _i++) {
      // Edge HTML bug #16878726
      var _attribute = remove[_i];
      if (/^id$/i.test(_attribute.name)) node.removeAttribute(_attribute.name); // standard browsers would work just fine here
      else node.removeAttributeNode(remove[_i]);
    } // This is a very specific Firefox/Safari issue
    // but since it should be a not so common pattern,
    // it's probably worth patching regardless.
    // Basically, scripts created through strings are death.
    // You need to create fresh new scripts instead.
    // TODO: is there any other node that needs such nonsense?


    var nodeName = node.nodeName;

    if (/^script$/i.test(nodeName)) {
      // this used to be like that
      // const script = createElement(node, nodeName);
      // then Edge arrived and decided that scripts created
      // through template documents aren't worth executing
      // so it became this ... hopefully it won't hurt in the wild
      var script = document.createElement(nodeName);

      for (var _i2 = 0; _i2 < attributes.length; _i2++) {
        script.setAttributeNode(attributes[_i2].cloneNode(true));
      }

      script.textContent = node.textContent;
      node.parentNode.replaceChild(script, node);
    }
  }; // when a Promise is used as interpolation value
  // its result must be parsed once resolved.
  // This callback is in charge of understanding what to do
  // with a returned value once the promise is resolved.


  var invokeAtDistance = function invokeAtDistance(value, callback) {
    callback(value.placeholder);

    if ('text' in value) {
      Promise.resolve(value.text).then(String).then(callback);
    } else if ('any' in value) {
      Promise.resolve(value.any).then(callback);
    } else if ('html' in value) {
      Promise.resolve(value.html).then(asHTML).then(callback);
    } else {
      Promise.resolve(Intent.invoke(value, callback)).then(callback);
    }
  }; // quick and dirty way to check for Promise/ish values


  var isPromise_ish = function isPromise_ish(value) {
    return value != null && 'then' in value;
  }; // in a hyper(node)`<div>${content}</div>` case
  // everything could happen:
  //  * it's a JS primitive, stored as text
  //  * it's null or undefined, the node should be cleaned
  //  * it's a component, update the content by rendering it
  //  * it's a promise, update the content once resolved
  //  * it's an explicit intent, perform the desired operation
  //  * it's an Array, resolve all values if Promises and/or
  //    update the node with the resulting list of content


  var setAnyContent = function setAnyContent(node, childNodes) {
    var diffOptions = {
      node: asNode,
      before: node
    };
    var fastPath = false;
    var oldValue;

    var anyContent = function anyContent(value) {
      switch (_typeof(value)) {
        case 'string':
        case 'number':
        case 'boolean':
          if (fastPath) {
            if (oldValue !== value) {
              oldValue = value;
              childNodes[0].textContent = value;
            }
          } else {
            fastPath = true;
            oldValue = value;
            childNodes = domdiff(node.parentNode, childNodes, [text(node, value)], diffOptions);
          }

          break;

        case 'object':
        case 'undefined':
          if (value == null) {
            fastPath = false;
            childNodes = domdiff(node.parentNode, childNodes, [], diffOptions);
            break;
          }

        default:
          fastPath = false;
          oldValue = value;

          if (isArray(value)) {
            if (value.length === 0) {
              if (childNodes.length) {
                childNodes = domdiff(node.parentNode, childNodes, [], diffOptions);
              }
            } else {
              switch (_typeof(value[0])) {
                case 'string':
                case 'number':
                case 'boolean':
                  anyContent({
                    html: value
                  });
                  break;

                case 'object':
                  if (isArray(value[0])) {
                    value = value.concat.apply([], value);
                  }

                  if (isPromise_ish(value[0])) {
                    Promise.all(value).then(anyContent);
                    break;
                  }

                default:
                  childNodes = domdiff(node.parentNode, childNodes, value, diffOptions);
                  break;
              }
            }
          } else if (canDiff(value)) {
            childNodes = domdiff(node.parentNode, childNodes, value.nodeType === DOCUMENT_FRAGMENT_NODE ? slice.call(value.childNodes) : [value], diffOptions);
          } else if (isPromise_ish(value)) {
            value.then(anyContent);
          } else if ('placeholder' in value) {
            invokeAtDistance(value, anyContent);
          } else if ('text' in value) {
            anyContent(String(value.text));
          } else if ('any' in value) {
            anyContent(value.any);
          } else if ('html' in value) {
            childNodes = domdiff(node.parentNode, childNodes, slice.call(createFragment(node, [].concat(value.html).join('')).childNodes), diffOptions);
          } else if ('length' in value) {
            anyContent(slice.call(value));
          } else {
            anyContent(Intent.invoke(value, anyContent));
          }

          break;
      }
    };

    return anyContent;
  }; // there are four kind of attributes, and related behavior:
  //  * events, with a name starting with `on`, to add/remove event listeners
  //  * special, with a name present in their inherited prototype, accessed directly
  //  * regular, accessed through get/setAttribute standard DOM methods
  //  * style, the only regular attribute that also accepts an object as value
  //    so that you can style=${{width: 120}}. In this case, the behavior has been
  //    fully inspired by Preact library and its simplicity.


  var setAttribute = function setAttribute(node, name, original) {
    var isSVG = OWNER_SVG_ELEMENT in node;
    var oldValue; // if the attribute is the style one
    // handle it differently from others

    if (name === 'style') {
      return Style(node, original, isSVG);
    } // the name is an event one,
    // add/remove event listeners accordingly
    else if (/^on/.test(name)) {
        var type = name.slice(2);

        if (type === CONNECTED || type === DISCONNECTED) {
          if (notObserving) {
            notObserving = false;
            observe();
          }

          components.add(node);
        } else if (name.toLowerCase() in node) {
          type = type.toLowerCase();
        }

        return function (newValue) {
          if (oldValue !== newValue) {
            if (oldValue) node.removeEventListener(type, oldValue, false);
            oldValue = newValue;
            if (newValue) node.addEventListener(type, newValue, false);
          }
        };
      } // the attribute is special ('value' in input)
      // and it's not SVG *or* the name is exactly data,
      // in this case assign the value directly
      else if (name === 'data' || !isSVG && name in node) {
          return function (newValue) {
            if (oldValue !== newValue) {
              oldValue = newValue;

              if (node[name] !== newValue) {
                node[name] = newValue;

                if (newValue == null) {
                  node.removeAttribute(name);
                }
              }
            }
          };
        } else if (name in Intent.attributes) {
          return function (any) {
            oldValue = Intent.attributes[name](node, any);
            node.setAttribute(name, oldValue == null ? '' : oldValue);
          };
        } // in every other case, use the attribute node as it is
        // update only the value, set it as node only when/if needed
        else {
            var owner = false;
            var attribute = original.cloneNode(true);
            return function (newValue) {
              if (oldValue !== newValue) {
                oldValue = newValue;

                if (attribute.value !== newValue) {
                  if (newValue == null) {
                    if (owner) {
                      owner = false;
                      node.removeAttributeNode(attribute);
                    }

                    attribute.value = newValue;
                  } else {
                    attribute.value = newValue;

                    if (!owner) {
                      owner = true;
                      node.setAttributeNode(attribute);
                    }
                  }
                }
              }
            };
          }
  }; // style or textareas don't accept HTML as content
  // it's pointless to transform or analyze anything
  // different from text there but it's worth checking
  // for possible defined intents.


  var setTextContent = function setTextContent(node) {
    var oldValue;

    var textContent = function textContent(value) {
      if (oldValue !== value) {
        oldValue = value;

        if (_typeof(value) === 'object' && value) {
          if (isPromise_ish(value)) {
            value.then(textContent);
          } else if ('placeholder' in value) {
            invokeAtDistance(value, textContent);
          } else if ('text' in value) {
            textContent(String(value.text));
          } else if ('any' in value) {
            textContent(value.any);
          } else if ('html' in value) {
            textContent([].concat(value.html).join(''));
          } else if ('length' in value) {
            textContent(slice.call(value).join(''));
          } else {
            textContent(Intent.invoke(value, textContent));
          }
        } else {
          node.textContent = value == null ? '' : value;
        }
      }
    };

    return textContent;
  };

  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = {
    create: create,
    find: find
  }; // hyper.Components might need connected/disconnected notifications
  // used by components and their onconnect/ondisconnect callbacks.
  // When one of these callbacks is encountered,
  // the document starts being observed.

  var notObserving = true;

  function observe() {
    // when hyper.Component related DOM nodes
    // are appended or removed from the live tree
    // these might listen to connected/disconnected events
    // This utility is in charge of finding all components
    // involved in the DOM update/change and dispatch
    // related information to them
    var dispatchAll = function dispatchAll(nodes, type) {
      var event = new Event(type);
      var length = nodes.length;

      for (var i = 0; i < length; i++) {
        var node = nodes[i];

        if (node.nodeType === ELEMENT_NODE) {
          dispatchTarget(node, event);
        }
      }
    }; // the way it's done is via the components weak set
    // and recursively looking for nested components too


    var dispatchTarget = function dispatchTarget(node, event) {
      if (components.has(node)) {
        node.dispatchEvent(event);
      }
      /* istanbul ignore next */


      var children = node.children || getChildren(node);
      var length = children.length;

      for (var i = 0; i < length; i++) {
        dispatchTarget(children[i], event);
      }
    }; // The MutationObserver is the best way to implement that
    // but there is a fallback to deprecated DOMNodeInserted/Removed
    // so that even older browsers/engines can help components life-cycle


    try {
      new MutationObserver(function (records) {
        var length = records.length;

        for (var i = 0; i < length; i++) {
          var record = records[i];
          dispatchAll(record.removedNodes, DISCONNECTED);
          dispatchAll(record.addedNodes, CONNECTED);
        }
      }).observe(document, {
        subtree: true,
        childList: true
      });
    } catch (o_O) {
      document.addEventListener('DOMNodeRemoved', function (event) {
        dispatchAll([event.target], DISCONNECTED);
      }, false);
      document.addEventListener('DOMNodeInserted', function (event) {
        dispatchAll([event.target], CONNECTED);
      }, false);
    }
  }
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/objects/Path.js
  'use strict';

  var _require28 = require(7),
      COMMENT_NODE = _require28.COMMENT_NODE,
      DOCUMENT_FRAGMENT_NODE = _require28.DOCUMENT_FRAGMENT_NODE,
      ELEMENT_NODE = _require28.ELEMENT_NODE; // every template literal interpolation indicates
  // a precise target in the DOM the template is representing.
  // `<p id=${'attribute'}>some ${'content'}</p>`
  // hyperHTML finds only once per template literal,
  // hence once per entire application life-cycle,
  // all nodes that are related to interpolations.
  // These nodes are stored as indexes used to retrieve,
  // once per upgrade, nodes that will change on each future update.
  // A path example is [2, 0, 1] representing the operation:
  // node.childNodes[2].childNodes[0].childNodes[1]
  // Attributes are addressed via their owner node and their name.


  var createPath = function createPath(node) {
    var path = [];
    var parentNode;

    switch (node.nodeType) {
      case ELEMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE:
        parentNode = node;
        break;

      case COMMENT_NODE:
        parentNode = node.parentNode;
        prepend(path, parentNode, node);
        break;

      default:
        parentNode = node.ownerElement;
        break;
    }

    for (node = parentNode; parentNode = parentNode.parentNode; node = parentNode) {
      prepend(path, parentNode, node);
    }

    return path;
  };

  var prepend = function prepend(path, parent, node) {
    path.unshift(path.indexOf.call(parent.childNodes, node));
  };

  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = {
    create: function create(type, node, name) {
      return {
        type: type,
        name: name,
        node: node,
        path: createPath(node)
      };
    },
    find: function find(node, path) {
      var length = path.length;

      for (var i = 0; i < length; i++) {
        node = node.childNodes[path[i]];
      }

      return node;
    }
  };
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/objects/Style.js
  'use strict'; // from https://github.com/developit/preact/blob/33fc697ac11762a1cb6e71e9847670d047af7ce5/src/constants.js

  var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i; // style is handled as both string and object
  // even if the target is an SVG element (consistency)

  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = function (node, original, isSVG) {
    if (isSVG) {
      var style = original.cloneNode(true);
      style.value = '';
      node.setAttributeNode(style);
      return update(style, isSVG);
    }

    return update(node.style, isSVG);
  }; // the update takes care or changing/replacing
  // only properties that are different or
  // in case of string, the whole node


  var update = function update(style, isSVG) {
    var oldType, oldValue;
    return function (newValue) {
      switch (_typeof(newValue)) {
        case 'object':
          if (newValue) {
            if (oldType === 'object') {
              if (!isSVG) {
                if (oldValue !== newValue) {
                  for (var key in oldValue) {
                    if (!(key in newValue)) {
                      style[key] = '';
                    }
                  }
                }
              }
            } else {
              if (isSVG) style.value = '';else style.cssText = '';
            }

            var info = isSVG ? {} : style;

            for (var _key in newValue) {
              var value = newValue[_key];
              info[_key] = typeof value === 'number' && !IS_NON_DIMENSIONAL.test(_key) ? value + 'px' : value;
            }

            oldType = 'object';
            if (isSVG) style.value = toStyle(oldValue = info);else oldValue = newValue;
            break;
          }

        default:
          if (oldValue != newValue) {
            oldType = 'string';
            oldValue = newValue;
            if (isSVG) style.value = newValue || '';else style.cssText = newValue || '';
          }

          break;
      }
    };
  };

  var hyphen = /([^A-Z])([A-Z]+)/g;

  var ized = function ized($0, $1, $2) {
    return $1 + '-' + $2.toLowerCase();
  };

  var toStyle = function toStyle(object) {
    var css = [];

    for (var key in object) {
      css.push(key.replace(hyphen, ized), ':', object[key], ';');
    }

    return css.join('');
  };
}, function (global, require, module, exports) {
  // ../../node_modules/hyperhtml/cjs/shared/domdiff.js
  'use strict';
  /* AUTOMATICALLY IMPORTED, DO NOT MODIFY */

  /*! (c) 2017 Andrea Giammarchi (ISC) */

  /**
   * This code is a revisited port of the snabbdom vDOM diffing logic,
   * the same that fuels as fork Vue.js or other libraries.
   * @credits https://github.com/snabbdom/snabbdom
   */

  var eqeq = function eqeq(a, b) {
    return a == b;
  };

  var identity = function identity(O) {
    return O;
  };

  var remove = function remove(get, parentNode, before, after) {
    if (after == null) {
      parentNode.removeChild(get(before, -1));
    } else {
      var range = parentNode.ownerDocument.createRange();
      range.setStartBefore(get(before, -1));
      range.setEndAfter(get(after, -1));
      range.deleteContents();
    }
  };

  var domdiff = function domdiff(parentNode, // where changes happen
  currentNodes, // Array of current items/nodes
  futureNodes, // Array of future items/nodes
  options // optional object with one of the following properties
  //  before: domNode
  //  compare(generic, generic) => true if same generic
  //  node(generic) => Node
  ) {
    if (!options) options = {};
    var compare = options.compare || eqeq;
    var get = options.node || identity;
    var before = options.before == null ? null : get(options.before, 0);
    var currentStart = 0,
        futureStart = 0;
    var currentEnd = currentNodes.length - 1;
    var currentStartNode = currentNodes[0];
    var currentEndNode = currentNodes[currentEnd];
    var futureEnd = futureNodes.length - 1;
    var futureStartNode = futureNodes[0];
    var futureEndNode = futureNodes[futureEnd];

    while (currentStart <= currentEnd && futureStart <= futureEnd) {
      if (currentStartNode == null) {
        currentStartNode = currentNodes[++currentStart];
      } else if (currentEndNode == null) {
        currentEndNode = currentNodes[--currentEnd];
      } else if (futureStartNode == null) {
        futureStartNode = futureNodes[++futureStart];
      } else if (futureEndNode == null) {
        futureEndNode = futureNodes[--futureEnd];
      } else if (compare(currentStartNode, futureStartNode)) {
        currentStartNode = currentNodes[++currentStart];
        futureStartNode = futureNodes[++futureStart];
      } else if (compare(currentEndNode, futureEndNode)) {
        currentEndNode = currentNodes[--currentEnd];
        futureEndNode = futureNodes[--futureEnd];
      } else if (compare(currentStartNode, futureEndNode)) {
        parentNode.insertBefore(get(currentStartNode, 1), get(currentEndNode, -0).nextSibling);
        currentStartNode = currentNodes[++currentStart];
        futureEndNode = futureNodes[--futureEnd];
      } else if (compare(currentEndNode, futureStartNode)) {
        parentNode.insertBefore(get(currentEndNode, 1), get(currentStartNode, 0));
        currentEndNode = currentNodes[--currentEnd];
        futureStartNode = futureNodes[++futureStart];
      } else {
        var index = currentNodes.indexOf(futureStartNode);

        if (index < 0) {
          parentNode.insertBefore(get(futureStartNode, 1), get(currentStartNode, 0));
          futureStartNode = futureNodes[++futureStart];
        } else {
          var i = index;
          var f = futureStart;

          while (i <= currentEnd && f <= futureEnd && currentNodes[i] === futureNodes[f]) {
            i++;
            f++;
          }

          if (1 < i - index) {
            if (--index === currentStart) {
              parentNode.removeChild(get(currentStartNode, -1));
            } else {
              remove(get, parentNode, currentStartNode, currentNodes[index]);
            }

            currentStart = i;
            futureStart = f;
            currentStartNode = currentNodes[i];
            futureStartNode = futureNodes[f];
          } else {
            var el = currentNodes[index];
            currentNodes[index] = null;
            parentNode.insertBefore(get(el, 1), get(currentStartNode, 0));
            futureStartNode = futureNodes[++futureStart];
          }
        }
      }
    }

    if (currentStart <= currentEnd || futureStart <= futureEnd) {
      if (currentStart > currentEnd) {
        var pin = futureNodes[futureEnd + 1];
        var place = pin == null ? before : get(pin, 0);

        if (futureStart === futureEnd) {
          parentNode.insertBefore(get(futureNodes[futureStart], 1), place);
        } else {
          var fragment = parentNode.ownerDocument.createDocumentFragment();

          while (futureStart <= futureEnd) {
            fragment.appendChild(get(futureNodes[futureStart++], 1));
          }

          parentNode.insertBefore(fragment, place);
        }
      } else {
        if (currentNodes[currentStart] == null) currentStart++;

        if (currentStart === currentEnd) {
          parentNode.removeChild(get(currentNodes[currentStart], -1));
        } else {
          remove(get, parentNode, currentNodes[currentStart], currentNodes[currentEnd]);
        }
      }
    }

    return futureNodes;
  };

  Object.defineProperty(exports, '__esModule', {
    value: true
  }).default = domdiff;
}, function (global, require, module, exports) {
  // ../../shared/constants.js
  "use strict";

  var API = 'https://api.github.com';
  var APP = 'offline-report';
  var CONNECTION_ERROR = 'connection error';
  var DATABASE = 'vacations.json';
  var REPOSITORY = APP + '-vacations';
  var SEARCH_PLACEHOLDER = 'GitHub user name';
  module.exports = {
    API: API,
    APP: APP,
    CONNECTION_ERROR: CONNECTION_ERROR,
    DATABASE: DATABASE,
    REPOSITORY: REPOSITORY,
    SEARCH_PLACEHOLDER: SEARCH_PLACEHOLDER
  };
}, function (global, require, module, exports) {
  // utils.js
  module.exports = {
    $: function $(css) {
      return document.querySelector(css);
    }
  };
}, function (global, require, module, exports) {
  // ../../shared/status.js
  "use strict";

  module.exports = function (status) {
    switch (status) {
      case 'online':
        return '🤖 online&nbsp; 💻';

      case 'offline':
        return '🌴 offline&nbsp; ☀️';

      default:
        return 'no report found';
    }
  };
}, function (global, require, module, exports) {
  // ../../view/input.js
  module.exports = function (render, info) {
    return render(_templateObject2(), info.autofocus, info.value, info.placeholder, info.onkeydown, info.onkeyup);
  };
}, function (global, require, module, exports) {
  // load.js
  var html = document.documentElement;

  var _require29 = require(21),
      $ = _require29.$;

  module.exports = function () {
    var img = new Image();

    img.onload = function () {
      html.setAttribute('opacity', 1);
      if ('serviceWorker' in navigator && // something is wrong with submit even tin firefox
      // it keeps reloading every single time.
      // TODO: fix Firefox whenever you have time
      !/Firefox/.test(navigator.userAgent)) navigator.serviceWorker.ready.then(function () {
        return fetch(img.src);
      }).then(function (r) {
        return r.blob();
      }).then(function () {
        if ($('input').value.replace(/\s+/, '').length) $('form').dispatchEvent(new CustomEvent('submit'));
      });
    };

    img.src = getComputedStyle(html, ':before').getPropertyValue('background-image').replace(/^url\((['"]?)(\S+?)\1\)$/, '$2');
  };
}, function (global, require, module, exports) {
  // online.js
  var _require30 = require(21),
      $ = _require30.$;

  var _require31 = require(20),
      CONNECTION_ERROR = _require31.CONNECTION_ERROR;

  module.exports = function () {
    var output = $('output');
    if (output.textContent === CONNECTION_ERROR) $('form').dispatchEvent(new CustomEvent('submit'));
  };
}]);

