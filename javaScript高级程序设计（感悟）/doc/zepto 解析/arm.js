/* Zepto 1.2.0 - zepto event ajax form ie detect fx fx_methods data selector stack - zeptojs.com/license */
(function(global, factory) {
  if (typeof define === 'function' && define.amd)
    define(function() {
      return factory(global)
    })
  else
    factory(global)
}(this, function(window) {
  var Zepto = (function() {
    var undefined, key, $, classList, emptyArray = [],
      concat = emptyArray.concat,
      filter = emptyArray.filter,
      slice = emptyArray.slice,
      document = window.document,
      elementDisplay = {},
      classCache = {},
      cssNumber = {
        'column-count': 1,
        'columns': 1,
        'font-weight': 1,
        'line-height': 1,
        'opacity': 1,
        'z-index': 1,
        'zoom': 1
      },
      fragmentRE = /^\s*<(\w+|!)[^>]*>/,
      singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
      rootNodeRE = /^(?:body|html)$/i,
      capitalRE = /([A-Z])/g,

      // special attributes that should be get/set via method calls
      methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

      adjacencyOperators = ['after', 'prepend', 'before', 'append'],
      table = document.createElement('table'),
      tableRow = document.createElement('tr'),
      containers = {
        'tr': document.createElement('tbody'),
        'tbody': table,
        'thead': table,
        'tfoot': table,
        'td': tableRow,
        'th': tableRow,
        '*': document.createElement('div')
      },
      readyRE = /complete|loaded|interactive/,
      simpleSelectorRE = /^[\w-]*$/,
      class2type = {},
      toString = class2type.toString,
      zepto = {},
      camelize, uniq,
      tempParent = document.createElement('div'),
      propMap = {
        'tabindex': 'tabIndex',
        'readonly': 'readOnly',
        'for': 'htmlFor',
        'class': 'className',
        'maxlength': 'maxLength',
        'cellspacing': 'cellSpacing',
        'cellpadding': 'cellPadding',
        'rowspan': 'rowSpan',
        'colspan': 'colSpan',
        'usemap': 'useMap',
        'frameborder': 'frameBorder',
        'contenteditable': 'contentEditable'
      },
      isArray = Array.isArray ||
      function(object) {
        return object instanceof Array
      }

    zepto.matches = function(element, selector) {
      if (!selector || !element || element.nodeType !== 1) return false
      var matchesSelector = element.matches || element.webkitMatchesSelector ||
        element.mozMatchesSelector || element.oMatchesSelector ||
        element.matchesSelector
      if (matchesSelector) return matchesSelector.call(element, selector)
        // fall back to performing a selector:
      var match, parent = element.parentNode,
        temp = !parent
      if (temp)(parent = tempParent).appendChild(element)
      match = ~zepto.qsa(parent, selector).indexOf(element)
      temp && tempParent.removeChild(element)
      return match
    }

    function type(obj) {
      return obj == null ? String(obj) :
        class2type[toString.call(obj)] || "object"
    }

    function isFunction(value) {
      return type(value) == "function"
    }

    function isWindow(obj) {
      return obj != null && obj == obj.window
    }

    function isDocument(obj) {
      return obj != null && obj.nodeType == obj.DOCUMENT_NODE
    }

    function isObject(obj) {
      return type(obj) == "object"
    }

    function isPlainObject(obj) {
      return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }

    function likeArray(obj) {
      var length = !!obj && 'length' in obj && obj.length,
        type = $.type(obj)

      return 'function' != type && !isWindow(obj) && (
        'array' == type || length === 0 ||
        (typeof length == 'number' && length > 0 && (length - 1) in obj)
      )
    }

    function compact(array) {
      return filter.call(array, function(item) {
        return item != null
      })
    }

    function flatten(array) {
      return array.length > 0 ? $.fn.concat.apply([], array) : array
    }
    camelize = function(str) {
      return str.replace(/-+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : ''
      })
    }

    function dasherize(str) {
      return str.replace(/::/g, '/')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        .replace(/_/g, '-')
        .toLowerCase()
    }
    uniq = function(array) {
      return filter.call(array, function(item, idx) {
        return array.indexOf(item) == idx
      })
    }

    function classRE(name) {
      return name in classCache ?
        classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
    }

    function maybeAddPx(name, value) {
      return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
    }

    function defaultDisplay(nodeName) {
      var element, display
      if (!elementDisplay[nodeName]) {
        element = document.createElement(nodeName)
        document.body.appendChild(element)
        display = getComputedStyle(element, '').getPropertyValue("display")
        element.parentNode.removeChild(element)
        display == "none" && (display = "block")
        elementDisplay[nodeName] = display
      }
      return elementDisplay[nodeName]
    }

    function children(element) {
      return 'children' in element ?
        slice.call(element.children) :
        $.map(element.childNodes, function(node) {
          if (node.nodeType == 1) return node
        })
    }

    function Z(dom, selector) {
      var i, len = dom ? dom.length : 0
      for (i = 0; i < len; i++) this[i] = dom[i]
      this.length = len
      this.selector = selector || ''
    }

    // `$.zepto.fragment` takes a html string and an optional tag name
    // to generate DOM nodes from the given html string.
    // The generated DOM nodes are returned as an array.
    // This function can be overridden in plugins for example to make
    // it compatible with browsers that don't support the DOM fully.
    zepto.fragment = function(html, name, properties) {
      var dom, nodes, container

      // A special case optimization for a single tag
      if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

      if (!dom) {
        if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
        if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
        if (!(name in containers)) name = '*'

        container = containers[name]
        container.innerHTML = '' + html
        dom = $.each(slice.call(container.childNodes), function() {
          container.removeChild(this)
        })
      }

      if (isPlainObject(properties)) {
        nodes = $(dom)
        $.each(properties, function(key, value) {
          if (methodAttributes.indexOf(key) > -1) nodes[key](value)
          else nodes.attr(key, value)
        })
      }

      return dom
    }

    // `$.zepto.Z` swaps out the prototype of the given `dom` array
    // of nodes with `$.fn` and thus supplying all the Zepto functions
    // to the array. This method can be overridden in plugins.
    zepto.Z = function(dom, selector) {
      return new Z(dom, selector)
    }

    // `$.zepto.isZ` should return `true` if the given object is a Zepto
    // collection. This method can be overridden in plugins.
    zepto.isZ = function(object) {
      return object instanceof zepto.Z
    }

    // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
    // takes a CSS selector and an optional context (and handles various
    // special cases).
    // This method can be overridden in plugins.
    zepto.init = function(selector, context) {
      var dom
        // If nothing given, return an empty Zepto collection
      if (!selector) return zepto.Z()
        // Optimize for string selectors
      else if (typeof selector == 'string') {
        selector = selector.trim()
          // If it's a html fragment, create nodes from it
          // Note: In both Chrome 21 and Firefox 15, DOM error 12
          // is thrown if the fragment doesn't begin with <
        if (selector[0] == '<' && fragmentRE.test(selector))
          dom = zepto.fragment(selector, RegExp.$1, context), selector = null
          // If there's a context, create a collection on that context first, and select
          // nodes from there
        else if (context !== undefined) return $(context).find(selector)
          // If it's a CSS selector, use it to select nodes.
        else dom = zepto.qsa(document, selector)
      }
      // If a function is given, call it when the DOM is ready
      else if (isFunction(selector)) return $(document).ready(selector)
        // If a Zepto collection is given, just return it
      else if (zepto.isZ(selector)) return selector
      else {
        // normalize array if an array of nodes is given
        if (isArray(selector)) dom = compact(selector)
          // Wrap DOM nodes.
        else if (isObject(selector))
          dom = [selector], selector = null
          // If it's a html fragment, create nodes from it
        else if (fragmentRE.test(selector))
          dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
          // If there's a context, create a collection on that context first, and select
          // nodes from there
        else if (context !== undefined) return $(context).find(selector)
          // And last but no least, if it's a CSS selector, use it to select nodes.
        else dom = zepto.qsa(document, selector)
      }
      // create a new Zepto collection from the nodes found
      return zepto.Z(dom, selector)
    }

    // `$` will be the base `Zepto` object. When calling this
    // function just call `$.zepto.init, which makes the implementation
    // details of selecting nodes and creating Zepto collections
    // patchable in plugins.
    $ = function(selector, context) {
      return zepto.init(selector, context)
    }

    function extend(target, source, deep) {
      for (key in source)
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
          if (isPlainObject(source[key]) && !isPlainObject(target[key]))
            target[key] = {}
          if (isArray(source[key]) && !isArray(target[key]))
            target[key] = []
          extend(target[key], source[key], deep)
        } else if (source[key] !== undefined) target[key] = source[key]
    }

    // Copy all but undefined properties from one or more
    // objects to the `target` object.
    $.extend = function(target) {
      var deep, args = slice.call(arguments, 1)
      if (typeof target == 'boolean') {
        deep = target
        target = args.shift()
      }
      args.forEach(function(arg) {
        extend(target, arg, deep)
      })
      return target
    }

    // `$.zepto.qsa` is Zepto's CSS selector implementation which
    // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
    // This method can be overridden in plugins.
    zepto.qsa = function(element, selector) {
      var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
      return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
        ((found = element.getElementById(nameOnly)) ? [found] : []) :
        (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
        slice.call(
          isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
        )
    }

    function filtered(nodes, selector) {
      return selector == null ? $(nodes) : $(nodes).filter(selector)
    }

    $.contains = document.documentElement.contains ?
      function(parent, node) {
        return parent !== node && parent.contains(node)
      } :
      function(parent, node) {
        while (node && (node = node.parentNode))
          if (node === parent) return true
        return false
      }

    function funcArg(context, arg, idx, payload) {
      return isFunction(arg) ? arg.call(context, idx, payload) : arg
    }

    function setAttribute(node, name, value) {
      value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
    }

    // access className property while respecting SVGAnimatedString
    function className(node, value) {
      var klass = node.className || '',
        svg = klass && klass.baseVal !== undefined

      if (value === undefined) return svg ? klass.baseVal : klass
      svg ? (klass.baseVal = value) : (node.className = value)
    }

    // "true"  => true
    // "false" => false
    // "null"  => null
    // "42"    => 42
    // "42.5"  => 42.5
    // "08"    => "08"
    // JSON    => parse if valid
    // String  => self
    function deserializeValue(value) {
      try {
        return value ?
          value == "true" ||
          (value == "false" ? false :
            value == "null" ? null :
            +value + "" == value ? +value :
            /^[\[\{]/.test(value) ? $.parseJSON(value) :
            value) : value
      } catch (e) {
        return value
      }
    }

    $.type = type
    $.isFunction = isFunction
    $.isWindow = isWindow
    $.isArray = isArray
    $.isPlainObject = isPlainObject

    $.isEmptyObject = function(obj) {
      var name
      for (name in obj) return false
      return true
    }

    $.isNumeric = function(val) {
      var num = Number(val),
        type = typeof val
      return val != null && type != 'boolean' &&
        (type != 'string' || val.length) &&
        !isNaN(num) && isFinite(num) || false
    }

    $.inArray = function(elem, array, i) {
      return emptyArray.indexOf.call(array, elem, i)
    }

    $.camelCase = camelize
    $.trim = function(str) {
      return str == null ? "" : String.prototype.trim.call(str)
    }

    // plugin compatibility
    $.uuid = 0
    $.support = {}
    $.expr = {}
    $.noop = function() {}

    $.map = function(elements, callback) {
      var value, values = [],
        i, key
      if (likeArray(elements))
        for (i = 0; i < elements.length; i++) {
          value = callback(elements[i], i)
          if (value != null) values.push(value)
        }
      else
        for (key in elements) {
          value = callback(elements[key], key)
          if (value != null) values.push(value)
        }
      return flatten(values)
    }

    $.each = function(elements, callback) {
      var i, key
      if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++)
          if (callback.call(elements[i], i, elements[i]) === false) return elements
      } else {
        for (key in elements)
          if (callback.call(elements[key], key, elements[key]) === false) return elements
      }

      return elements
    }

    $.grep = function(elements, callback) {
      return filter.call(elements, callback)
    }

    if (window.JSON) $.parseJSON = JSON.parse

    // Populate the class2type map
    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase()
    })

    // Define methods that will be available on all
    // Zepto collections
    $.fn = {
      constructor: zepto.Z,
      length: 0,

      // Because a collection acts like an array
      // copy over these useful array functions.
      forEach: emptyArray.forEach,
      reduce: emptyArray.reduce,
      push: emptyArray.push,
      sort: emptyArray.sort,
      splice: emptyArray.splice,
      indexOf: emptyArray.indexOf,
      concat: function() {
        var i, value, args = []
        for (i = 0; i < arguments.length; i++) {
          value = arguments[i]
          args[i] = zepto.isZ(value) ? value.toArray() : value
        }
        return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
      },

      // `map` and `slice` in the jQuery API work differently
      // from their array counterparts
      map: function(fn) {
        return $($.map(this, function(el, i) {
          return fn.call(el, i, el)
        }))
      },
      slice: function() {
        return $(slice.apply(this, arguments))
      },

      ready: function(callback) {
        // need to check if document.body exists for IE as that browser reports
        // document ready when it hasn't yet created the body element
        if (readyRE.test(document.readyState) && document.body) callback($)
        else document.addEventListener('DOMContentLoaded', function() {
          callback($)
        }, false)
        return this
      },
      get: function(idx) {
        return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
      },
      toArray: function() {
        return this.get()
      },
      size: function() {
        return this.length
      },
      remove: function() {
        return this.each(function() {
          if (this.parentNode != null)
            this.parentNode.removeChild(this)
        })
      },
      each: function(callback) {
        emptyArray.every.call(this, function(el, idx) {
          return callback.call(el, idx, el) !== false
        })
        return this
      },
      filter: function(selector) {
        if (isFunction(selector)) return this.not(this.not(selector))
        return $(filter.call(this, function(element) {
          return zepto.matches(element, selector)
        }))
      },
      add: function(selector, context) {
        return $(uniq(this.concat($(selector, context))))
      },
      is: function(selector) {
        return this.length > 0 && zepto.matches(this[0], selector)
      },
      not: function(selector) {
        var nodes = []
        if (isFunction(selector) && selector.call !== undefined)
          this.each(function(idx) {
            if (!selector.call(this, idx)) nodes.push(this)
          })
        else {
          var excludes = typeof selector == 'string' ? this.filter(selector) :
            (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
          this.forEach(function(el) {
            if (excludes.indexOf(el) < 0) nodes.push(el)
          })
        }
        return $(nodes)
      },
      has: function(selector) {
        return this.filter(function() {
          return isObject(selector) ?
            $.contains(this, selector) :
            $(this).find(selector).size()
        })
      },
      eq: function(idx) {
        return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
      },
      first: function() {
        var el = this[0]
        return el && !isObject(el) ? el : $(el)
      },
      last: function() {
        var el = this[this.length - 1]
        return el && !isObject(el) ? el : $(el)
      },
      find: function(selector) {
        var result, $this = this
        if (!selector) result = $()
        else if (typeof selector == 'object')
          result = $(selector).filter(function() {
            var node = this
            return emptyArray.some.call($this, function(parent) {
              return $.contains(parent, node)
            })
          })
        else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
        else result = this.map(function() {
          return zepto.qsa(this, selector)
        })
        return result
      },
      closest: function(selector, context) {
        var nodes = [],
          collection = typeof selector == 'object' && $(selector)
        this.each(function(_, node) {
          while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
            node = node !== context && !isDocument(node) && node.parentNode
          if (node && nodes.indexOf(node) < 0) nodes.push(node)
        })
        return $(nodes)
      },
      parents: function(selector) {
        var ancestors = [],
          nodes = this
        while (nodes.length > 0)
          nodes = $.map(nodes, function(node) {
            if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
              ancestors.push(node)
              return node
            }
          })
        return filtered(ancestors, selector)
      },
      parent: function(selector) {
        return filtered(uniq(this.pluck('parentNode')), selector)
      },
      children: function(selector) {
        return filtered(this.map(function() {
          return children(this)
        }), selector)
      },
      contents: function() {
        return this.map(function() {
          return this.contentDocument || slice.call(this.childNodes)
        })
      },
      siblings: function(selector) {
        return filtered(this.map(function(i, el) {
          return filter.call(children(el.parentNode), function(child) {
            return child !== el
          })
        }), selector)
      },
      empty: function() {
        return this.each(function() {
          this.innerHTML = ''
        })
      },
      // `pluck` is borrowed from Prototype.js
      pluck: function(property) {
        return $.map(this, function(el) {
          return el[property]
        })
      },
      show: function() {
        return this.each(function() {
          this.style.display == "none" && (this.style.display = '')
          if (getComputedStyle(this, '').getPropertyValue("display") == "none")
            this.style.display = defaultDisplay(this.nodeName)
        })
      },
      replaceWith: function(newContent) {
        return this.before(newContent).remove()
      },
      wrap: function(structure) {
        var func = isFunction(structure)
        if (this[0] && !func)
          var dom = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

        return this.each(function(index) {
          $(this).wrapAll(
            func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
          )
        })
      },
      wrapAll: function(structure) {
        if (this[0]) {
          $(this[0]).before(structure = $(structure))
          var children
            // drill down to the inmost element
          while ((children = structure.children()).length) structure = children.first()
          $(structure).append(this)
        }
        return this
      },
      wrapInner: function(structure) {
        var func = isFunction(structure)
        return this.each(function(index) {
          var self = $(this),
            contents = self.contents(),
            dom = func ? structure.call(this, index) : structure
          contents.length ? contents.wrapAll(dom) : self.append(dom)
        })
      },
      unwrap: function() {
        this.parent().each(function() {
          $(this).replaceWith($(this).children())
        })
        return this
      },
      clone: function() {
        return this.map(function() {
          return this.cloneNode(true)
        })
      },
      hide: function() {
        return this.css("display", "none")
      },
      toggle: function(setting) {
        return this.each(function() {
          var el = $(this);
          (setting === undefined ? el.css("display") == "none" : setting) ? el.show(): el.hide()
        })
      },
      prev: function(selector) {
        return $(this.pluck('previousElementSibling')).filter(selector || '*')
      },
      next: function(selector) {
        return $(this.pluck('nextElementSibling')).filter(selector || '*')
      },
      html: function(html) {
        return 0 in arguments ?
          this.each(function(idx) {
            var originHtml = this.innerHTML
            $(this).empty().append(funcArg(this, html, idx, originHtml))
          }) :
          (0 in this ? this[0].innerHTML : null)
      },
      text: function(text) {
        return 0 in arguments ?
          this.each(function(idx) {
            var newText = funcArg(this, text, idx, this.textContent)
            this.textContent = newText == null ? '' : '' + newText
          }) :
          (0 in this ? this.pluck('textContent').join("") : null)
      },
      attr: function(name, value) {
        var result
        return (typeof name == 'string' && !(1 in arguments)) ?
          (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
          this.each(function(idx) {
            if (this.nodeType !== 1) return
            if (isObject(name))
              for (key in name) setAttribute(this, key, name[key])
            else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
          })
      },
      removeAttr: function(name) {
        return this.each(function() {
          this.nodeType === 1 && name.split(' ').forEach(function(attribute) {
            setAttribute(this, attribute)
          }, this)
        })
      },
      prop: function(name, value) {
        name = propMap[name] || name
        return (1 in arguments) ?
          this.each(function(idx) {
            this[name] = funcArg(this, value, idx, this[name])
          }) :
          (this[0] && this[0][name])
      },
      removeProp: function(name) {
        name = propMap[name] || name
        return this.each(function() {
          delete this[name]
        })
      },
      data: function(name, value) {
        var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

        var data = (1 in arguments) ?
          this.attr(attrName, value) :
          this.attr(attrName)

        return data !== null ? deserializeValue(data) : undefined
      },
      val: function(value) {
        if (0 in arguments) {
          if (value == null) value = ""
          return this.each(function(idx) {
            this.value = funcArg(this, value, idx, this.value)
          })
        } else {
          return this[0] && (this[0].multiple ?
            $(this[0]).find('option').filter(function() {
              return this.selected
            }).pluck('value') :
            this[0].value)
        }
      },
      offset: function(coordinates) {
        if (coordinates) return this.each(function(index) {
          var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top: coords.top - parentOffset.top,
              left: coords.left - parentOffset.left
            }

          if ($this.css('position') == 'static') props['position'] = 'relative'
          $this.css(props)
        })
        if (!this.length) return null
        if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
          return {
            top: 0,
            left: 0
          }
        var obj = this[0].getBoundingClientRect()
        return {
          left: obj.left + window.pageXOffset,
          top: obj.top + window.pageYOffset,
          width: Math.round(obj.width),
          height: Math.round(obj.height)
        }
      },
      css: function(property, value) {
        if (arguments.length < 2) {
          var element = this[0]
          if (typeof property == 'string') {
            if (!element) return
            return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
          } else if (isArray(property)) {
            if (!element) return
            var props = {}
            var computedStyle = getComputedStyle(element, '')
            $.each(property, function(_, prop) {
              props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
            })
            return props
          }
        }

        var css = ''
        if (type(property) == 'string') {
          if (!value && value !== 0)
            this.each(function() {
              this.style.removeProperty(dasherize(property))
            })
          else
            css = dasherize(property) + ":" + maybeAddPx(property, value)
        } else {
          for (key in property)
            if (!property[key] && property[key] !== 0)
              this.each(function() {
                this.style.removeProperty(dasherize(key))
              })
            else
              css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
        }

        return this.each(function() {
          this.style.cssText += ';' + css
        })
      },
      index: function(element) {
        return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
      },
      hasClass: function(name) {
        if (!name) return false
        return emptyArray.some.call(this, function(el) {
          return this.test(className(el))
        }, classRE(name))
      },
      addClass: function(name) {
        if (!name) return this
        return this.each(function(idx) {
          if (!('className' in this)) return
          classList = []
          var cls = className(this),
            newName = funcArg(this, name, idx, cls)
          newName.split(/\s+/g).forEach(function(klass) {
            if (!$(this).hasClass(klass)) classList.push(klass)
          }, this)
          classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
        })
      },
      removeClass: function(name) {
        return this.each(function(idx) {
          if (!('className' in this)) return
          if (name === undefined) return className(this, '')
          classList = className(this)
          funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
            classList = classList.replace(classRE(klass), " ")
          })
          className(this, classList.trim())
        })
      },
      toggleClass: function(name, when) {
        if (!name) return this
        return this.each(function(idx) {
          var $this = $(this),
            names = funcArg(this, name, idx, className(this))
          names.split(/\s+/g).forEach(function(klass) {
            (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass): $this.removeClass(klass)
          })
        })
      },
      scrollTop: function(value) {
        if (!this.length) return
        var hasScrollTop = 'scrollTop' in this[0]
        if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
        return this.each(hasScrollTop ?
          function() {
            this.scrollTop = value
          } :
          function() {
            this.scrollTo(this.scrollX, value)
          })
      },
      scrollLeft: function(value) {
        if (!this.length) return
        var hasScrollLeft = 'scrollLeft' in this[0]
        if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
        return this.each(hasScrollLeft ?
          function() {
            this.scrollLeft = value
          } :
          function() {
            this.scrollTo(value, this.scrollY)
          })
      },
      position: function() {
        if (!this.length) return

        var elem = this[0],
          // Get *real* offsetParent
          offsetParent = this.offsetParent(),
          // Get correct offsets
          offset = this.offset(),
          parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {
            top: 0,
            left: 0
          } : offsetParent.offset()

        // Subtract element margins
        // note: when an element has margin: auto the offsetLeft and marginLeft
        // are the same in Safari causing offset.left to incorrectly be 0
        offset.top -= parseFloat($(elem).css('margin-top')) || 0
        offset.left -= parseFloat($(elem).css('margin-left')) || 0

        // Add offsetParent borders
        parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0
        parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0

        // Subtract the two offsets
        return {
          top: offset.top - parentOffset.top,
          left: offset.left - parentOffset.left
        }
      },
      offsetParent: function() {
        return this.map(function() {
          var parent = this.offsetParent || document.body
          while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
            parent = parent.offsetParent
          return parent
        })
      }
    }

    // for now
    $.fn.detach = $.fn.remove

    // Generate the `width` and `height` functions
    ;
    ['width', 'height'].forEach(function(dimension) {
      var dimensionProperty =
        dimension.replace(/./, function(m) {
          return m[0].toUpperCase()
        })

      $.fn[dimension] = function(value) {
        var offset, el = this[0]
        if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
          isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
          (offset = this.offset()) && offset[dimension]
        else return this.each(function(idx) {
          el = $(this)
          el.css(dimension, funcArg(this, value, idx, el[dimension]()))
        })
      }
    })

    function traverseNode(node, fun) {
      fun(node)
      for (var i = 0, len = node.childNodes.length; i < len; i++)
        traverseNode(node.childNodes[i], fun)
    }

    // Generate the `after`, `prepend`, `before`, `append`,
    // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
    adjacencyOperators.forEach(function(operator, operatorIndex) {
      var inside = operatorIndex % 2 //=> prepend, append

      $.fn[operator] = function() {
        // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
        var argType, nodes = $.map(arguments, function(arg) {
            var arr = []
            argType = type(arg)
            if (argType == "array") {
              arg.forEach(function(el) {
                if (el.nodeType !== undefined) return arr.push(el)
                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())
                arr = arr.concat(zepto.fragment(el))
              })
              return arr
            }
            return argType == "object" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
        if (nodes.length < 1) return this

        return this.each(function(_, target) {
          parent = inside ? target : target.parentNode

          // convert all methods to a "before" operation
          target = operatorIndex == 0 ? target.nextSibling :
            operatorIndex == 1 ? target.firstChild :
            operatorIndex == 2 ? target :
            null

          var parentInDocument = $.contains(document.documentElement, parent)

          nodes.forEach(function(node) {
            if (copyByClone) node = node.cloneNode(true)
            else if (!parent) return $(node).remove()

            parent.insertBefore(node, target)
            if (parentInDocument) traverseNode(node, function(el) {
              if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
                (!el.type || el.type === 'text/javascript') && !el.src) {
                var target = el.ownerDocument ? el.ownerDocument.defaultView : window
                target['eval'].call(target, el.innerHTML)
              }
            })
          })
        })
      }

      // after    => insertAfter
      // prepend  => prependTo
      // before   => insertBefore
      // append   => appendTo
      $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function(html) {
        $(html)[operator](this)
        return this
      }
    })

    zepto.Z.prototype = Z.prototype = $.fn

    // Export internal API functions in the `$.zepto` namespace
    zepto.uniq = uniq
    zepto.deserializeValue = deserializeValue
    $.zepto = zepto

    return $
  })()

  window.Zepto = Zepto
  window.$ === undefined && (window.$ = Zepto)

  ;
  (function($) {
    var _zid = 1,
      undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj) {
        return typeof obj == 'string'
      },
      handlers = {},
      specialEvents = {},
      focusinSupported = 'onfocusin' in window,
      focus = {
        focus: 'focusin',
        blur: 'focusout'
      },
      hover = {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
      }

    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

    function zid(element) {
      return element._zid || (element._zid = _zid++)
    }

    function findHandlers(element, event, fn, selector) {
      event = parse(event)
      if (event.ns) var matcher = matcherFor(event.ns)
      return (handlers[zid(element)] || []).filter(function(handler) {
        return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector)
      })
    }

    function parse(event) {
      var parts = ('' + event).split('.')
      return {
        e: parts[0],
        ns: parts.slice(1).sort().join(' ')
      }
    }

    function matcherFor(ns) {
      return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
    }

    function eventCapture(handler, captureSetting) {
      return handler.del &&
        (!focusinSupported && (handler.e in focus)) ||
        !!captureSetting
    }

    function realEvent(type) {
      return hover[type] || (focusinSupported && focus[type]) || type
    }

    function add(element, events, fn, data, selector, delegator, capture) {
      var id = zid(element),
        set = (handlers[id] || (handlers[id] = []))
      events.split(/\s/).forEach(function(event) {
        if (event == 'ready') return $(document).ready(fn)
        var handler = parse(event)
        handler.fn = fn
        handler.sel = selector
          // emulate mouseenter, mouseleave
        if (handler.e in hover) fn = function(e) {
          var related = e.relatedTarget
          if (!related || (related !== this && !$.contains(this, related)))
            return handler.fn.apply(this, arguments)
        }
        handler.del = delegator
        var callback = delegator || fn
        handler.proxy = function(e) {
          e = compatible(e)
          if (e.isImmediatePropagationStopped()) return
          e.data = data
          var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
          if (result === false) e.preventDefault(), e.stopPropagation()
          return result
        }
        handler.i = set.length
        set.push(handler)
        if ('addEventListener' in element)
          element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    }

    function remove(element, events, fn, selector, capture) {
      var id = zid(element);
      (events || '').split(/\s/).forEach(function(event) {
        findHandlers(element, event, fn, selector).forEach(function(handler) {
          delete handlers[id][handler.i]
          if ('removeEventListener' in element)
            element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
        })
      })
    }

    $.event = {
      add: add,
      remove: remove
    }

    $.proxy = function(fn, context) {
      var args = (2 in arguments) && slice.call(arguments, 2)
      if (isFunction(fn)) {
        var proxyFn = function() {
          return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments)
        }
        proxyFn._zid = zid(fn)
        return proxyFn
      } else if (isString(context)) {
        if (args) {
          args.unshift(fn[context], fn)
          return $.proxy.apply(null, args)
        } else {
          return $.proxy(fn[context], fn)
        }
      } else {
        throw new TypeError("expected function")
      }
    }

    $.fn.bind = function(event, data, callback) {
      return this.on(event, data, callback)
    }
    $.fn.unbind = function(event, callback) {
      return this.off(event, callback)
    }
    $.fn.one = function(event, selector, data, callback) {
      return this.on(event, selector, data, callback, 1)
    }

    var returnTrue = function() {
        return true
      },
      returnFalse = function() {
        return false
      },
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

    function compatible(event, source) {
      if (source || !event.isDefaultPrevented) {
        source || (source = event)

        $.each(eventMethods, function(name, predicate) {
          var sourceMethod = source[name]
          event[name] = function() {
            this[predicate] = returnTrue
            return sourceMethod && sourceMethod.apply(source, arguments)
          }
          event[predicate] = returnFalse
        })

        try {
          event.timeStamp || (event.timeStamp = Date.now())
        } catch (ignored) {}

        if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
          event.isDefaultPrevented = returnTrue
      }
      return event
    }

    function createProxy(event) {
      var key, proxy = {
        originalEvent: event
      }
      for (key in event)
        if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

      return compatible(proxy, event)
    }

    $.fn.delegate = function(selector, event, callback) {
      return this.on(event, selector, callback)
    }
    $.fn.undelegate = function(selector, event, callback) {
      return this.off(event, selector, callback)
    }

    $.fn.live = function(event, callback) {
      $(document.body).delegate(this.selector, event, callback)
      return this
    }
    $.fn.die = function(event, callback) {
      $(document.body).undelegate(this.selector, event, callback)
      return this
    }

    $.fn.on = function(event, selector, data, callback, one) {
      var autoRemove, delegator, $this = this
      if (event && !isString(event)) {
        $.each(event, function(type, fn) {
          $this.on(type, selector, data, fn, one)
        })
        return $this
      }

      if (!isString(selector) && !isFunction(callback) && callback !== false)
        callback = data, data = selector, selector = undefined
      if (callback === undefined || data === false)
        callback = data, data = undefined

      if (callback === false) callback = returnFalse

      return $this.each(function(_, element) {
        if (one) autoRemove = function(e) {
          remove(element, e.type, callback)
          return callback.apply(this, arguments)
        }

        if (selector) delegator = function(e) {
          var evt, match = $(e.target).closest(selector, element).get(0)
          if (match && match !== element) {
            evt = $.extend(createProxy(e), {
              currentTarget: match,
              liveFired: element
            })
            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
          }
        }

        add(element, event, callback, data, selector, delegator || autoRemove)
      })
    }
    $.fn.off = function(event, selector, callback) {
      var $this = this
      if (event && !isString(event)) {
        $.each(event, function(type, fn) {
          $this.off(type, selector, fn)
        })
        return $this
      }

      if (!isString(selector) && !isFunction(callback) && callback !== false)
        callback = selector, selector = undefined

      if (callback === false) callback = returnFalse

      return $this.each(function() {
        remove(this, event, callback, selector)
      })
    }

    $.fn.trigger = function(event, args) {
      event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
      event._args = args
      return this.each(function() {
        // handle focus(), blur() by calling them directly
        if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
          // items in the collection might not be DOM elements
        else if ('dispatchEvent' in this) this.dispatchEvent(event)
        else $(this).triggerHandler(event, args)
      })
    }

    // triggers event handlers on current element just as if an event occurred,
    // doesn't trigger an actual event, doesn't bubble
    $.fn.triggerHandler = function(event, args) {
      var e, result
      this.each(function(i, element) {
        e = createProxy(isString(event) ? $.Event(event) : event)
        e._args = args
        e.target = element
        $.each(findHandlers(element, event.type || event), function(i, handler) {
          result = handler.proxy(e)
          if (e.isImmediatePropagationStopped()) return false
        })
      })
      return result
    }

    // shortcut methods for `.bind(event, fn)` for each event type
    ;
    ('focusin focusout focus blur load resize scroll unload click dblclick ' +
      'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
      'change select keydown keypress keyup error').split(' ').forEach(function(event) {
      $.fn[event] = function(callback) {
        return (0 in arguments) ?
          this.bind(event, callback) :
          this.trigger(event)
      }
    })

    $.Event = function(type, props) {
      if (!isString(type)) props = type, type = props.type
      var event = document.createEvent(specialEvents[type] || 'Events'),
        bubbles = true
      if (props)
        for (var name in props)(name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
      event.initEvent(type, bubbles, true)
      return compatible(event)
    }

  })(Zepto)

  ;
  (function($) {
    var jsonpID = +new Date(),
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a')

    originAnchor.href = window.location.href

    // trigger a custom event and return false if it was cancelled
    function triggerAndReturn(context, eventName, data) {
      var event = $.Event(eventName)
      $(context).trigger(event, data)
      return !event.isDefaultPrevented()
    }

    // trigger an Ajax "global" event
    function triggerGlobal(settings, context, eventName, data) {
      if (settings.global) return triggerAndReturn(context || document, eventName, data)
    }

    // Number of active Ajax requests
    $.active = 0

    function ajaxStart(settings) {
      if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
    }

    function ajaxStop(settings) {
      if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
    }

    // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
    function ajaxBeforeSend(xhr, settings) {
      var context = settings.context
      if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
        return false

      triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
    }

    function ajaxSuccess(data, xhr, settings, deferred) {
      var context = settings.context,
        status = 'success'
      settings.success.call(context, data, status, xhr)
      if (deferred) deferred.resolveWith(context, [data, status, xhr])
      triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
      ajaxComplete(status, xhr, settings)
    }
    // type: "timeout", "error", "abort", "parsererror"
    function ajaxError(error, type, xhr, settings, deferred) {
      var context = settings.context
      settings.error.call(context, xhr, type, error)
      if (deferred) deferred.rejectWith(context, [xhr, type, error])
      triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
      ajaxComplete(type, xhr, settings)
    }
    // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
    function ajaxComplete(status, xhr, settings) {
      var context = settings.context
      settings.complete.call(context, xhr, status)
      triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
      ajaxStop(settings)
    }

    function ajaxDataFilter(data, type, settings) {
      if (settings.dataFilter == empty) return data
      var context = settings.context
      return settings.dataFilter.call(context, data, type)
    }

    // Empty function, used as default callback
    function empty() {}

    $.ajaxJSONP = function(options, deferred) {
      if (!('type' in options)) return $.ajax(options)

      var _callbackName = options.jsonpCallback,
        callbackName = ($.isFunction(_callbackName) ?
          _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),
        script = document.createElement('script'),
        originalCallback = window[callbackName],
        responseData,
        abort = function(errorType) {
          $(script).triggerHandler('error', errorType || 'abort')
        },
        xhr = {
          abort: abort
        },
        abortTimeout

      if (deferred) deferred.promise(xhr)

      $(script).on('load error', function(e, errorType) {
        clearTimeout(abortTimeout)
        $(script).off().remove()

        if (e.type == 'error' || !responseData) {
          ajaxError(null, errorType || 'error', xhr, options, deferred)
        } else {
          ajaxSuccess(responseData[0], xhr, options, deferred)
        }

        window[callbackName] = originalCallback
        if (responseData && $.isFunction(originalCallback))
          originalCallback(responseData[0])

        originalCallback = responseData = undefined
      })

      if (ajaxBeforeSend(xhr, options) === false) {
        abort('abort')
        return xhr
      }

      window[callbackName] = function() {
        responseData = arguments
      }

      script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
      document.head.appendChild(script)

      if (options.timeout > 0) abortTimeout = setTimeout(function() {
        abort('timeout')
      }, options.timeout)

      return xhr
    }

    $.ajaxSettings = {
      // Default type of request
      type: 'GET',
      // Callback that is executed before request
      beforeSend: empty,
      // Callback that is executed if the request succeeds
      success: empty,
      // Callback that is executed the the server drops error
      error: empty,
      // Callback that is executed on request complete (both: error and success)
      complete: empty,
      // The context for the callbacks
      context: null,
      // Whether to trigger "global" Ajax events
      global: true,
      // Transport
      xhr: function() {
        return new window.XMLHttpRequest()
      },
      // MIME types mapping
      // IIS returns Javascript as "application/x-javascript"
      accepts: {
        script: 'text/javascript, application/javascript, application/x-javascript',
        json: jsonType,
        xml: 'application/xml, text/xml',
        html: htmlType,
        text: 'text/plain'
      },
      // Whether the request is to another domain
      crossDomain: false,
      // Default timeout
      timeout: 0,
      // Whether data should be serialized to string
      processData: true,
      // Whether the browser should be allowed to cache GET responses
      cache: true,
      //Used to handle the raw response data of XMLHttpRequest.
      //This is a pre-filtering function to sanitize the response.
      //The sanitized response should be returned
      dataFilter: empty
    }

    function mimeToDataType(mime) {
      if (mime) mime = mime.split(';', 2)[0]
      return mime && (mime == htmlType ? 'html' :
        mime == jsonType ? 'json' :
        scriptTypeRE.test(mime) ? 'script' :
        xmlTypeRE.test(mime) && 'xml') || 'text'
    }

    function appendQuery(url, query) {
      if (query == '') return url
      return (url + '&' + query).replace(/[&?]{1,2}/, '?')
    }

    // serialize payload and append it to the URL for GET requests
    function serializeData(options) {
      if (options.processData && options.data && $.type(options.data) != "string")
        options.data = $.param(options.data, options.traditional)
      if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))
        options.url = appendQuery(options.url, options.data), options.data = undefined
    }

    $.ajax = function(options) {
      var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor, hashIndex
      for (key in $.ajaxSettings)
        if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

      ajaxStart(settings)

      if (!settings.crossDomain) {
        urlAnchor = document.createElement('a')
        urlAnchor.href = settings.url
          // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
        urlAnchor.href = urlAnchor.href
        settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
      }

      if (!settings.url) settings.url = window.location.toString()
      if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)
      serializeData(settings)

      var dataType = settings.dataType,
        hasPlaceholder = /\?.+=\?/.test(settings.url)
      if (hasPlaceholder) dataType = 'jsonp'

      if (settings.cache === false || (
          (!options || options.cache !== true) &&
          ('script' == dataType || 'jsonp' == dataType)
        ))
        settings.url = appendQuery(settings.url, '_=' + Date.now())

      if ('jsonp' == dataType) {
        if (!hasPlaceholder)
          settings.url = appendQuery(settings.url,
            settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
        return $.ajaxJSONP(settings, deferred)
      }

      var mime = settings.accepts[dataType],
        headers = {},
        setHeader = function(name, value) {
          headers[name.toLowerCase()] = [name, value]
        },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

      if (deferred) deferred.promise(xhr)

      if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
      setHeader('Accept', mime || '*/*')
      if (mime = settings.mimeType || mime) {
        if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
        xhr.overrideMimeType && xhr.overrideMimeType(mime)
      }
      if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
        setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

      if (settings.headers)
        for (name in settings.headers) setHeader(name, settings.headers[name])
      xhr.setRequestHeader = setHeader

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          xhr.onreadystatechange = empty
          clearTimeout(abortTimeout)
          var result, error = false
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
            dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))

            if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
              result = xhr.response
            else {
              result = xhr.responseText

              try {
                // http://perfectionkills.com/global-eval-what-are-the-options/
                // sanitize response accordingly if data filter callback provided
                result = ajaxDataFilter(result, dataType, settings)
                if (dataType == 'script')(1, eval)(result)
                else if (dataType == 'xml') result = xhr.responseXML
                else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
              } catch (e) {
                error = e
              }

              if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)
            }

            ajaxSuccess(result, xhr, settings, deferred)
          } else {
            ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
          }
        }
      }

      if (ajaxBeforeSend(xhr, settings) === false) {
        xhr.abort()
        ajaxError(null, 'abort', xhr, settings, deferred)
        return xhr
      }

      var async = 'async' in settings ? settings.async : true
      xhr.open(settings.type, settings.url, async, settings.username, settings.password)

      if (settings.xhrFields)
        for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

      for (name in headers) nativeSetHeader.apply(xhr, headers[name])

      if (settings.timeout > 0) abortTimeout = setTimeout(function() {
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

      // avoid sending empty string (#319)
      xhr.send(settings.data ? settings.data : null)
      return xhr
    }

    // handle optional data/success arguments
    function parseArguments(url, data, success, dataType) {
      if ($.isFunction(data)) dataType = success, success = data, data = undefined
      if (!$.isFunction(success)) dataType = success, success = undefined
      return {
        url: url,
        data: data,
        success: success,
        dataType: dataType
      }
    }

    $.get = function( /* url, data, success, dataType */ ) {
      return $.ajax(parseArguments.apply(null, arguments))
    }

    $.post = function( /* url, data, success, dataType */ ) {
      var options = parseArguments.apply(null, arguments)
      options.type = 'POST'
      return $.ajax(options)
    }

    $.getJSON = function( /* url, data, success */ ) {
      var options = parseArguments.apply(null, arguments)
      options.dataType = 'json'
      return $.ajax(options)
    }

    $.fn.load = function(url, data, success) {
      if (!this.length) return this
      var self = this,
        parts = url.split(/\s/),
        selector,
        options = parseArguments(url, data, success),
        callback = options.success
      if (parts.length > 1) options.url = parts[0], selector = parts[1]
      options.success = function(response) {
        self.html(selector ?
          $('<div>').html(response.replace(rscript, "")).find(selector) : response)
        callback && callback.apply(self, arguments)
      }
      $.ajax(options)
      return this
    }

    var escape = encodeURIComponent

    function serialize(params, obj, traditional, scope) {
      var type, array = $.isArray(obj),
        hash = $.isPlainObject(obj)
      $.each(obj, function(key, value) {
        type = $.type(value)
        if (scope) key = traditional ? scope :
          scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
          // handle data in serializeArray() format
        if (!scope && array) params.add(value.name, value.value)
          // recurse into nested objects
        else if (type == "array" || (!traditional && type == "object"))
          serialize(params, value, traditional, key)
        else params.add(key, value)
      })
    }

    $.param = function(obj, traditional) {
      var params = []
      params.add = function(key, value) {
        if ($.isFunction(value)) value = value()
        if (value == null) value = ""
        this.push(escape(key) + '=' + escape(value))
      }
      serialize(params, obj, traditional)
      return params.join('&').replace(/%20/g, '+')
    }
  })(Zepto)

  ;
  (function($) {
    $.fn.serializeArray = function() {
      var name, type, result = [],
        add = function(value) {
          if (value.forEach) return value.forEach(add)
          result.push({
            name: name,
            value: value
          })
        }
      if (this[0]) $.each(this[0].elements, function(_, field) {
        type = field.type, name = field.name
        if (name && field.nodeName.toLowerCase() != 'fieldset' &&
          !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
          ((type != 'radio' && type != 'checkbox') || field.checked))
          add($(field).val())
      })
      return result
    }

    $.fn.serialize = function() {
      var result = []
      this.serializeArray().forEach(function(elm) {
        result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
      })
      return result.join('&')
    }

    $.fn.submit = function(callback) {
      if (0 in arguments) this.bind('submit', callback)
      else if (this.length) {
        var event = $.Event('submit')
        this.eq(0).trigger(event)
        if (!event.isDefaultPrevented()) this.get(0).submit()
      }
      return this
    }

  })(Zepto)

  ;
  (function() {
    // getComputedStyle shouldn't freak out when called
    // without a valid element as argument
    try {
      getComputedStyle(undefined)
    } catch (e) {
      var nativeGetComputedStyle = getComputedStyle
      window.getComputedStyle = function(element, pseudoElement) {
        try {
          return nativeGetComputedStyle(element, pseudoElement)
        } catch (e) {
          return null
        }
      }
    }
  })()

  ;
  (function($) {
    function detect(ua, platform) {
      var os = this.os = {},
        browser = this.browser = {},
        webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        osx = !!ua.match(/\(Macintosh\; Intel /),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        win = /Win\d{2}|Windows/.test(platform),
        wp = ua.match(/Windows Phone ([\d.]+)/),
        touchpad = webos && ua.match(/TouchPad/),
        kindle = ua.match(/Kindle\/([\d.]+)/),
        silk = ua.match(/Silk\/([\d._]+)/),
        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
        bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
        rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
        playbook = ua.match(/PlayBook/),
        chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        firefox = ua.match(/Firefox\/([\d.]+)/),
        firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
        ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
        webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
        safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

      // Todo: clean this up with a better OS/browser seperation:
      // - discern (more) between multiple browsers on android
      // - decide if kindle fire in silk mode is android or not
      // - Firefox on Android doesn't specify the Android version
      // - possibly devide in os, device and browser hashes

      if (browser.webkit = !!webkit) browser.version = webkit[1]

      if (android) os.android = true, os.version = android[2]
      if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
      if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
      if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
      if (wp) os.wp = true, os.version = wp[1]
      if (webos) os.webos = true, os.version = webos[2]
      if (touchpad) os.touchpad = true
      if (blackberry) os.blackberry = true, os.version = blackberry[2]
      if (bb10) os.bb10 = true, os.version = bb10[2]
      if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
      if (playbook) browser.playbook = true
      if (kindle) os.kindle = true, os.version = kindle[1]
      if (silk) browser.silk = true, browser.version = silk[1]
      if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
      if (chrome) browser.chrome = true, browser.version = chrome[1]
      if (firefox) browser.firefox = true, browser.version = firefox[1]
      if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
      if (ie) browser.ie = true, browser.version = ie[1]
      if (safari && (osx || os.ios || win)) {
        browser.safari = true
        if (!os.ios) browser.version = safari[1]
      }
      if (webview) browser.webview = true

      os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
        (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
      os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
        (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
        (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
    }

    detect.call($, navigator.userAgent, navigator.platform)
      // make available to unit tests
    $.__detect = detect

  })(Zepto)

  ;
  (function($, undefined) {
    var prefix = '',
      eventPrefix,
      vendors = {
        Webkit: 'webkit',
        Moz: '',
        O: 'o'
      },
      testEl = document.createElement('div'),
      supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
      transform,
      transitionProperty, transitionDuration, transitionTiming, transitionDelay,
      animationName, animationDuration, animationTiming, animationDelay,
      cssReset = {}

    function dasherize(str) {
      return str.replace(/([A-Z])/g, '-$1').toLowerCase()
    }

    function normalizeEvent(name) {
      return eventPrefix ? eventPrefix + name : name.toLowerCase()
    }

    if (testEl.style.transform === undefined) $.each(vendors, function(vendor, event) {
      if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
        prefix = '-' + vendor.toLowerCase() + '-'
        eventPrefix = event
        return false
      }
    })

    transform = prefix + 'transform'
    cssReset[transitionProperty = prefix + 'transition-property'] =
      cssReset[transitionDuration = prefix + 'transition-duration'] =
      cssReset[transitionDelay = prefix + 'transition-delay'] =
      cssReset[transitionTiming = prefix + 'transition-timing-function'] =
      cssReset[animationName = prefix + 'animation-name'] =
      cssReset[animationDuration = prefix + 'animation-duration'] =
      cssReset[animationDelay = prefix + 'animation-delay'] =
      cssReset[animationTiming = prefix + 'animation-timing-function'] = ''

    $.fx = {
      off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
      speeds: {
        _default: 400,
        fast: 200,
        slow: 600
      },
      cssPrefix: prefix,
      transitionEnd: normalizeEvent('TransitionEnd'),
      animationEnd: normalizeEvent('AnimationEnd')
    }

    $.fn.animate = function(properties, duration, ease, callback, delay) {
      if ($.isFunction(duration))
        callback = duration, ease = undefined, duration = undefined
      if ($.isFunction(ease))
        callback = ease, ease = undefined
      if ($.isPlainObject(duration))
        ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
      if (duration) duration = (typeof duration == 'number' ? duration :
        ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
      if (delay) delay = parseFloat(delay) / 1000
      return this.anim(properties, duration, ease, callback, delay)
    }

    $.fn.anim = function(properties, duration, ease, callback, delay) {
      var key, cssValues = {},
        cssProperties, transforms = '',
        that = this,
        wrappedCallback, endEvent = $.fx.transitionEnd,
        fired = false

      if (duration === undefined) duration = $.fx.speeds._default / 1000
      if (delay === undefined) delay = 0
      if ($.fx.off) duration = 0

      if (typeof properties == 'string') {
        // keyframe animation
        cssValues[animationName] = properties
        cssValues[animationDuration] = duration + 's'
        cssValues[animationDelay] = delay + 's'
        cssValues[animationTiming] = (ease || 'linear')
        endEvent = $.fx.animationEnd
      } else {
        cssProperties = []
          // CSS transitions
        for (key in properties)
          if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
          else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

        if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
        if (duration > 0 && typeof properties === 'object') {
          cssValues[transitionProperty] = cssProperties.join(', ')
          cssValues[transitionDuration] = duration + 's'
          cssValues[transitionDelay] = delay + 's'
          cssValues[transitionTiming] = (ease || 'linear')
        }
      }

      wrappedCallback = function(event) {
        if (typeof event !== 'undefined') {
          if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
          $(event.target).unbind(endEvent, wrappedCallback)
        } else
          $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

        fired = true
        $(this).css(cssReset)
        callback && callback.call(this)
      }
      if (duration > 0) {
        this.bind(endEvent, wrappedCallback)
          // transitionEnd is not always firing on older Android phones
          // so make sure it gets fired
        setTimeout(function() {
          if (fired) return
          wrappedCallback.call(that)
        }, ((duration + delay) * 1000) + 25)
      }

      // trigger page reflow so new elements can animate
      this.size() && this.get(0).clientLeft

      this.css(cssValues)

      if (duration <= 0) setTimeout(function() {
        that.each(function() {
          wrappedCallback.call(this)
        })
      }, 0)

      return this
    }

    testEl = null
  })(Zepto)

  ;
  (function($, undefined) {
    var document = window.document,
      docElem = document.documentElement,
      origShow = $.fn.show,
      origHide = $.fn.hide,
      origToggle = $.fn.toggle

    function anim(el, speed, opacity, scale, callback) {
      if (typeof speed == 'function' && !callback) callback = speed, speed = undefined
      var props = {
        opacity: opacity
      }
      if (scale) {
        props.scale = scale
        el.css($.fx.cssPrefix + 'transform-origin', '0 0')
      }
      return el.animate(props, speed, null, callback)
    }

    function hide(el, speed, scale, callback) {
      return anim(el, speed, 0, scale, function() {
        origHide.call($(this))
        callback && callback.call(this)
      })
    }

    $.fn.show = function(speed, callback) {
      origShow.call(this)
      if (speed === undefined) speed = 0
      else this.css('opacity', 0)
      return anim(this, speed, 1, '1,1', callback)
    }

    $.fn.hide = function(speed, callback) {
      if (speed === undefined) return origHide.call(this)
      else return hide(this, speed, '0,0', callback)
    }

    $.fn.toggle = function(speed, callback) {
      if (speed === undefined || typeof speed == 'boolean')
        return origToggle.call(this, speed)
      else return this.each(function() {
        var el = $(this)
        el[el.css('display') == 'none' ? 'show' : 'hide'](speed, callback)
      })
    }

    $.fn.fadeTo = function(speed, opacity, callback) {
      return anim(this, speed, opacity, null, callback)
    }

    $.fn.fadeIn = function(speed, callback) {
      var target = this.css('opacity')
      if (target > 0) this.css('opacity', 0)
      else target = 1
      return origShow.call(this).fadeTo(speed, target, callback)
    }

    $.fn.fadeOut = function(speed, callback) {
      return hide(this, speed, null, callback)
    }

    $.fn.fadeToggle = function(speed, callback) {
      return this.each(function() {
        var el = $(this)
        el[
          (el.css('opacity') == 0 || el.css('display') == 'none') ? 'fadeIn' : 'fadeOut'
        ](speed, callback)
      })
    }

  })(Zepto)

  ;
  (function($) {
    var data = {},
      dataAttr = $.fn.data,
      camelize = $.camelCase,
      exp = $.expando = 'Zepto' + (+new Date()),
      emptyArray = []

    // Get value from node:
    // 1. first try key as given,
    // 2. then try camelized key,
    // 3. fall back to reading "data-*" attribute.
    function getData(node, name) {
      var id = node[exp],
        store = id && data[id]
      if (name === undefined) return store || setData(node)
      else {
        if (store) {
          if (name in store) return store[name]
          var camelName = camelize(name)
          if (camelName in store) return store[camelName]
        }
        return dataAttr.call($(node), name)
      }
    }

    // Store value under camelized key on node
    function setData(node, name, value) {
      var id = node[exp] || (node[exp] = ++$.uuid),
        store = data[id] || (data[id] = attributeData(node))
      if (name !== undefined) store[camelize(name)] = value
      return store
    }

    // Read all "data-*" attributes from a node
    function attributeData(node) {
      var store = {}
      $.each(node.attributes || emptyArray, function(i, attr) {
        if (attr.name.indexOf('data-') == 0)
          store[camelize(attr.name.replace('data-', ''))] =
          $.zepto.deserializeValue(attr.value)
      })
      return store
    }

    $.fn.data = function(name, value) {
      return value === undefined ?
        // set multiple values via object
        $.isPlainObject(name) ?
        this.each(function(i, node) {
          $.each(name, function(key, value) {
            setData(node, key, value)
          })
        }) :
        // get value from first element
        (0 in this ? getData(this[0], name) : undefined) :
        // set value on all elements
        this.each(function() {
          setData(this, name, value)
        })
    }

    $.data = function(elem, name, value) {
      return $(elem).data(name, value)
    }

    $.hasData = function(elem) {
      var id = elem[exp],
        store = id && data[id]
      return store ? !$.isEmptyObject(store) : false
    }

    $.fn.removeData = function(names) {
      if (typeof names == 'string') names = names.split(/\s+/)
      return this.each(function() {
        var id = this[exp],
          store = id && data[id]
        if (store) $.each(names || store, function(key) {
          delete store[names ? camelize(this) : key]
        })
      })
    }

    // Generate extended `remove` and `empty` functions
    ;
    ['remove', 'empty'].forEach(function(methodName) {
      var origFn = $.fn[methodName]
      $.fn[methodName] = function() {
        var elements = this.find('*')
        if (methodName === 'remove') elements = elements.add(this)
        elements.removeData()
        return origFn.call(this)
      }
    })
  })(Zepto)

  ;
  (function($) {
    var zepto = $.zepto,
      oldQsa = zepto.qsa,
      oldMatches = zepto.matches

    function visible(elem) {
      elem = $(elem)
      return !!(elem.width() || elem.height()) && elem.css("display") !== "none"
    }

    // Implements a subset from:
    // http://api.jquery.com/category/selectors/jquery-selector-extensions/
    //
    // Each filter function receives the current index, all nodes in the
    // considered set, and a value if there were parentheses. The value
    // of `this` is the node currently being considered. The function returns the
    // resulting node(s), null, or undefined.
    //
    // Complex selectors are not supported:
    //   li:has(label:contains("foo")) + li:has(label:contains("bar"))
    //   ul.inner:first > li
    var filters = $.expr[':'] = {
      visible: function() {
        if (visible(this)) return this
      },
      hidden: function() {
        if (!visible(this)) return this
      },
      selected: function() {
        if (this.selected) return this
      },
      checked: function() {
        if (this.checked) return this
      },
      parent: function() {
        return this.parentNode
      },
      first: function(idx) {
        if (idx === 0) return this
      },
      last: function(idx, nodes) {
        if (idx === nodes.length - 1) return this
      },
      eq: function(idx, _, value) {
        if (idx === value) return this
      },
      contains: function(idx, _, text) {
        if ($(this).text().indexOf(text) > -1) return this
      },
      has: function(idx, _, sel) {
        if (zepto.qsa(this, sel).length) return this
      }
    }

    var filterRe = new RegExp('(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*'),
      childRe = /^\s*>/,
      classTag = 'Zepto' + (+new Date())

    function process(sel, fn) {
      // quote the hash in `a[href^=#]` expression
      sel = sel.replace(/=#\]/g, '="#"]')
      var filter, arg, match = filterRe.exec(sel)
      if (match && match[2] in filters) {
        filter = filters[match[2]], arg = match[3]
        sel = match[1]
        if (arg) {
          var num = Number(arg)
          if (isNaN(num)) arg = arg.replace(/^["']|["']$/g, '')
          else arg = num
        }
      }
      return fn(sel, filter, arg)
    }

    zepto.qsa = function(node, selector) {
      return process(selector, function(sel, filter, arg) {
        try {
          var taggedParent
          if (!sel && filter) sel = '*'
          else if (childRe.test(sel))
          // support "> *" child queries by tagging the parent node with a
          // unique class and prepending that classname onto the selector
            taggedParent = $(node).addClass(classTag), sel = '.' + classTag + ' ' + sel

          var nodes = oldQsa(node, sel)
        } catch (e) {
          console.error('error performing selector: %o', selector)
          throw e
        } finally {
          if (taggedParent) taggedParent.removeClass(classTag)
        }
        return !filter ? nodes :
          zepto.uniq($.map(nodes, function(n, i) {
            return filter.call(n, i, nodes, arg)
          }))
      })
    }

    zepto.matches = function(node, selector) {
      return process(selector, function(sel, filter, arg) {
        return (!sel || oldMatches(node, sel)) &&
          (!filter || filter.call(node, null, arg) === node)
      })
    }
  })(Zepto)

  ;
  (function($) {
    $.fn.end = function() {
      return this.prevObject || $()
    }

    $.fn.andSelf = function() {
      return this.add(this.prevObject || $())
    }

    'filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings'.split(',').forEach(function(property) {
      var fn = $.fn[property]
      $.fn[property] = function() {
        var ret = fn.apply(this, arguments)
        ret.prevObject = this
        return ret
      }
    })
  })(Zepto)
  return Zepto
}))


// zepto extend

;
(function(a) {
  ["width", "height"].forEach(function(b) {
    a.fn[b] = function(e) {
      var g, c = document.body,
        d = document.documentElement,
        f = b.replace(/./,
          function(h) {
            return h[0].toUpperCase()
          });
      if (e === undefined) {
        return this[0] == window ? d["client" + f] : this[0] == document ? Math.max(c["scroll" + f], c["offset" + f], d["client" + f], d["scroll" + f], d["offset" + f]) : (g = this.offset()) && g[b]
      } else {
        return this.each(function(h) {
          a(this).css(b, e)
        })
      }
    }
  });
  ["width", "height"].forEach(function(c) {
    var d, b = c.replace(/./,
      function(e) {
        return e[0].toUpperCase()
      });
    a.fn["outer" + b] = function(h) {
      var g = this;
      if (g) {
        var e = g[0]["offset" + b],
          f = {
            "width": ["left", "right"],
            "height": ["top", "bottom"]
          };
        f[c].forEach(function(i) {
          if (h) {
            e += parseInt(g.css("margin-" + i), 10)
          }
        });
        return e
      } else {
        return null
      }
    }
  });
  ["width", "height"].forEach(function(c) {
    var d, b = c.replace(/./,
      function(e) {
        return e[0].toUpperCase()
      });
    a.fn["inner" + b] = function() {
      var g = this;
      if (g[0]["inner" + b]) {
        return g[0]["inner" + b]
      } else {
        var e = g[0]["offset" + b],
          f = {
            "width": ["left", "right"],
            "height": ["top", "bottom"]
          };
        f[c].forEach(function(h) {
          e -= parseInt(g.css("border-" + h + "-width"), 10)
        });
        return e
      }
    }
  });
  ["Left", "Top"].forEach(function(c, e) {
    var f = "scroll" + c;

    function b(g) {
      return g && typeof g === "object" && "setInterval" in g
    }

    function d(g) {
      return b(g) ? g : g.nodeType === 9 ? g.defaultView || g.parentWindow : false
    }
    a.fn[f] = function(i) {
      var g, h;
      if (i === undefined) {
        g = this[0];
        if (!g) {
          return null
        }
        h = d(g);
        return h ? ("pageXOffset" in h) ? h[e ? "pageYOffset" : "pageXOffset"] : h.document.documentElement[f] || h.document.body[f] : g[f]
      }
      this.each(function() {
        h = d(this);
        if (h) {
          var k = !e ? i : a(h).scrollLeft(),
            j = e ? i : a(h).scrollTop();
          h.scrollTo(k, j)
        } else {
          this[f] = i
        }
      })
    }
  });
  a.fn.prevUntil = function(b) {
    var d = this,
      c = [];
    while (d.length && !a(d).filter(b).length) {
      c.push(d[0]);
      d = d.prev()
    }
    return a(c)
  };
  a.fn.nextUntil = function(b) {
    var d = this,
      c = [];
    while (d.length && !d.filter(b).length) {
      c.push(d[0]);
      d = d.next()
    }
    return a(c)
  };
  a._extend = a.extend;
  a.extend = function() {
    arguments[0] = arguments[0] || {};
    return a._extend.apply(this, arguments)
  }
})(Zepto)
/**
 *
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-06-18 03:37:42
 * @version 2015-06-18 03:37:42
 */

var JQUERY = window.jQuery || window.Zepto;
if (!JQUERY) {
  throw new Error('jQuery or Zepto is needed!');
} else {
  window.console && console.log(JQUERY.fn['jquery'] ? 'jQuery-' + jQuery.fn['jquery'] : 'Zepto');
}

Date.prototype.format = function(fmt) {

  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/i.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

;
(function($) {
  "use strict";
  var arm = function(selector, context) {
    return new arm.pt.init(selector, context);
  }

  var version = "1.1";
  var index = 0;
  var _console = {
    log: $.noop,
    error: $.noop,
    info: $.noop,
    warn: $.noop,
    debug: $.noop,
    group: $.noop,
    groupEnd: $.noop
  };

  var config = {
    base: "./",
    charset: "utf-8",
    debug: false
  };

  // 继承属性
  arm.pt = arm.prototype = {
    arm: version,
    constructor: arm
  }

  // 实例化jQuery对象
  var ArmClass = arm.pt.init = function(selector, context) {
    this.index = ++index;
    this.$ = $(selector, context); // 将 jQuery 对象传给属性 $
    return this;
  }

  // 实例化ClassArm, 并赋予 arm 继承属性
  ArmClass.prototype = arm.pt;

  // 正则
  var reg = arm.R = {
      trim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      http: /^http(s)?:\/\//i,
      _http: /^(http(s)?:\/\/|\/|file:\/\/)/i
    }
    // 扩展内置方法
  $.extend(true, arm, {

    data: {},
    config: function(args, single) {
      if ($.type(args) === "string" || $.type(args) === "number") {
        if ($.type(single) === "undefined")
          return config[args];
        config[args] = single;
      }
      if ($.isPlainObject(args)) {
        if (args.modules !== config.modules)
          arm.use(args.modules);
        $.extend(true, config, args);
      }
      return config;
    },
    console: function(always) {
      return window.console && (config.debug || always) ? window.console : _console;
    },
    // 获取arm目录路径
    path: (function() {
      var js = document.scripts,
        script = js[js.length - 1],
        jsPath = script.src;
      if (script.getAttribute('merge')) return;
      return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    })(),
    // 获取arm引用地址
    srcUrl: (function() {
      var js = document.scripts,
        script = js[js.length - 1],
        jsPath = script.src;
      if (script.getAttribute('merge')) return;
      return jsPath;
    })(),
    // 获取引用页目录路径
    refer: window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1),
    // 判断环境
    isMobile: ($.os && ($.os.tablet || $.os.phone)) || /Android|Windows Phone|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent),
    rAF: window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      },
    // 检测支持
    support: {
      // 触摸
      touch: (window.Modernizr && Modernizr.touch === true) || (function() {
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
      })(),
      transition: (function() {
        // 创建一个元素用于测试
        var el = document.createElement('arm');

        // 将所有主流浏览器实现方式整合成一个对象，用于遍历
        // key   是属性名称
        // value 是事件名称
        var transEndEventNames = {
          transition: 'transitionend',
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd otransitionend'
        };

        // 循环遍历上面那个对象，判断 CSS 属性是否存在
        for (var name in transEndEventNames) {
          if (el.style[name] !== undefined) {
            return {
              end: transEndEventNames[name]
            };
          }
        }

        return false;
      })()
    },

    is_lessIE: function(v) {
      if (/Microsoft Internet Explorer/i.test(navigator.appName)) {
        var ver = navigator.appVersion.match(/msie(\s+)?(\d)/i);
        if (ver && Number(ver[2]) < v) {
          return true;
        }
      }
      return false;
    },

    // 阻止默认事件
    prevent: function(e) {
      if (e) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      } else {
        return false;
      }
    },

    JSONstring: function(obj) {
      if (window.JSON) return JSON.stringify(obj);
      return 'JSON is not support!';
    },

    objectJoin: function(obj, sep) {
      var sept = sep || "";
      if (typeof obj === "string")
        return obj;
      if ($.isArray(obj)) {
        return obj.join(sept);
      }
      if ($.isPlainObject(obj)) {
        var arr = [];
        $.each(obj, function(index, val) {
          arr.push(val);
        });
        return arr.join(sept);
      }
      return String(obj);
    },
    /**
     ** 在对象长度范围内
     **/
    inLen: function(len, index) {
      if (index > len - 1)
        index = len - 1;
      if (index < 0)
        index = 0;
      return index;
    },
    /**
     * 对象过滤
     **/
    inObject: function(obj, filter) {
      var index = -1;
      $.each(obj, function(i, v) {
        if (filter(v, i)) {
          index = i;
          return false;
        }
      });
      return index;
    },
    /**
     ** 根据某一属性，查找对象数组中是否包含该成员
     **/
    inArrayObj: function(key, val, array) {
      var index = -1;
      var _array = $.isArray(array) ? array.slice(0) : [];
      if (!_array.length)
        return index;
      for (var i = 0; i < _array.length; i++) {
        if (_array[i][key] === val) {
          return i;
        }
      };
      return index;
    },

    /**
     *** 根据某键值，判断是某符合对象
     **/
    inObjKey: function(key, obj, name) {
      var out = false;
      if (!key || typeof obj !== "object")
        return out;
      var k;
      for (k in obj) {
        if (obj[k] === key) {
          if (typeof name === "undefined" || name === k) {
            out = true;
            break;
          }
        }
      }
      return out;
    },

    /*
    根据name读取obj中的成员数据
     */
    getNameValue: function(obj, name, sep) {
      var sep = sep || /[\.|\||_]/;
      var names = name.split(sep);
      var temp = obj;
      for (var i = 0; i < names.length; i++) {
        var key = names[i];
        temp = temp[key];
        if (!temp) {
          break;
        }
      }
      return temp;
    },
    /*
    根据name修改obj中的成员数据
     */
    setNameValue: function(obj, name, value, sep) {
      var sep = sep || /[\.|\||_]/;
      var names = name.split(sep);
      var temp = obj;
      for (var i = 0; i < names.length; i++) {
        var key = names[i];
        if (!temp.hasOwnProperty(key)) {
          temp[key] = {};
        }
        if (i !== names.length - 1 && typeof temp[key] !== "object") {
          break;
        }
        if (i == names.length - 1) {
          temp[key] = value;
        } else {
          temp = temp[key];
        }
      }
    },
    /**
     ** 数组元素移动位置，重新排序
     **/
    sortAarry: function(arr, from, to) {
      var len = arr.length;
      if (!arr.length) return -1;
      var _index = to;
      if (to === "uper") {
        _index = from + 1;
      }
      if (to === "downer") {
        _index = from - 1;
      }
      if (to === "top")
        _index = len - 1;
      if (to === "bottom")
        _index = 0;

      _index = arm.inLen(len, _index);
      if (_index === from)
        return _index;
      var item = arr.splice(arm.inLen(len, from), 1);
      arr.splice(_index, 0, item[0]);
      return _index;
    },
    /**
     ** getImgNaturalSize 获取图片真实尺寸
     **/
    getImgNaturalSize: function(img, callback) {
      var nWidth, nHeight;
      if (img.naturalWidth) { // 现代浏览器
        nWidth = img.naturalWidth;
        nHeight = img.naturalHeight;
        callback(nWidth, nHeight);
      } else { // IE6/7/8
        var image = new Image();
        image.src = img.src;
        image.onload = function() {
          callback(image.width, image.height);
        }
      }
      return [nWidth, nHeight];
    },
    // 获取url参数 ? or #
    getUrlParam: function(name, url, hash) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var hash = hash || (typeof url === 'boolean' ? url : false);
      var url = A.R['http'].test(url) ? url : window.location.href;
      var r = url.substr(url.indexOf(hash ? '#' : '?') + 1).match(reg);
      if (r != null)
        return unescape(r[2]);
      return null;
    },
    updateUrlParam: function(url, name, value, callback) {
      var r = url,
        change = false,
        v = "";
      if (r != null && r != 'undefined' && r != "") {
        value = encodeURIComponent(value);
        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
        var tmp = name + "=" + value;
        if (url.match(reg) != null) {
          r = url.replace(eval(reg), tmp);
          v = url.match(reg)[2];
          change = value !== v;
        } else {
          if (url.match("[\?]")) {
            r = url + "&" + tmp;
          } else {
            r = url + "?" + tmp;
          }
          change = true;
        }
      }
      if (typeof callback === "function")
        callback({
          url: r,
          _url: url,
          name: name,
          value: value,
          _value: v,
          change: change
        });
      return r;
    },
    toHump: function(str, isbig) {
      var _strs = $.trim(str).split(/\s+/);
      var out = "";
      $.each(_strs, function(index, word) {
        out += arm.utils.firstUpper(word);
      });
      if (!isbig)
        out = arm.utils.firstLower(out);
      return out;
    },
    utils: (function() {
      var me = {};
      var _elementStyle = document.createElement('div').style;

      function _prefixStyle(style) {
        if (style in _elementStyle)
          return style;
        var vendors = ['webkit', 'Moz', 'ms', 'O'],
          s,
          i = 0,
          l = vendors.length;

        for (; i < l; i++) {
          s = vendors[i] + style.charAt(0).toUpperCase() + style.substr(1);
          if (s in _elementStyle) return s;
        }
        return false;
      }
      me.getTime = Date.now || function getTime() {
        return new Date().getTime();
      };
      me.generateGUID = function(namespace) {
        var uid = namespace + '-' || 'arm-';
        do {
          uid += Math.random().toString(36).substring(2, 7);
        } while (document.getElementById(uid));

        return uid;
      };

      // 首字母大写
      me.firstUpper = function(str) {
        return str.replace(/^\w|\s\w/g, function(v) {
          return v.toUpperCase()
        });
      };

      // 首字母小写
      me.firstLower = function(str) {
        return str.replace(/^\w|\s\w/g, function(v) {
          return v.toLowerCase()
        });
      };


      me.realPath = function(path, base) {
        var path = path || "";
        path = path.replace(/^\.\//, '');
        while (path.match(/^\.\.\//)) {
          path = path.replace(/\.\.\//, "");
          base = base.replace(/[^\/]+\/$/, "");
        }
        return base + path;

      };

      me.realBase = function() {
        var base = arm.config('base');
        base = typeof base === "string" ? base : arm.path;
        return arm.R._http.test(base) ? base : me.realPath(base, arm.path);
      };

      me.moduleUrl = function(module) {
        var base = me.realBase();
        var url = me.realPath(module, base);
        return url;
      };

      me.moduleType = function(module) {
        var moduleName = module.substring(module.lastIndexOf('/') + 1);
        var moduleType = moduleName.substr(moduleName.lastIndexOf('.'));

        var isCSS = /^\.css(\W)?/.test(moduleType);
        var noCSSJS = !/[\?|&]/.test(module) && !/^\.(js|css)(\W)?/.test(moduleType);
        return {
          name: moduleName.replace(/[^a-zA-Z0-9\-]/g, '-'),
          isCSS: isCSS,
          isJS: isCSS ? false : true,
          noCSSJS: noCSSJS
        }
      };

      me.getJSUrl = function() {
        var js = document.scripts;
        for (var i = js.length - 1; i >= 0; i--) {
          if (js[i].src && !js[i].getAttribute('merge'))
            return js[i].src;
        };
        return location.href;
      };

      // getClassFn by reg
      me.getClassFn = function(regStr) {
        var reg = new RegExp(regStr, "ig");
        return function(index, oldClassName) {
          var c = oldClassName.match(reg);
          return c ? c.join(" ") : "";
        }
      }

      // error
      me.error = function(log, e, type) {
        type = (type ? (type + " ") : "") + "Error：";
        window.console && console.error(type + (log || '') + '\n' + (e || ''));
        return log;
      };

      me.extend = function(target, obj) {
        for (var i in obj) {
          target[i] = obj[i];
        }
      };

      me.addEvent = function(el, type, fn, capture) {
        el.addEventListener(type, fn, !!capture);
      };

      me.removeEvent = function(el, type, fn, capture) {
        el.removeEventListener(type, fn, !!capture);
      };

      me.prefixPointerEvent = function(pointerEvent) {
        return window.MSPointerEvent ?
          'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) :
          pointerEvent;
      };

      me.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
        var distance = current - start,
          speed = Math.abs(distance) / time,
          destination,
          duration;

        deceleration = deceleration === undefined ? 0.0006 : deceleration;

        destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;

        if (destination < lowerMargin) {
          destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
          distance = Math.abs(destination - current);
          duration = distance / speed;
        } else if (destination > 0) {
          destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
          distance = Math.abs(current) + destination;
          duration = distance / speed;
        }

        return {
          destination: Math.round(destination),
          duration: duration
        };
      };

      var _transform = _prefixStyle('transform');
      me.prefixStyle = _prefixStyle;
      me.extend(me, {
        hasTransform: _transform !== false,
        hasPerspective: _prefixStyle('perspective') in _elementStyle,
        hasTouch: 'ontouchstart' in window,
        hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
        hasTransition: _prefixStyle('transition') in _elementStyle
      });
      // This should find all Android browsers lower than build 535.19 (both stock browser and webview)
      me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

      me.extend(me.style = {}, {
        transform: _transform,
        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
        transitionDuration: _prefixStyle('transitionDuration'),
        transitionDelay: _prefixStyle('transitionDelay'),
        transformOrigin: _prefixStyle('transformOrigin')
      });

      me.hasClass = function(e, c) {
        var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
        return re.test(e.className);
      };

      me.addClass = function(e, c) {
        if (me.hasClass(e, c)) {
          return;
        }

        var newclass = e.className.split(' ');
        newclass.push(c);
        e.className = newclass.join(' ');
      };

      me.removeClass = function(e, c) {
        if (!me.hasClass(e, c)) {
          return;
        }

        var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
        e.className = e.className.replace(re, ' ');
      };

      me.offset = function(el) {
        var left = -el.offsetLeft,
          top = -el.offsetTop;

        // jshint -W084
        while (el = el.offsetParent) {
          left -= el.offsetLeft;
          top -= el.offsetTop;
        }
        // jshint +W084

        return {
          left: left,
          top: top
        };
      };

      me.preventDefaultException = function(el, exceptions) {
        for (var i in exceptions) {
          if (exceptions[i].test(el[i])) {
            return true;
          }
        }

        return false;
      };

      me.extend(me.eventType = {}, {
        touchstart: 1,
        touchmove: 1,
        touchend: 1,

        mousedown: 2,
        mousemove: 2,
        mouseup: 2,

        pointerdown: 3,
        pointermove: 3,
        pointerup: 3,

        MSPointerDown: 3,
        MSPointerMove: 3,
        MSPointerUp: 3
      });

      me.extend(me.ease = {}, {
        quadratic: {
          style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fn: function(k) {
            return k * (2 - k);
          }
        },
        circular: {
          style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
          fn: function(k) {
            return Math.sqrt(1 - (--k * k));
          }
        },
        back: {
          style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fn: function(k) {
            var b = 4;
            return (k = k - 1) * k * ((b + 1) * k + b) + 1;
          }
        },
        bounce: {
          style: '',
          fn: function(k) {
            if ((k /= 1) < (1 / 2.75)) {
              return 7.5625 * k * k;
            } else if (k < (2 / 2.75)) {
              return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            } else if (k < (2.5 / 2.75)) {
              return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            } else {
              return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }
          }
        },
        elastic: {
          style: '',
          fn: function(k) {
            var f = 0.22,
              e = 0.4;

            if (k === 0) {
              return 0;
            }
            if (k == 1) {
              return 1;
            }

            return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
          }
        }
      });

      me.tap = function(e, eventName) {
        var ev = document.createEvent('Event');
        ev.initEvent(eventName, true, true);
        ev.pageX = e.pageX;
        ev.pageY = e.pageY;
        e.target.dispatchEvent(ev);
      };

      me.dispatchEvent = function(type, e, target) {
        var ev = document.createEvent('MouseEvents');
        ev.initMouseEvent(type, true, true, e.view, 1,
          target.screenX, target.screenY, target.clientX, target.clientY,
          e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
          0, null);

        ev._constructed = true;
        target.dispatchEvent(ev);
      };

      me.click = function(e) {
        var target = e.target,
          ev;

        if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
          me.dispatchEvent("click", e, target);
        }
      };

      return me;
    })()
  });

  /**
   ** 外部接口
   **/

  // 防冲突
  var _arm = window.arm,
    _A = window.A;

  // 全局接口
  window.arm = window.A = arm;

  // 冲突控制
  arm.noConflict = function(deep) {
    // 移交 A
    window.A = _A;
    if (deep && _arm === arm) {
      // 移交 arm 给第一个版本
      window.arm = _arm;
    }
    arm._isConflict = true;
    return arm;
  };

  var varArm = arm.getUrlParam('var', arm.srcUrl);

  if (varArm && /^[a-zA-Z|_]+/.test(varArm) && !window[varArm]) {
    arm.pt._var = varArm;
    window[varArm] = arm;
  }

  // 模块接口
  if ("function" === typeof define) {
    define('arm', function() {
      return arm;
    })
  }

  return arm;
})(JQUERY);

// $ extend
(function(win, $, A) {
  $.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var $el = this;

    $(this).one(A.support.transition.end, function() {
      called = true;
    });

    var callback = function() {
      if (!called) {
        $($el).trigger(A.support.transition.end);
      }
      $el.transitionEndTimmer = undefined;
    };
    this.transitionEndTimmer = setTimeout(callback, duration);
    return this;
  };

  $.extend(true, A, {
    // touch事件
    touchEvents: (function() {
      // 触摸事件
      var events = arm.support.touch ? ['touchstart', 'touchmove', 'touchend', 'touchcancel'] : ['mousedown', "mousemove", "mouseup", "mouseout"];

      // 判断IE
      var browser = {
        ie10: win.navigator.msPointerEnabled,
        ie11: win.navigator.pointerEnabled
      };
      if (browser.ie10) events = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel'];
      if (browser.ie11) events = ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'];
      // 触摸赋值
      return {
        touchStart: events[0],
        touchMove: events[1],
        touchEnd: events[2],
        touchCancel: events[3]
      };

    })(),
    inAarryObj: A.inArrayObj
  });

})(window, JQUERY, window.arm);

/**
 * arm.register
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-12-14 14:06:55
 * @version 2015-12-14 14:06:55
 */
// 通用插件注册

;
! function($, A) {
  function Plugin(name, fn, single, options) {
    if (!this.length)
      return this;
    if (single) {
      if (this.length > 1) {
        A.console().warn("插件", name, "不支持多元素实例化，默认实例化第1个元素！");
      }
      return new fn(this[0], options);
    }
    var instance = [];
    this.each(function(index, el) {
      instance[index] = new fn(el, options);
    });
    this[name] = instance;
    return this;
  }

  A.register = function(name, fn, single) {
    // 注册插件
    $[name] = A[name] = function(selector, options) {
      var $el = $(selector);
      if ($el.selector !== selector) {
        $el = $(document);
        options = options || selector;
      }
      return Plugin.call($el, name, fn, single, options);
    };
    $.fn[name] = A.pt[name] = function(options) {
      return Plugin.call(this.$ || this, name, fn, single, options);
    }
  }
}(JQUERY, window.arm);


/**
 * arm.module
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-12-03 13:21:13
 * @version 2015-12-03 13:21:13
 */
// 模块加载
;
! function($, A, win) {
  var doc = document;
  var utils = A.utils;
  var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
  var currentScript, interactiveScript;
  var modulesQueue = [];
  var requesting = false;
  var pollingTimer = 10;
  var STATUS = {
    SAVED: 1, // 创建模块
    LOADING: 2, // 正在加载
    PENDING: 3, // 加载依赖
    READY: 4, // 依赖完成
    ERROR: 5 // 失败
  }

  function getMoudleId(id) {
    if (!id || !id.length)
      return;
    var alias = A.config("alias");
    if ($.isPlainObject(alias)) {
      $.each(alias, function(key, val) {
        id.replace(key, val);
      });
    }
    id = A.R._http.test(id) ? id : utils.moduleUrl(id);
    var type = utils.moduleType(id);
    if (type.noCSSJS) {
      id += ".js"; // 默认为JS类型模块
    }
    return id;
  }

  function getModIds(id) {
    var ids = id || [];
    if (typeof id === "string")
      ids = [id];
    var mids = [];
    $.each(ids, function(index, mid) {
      mids.push(getMoudleId(mid));
    });
    return mids;
  }

  function getCurrentScript(base) {
    if (currentScript)
      return currentScript;
    if (doc.currentScript)
      return doc.currentScript.src;

    if (interactiveScript && interactiveScript.readyState === 'interactive') {
      return interactiveScript.src;
    }
    var stack;
    try {
      a.b.c() //强制报错,以便捕获e.stack
    } catch (e) { //safari的错误对象只有line,sourceId,sourceURL
      stack = e.stack
      if (!stack && window.opera) {
        //opera 9没有e.stack,但有e.Backtrace,但不能直接取得,需要对e对象转字符串进行抽取
        stack = (String(e).match(/of linked script \S+/g) || []).join(" ")
      }
    }
    if (stack) {
      stack = stack.split(/[@ ]/g).pop() //取得最后一行,最后一个空格或@之后的部分
      stack = stack[0] === "(" ? stack.slice(1, -1) : stack.replace(/\s/, "") //去掉换行符
      return stack.replace(/(:\d+)?:\d+$/i, "") //去掉行号与或许存在的出错字符起始位置
    }
    var nodes = (base ? doc : head).getElementsByTagName("script") //只在head标签中寻找
    for (var i = nodes.length, node; node = nodes[--i];) {
      if (node.readyState === "interactive") {
        return node.hasAttribute ? node.src : node.getAttribute("src", 4);
      }
    }
  }

  // 回调轮循
  function callbackQueues(ids, time, callback, uri) {
    var exports = [];
    time = (time || 0) + 1;
    if (!ids.length) {
      return callback(time, exports);
    }
    var deps = 0,
      callback = $.isFunction(callback) ? callback : $.noop,
      uri = uri || false;
    $.each(ids, function(index, id) {
      var dep = A.modules[id];
      if ((dep.status < STATUS.READY && $.inArray(uri, dep.deps) === -1)) {
        return false;
      }
      deps++;
    });

    if (deps === ids.length) {
      for (var i = 0; i < deps; i++) {
        exports.push(A.modules[ids[i]].exports);
      }
      return callback(time, exports);
    }
    setTimeout(function() {
      callbackQueues(ids, time, callback, uri);
    }, pollingTimer);

  }

  // 开始载入模块
  function requestMod(mod) {
    if (mod.status > STATUS.SAVED) {
      return setRequest();
    }
    mod.status = STATUS.LOADING;
    mod.requestTime = utils.getTime();
    var node = document.createElement(mod.type.isCSS ? 'link' : 'script');
    node.charset = A.config("charset") || "utf-8";
    if (mod.type.isCSS) {
      node.type = 'text/css';
      node.rel = 'stylesheet';
    } else {
      node.type = 'text/javascript';
      node.async = true;
      currentScript = mod.uri;
    }
    loadedMod(node, mod);
    node[mod.type.isCSS ? 'href' : 'src'] = mod.uri;
    head.appendChild(node);
    currentScript = null;
    return setRequest();
  }

  function setRequest() {
    var m = modulesQueue.shift();
    if (!m || !A.modules[m])
      return requesting = false;
    var mod = A.modules[m];
    requesting = true;
    requestMod(mod);
  }

  // 模块加载完成
  function loadedMod(node, mod) {

    var onload = function(error) {
      node.onload = node.onerror = node.onreadystatechange = null;
      if (!A.config("debug") && !mod.type.isCSS) {
        head.removeChild(node);
      }
      node = null;
      mod.loadTime = utils.getTime();
      if (error)
        mod.status = STATUS.ERROR;

      A.console()[error ? 'error' : 'log']("加载模块->", mod.uri, error ? "失败" : "成功", ",耗时", (mod.loadTime - mod.requestTime) / 1000, "秒");
      // 启动依赖模块巡检
      mod.polling();
    }
    if ('onload' in node) {
      node.onload = function() {
        onload();
      };
      node.onerror = function() {
        onload(true);
      }
    } else {
      node.onreadystatechange = function() {
        if (/loaded|complete/.test(node.readyState)) {
          onload();
        } else {
          onload(true);
        }
      }
    }

  }

  // 构建模块
  function Module(id) {
    this.uri = id;
    this.deps = [];
    this.times = 0;
    this.exports = undefined;
    this.type = utils.moduleType(id);
    this.status = STATUS.SAVED;
    A.modules[id] = this;
  }

  Module.prototype.compile = function() {
    var mod = this,
      port = mod.factory;

    if ($.isFunction(port)) {
      function require(ids, callback) {
        if ($.isFunction(callback)) {
          return A.use(ids, callback);
        }
        var exports = [];
        $.each(getModIds(ids), function(index, id) {
          var _mod = A.module[id];
          exports.push(_mod ? _mod.exports : undefined);
        });
        if (exports.length === 1)
          return exports[0];
        return exports;
      }
      port = port(require, mod);
    }
    if (typeof mod.exports === "undefined")
      mod.exports = port;

    mod.status = STATUS.READY;
    A.console().log("编译模块->", mod.uri, ',巡检', mod.times, "次");
  }

  Module.prototype.polling = function() {
    var mod = this;
    callbackQueues(mod.deps, 0, function(time) {
      mod.times = time;
      mod.compile();
    }, mod.uri);

  }

  // 定义模块
  Module.define = function(id, deps, factory) {
    var argsLen = arguments.length;
    // define(factory)
    if (argsLen === 1) {
      factory = id;
      id = undefined;
    } else if (argsLen === 2) {
      factory = deps;
      // define(deps, factory)
      if ($.isArray(id)) {
        deps = id;
        id = undefined;
      }
      // define(id, factory)
      else {
        deps = undefined;
      }
    }

    deps = getModIds(deps);
    var uri = getMoudleId(id) || getCurrentScript();
    var module = arm.modules[uri];

    if (!module) {
      var newMod = true;
      module = new Module(uri);
      A.modules[uri] = module;
    }

    if (deps.length) {
      module.status = STATUS.PENDING;
      // 模块依赖
      A.console().info("模块", module.uri, "依赖于", deps);
      module.deps = deps;
      A.use(deps);
    }
    module.factory = factory;

    if (newMod)
      module.polling();
  }

  Module.use = function(ids, callback) {
    console.log(ids);
    if (typeof ids == "function")
      return ids();

    var mids = getModIds(ids);
    if (!mids.length)
      return ids;

    var queue = [];
    for (var i = 0; i < mids.length; i++) {
      var id = mids[i],
        mod = A.modules[id];
      if (!mod) {
        mod = new Module(id);
        modulesQueue.push(id);
      } else {
        A.console().log('模块-> ' + id + ' 已加载！');
      }
      if (!mod.type.isCSS)
        queue.push(id);
    };
    callbackQueues(queue, 0, function(time, _exports) {
      $.isFunction(callback) && callback.apply(this, _exports);
    });
    if (!requesting)
      setRequest();
  }

  $.extend(true, A, {
    // arm框架根目录
    root: (function() {
      return A.path.replace(/js\//, "");
    })(),

    modules: {},

    // 模块加载
    use: Module.use,
    define: Module.define
  });

}(JQUERY, window.arm, window)

/**
 * arm.app
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-06-16 15:11:20
 * @version 2015-06-16 15:11:20
 */

! function($, A) {
  var app = {},
    config = {
      iPortal: false // 是否需要平台JS API
    }

  var browser = (function() {
    var u = navigator.userAgent;
    return { //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      language: (navigator.browserLanguage || navigator.language).toLowerCase(),
      weixin: u.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
    };
  })();

  // config
  app.config = function(options, single) {
    config = $.extend(true, config, options);
    return A.config(options, single);
  }

  // app主入口
  app.run = function(callback) {
    // 运行APP
    A.console().log("APP 运行成功！", new Date());
    callback();
  }

  //初始化
  app.init = function(callback) {
    if (!config.iPortal || config.debug)
      return app.run(callback);
    // iPoral: sudy app api
    if (browser.weixin) {
      window.iPortal = {
        "weixinInitCallback": (function(window) {
        })(),
        isReady: true
      }
    } else {
      window.iPortal = {
        "sudyInitCallback": (function() {
          var init = false;
          return function(context) {
            if (init) {
              return init;
            }
            init = true;
            window.iPortal.context = context;
            var script = document.createElement('script');
            var vt = '?_vt=' + Number(new Date());
            var src = /\?/.test(context.libPath) ? context.libPath.replace(/\?/, vt + "&") : context.libPath + vt;
            script.type = 'text/javascript';
            script.src = src;
            script.charset = "utf-8";
            document.getElementsByTagName("head")[0].appendChild(script);
            return init;
          };
        })()
      };
    }
    // iPortal 初始化入口
    if (!iPortal.isReady) {
      iPortal.onReady = function() {
        app.run(callback);
      }
    } else {
      app.run(callback);
    }
  };

  // 对外接口
  window.app = A.app = app;

}(JQUERY, window.arm)
/**
 * arm.touch
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:27:05
 * @version 2015-11-30 09:27:05
 */
;
! function(win, $, A) {
  "use strict";
  var PI = Math.PI,
    abs = Math.abs,
    support = A.support,
    touchEvents = A.touchEvents,
    eventsList = ['dragStart', 'drag', 'dragEnd', 'swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'singleTap', 'doubleTap', 'holdTouch'];
  A.config({
    touch: {
      tapTime: 350,
      tapDistance: 15,
      holdTouchDelay: 600,
      doubleTapInterval: 400,
      doubleTapDelta: 10,
      swipeTime: 300,
      swipeDistance: 20,
      scrollCancel: 30,
      preventDefault: true,
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|SELECT)$/
      }
    }
  });

  function setHandlers(touch, eventsName, selector, callback) {
    touch.handlers = touch.handlers || {};
    var fnstr = callback.toString();
    var preventDefault = fnstr.match(/[^\n]*\.preventDefault\(.*?\).*/);
    $.each(eventsName, function(index, type) {
      touch.handlers[type] = touch.handlers[type] || {};
      touch.handlers[type][selector] = touch.handlers[type][selector] || [];
      touch.handlers[type][selector].push(callback);
      touch.preventDefault = touch.preventDefault || {};
      touch.defaultPrevented = touch.defaultPrevented || {};
      if (preventDefault && !/((\/\/|\/\*).*preventDefault)|(preventDefault.*(\*\/))/.test(preventDefault[0]) && !touch.defaultPrevented[type]) {
        touch.preventDefault[type] = touch.defaultPrevented[type] = true;
      }
    });
    return touch;
  }

  function doHandlers(handlers, e) {
    var _this = this;
    $.each(handlers, function(index, handler) {
      handler.call(_this, e);
    });
  }

  function removeEventHandler(type, target, func) {
    if (target.removeEventListener) {
      //监听IE9，谷歌和火狐
      target.removeEventListener(type, func, false);
    } else if (target.detachEvent) {
      target.detachEvent("on" + type, func);
    } else {
      delete target["on" + type];
    }
  }

  function _touchPoint(e, type) {
    var type = type.toUpperCase();
    return support.touch ? e.touches[0]["page" + type] : (e["page" + type] || e["client" + type])
  }

  // touchstart
  function _touchStart(e) {

    var self = this,
      touch = self.touch,
      lastT = touch.lastT,
      lastX = touch.lastX,
      lastY = touch.lastY;

    self.cancelAll();
    if (/mouse/.test(touchEvents.touchStart) && e.button !== 0) return;
    touch = {};
    touch.target = e.target;
    if (support.touch && !e.touches) {
      e.touches = e.originalEvent.touches;
      if (e.touches.length)
        touch.target = ('tagName' in e.touches[0].target ? e.touches[0].target : e.touches[0].target.parentNode) || e.target;
    }
    self.touchTimeout && clearTimeout(self.touchTimeout);
    // 按下时的坐标及角度
    touch.startX = touch.curX = touch.lastX = _touchPoint(e, "x");
    touch.startY = touch.curY = touch.lastY = _touchPoint(e, "y");
    touch.startT = touch.lastT = +(new Date());
    touch.moveX = touch.moveY = touch.angle = 0;
    // 按下时滚动条位置
    touch.scrollT = $(win).scrollTop();
    touch.scrollL = $(win).scrollLeft();
    // 与上次触摸间隔
    touch.deltaT = touch.startT - (lastT || touch.startT);
    // 与上次触摸位置差
    touch.deltaX = touch.startX - (lastX || touch.startX);
    touch.deltaY = touch.startY - (lastY || touch.startY);
    if (!touch.target || touch.active) return;
    touch.active = true;
    self.touch = touch;
    if (self.isDefaultPrevent('dragStart')) {
      e.preventDefault();
    }
    self._trigger("dragStart", e);
    self.holdTouchTimeout = setTimeout(function() {
      self.holdTouch(e);
    }, self.config.holdTouchDelay);
  }

  // touchmove
  function _touchMove(e) {
    var self = this,
      touch = self.touch;
    if (!touch.active) return;
    if (support.touch && !e.touches) {
      e.touches = e.originalEvent.touches;
    }
    if (/mouse/.test(touchEvents.touchStart) && e.button !== 0) return;
    self.cancelholdTouch();
    // 触摸时的坐标
    touch.curX = _touchPoint(e, "x");
    touch.curY = _touchPoint(e, "y");
    // 触摸的距离
    touch.moveX = touch.curX - touch.startX;
    touch.moveY = touch.curY - touch.startY;
    touch.angle = Math.atan2(-touch.moveY, touch.moveX);
    self.touch = touch;
    self._trigger("drag", e);

    var p6 = Math.PI / 6,
      angle = Math.abs(touch.angle);
    touch.angleX = angle < p6 || angle > 5 * p6;
    touch.angleY = angle > 2 * p6 && angle < 4 * p6;
    if (touch.angleY && !touch.dragX) {
      touch.dragY = true;
    }
    if (touch.angleX && !touch.dragY) {
      touch.dragX = true;
    }
    if (self.isDefaultPrevent('drag')) {
      e.preventDefault();
    }
    if (self.isDefaultPrevent('swipeLeft|swipeRight') && touch.angleX) {
      e.preventDefault();
    }
    if (self.isDefaultPrevent('swipeUp|swipeDown') && touch.angleY) {
      e.preventDefault();
    }
  }

  // touchend
  function _touchEnd(e) {
    var self = this,
      touch = self.touch,
      config = self.config;
    if (/mouse/.test(touchEvents.touchStart) && e.button !== 0) return;
    if (!touch.active) return;
    self.cancelholdTouch();
    // 触摸结束时间
    touch.endT = +(new Date());
    // 触摸间隔
    touch.touchT = touch.endT - touch.startT;
    touch.isTap = touch.touchT < config.tapTime && abs(touch.moveX) < config.tapDistance && abs(touch.moveY) < config.tapDistance;
    touch.isSwipe = (abs(touch.moveX) > config.swipeDistance || abs(touch.moveY) > config.swipeDistance) && touch.touchT < config.swipeTime;
    touch.isDoubleTap = touch.deltaT > 0 && touch.deltaT < config.doubleTapInterval && Math.abs(touch.deltaX) < config.doubleTapDelta && Math.abs(touch.deltaY) < config.doubleTapDelta;
    touch.active = false;
    self.touch = touch;

    // touchend 触摸结束事件
    setTimeout(function() {
      self._trigger("dragEnd", e);
    }, 5);
    if (touch.isSwipe) {
      self.swipeTimeout = setTimeout(function() {
        self._trigger("swipe swipe" + self.swipeDirection(), e);
      }, 3)
    }
    if (touch.lastT && touch.isTap && !/cancel/i.test(e.type)) {
      if (self.isDefaultPrevent('tap')) {
        e.preventDefault();
        if ($.isFunction(self.onclick))
          self.onclick.apply(self.el[0], [e]);
      }

      self.tapTimeout = setTimeout(function() {
        self._trigger("tap", e);
        if (touch.isDoubleTap) {
          self._trigger("doubleTap", e);
        } else {
          self._trigger("singleTap", e);
        }
      }, 3);
    }
  }

  var Touch = function(element) {
    var _this = this;
    _this.el = $(element);
    _this.touch = {};
    _this.config = A.config("touch");
    _this.touchTimeout = _this.tapTimeout = _this.swipeTimeout = _this.holdTouchTimeout = null;
    _this.init();
  }

  Touch.prototype.init = function() {
    var self = this;
    self._touchStart = $.proxy(_touchStart, self);
    self._touchMove = $.proxy(_touchMove, self);
    self._touchEnd = $.proxy(_touchEnd, self);
    self.onEvents();
    self.scrollCancel();
  }

  Touch.prototype.swipeDirection = function() {
    var touch = this.touch;
    return abs(touch.moveX) >= abs(touch.moveY) ? (touch.moveX > 0 ? 'Right' : 'Left') : (touch.moveY > 0 ? 'Down' : 'Up');
  }

  Touch.prototype.holdTouch = function(e) {
    var self = this;
    self.holdTouchTimeout = null;
    if (self.touch.lastT) {
      self.touch.isHoldTouch = true;
      self._trigger("holdTouch");
    }
  }

  Touch.prototype.cancelholdTouch = function() {
    var self = this;
    if (self.holdTouchTimeout) clearTimeout(self.holdTouchTimeout);
    self.holdTouchTimeout = null;
  }

  Touch.prototype.isDefaultPrevent = function(eventType) {
    var self = this,
      touch = self.touch;
    if (!self.config.preventDefault || !$.isPlainObject(self.preventDefault) || $.isEmptyObject(self.preventDefault) || A.utils.preventDefaultException(touch.target, self.config.preventDefaultException))
      return false;
    if ($.type(eventType) === "undefined")
      return true;
    var reg = new RegExp(eventType, "gi");
    for (var type in self.preventDefault) {
      if (reg.test(type))
        return true;
    }
    return false;
  }

  Touch.prototype._trigger = function(eventName, e) {
    var self = this,
      touch = self.touch;
    var eventsName = $.trim(eventName).split(/\s+/);
    $.each(eventsName, function(index, name) {
      var event = $.Event(name, {
        touch: touch,
        originalEvent: e
      });
      if (self.handlers[name]) {
        $.each(self.handlers[name], function(selector, handler) {
          if (selector !== "self") {
            var $selector = $(touch.target).closest(selector);
            if ($selector.length) {
              doHandlers.call($selector[0], handler, event);
            }
          } else {
            doHandlers.call(self.el[0], handler, event);
          }
        });
      }
    });
  }

  // cancel
  Touch.prototype.cancelAll = function() {
    var self = this;
    if (self.touchTimeout) clearTimeout(self.touchTimeout);
    if (self.tapTimeout) clearTimeout(self.tapTimeout);
    if (self.swipeTimeout) clearTimeout(self.swipeTimeout);
    if (self.holdTouchTimeout) clearTimeout(self.holdTouchTimeout);
    self.touchTimeout = self.tapTimeout = self.swipeTimeout = self.holdTouchTimeout = null;
    self.touch = {};
  }

  // scroll cancel
  Touch.prototype.scrollCancel = function() {
    var self = this;
    $(win).on('scroll', function() {
      var scrollTop = abs($(win).scrollTop() - self.touch.scrollT),
        scrollLeft = abs($(win).scrollLeft() - self.touch.scrollL);
      if (scrollTop > self.config.scrollCancel || scrollLeft > self.config.scrollCancel) self.cancelAll();
    });
  }

  Touch.prototype.onEvents = function() {
    var self = this;
    self.el.on(touchEvents.touchStart, self._touchStart);
    $(document).on(touchEvents.touchEnd, self._touchEnd)
      .on(touchEvents.touchMove, self._touchMove);
    support.touch && $(document).on(touchEvents.touchCancel, self._touchEnd);
  }

  function Plugin(eventName, selector, callback) {
    if (typeof eventName !== "string" || !eventName) return this;
    var eventsName = $.trim(eventName).split(/\s+/);
    if (!eventsName.length) return this;
    if (typeof selector !== "string") {
      if (typeof selector === "function") {
        callback = selector;
      }
      selector = "self";
    } else {
      if (!selector.length)
        return this;
    }
    if (typeof callback !== "function")
      return this;

    return this.each(function(index, el) {
      var touch = $(el).data("arm.touch");
      if (!touch) {
        $(el).data('arm.touch', (touch = new Touch(el)));
        touch.onclick = el.onclick;
        el.onclick = null;
      }
      setHandlers(touch, eventsName, selector, callback);
      for (var type in touch.preventDefault) {
        if (/tap/gi.test(eventName) && !touch.isClickPrevented) {
          $(el).on('click', function(event) {
            event.preventDefault();
          });
          touch.isClickPrevented = true;
          return;
        }
      }
    });
  }

  function offTouch(eventName, selector, callback) {
    if (typeof eventName !== "string" || !eventName) return this.handlers = {};
    var eventsName = $.trim(eventName).split(/\s+/);
    if (!eventsName.length) return this.handlers = {};
    if (typeof selector !== "string") {
      if (typeof selector === "function") {
        callback = selector;
      }
      selector = "self";
    }
    var _this = this;
    $.each(eventsName, function(index, type) {
      if (_this.handlers[type]) {
        if (_this.handlers[type][selector]) {
          var index = $.inArray(callback, _this.handlers[type][selector]);
          if (index !== -1) {
            return _this.handlers[type][selector].splice(index, 1);
          }
          return _this.handlers[type][selector] = [];
        }
        return _this.handlers[type] = {};
      }
    });

  }

  // 注册插件
  A.pt.onTouch = $.fn.touch = function(eventName, selector, callback) {
    return Plugin.call(this.$ || this, eventName, selector, callback);
  }
  A.pt.offTouch = $.fn.offTouch = function(eventName, selector, callback) {
    var $this = this.$ || this;
    return $this.each(function(index, el) {
      var touch = $(el).data("arm.touch");
      if (touch)
        offTouch.call(touch, eventName, selector, callback);
    });
  }
  A.pt.touch = $.fn.doTouch = function(eventName) {
      var $this = this.$ || this;
      return $this.each(function(index, el) {
        var touch = $(el).data("arm.touch");
        if (touch)
          touch._trigger(eventName);
      });
    }
    // 兼容插件方式
  $.each(eventsList, function(index, eventName) {
    $.fn[eventName] = function(selector, callback) {
      return Plugin.call(this, eventName, selector, callback);
    }
  });

  arm.touch = Touch;

}(window, window.jQuery || window.Zepto, window.arm);
/**
 * arm.tpl
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:21:49
 * @version 2015-11-30 09:21:49
 */

;
! function($, A) {
  "use strict";

  var config = {
    open: '<%',
    close: '%>'
  };

  var tool = {
    exp: function(str) {
      return new RegExp(str, 'g');
    },
    //匹配满足规则内容
    query: function(type, _, __) {
      var types = [
        '#([\\s\\S])+?', //js语句
        '([^{#}])*?' //普通字段
      ][type || 0];
      return exp((_ || '') + config.open + types + config.close + (__ || ''));
    },
    escape: function(html) {
      return String(html || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    },
    error: function(tplog, e) {
      A.utils.error(tplog, e, 'Tpl');
    }
  };

  var exp = tool.exp,
    Tpl = function(tpl) {
      this.tpl = tpl;
    };

  Tpl.pt = Tpl.prototype;

  //核心引擎
  Tpl.pt.parse = function(tpl, data) {
    var that = this,
      tplog = tpl;
    var jss = exp('^' + config.open + '#', ''),
      jsse = exp(config.close + '$', '');

    tpl = tpl.replace(/[\r\t\n]/g, ' ').replace(exp(config.open + '#'), config.open + '# ')
      .replace(exp(config.close + '}'), '} ' + config.close).replace(/\\/g, '\\\\')
      .replace(/(?="|')/g, '\\').replace(tool.query(), function(str) {
        str = str.replace(jss, '').replace(jsse, '');
        return '";' + str.replace(/\\/g, '') + '; view+="';
      }).replace(tool.query(1), function(str) {
        var start = '"+(';
        if (str.replace(/\s/g, '') === config.open + config.close) {
          return '';
        }
        str = str.replace(exp(config.open + '|' + config.close), '');
        if (/^=/.test(str)) {
          str = str.replace(/^=/, '');
          start = '"+_escape_(';
        }
        return start + str.replace(/\\/g, '') + ')+"';
      });

    tpl = '"use strict";var view = "' + tpl + '";return view;';
    try {
      that.cache = tpl = new Function('d, _escape_', tpl);
      return tpl(data, tool.escape);
    } catch (e) {
      delete that.cache;
      return tool.error(e, tplog);
    }
  };

  Tpl.pt.render = function(data, callback) {
    var that = this,
      tpl;
    if (!data) return tool.error('no data');
    tpl = that.cache ? that.cache(data, tool.escape) : that.parse(that.tpl, data);
    if (!callback) return tpl;
    callback(tpl);
  };

  var tpl = function(tpl) {
    if (typeof tpl !== 'string') return tool.error('Template not found');
    return new Tpl(tpl);
  };

  tpl.config = function(options) {
    options = options || {};
    for (var i in options) {
      config[i] = options[i];
    }
  };

  // 扩展tpl接口
  A.tpl = $.tpl = tpl;

}(window.jQuery || window.Zepto, window.arm);
/**
 * arm.mask
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-12-07 11:35:39
 * @version 2015-12-07 11:35:39
 */

! function($, A) {

  var defaults = {
    bg: "rgba(0,0,0,0.25)",
    maskFix: true
  }
  var Mask = function($parent, $mask, args) {
    this.element = $parent;
    this.masklayer = $mask;
    this.maskliving = [];
    this.args = $.extend(true, {}, defaults, args);
    this.creat();
  }
  Mask.prototype = {

    creat: function() {
      var args = this.args;
      this.reset(args);
      this.masklayer.appendTo(this.element);
    },
    remove: function(index) {
      // 如果有其他实例，不删除
      var id = $.inArray(index, this.maskliving);
      if (id === -1)
        return;
      this.maskliving.splice(id, 1);
      if (this.maskliving.length > 0) {
        return this.masklayer.css("z-index", this.maskliving[this.maskliving.length - 1]);
      }
      this.masklayer.remove();
      this.element.removeClass('ui-mask ui-mask-fix');
      this.element.data("hasmask", false);
      this.element.off(A.touchEvents.touchMove, A.prevent);
    },
    reset: function(args) {
      this.args = $.extend(true, {}, defaults, args || {});
      this.masklayer.css({
        "background": this.args.bg,
        "zIndex": this.args.zIndex
      });
      // 调用一次增加一个索引
      this.maskliving.push(this.args.zIndex);
      if (this.args.maskFix) {
        this.element.addClass('ui-mask-fix');
      } else {
        this.element.removeClass('ui-mask-fix');
      }

    }
  }

  A.mask = function(args, element) {
    if (!args) return;
    var $parent = $(element || "body").addClass('ui-mask').eq(0);
    var maskliving = $parent.data("maskliving") || [];
    // 调用一次增加一个索引
    maskliving.push(1);
    $parent.data("maskliving", maskliving);
    var mid = arm.utils.generateGUID("ui-mask");
    var $mask = $parent.children('ui-mask-layer');
    if ($mask.length > 0) {
      $mask.attr("id", mid);
    } else {
      $mask = $("<div class=\"ui-mask-layer\" id=\"" + mid + "\" />");
      if (/body/i.test($parent[0].tagName)) $mask.addClass("ui-mask-body");
    }
    var hasMask = $parent.data("hasmask");
    if (hasMask) {
      hasMask.reset(args);
    } else {
      hasMask = new Mask($parent, $mask, args);
      $parent.data("hasmask", hasMask);
    }
    return hasMask;
  }
}(window.jQuery || window.Zepto, window.arm)
/**
 * arm.modal
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:29:49
 * @version 2015-11-30 09:29:49
 */

;
! function($, A) {
  var modalNameSpace = "arm.modal";
  var modalActions = ["close", "open", "toggle"];
  A._modalBuild = $._modalBuild = function(element, defaults, option, template, plugin, pluginName, method) {

    var $this = element;
    var settings = $.isPlainObject(option) ? option : {};
    var _defaults = defaults || {};
    var isFromTpl = typeof $this === "object" && $this.selector ? false : true;
    if (/string|number/i.test(typeof option)) {
      settings = {
        content: option
      };
      if (typeof method !== "string") {
        method = option;
      }
    }
    var _method = method || _defaults.initMethod || "open";
    settings.initMethod = $.inArray(_method, modalActions) !== -1 ? _method : "toggle";
    var template = template || "";
    settings = $.extend(true, {}, _defaults, settings);
    settings.parent = $(settings.parent || 'body')[0];
    // 来自模板HTML，DOM操作
    if (isFromTpl) {
      $this = $(A.tpl(template).render(settings));
      if (settings.hooks && typeof settings.hooks._insertDom === "function") {
        settings.hooks._insertDom.call($this, settings);
      } else {
        $this.appendTo(settings.parent);
      }
    }
    var object = [];
    $this.each(function(index) {
      var el = $(this);
      // 读取对象缓存
      var data = el.data(modalNameSpace);
      if (!data) {
        if (!isFromTpl)
          el.appendTo(settings.parent);
        if (!this.id)
          this.id = A.utils.generateGUID("arm-modal");
        el.data(modalNameSpace, (data = new plugin(this, settings, isFromTpl, pluginName)));
      } else {
        data[settings.initMethod]();
      }
      object[index] = data;
    });
    $this[pluginName] = object;
    return $this;
  }

  // 外部方法
  function _modalMethod(method, ani, speed) {
    if (!this.length)
      return this;
    $.each(this, function(index, modal) {
      modal[method](ani, speed);
    });
    return this;
  }

  function _getModal($elem, id) {
    var $el = $($elem);
    var _this = this;
    if (!$el.length)
      return _this;
    $.each($el, function(index, el) {
      var modal = $(el).data(modalNameSpace);
      if (modal) {
        if (id === index || id === el.id) {
          _this[0] = modal;
          _this.length = 1;
          _this.index = id;
          return false;
        } else {
          _this[index] = modal;
          _this.length = index + 1;
        }
      }
    });
    return _this;
  }
  _getModal.prototype.close = function(ani, speed) {
    return _modalMethod.call(this, "close", ani, speed);
  }
  _getModal.prototype.open = function(ani, speed) {
    return _modalMethod.call(this, "open", ani, speed);
  }
  _getModal.prototype.toggle = function(ani, speed) {
    return _modalMethod.call(this, "toggle", ani, speed);
  }
  A.getModal = function($elem, id) {
      return new _getModal($elem, id);
    }
    // 初始索引
  A.getModal.openIndex = 19880815;

}(JQUERY, window.arm);

// Modal
;
! function($, A) {
  // 默认参数
  var defaults = {

      durationIn: 200,
      durationOut: 150,
      modalClassName: "ui-modal",
      modalClassTypes: [],
      activeClass: "show",
      animateInClass: "ani-zoomin",
      animateOutClass: "ani-zoomout",
      closeOnConfirm: true,
      closeOnCancel: true,
      closeOnButton: true,
      clickClose: false,
      stayTime: 0,
      onTimeout: $.noop,
      btnsHandler: [],
      mask: {},
      closeOnMask: false,
      scrollable: false,
      cssFix: $.noop,
      beforeOpen: $.noop,
      afterClose: $.noop,
      hooks: {
        _init: $.noop,
        _insertDom: $.noop
      }
    }
    // 注册默认事件
  var events = ['init', 'action', 'cancel', 'confirm', 'open', 'opened', 'close', 'closed'];
  $.each(events, function(index, _event) {
    defaults[A.toHump("on " + _event)] = defaults.hooks["_" + _event] = $.noop;
  });

  // 构造函数
  function Modal(el, option, isFromTpl, type) {
    this.option = $.extend(true, {}, defaults, option || {});
    this.target = el;
    this._isFromTpl = isFromTpl;
    this.type = type || "";
    this.modalId = this.target.id;
    this.transitionEnd = A.support.transition && A.support.transition.end,
      this.active = this.transitioning = 0;
    this._init();
  }

  Modal.prototype = {
    _event: function(eventType) {
      if ($.inArray(eventType, events) !== -1) {
        return this.type + ":" + eventType;
      } else {
        return this.type + ":" + events.join(" " + this.type + ":");
      }
    },
    _init: function() {
      var self = this;
      var classes = self.option.modalClassName;
      $.each(self.option.modalClassTypes, function(index, type) {
        className = " " + self.option.modalClassName + "-" + type;
        classes += className;
      });
      $(self.target).addClass(classes);
      self.option.cssFix.call(self, self.option);
      var $close = $(self.target).find("[data-modal-close]")
      var $buttons = $(self.target).find('[data-role="button"]');
      var $cancel = $(self.target).find('[data-modal-cancel]');
      var $confirm = $(self.target).find('[data-modal-confirm]');
      // 绑定默认事件
      $.each(events, function(index, _event) {
        $(self.target).on(self._event(_event), function(e) {
          self.option.hooks["_" + _event].call(self, e); // 事件钩子
          self.option[A.toHump("on " + _event)].call(this, e, self);
        })
      });

      $buttons.each(function(index, el) {
        $(el).tap(function(e) {
          e.preventDefault();
          e.index = index;
          $(self.target).trigger($.Event(self._event("action"), {
            relatedTarget: this
          }), [self]);
          if ($.isFunction(self.option.btnsHandler))
            self.option.btnsHandler.call(this, e, self);

          if ($.isArray(self.option.btnsHandler) && $.isFunction(self.option.btnsHandler[index]))
            self.option.btnsHandler[index].call(this, e, self);

          self.option.closeOnButton && !$(this).is('[data-modal-cancel],[data-modal-confirm]') && self.close();
        });
      });

      $cancel.tap(function(e) {
        e.preventDefault();
        $(self.target).trigger($.Event(self._event("cancel"), {
          relatedTarget: this
        }), [self]);
        self.option.closeOnCancel && self.close();
      });
      $confirm.tap(function(e) {
        e.preventDefault();
        $(self.target).trigger($.Event(self._event("confirm"), {
          relatedTarget: this
        }), [self]);
        self.option.closeOnConfirm && self.close();
      });

      $close.tap(function(e) {
        e.preventDefault();
        self.close();
      });
      if (self.option.clickClose) {
        $(self.target).tap(function(e) {
          e.preventDefault();
          self.close();
        })
      }
      // 初始化钩子
      $(self.target).trigger($.Event(self._event("init")), [self]);
      self[self.option.initMethod]();
    },
    _complete: function(state) {
      var self = this;
      var e = self._event(state === "open" ? "opened" : "closed");
      $(self.target).trigger($.Event(e), [self]);
      self.transitioning = 0;
      if (state === "close") {
        $(self.target).removeClass(self.option.activeClass);
        self._isFromTpl && $(self.target).remove();
        if (self.mask) {
          self.mask.remove(self.openid);
          self.mask = false;
        }
        self.option.afterClose.call(self);
      } else {
        if (self.option.stayTime > 0 && !self.closeTimer) {
          self.closeTimer = setTimeout(function() {
            self.close();
            self.option.onTimeout.call(self);
          }, this.option.stayTime);
        }
      }
    },
    toggle: function(ani, speed) {
      var self = this;
      if (self.active) {
        self.close(ani, speed);
      } else {
        self.open(ani, speed);
      }
    },
    open: function(ani, speed) {
      var self = this;
      if (self.active)
        return;
      self.openid = A.getModal.openIndex++;
      self.option.beforeOpen.call(self);
      self.active = true;
      self.transitioning = 1;
      self.target.style[A.utils.prefixStyle('animationDuration')] = "";
      $(self.target).removeClass(A.utils.getClassFn("ani-[\\S]+")).css("z-index", A.getModal.openIndex++);
      if (self.option.mask && !self.mask) self.mask = A.mask($.extend(true, {
        zIndex: self.openid
      }, self.option.mask), self.option.parent);
      $(self.target).trigger($.Event(self._event("open")), [self]);
      if (self._isFromTpl && self.option.parent && !/body/i.test(self.option.parent.tagName)) $(self.target).css("position", "absolute");
      if (self.option.closeOnMask && self.mask) {
        self.mask.masklayer.tap(function(e) {
          self.close();
        });
        $(self.target).tap(function(e) {
          if (e.touch.target == self.target)
            self.close();
        });
      }
      if (!/ani-[\S]+in/gi.test(ani)) {
        if (typeof ani === "number" && typeof speed !== "number") {
          speed = ani;
        }
        ani = self.option.animateInClass;
      }
      if (typeof speed !== "number")
        speed = self.option.durationIn;
      self.target.style[A.utils.prefixStyle('animationDuration')] = speed + "ms";
      $(self.target).addClass(ani + " " + self.option.activeClass);
      if (self.transitionEnd) {
        $(self.target).one(self.transitionEnd, function() {
          self._complete("open");
        }).emulateTransitionEnd(speed);
      } else {
        self._complete("open");
      }
    },
    close: function(ani, speed) {
      var self = this;
      if (!self.active)
        return;
      self.active = false;
      self.transitioning = 1;
      self.target.style[A.utils.prefixStyle('animationDuration')] = "";
      $(self.target).removeClass(A.utils.getClassFn("ani-[\\S]+"));
      $(self.target).trigger($.Event(self._event("close")), [self]);
      if (!/ani-[\S]+out/gi.test(ani)) {
        if (typeof ani === "number" && typeof speed !== "number") {
          speed = ani;
        }
        ani = self.option.animateOutClass;
      }
      if (typeof speed !== "number")
        speed = self.option.durationOut;
      self.target.style[A.utils.prefixStyle('animationDuration')] = speed + "ms";
      $(self.target).addClass(ani);
      if (self.transitionEnd) {
        $(self.target).one(self.transitionEnd, function() {
          self._complete("close");
        }).emulateTransitionEnd(speed);
      } else {
        self._complete("close");
      }
    }
  }

  // 对外提供扩展方法
  A._modalRegister = function(name, _default, _modalTpl, single) {
    A[name] = function(option, method) {
      return A._modalBuild(this, _default, option, _modalTpl, Modal, name, method);
    }
    if (!arm.pt._var)
      $[name] = A[name];
    if (!single) {
      A.pt[name] = function(option, method) {
        return A._modalBuild(this.$ || this, _default, option, _modalTpl, Modal, name, method);
      }
      if (!arm.pt._var)
        $.fn[name] = A.pt[name];
    }
  }

  // 默认模板
  var _modalTpl = '<div class="ui-modal ui-page">' +
    '<div class="ui-modal-cnt">' +
    '<header class="ui-modal-hd ui-border-b">' +
    '<h3 class="ui-modal-title"><%d.title%></h3>' +
    '<i class="ui-modal-close" data-modal-close></i>' +
    '</header>' +
    '<div class="ui-modal-bd">' +
    '<div><%d.content%></div>' +
    '</div>' +
    '</div>' +
    '</div>';
  var _default = {
    title: "新窗口",
    content: "",
    modalClassName: "ui-page"
  };

  // 注册默认modal
  A._modalRegister("modal", _default, _modalTpl);

}(JQUERY, window.arm);

/**
 * arm.modal.actionsheet
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:33:20
 * @version 2015-11-30 09:33:20
 */

;
! function($, A) {
  // 默认模板
  var _actionsheetTpl = '<div class="ui-actionsheet">' +
    '<div class="ui-actionsheet-cnt">' +
    '<%# if(d.title){ %>' +
    '<h4><%d.title%></h4>' +
    '<%# } %>' +
    '<%# if(d.buttons&&d.buttons.length){ %>' +
    '<%# for (var i = 0; i < d.buttons.length; i++) { %>' +
    '<button class="ui-actionsheet-btn<%# if (i == d.btnSelect) { %> select<%#}%>" type="button" data-role="button"<%# if(d.buttons.length===1||i===d.buttons.length-1){%> data-modal-confirm<%#}%><%# if(d.buttons.length>1&&i===d.buttons.length-2){%> data-modal-cancel<%#}%>><%d.buttons[i]%></button>' +
    '<%# } %>' +
    '<%# } %>' +
    '<button type="button" data-modal-cancel>取消</button>' +
    '</div>'
  '</div>';

  // 默认参数
  var _default = {
    title: '您将要做什么操作？',
    buttons: ['<span class="ui-txt-red">删除</span>'],
    btnSelect: 0,
    modalClassName: "ui-actionsheet",
    animateInClass: "ani-fadeinB",
    animateOutClass: "ani-fadeoutB",
    durationIn: 250,
    durationOut: 150
  };
  // 注册actionsheet
  A._modalRegister("actionsheet", _default, _actionsheetTpl);
}(JQUERY, window.arm)

/**
 * arm.modal.alert
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:31:23
 * @version 2015-11-30 09:31:23
 */

;
! function($, A) {

  // 默认模板
  var _alertTpl = '<div class="ui-modal">' +
    '<div class="ui-modal-cnt">' +
    '<%# if(d.buttons&&d.buttons.length){ %>' +
    '<div class="ui-modal-ft ui-btn-group ui-border-t">' +
    '<%# for (var i = 0; i < d.buttons.length; i++) { %>' +
    '<button class="ui-actionsheet-btn<%# if (i == d.btnSelect) { %> select<%#}%>" type="button" data-role="button"<%# if(d.buttons.length===1||i===d.buttons.length-1){%> data-modal-confirm<%#}%><%# if(d.buttons.length>1&&i===d.buttons.length-2){%> data-modal-cancel<%#}%>><%d.buttons[i]%></button>' +
    '<%# } %>' +
    '</div>' +
    '<%# } %>' +
    '<div class="ui-modal-bd">' +
    '<h4><%d.title%></h4>' +
    '<div><%d.content%></div>' +
    '</div>' +
    '</div>' +
    '</div>';

  // 默认参数
  var _default = {
    modalClassName: "ui-alert",
    title: "提示",
    content: "Alert",
    buttons: ['确定'],
    btnSelect: 0
  };
  // 注册alert
  A._modalRegister("alert", _default, _alertTpl);
}(JQUERY, window.arm)

/**
 * arm.modal.dialog
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:30:16
 * @version 2015-11-30 09:30:16
 */
;
! function($, A) {

  // 默认模板
  var _dialogTpl = '<div class="ui-modal">' +
    '<div class="ui-modal-cnt">' +
    '<header class="ui-modal-hd ui-border-b">' +
    '<h3 class="ui-modal-title"><%d.title%></h3>' +
    '<i class="ui-modal-close" data-modal-close></i>' +
    '</header>' +
    '<%# if(d.buttons&&d.buttons.length){ %>' +
    '<div class="ui-modal-ft ui-border-t ui-btn-group">' +
    '<%# for (var i = 0; i < d.buttons.length; i++) { %>' +
    '<button class="ui-actionsheet-btn<%# if (i == d.btnSelect) { %> select<%#}%>" type="button" data-role="button"<%# if(d.buttons.length===1||i===d.buttons.length-1){%> data-modal-confirm<%#}%><%# if(d.buttons.length>1&&i===d.buttons.length-2){%> data-modal-cancel<%#}%>><%d.buttons[i]%></button>' +
    '<%# } %>' +
    '</div>' +
    '<%# } %>' +
    '<div class="ui-modal-bd">' +
    '<div><%d.content%></div>' +
    '</div>' +
    '</div>' +
    '</div>';

  // 默认参数
  var _default = {
    modalClassName: "ui-dialog",
    title: "新会话",
    content: "Dialog is a type of Modal.",
    buttons: ['取消', '确定'],
    btnSelect: 0
  };
  // 注册dialog
  A._modalRegister("dialog", _default, _dialogTpl);
}(JQUERY, window.arm)

/**
 * arm.modal.iframe
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:34:09
 * @version 2015-11-30 09:34:09
 */

;
! function($, A) {
  var _iframeTpl = '<div class="ui-modal">' +
    '<div class="ui-modal-cnt">' +
    '<header class="ui-modal-hd ui-border-b">' +
    '<h3 class="ui-modal-title"><%d.title%></h3>' +
    '<i class="ui-modal-close" data-modal-close></i>' +
    '</header>' +
    '<div class="ui-modal-ft ui-btn-group ui-border-t">' +
    '<button onclick="history.back()"><i class="ui-icon-prev"></i></button>' +
    '<button data-iframe-action="reload"><i class="ui-icon-refresh"></i></button>' +
    '<button onclick="history.forward()"><i class="ui-icon-next"></i></button>' +
    '</div>' +
    '<div class="ui-modal-bd">' +
    '<iframe width="100%" height="100%" marginheight="0" marginwidth="0" frameborder="0" scrolling="yes"></iframe>' +
    '</div>' +
    '</div>' +
    '</div>';

  function modalIframe($iframe, $reload, src, debug) {
    if (!$reload.hasClass('ani-loading')) {
      $reload.addClass('ani-loading');
      $iframe.one('load', function(event) {
        $reload.removeClass('ani-loading');
      });
      $iframe[0].src = src;
    }
  }
  var _default = {
      title: "新页面",
      modalClassName: "ui-iframe",
      animateInClass: "ani-fadeinB",
      animateOutClass: "ani-fadeoutB",
      durationIn: 150,
      durationOut: 100,
      hooks: {
        _init: function() {
          var _this = this,
            $iframe = $("iframe", _this.target),
            $reload = $('.ui-icon-refresh', _this.target);
          modalIframe($iframe, $reload, _this.option.content);
          $("[data-iframe-action]", _this.target).tap(function() {
            var action = $(this).attr("data-iframe-action");
            var url = $iframe[0].src;
            if (action === "reload") {
              modalIframe($iframe, $reload, url);
            }
          });
        }
      }
    }
    // 注册iframeView
  A._modalRegister("iframe", _default, _iframeTpl);
}(JQUERY, window.arm)

/**
 * arm.modal.loading
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:31:54
 * @version 2015-11-30 09:31:54
 */
;
! function($, A) {

  // 默认模板
  var _loadingTpl = '<div class="ui-loading-block">' +
    '<div class="ui-loading-cnt">' +
    '<%# if(d.icon){ %>' +
    '<i class="<%d.icon%>"></i>' +
    '<%# } %>' +
    '<%# if(d.content){ %>' +
    '<p><%d.content%></p>' +
    '<%# } %>' +
    '</div>' +
    '</div>';

  // 默认参数
  var _default = {
    modalClassName: "ui-modal-loading",
    animateInClass: "ani-fadein",
    animateOutClass: "ani-fadeout",
    icon: "ui-loading-bright",
    inline: 0,
    afterIcon: 1,
    blank: 0,
    clickCancel: false,
    content: '',
    hooks: {
      _init: function() {
        var option = this.option;
        var _this = this;
        if (option.theme)
          $(this.target).addClass('ui-loading-theme-' + option.theme);
        if (option.blank)
          $(this.target).addClass('ui-loading-blank');
        if (!option.afterIcon)
          $("p", this.target).prependTo($(".ui-loading-cnt", this.target));
        if (option.inline)
          $(this.target).addClass('ui-loading-inline');
        if (option.clickCancel) {
          $(this.target).tap(function() {
            _this.close();
            if ($.isFunction(option.clickCancel))
              option.clickCancel.call(_this);
          })
        }
      }
    }
  };
  // 注册loading
  A._modalRegister("loading", _default, _loadingTpl);
}(JQUERY, window.arm)

/**
 * arm.modal.poptips
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:32:51
 * @version 2015-11-30 09:32:51
 */

;
! function($, A) {

  // 默认模板
  var _poptipsTpl = '<div class="ui-poptips">' +
    '<div class="ui-poptips-cnt">' +
    '<i></i><%d.content%>' +
    '</div>' +
    '</div>';

  // 默认参数
  var _default = {
    content: '提示',
    mask: false,
    stayTime: 2000,
    durationIn: 200,
    durationOut: 400,
    modalClassName: "ui-poptips",
    animateInClass: "ani-fadein",
    animateOutClass: "ani-fadeout",
    clickClose: true,
    tipIsColor: false,
    tipIsBlock: false,
    tipNoIcon: true,
    tipLevel: "primary",
    tipPosition: "center",
    hooks: {
      _init: function() {
        var classes = "",
          self = this,
          opt = self.option;
        if (opt.tipIsColor) classes += opt.modalClassName + "-color";
        if (opt.tipNoIcon) classes += " " + opt.modalClassName + "-noicon";
        if (opt.tipLevel) classes += " " + opt.modalClassName + "-" + opt.tipLevel;
        if (opt.tipPosition && !opt.tipIsBlock) classes += " " + opt.modalClassName + "-" + opt.tipPosition;
        if (opt.tipIsBlock) classes += " " + opt.modalClassName + "-block";
        $(self.target).addClass(classes);
      }
    }
  };

  // 注册poptips
  A._modalRegister("poptips", _default, _poptipsTpl);
}(JQUERY, window.arm)

/**
 * arm.modal.tips
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:32:22
 * @version 2015-11-30 09:32:22
 */

;
! function($, A) {

  // 默认模板
  var _tipsTpl = '<div class="ui-tips">' +
    '<div class="ui-tips-cnt">' +
    '<i></i><span><%d.content%></span>' +
    '</div>' +
    '</div>';

  // 默认参数
  var _default = {
    content: "请稍后...",
    modalClassName: "ui-tips",
    iconClass: "ui-icon-info",
    textClass: "",
    wrapper: ".ui-container",
    insertType: "html",
    mask: false,
    isBlock: false,
    hooks: {
      _insertDom: function(option) {
        option.isBlock && this.addClass(option.modalClassName + "-block");
        this.find("i").addClass(option.iconClass);
        this.find("span").addClass(option.textClass);
        $(option.wrapper)[option.insertType](this);
      }
    }
  };

  // 注册tips
  A._modalRegister("tips", _default, _tipsTpl);
}(JQUERY, window.arm)
/**
 * arm.paging
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:20:53
 * @version 2015-11-30 09:20:53
 */

;
! function($, A) {
  "use strict";

  var doc = document,
    id = 'getElementById',
    tag = 'getElementsByTagName';
  var index = 0,
    Page = function(options) {
      var that = this;
      var conf = that.config = options || {};
      conf.item = index++;
      that.render(true);
    };

  Page.on = function(elem, even, fn) {
    elem.attachEvent ? elem.attachEvent('on' + even, function() {
      fn.call(elem, window.even); //for ie, this指向为当前dom元素
    }) : elem.addEventListener(even, fn, false);
    return Page;
  };

  //判断传入的容器类型
  Page.prototype.type = function() {
    var conf = this.config;
    if (typeof conf.cont === 'object') {
      return conf.cont.length === undefined ? 2 : 3;
    }
  };

  //分页视图
  Page.prototype.view = function() {
    var that = this,
      conf = that.config,
      view = [],
      dict = {};
    conf.pages = conf.pages | 0;
    conf.curr = (conf.curr | 0) || 1;
    conf.groups = 'groups' in conf ? (conf.groups | 0) : 3;
    conf.first = 'first' in conf ? conf.first : 1;
    conf.last = 'last' in conf ? conf.last : conf.pages;
    conf.prev = 'prev' in conf ? conf.prev : '&lt;';
    conf.next = 'next' in conf ? conf.next : '&gt;';

    if (conf.groups > conf.pages) {
      conf.groups = conf.pages;
    }

    //计算当前组
    dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0)) / (conf.groups === 0 ? 1 : conf.groups));

    //当前页非首页，则输出上一页
    if (conf.curr > 1 && conf.prev) {
      view.push('<a href="javascript:;" class="ui-paging-prev" data-arm-paging="' + (conf.curr - 1) + '">' + conf.prev + '</a>');
    }

    //当前组非首组，则输出首页
    if (dict.index > 1 && conf.first && conf.groups !== 0) {
      view.push('<a href="javascript:;" class="ui-paging-first" data-arm-paging="1"  title="\u9996\u9875">' + conf.first + '</a><span>\u2026</span>');
    }

    //输出当前页组
    dict.poor = Math.floor((conf.groups - 1) / 2);
    dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
    dict.end = dict.index > 1 ? (function() {
      var max = conf.curr + (conf.groups - dict.poor - 1);
      return max > conf.pages ? conf.pages : max;
    }()) : conf.groups;
    if (dict.end - dict.start < conf.groups - 1) { //最后一组状态
      dict.start = dict.end - conf.groups + 1;
    }
    for (; dict.start <= dict.end; dict.start++) {
      if (dict.start === conf.curr) {
        view.push('<span class="ui-paging-curr" ' + (/^#/.test(conf.skin) ? 'style="background-color:' + conf.skin + '"' : '') + '>' + dict.start + '</span>');
      } else {
        view.push('<a href="javascript:;" data-arm-paging="' + dict.start + '">' + dict.start + '</a>');
      }
    }

    //总页数大于连续分页数，且当前组最大页小于总页，输出尾页
    if (conf.pages > conf.groups && dict.end < conf.pages && conf.last && conf.groups !== 0) {
      view.push('<span>\u2026</span><a href="javascript:;" class="ui-paging-last" title="\u5c3e\u9875"  data-arm-paging="' + conf.pages + '">' + conf.last + '</a>');
    }

    //当前页不为尾页时，输出下一页
    dict.flow = !conf.prev && conf.groups === 0;
    if (conf.curr !== conf.pages && conf.next || dict.flow) {
      view.push((function() {
        return (dict.flow && conf.curr === conf.pages) ? '<span class="ui-paging-nomore" title="\u5df2\u6ca1\u6709\u66f4\u591a">' + conf.next + '</span>' : '<a href="javascript:;" class="ui-paging-next" data-arm-paging="' + (conf.curr + 1) + '">' + conf.next + '</a>';
      }()));
    }

    return '<div class="ui-paging ui-paging-skin-' + (conf.skin ? (function(skin) {
      return /^#/.test(skin) ? 'molv' : skin;
    }(conf.skin)) : 'default') + '" id="ui-paging-' + that.config.item + '">' + view.join('') + function() {
      return conf.skip ? '<span class="ui-paging-total"><label>\u5230\u7b2c</label><input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="ui-paging-skip"><label>\u9875</label>' + '<button type="button" class="ui-paging-btn">\u786e\u5b9a</button></span>' : '';
    }() + '</div>';
  };

  //跳页
  Page.prototype.jump = function(elem) {
    var that = this,
      conf = that.config,
      childs = elem.children;
    var btn = elem[tag]('button')[0];
    var input = elem[tag]('input')[0];
    for (var i = 0, len = childs.length; i < len; i++) {
      if (childs[i].nodeName.toLowerCase() === 'a') {
        Page.on(childs[i], 'click', function() {
          var curr = this.getAttribute('data-arm-paging') | 0;
          conf.curr = curr;
          that.render();

        });
      }
    }
    if (btn) {
      Page.on(btn, 'click', function() {
        var curr = input.value.replace(/\s|\D/g, '') | 0;
        if (curr && curr <= conf.pages) {
          conf.curr = curr;
          that.render();
        }
      });
    }
  };

  //渲染分页
  Page.prototype.render = function(load) {
    var that = this,
      conf = that.config,
      type = that.type();
    var view = that.view();
    if (type === 2) {
      conf.cont.innerHTML = view;
    } else if (type === 3) {
      conf.cont.html(view);
    } else {
      doc[id](conf.cont).innerHTML = view;
    }
    conf.jump && conf.jump(conf, load);
    that.jump(doc[id]('ui-paging-' + conf.item));
    if (conf.hash && !load) {
      location.hash = '!' + conf.hash + '=' + conf.curr;
    }
  };


  // 主入口
  function paging(options) {
    return new Page(options);
  }

  // 扩展paging接口
  A.paging = $.paging = paging;

}(window.jQuery || window.Zepto, window.arm);
/**
 * arm.tab
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:34:39
 * @version 2015-11-30 09:34:39
 */

! function($, A) {
  "use strict";
  var utils = A.utils;

  var _default = {
    start: 0,
    param: "tab",
    handle: ".ui-tab-nav",
    content: ".ui-tab-content",
    callback: function(index, fromIndex, curIndex) {
      A.console().log("fromIndex:" + fromIndex + ", curIndex:" + curIndex)
    }
  }

  var Tab = function(el, options) {
    this.el = $(el);
    this.options = $.extend(true, {}, _default, options || {});
    this.handles = $(this.options.handle, this.el);
    this.contents = $(this.options.content, this.el);
    this.contentItems = this.contents.children();
    this.len = this.contentItems.length;
    this.cur = this.options.start;
    this._init();
  }

  Tab.prototype = {
      _init: function() {
        var self = this;
        var tab = A.getUrlParam(this.options.param, location.href);
        this.handles.each(function() {
          var handles = $(this).children();
          handles.tap(function(event) {
            var index = $(this).index();
            self.tab(index);
          });
        });
        if (tab !== null)
          self.options.start = Number(tab);
        self._tab(self.options.start);
      },
      tab: function(index) {
        if (index === this.cur) return;
        this._tab(index);
      },
      next: function() {
        var index = this.cur + 1;
        if (index > this.len - 1)
          index = this.len - 1;
        this._tab(index);
      },
      prev: function() {
        var index = this.cur - 1;
        if (index < 0)
          index = 0;
        this._tab(index);
      },
      _tab: function(index) {
        var self = this;
        this.handles.each(function() {
          var handles = $(this).children();
          handles.removeClass('current').eq(index).addClass('current');
        });
        this.contentItems.eq(self.cur).removeClass('active');
        this.contentItems.eq(index).addClass('active');
        this.options.callback.call(self, self.options.start, self.cur, index);
        this.cur = index;
      }
    }
    // 注册 tab
  A.register('tab', Tab);

}(window.jQuery || window.Zepto, window.arm)
/**
 * arm.drawer
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:35:06
 * @version 2015-11-30 09:35:06
 */

! function($, A) {
  "use strict";
  var utils = A.utils;
  var _default = {

    activeClass: "active",
    handle: ".ui-panel-hd",
    content: ".ui-panel-bd",
    duration: 200,
    callback: function(index, active) {
      A.console().log("index:", index, "; active:", active);
    }
  }

  var Drawer = function(el, options) {
    this.el = $(el);
    this.options = $.extend(true, {}, _default, options || {});
    this.handles = this.el.children(this.options.handle);
    this.contents = this.el.children(this.options.content);
    this.items = this.contents.children();
    this._init();
  }

  Drawer.prototype = {
      _init: function() {
        var self = this;
        self.handles.tap(function(event) {
          event.preventDefault();
          self._toggle();
        });
      },
      _toggle: function() {
        var self = this;
        self.el.toggleClass(self.options.activeClass);
        self.active = self.el.hasClass(self.options.activeClass);
        self.toggle();
      },
      toggle: function() {
        var self = this;
        self.options.callback.call(self, self.options.index, self.active);
        self.contents.toggle(self.active);
      }
    }
    // 注册 drawer
  A.register('drawer', Drawer);
}(window.jQuery || window.Zepto, window.arm)
/**
 * arm.swipeSlide
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:27:05
 * @version 2015-11-30 09:27:05
 */

;
(function(win, $, A) {
  'use strict';
  var utils = A.utils;
  // 判断IE
  var browser = {
    ie10: win.navigator.msPointerEnabled,
    ie11: win.navigator.pointerEnabled
  };
  // 检测
  var support = A.support;

  // 触摸赋值
  var touchEvents = A.touchEvents;

  var sS = function(element, options) {
    var me = this;
    me.$el = $(element).css({
      "visibility": "hidden"
    });
    me._distance = 50;
    me.allowSlideClick = true;
    me.opts = $.extend({}, {
      slideClass: "ui-slide", // 类型
      slideSelector: "", // 切换体内容
      index: 0, // 轮播初始值
      pagination: true, // 页码指示器
      continuousScroll: true, // 连续滚动
      autoSwipe: true, // 自动切换
      speed: 5000, // 切换速度
      duration: 300, // 动画时间
      distance: 50, // 激发距离
      axisX: true, // X轴
      transitionType: 'ease', // 过渡类型
      lazyLoad: false, // 图片懒加载
      callback: function() {}, // 回调方法
      swipeTrigger: true
    }, options);
    me.init();
  };

  // 初始化
  sS.prototype.init = function() {
    var me = this;

    me.$el.addClass(me.opts.slideClass).css("visibility", "hidden");
    if (me.opts.axisX) me.$el.addClass(me.opts.slideClass + "-axisx");
    me.opts.ul = $(me.opts.slideSelector);
    if (me.opts.ul.length < 1)
      me.opts.ul = me.$el.children();
    me.opts.li = me.opts.ul.children();
    me.opts.ul.addClass(me.opts.slideClass + "-content");
    me.opts.li.addClass(me.opts.slideClass + "-item");
    me._index = me.opts.index;
    // 轮播数量
    me._liLength = me.opts.li.length;
    me.isScrolling;

    // 显示指示器
    if (me.opts.pagination) {
      me.$pagination = $('<div class="' + me.opts.slideClass + '-dot" />');
      me.$pagination.html(function() {
        var html = "";
        for (var i = 0; i < me._liLength; i++) {
          html += '<span></span>';
        };
        return html;
      });
      me.$el.append(me.$pagination);
    }

    // 回调
    me._callback(true);

    // 如果轮播小于等于1个，跳出
    if (me._liLength <= 1) {
      if (me.opts.lazyLoad) fnLazyLoad(me, 0);
      return false;
    }

    // 连续滚动，复制dom
    if (me.opts.continuousScroll) me.opts.ul.prepend(me.opts.li.last().clone()).append(me.opts.li.first().clone());

    // 懒加载图片
    if (me.opts.lazyLoad) {
      fnLazyLoad(me, me._index);
      if (me.opts.continuousScroll) {
        fnLazyLoad(me, me._index + 1);
        fnLazyLoad(me, me._index + 2);
        // 如果是第一屏
        if (me._index == 0) {
          fnLazyLoad(me, me._liLength);
          // 如果是最后一屏
        } else if (me._index + 1 == me._liLength) {
          fnLazyLoad(me, 1);
        }
      } else {
        fnLazyLoad(me, me._index + 1 == me._liLength ? me._liLength - 2 : me._index + 1);
      }
    }

    // 轮播的宽度
    fnGetSlideDistance();

    if (browser.ie10 || browser.ie11) {
      // IE触控
      var action = '';
      if (me.opts.axisX) {
        action = 'pan-y';
      } else {
        action = 'none';
      }
      me.$el.css({
        '-ms-touch-action': action,
        'touch-action': action
      });

      // 解决IE滑动触发click
      me.$el.on('click', function() {
        return me.allowSlideClick;
      });
    }

    // 调用轮播
    fnAutoSlide(me);
    me.$el.css({
      "visibility": "visible"
    });
    // 绑定触摸
    if (me.opts.swipeTrigger) {
      me.$el.on(touchEvents.touchStart, function(e) {
        fnTouches(e);
        fnTouchstart(e, me);
      }).on(touchEvents.touchMove, function(e) {
        fnTouches(e);
        fnTouchmove(e, me);
      }).on(touchEvents.touchEnd, function() {
        fnTouchend(me);
      });
    }

    if (support.transition) {
      me.opts.ul.on(support.transition.end, function() {
        fnAutoSlide(me);
      });
    }

    // 横竖屏、窗口调整
    $(win).on('onorientationchange' in win ? 'orientationchange' : 'resize', function() {
      clearTimeout(me.timer);
      me.timer = setTimeout(fnGetSlideDistance, 150);
    });

    // 获取轮播宽度
    function fnGetSlideDistance() {
      var $li = me.opts.ul.children();
      me._slideDistance = me.opts.axisX ? me.opts.ul.width() : me.opts.ul.height();
      me._distance = me.opts.distance > me._slideDistance / 3 ? me._slideDistance / 3 : me.opts.distance;
      // 定位
      fnTransition(me, me.opts.ul, 0);
      fnTranslate(me, me.opts.ul, -me._slideDistance * me._index);
      fnTransition(me, $li, 0);
      var num = me.opts.continuousScroll ? -1 : 0;
      $li.each(function(i) {
        fnTranslate(me, $(this), me._slideDistance * (i + num));
      });
    }
  };

  sS.prototype._callback = function(init) {
    var me = this;
    if (me.$pagination)
      me.$pagination.children().removeClass('cur').eq(me._index).addClass('cur');

    if (!init && me.curIndex === me._index)
      return;
    me.opts.callback.call(me, me._index, me.curIndex, me._liLength);
    me.curIndex = me._index;
  }

  // css过渡
  function fnTransition(me, dom, num) {
    if (dom === me.opts.ul) {
      dom[0].style[utils.prefixStyle('transition')] = "all " + num / 1000 + 's' + " " + me.opts.transitionType;
    }
  }

  // css位移
  function fnTranslate(me, dom, distance) {
    if (dom === me.opts.ul) {
      var result = me.opts.axisX ? distance + 'px,0' : '0,' + distance + 'px';
      dom[0].style[utils.prefixStyle('transform')] = 'translate(' + result + ')';
    } else {
      var result = me.opts.axisX ? {
        top: 0,
        left: distance
      } : {
        top: distance,
        left: 0
      };
      $(dom[0]).css(result);
    }
  }

  // 懒加载图片
  function fnLazyLoad(me, index) {
    var $li = me.opts.ul.children();
    var $thisImg = $li.eq(index).find('[data-src]');
    if ($thisImg) {
      $thisImg.each(function(i) {
        var $this = $(this);
        if ($this.is('img')) {
          $this.attr('src', $this.data('src'));
          $this.removeAttr('data-src');
        } else {
          $this.css({
            'background-image': 'url(' + $this.data('src') + ')'
          });
          $this.removeAttr('data-src');
        }
      });
    }
  }

  // touches
  function fnTouches(e) {
    if (support.touch && !e.touches) {
      e.touches = e.originalEvent.touches;
    }
  }

  // touchstart
  function fnTouchstart(e, me) {
    me.active = true;
    me.isScrolling = undefined;
    me._moveDistance = me._moveDistanceIE = 0;
    // 按下时的坐标
    me._startX = support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
    me._startY = support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
  }

  // touchmove
  function fnTouchmove(e, me) {
    if (!me.active) return false;
    // 如果自动切换，move的时候清除autoSlide自动轮播方法
    if (me.opts.autoSwipe) fnStopSlide(me);
    me.allowSlideClick = false;
    // 触摸时的坐标
    me._curX = support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
    me._curY = support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
    // 触摸时的距离
    me._moveX = me._curX - me._startX;
    me._moveY = me._curY - me._startY;
    // 优化触摸禁止事件
    if (typeof me.isScrolling == 'undefined') {
      if (me.opts.axisX) {
        me.isScrolling = !!(Math.abs(me._moveX) >= Math.abs(me._moveY));
      } else {
        me.isScrolling = !!(Math.abs(me._moveY) >= Math.abs(me._moveX));
      }
    }

    // 距离
    if (me.isScrolling) {
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
      // 触摸时跟手
      fnTransition(me, me.opts.ul, 0);
      me._moveDistance = me._moveDistanceIE = me.opts.axisX ? me._moveX : me._moveY;
    }
    if (!me.opts.continuousScroll && !me.opts.bounce) {
      // 如果是第一屏，并且往下滚动，就不让滚动 || 如果是最后一屏，并且往上滚动，就不让滚动
      if (me._index == 0 && me._moveDistance > 0 || (me._index + 1) >= me._liLength && me._moveDistance < 0) {

        me._moveDistance = 0;

      }
    }
    // 触摸时跟手滚动
    fnTranslate(me, me.opts.ul, -(me._slideDistance * me._index - me._moveDistance));

  }

  // touchend
  function fnTouchend(me) {
    me.active = false;
    // 优化触摸禁止事件
    if (!me.isScrolling) {
      fnAutoSlide(me);
    }

    // 解决IE滑动触发click
    if (browser.ie10 || browser.ie11) {
      if (Math.abs(me._moveDistanceIE) < 5) {
        me.allowSlideClick = true;
      }
      setTimeout(function() {
        me.allowSlideClick = true;
      }, 100);
    }

    // 距离小
    if (Math.abs(me._moveDistance) <= me._distance) {
      fnSlide(me, '', me.opts.duration);
      // 距离大
    } else {
      // 手指触摸上一屏滚动
      if (me._moveDistance > me._distance) {
        if (me._index === 0 && me.opts.bounce) {
          fnSlide(me, '', me.opts.duration);
        } else {
          fnSlide(me, 'prev', me.opts.duration);
        }

        // 手指触摸下一屏滚动
      } else if (Math.abs(me._moveDistance) > me._distance) {
        if (me._index === me._liLength - 1 && me.opts.bounce) {
          fnSlide(me, '', me.opts.duration);
        } else {
          fnSlide(me, 'next', me.opts.duration);
        }
      }
    }
    me._moveDistance = me._moveDistanceIE = 0;
  }

  // 自动轮播
  function fnAutoSlide(me) {
    if (me.opts.autoSwipe) {
      fnStopSlide(me);
      me.autoSlide = setInterval(function() {
        fnSlide(me, 'next', me.opts.duration);
      }, me.opts.speed);
    }
  }

  // 停止轮播
  function fnStopSlide(me) {
    clearInterval(me.autoSlide);
  }

  // 指定轮播
  sS.prototype.goTo = function(i) {
    var me = this;
    fnSlide(me, i, me.opts.duration);
  };

  // 轮播方法
  function fnSlide(me, go, num) {
    // 判断方向
    if (typeof go === 'number') {
      me._index = go;
      // 加载当前屏、前一屏、后一屏
      if (me.opts.lazyLoad) {
        // 因为连续滚动，复制dom，所以要多加1
        if (me.opts.continuousScroll) {
          fnLazyLoad(me, me._index);
          fnLazyLoad(me, me._index + 1);
          fnLazyLoad(me, me._index + 2);
        } else {
          fnLazyLoad(me, me._index - 1);
          fnLazyLoad(me, me._index);
          fnLazyLoad(me, me._index + 1);
        }
      }
    } else if (go == 'next') {
      me._index++;
      if (me.opts.lazyLoad) {
        if (me.opts.continuousScroll) {
          fnLazyLoad(me, me._index + 2);
          // 滑到最后一屏
          if (me._index + 1 == me._liLength) {
            fnLazyLoad(me, 1);
            // 最后一屏，继续往后滑动
          } else if (me._index == me._liLength) {
            fnLazyLoad(me, 0);
          }
        } else {
          fnLazyLoad(me, me._index + 1);
        }
      }
    } else if (go == 'prev') {
      me._index--;
      if (me.opts.lazyLoad) {
        if (me.opts.continuousScroll) {
          fnLazyLoad(me, me._index);
          // 滑到第一屏
          if (me._index == 0) {
            fnLazyLoad(me, me._liLength);

            // 第一屏，继续往前滑动
          } else if (me._index < 0) {
            fnLazyLoad(me, me._liLength - 1);
          }
        } else {
          fnLazyLoad(me, me._index - 1);
        }
      }
    }
    // 如果是连续滚动
    if (me.opts.continuousScroll) {
      if (me._index >= me._liLength) {
        fnScroll(me, num);
        me._index = 0;
        setTimeout(function() {
          fnScroll(me, 0);
          me._callback();
          return;
        }, 300);
      } else if (me._index < 0) {
        fnScroll(me, num);
        me._index = me._liLength - 1;
        setTimeout(function() {
          fnScroll(me, 0);
          me._callback();
          return;
        }, 300);
      } else {
        fnScroll(me, num);
      }
    } else {
      if (me._index >= me._liLength) {
        me._index = 0;
      } else if (me._index < 0) {
        me._index = me._liLength - 1;
      }
      fnScroll(me, num);
    }
    me._callback();
  }

  // 轮播动作
  function fnScroll(me, num) {
    fnTransition(me, me.opts.ul, num);
    fnTranslate(me, me.opts.ul, -me._index * me._slideDistance);
  }

  $.splipper = A.splipper = sS;
  // 注册swipeSlide
  $.fn.swipeSlide = function(options) {
    return new sS(this, options);
  };

  // 注册swipeSlide
  A.pt.swipeSlide = function(options) {
    return new sS(this.$, options);
  };

})(window, JQUERY, window.arm);

/**
 * arm.fullpage
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-12-07 18:04:36
 * @version 2015-12-07 18:04:36
 */

! function($, A) {
  "use strict";

  $.fullpage = A.fullpage = function(el, options) {
    var el = $(el);
    var options = $.extend(true, {

      slideClass: "ui-fullpage",
      continuousScroll: false,
      autoSwipe: false,
      axisX: true,
      bounce: true,
      bounceEasing: "ease-in"
    }, options || {});
    return new A.splipper(el, options);
  }
}(JQUERY, window.arm)
/**
 * arm.scroller
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:27:05
 * @version 2015-11-30 09:27:05
 */

;
(function(window, document, Math, A) {
  var rAF = A.rAF,
    utils = A.utils;

  function Scroller(el, options) {
    this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
    this.scroller = this.wrapper.children[0];
    this.scrollerStyle = this.scroller.style; // cache style for better performance

    this.options = {

      // INSERT POINT: OPTIONS

      startX: 0,
      startY: 0,
      scrollY: true,
      directionLockThreshold: 5,
      momentum: true,

      bounce: true,
      bounceTime: 600,
      bounceEasing: '',

      preventDefault: true,
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
      },

      HWCompositing: true,
      useTransition: true,
      useTransform: true
    };

    for (var i in options) {
      this.options[i] = options[i];
    }

    // Normalize options
    this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

    this.options.useTransition = utils.hasTransition && this.options.useTransition;
    this.options.useTransform = utils.hasTransform && this.options.useTransform;

    this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

    // If you want eventPassthrough I have to lock one of the axes
    this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
    this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

    // With eventPassthrough we also need lockDirection mechanism
    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

    this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

    this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

    if (this.options.tap === true) {
      this.options.tap = 'tap';
    }

    // INSERT POINT: NORMALIZATION

    // Some defaults
    this.x = 0;
    this.y = 0;
    this.directionX = 0;
    this.directionY = 0;
    this._events = {};

    // INSERT POINT: DEFAULTS

    this._init();
    this.refresh();

    this.scrollTo(this.options.startX, this.options.startY);
    this.enable();
  }

  Scroller.prototype = {

    _init: function() {
      this._initEvents();

      // INSERT POINT: _init

    },

    destroy: function() {
      this._initEvents(true);

      this._execEvent('destroy');
    },

    _transitionEnd: function(e) {
      if (e.target != this.scroller || !this.isInTransition || this.pullrefreshEnd) {
        return;
      }

      this._transitionTime();
      if (!this.resetPosition(this.options.bounceTime)) {
        this.isInTransition = false;
        this._execEvent('scrollEnd');
      }
    },

    _start: function(e) {
      // React to left mouse button only
      if (utils.eventType[e.type] != 1) {
        if (e.button !== 0) {
          return;
        }
      }

      if (!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
        return;
      }

      if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
        //e.preventDefault();
      }

      var point = e.touches ? e.touches[0] : e,
        pos;

      this.initiated = utils.eventType[e.type];
      this.moved = false;
      this.distX = 0;
      this.distY = 0;
      this.directionX = 0;
      this.directionY = 0;
      this.directionLocked = 0;

      this._transitionTime();

      this.startTime = utils.getTime();

      if (this.options.useTransition && this.isInTransition) {
        this.isInTransition = false;
        pos = this.getComputedPosition();
        this._translate(Math.round(pos.x), Math.round(pos.y));
        this._execEvent('scrollEnd');
      } else if (!this.options.useTransition && this.isAnimating) {
        this.isAnimating = false;
        this._execEvent('scrollEnd');
      }

      this.startX = this.x;
      this.startY = this.y;
      this.absStartX = this.x;
      this.absStartY = this.y;
      this.pointX = point.pageX;
      this.pointY = point.pageY;

      this._execEvent('beforeScrollStart');

      // pullrefresh start
      $(this.wrapper).trigger($.Event("pullrefresh:start"));
    },

    _move: function(e) {
      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }

      if (this.options.preventDefault) { // increases performance on Android? TODO: check!
        e.preventDefault();
      }

      var point = e.touches ? e.touches[0] : e,
        deltaX = point.pageX - this.pointX,
        deltaY = point.pageY - this.pointY,
        timestamp = utils.getTime(),
        newX, newY,
        absDistX, absDistY;

      this.pointX = point.pageX;
      this.pointY = point.pageY;

      this.distX += deltaX;
      this.distY += deltaY;
      absDistX = Math.abs(this.distX);
      absDistY = Math.abs(this.distY);

      // We need to move at least 10 pixels for the scrolling to initiate
      if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
        return;
      }

      // If you are scrolling in one direction lock the other
      if (!this.directionLocked && !this.options.freeScroll) {
        if (absDistX > absDistY + this.options.directionLockThreshold) {
          this.directionLocked = 'h'; // lock horizontally
        } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
          this.directionLocked = 'v'; // lock vertically
        } else {
          this.directionLocked = 'n'; // no lock
        }
      }

      if (this.directionLocked == 'h') {
        if (this.options.eventPassthrough == 'vertical') {
          e.preventDefault();
        } else if (this.options.eventPassthrough == 'horizontal') {
          this.initiated = false;
          return;
        }

        deltaY = 0;
      } else if (this.directionLocked == 'v') {
        if (this.options.eventPassthrough == 'horizontal') {
          e.preventDefault();
        } else if (this.options.eventPassthrough == 'vertical') {
          this.initiated = false;
          return;
        }

        deltaX = 0;
      }

      deltaX = this.hasHorizontalScroll ? deltaX : 0;
      deltaY = this.hasVerticalScroll ? deltaY : 0;

      newX = this.x + deltaX;
      newY = this.y + deltaY;

      // Slow down if outside of the boundaries
      if (newX > 0 || newX < this.maxScrollX) {
        newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
      }
      if (newY > 0 || newY < this.maxScrollY) {
        newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
      }

      this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
      this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

      if (!this.moved) {
        this._execEvent('scrollStart');
      }

      this.moved = true;

      this._translate(newX, newY);

      // pullrefresh pulling
      $(this.wrapper).trigger($.Event("pullrefresh:move"));

      /* REPLACE START: _move */

      if (timestamp - this.startTime > 300) {
        this.startTime = timestamp;
        this.startX = this.x;
        this.startY = this.y;
      }

      /* REPLACE END: _move */

    },

    _end: function(e) {
      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }

      if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
        //e.preventDefault();
      }

      var point = e.changedTouches ? e.changedTouches[0] : e,
        momentumX,
        momentumY,
        duration = utils.getTime() - this.startTime,
        newX = Math.round(this.x),
        newY = Math.round(this.y),
        distanceX = Math.abs(newX - this.startX),
        distanceY = Math.abs(newY - this.startY),
        time = 0,
        easing = '';

      this.isInTransition = 0;
      this.initiated = 0;
      this.endTime = utils.getTime();

      // pullrefresh end
      $(this.wrapper).trigger($.Event("pullrefresh:end"));
      if (this.pullrefreshEnd)
        return;

      // reset if we are outside of the boundaries
      if (this.resetPosition(this.options.bounceTime)) {
        return;
      }

      this.scrollTo(newX, newY); // ensures that the last position is rounded

      // we scrolled less than 10 pixels
      if (!this.moved) {
        if (this.options.tap) {
          utils.tap(e, this.options.tap);
        }

        if (this.options.click) {
          utils.click(e);
        }

        this._execEvent('scrollCancel');
        return;
      }

      if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
        this._execEvent('flick');
        return;
      }

      // start momentum animation if needed
      if (this.options.momentum && duration < 300) {
        momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
          destination: newX,
          duration: 0
        };
        momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
          destination: newY,
          duration: 0
        };
        newX = momentumX.destination;
        newY = momentumY.destination;
        time = Math.max(momentumX.duration, momentumY.duration);
        this.isInTransition = 1;
      }

      // INSERT POINT: _end

      if (newX != this.x || newY != this.y) {
        // change easing function when scroller goes out of the boundaries
        if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
          easing = utils.ease.quadratic;
        }

        this.scrollTo(newX, newY, time, easing);
        return;
      }

      this._execEvent('scrollEnd');
    },

    _resize: function() {
      var that = this;

      clearTimeout(this.resizeTimeout);

      this.resizeTimeout = setTimeout(function() {
        that.refresh();
      }, this.options.resizePolling);
    },

    resetPosition: function(time) {
      var x = this.x,
        y = this.y;

      time = time || 0;

      if (!this.hasHorizontalScroll || this.x > 0) {
        x = 0;
      } else if (this.x < this.maxScrollX) {
        x = this.maxScrollX;
      }

      if (!this.hasVerticalScroll || this.y > 0) {
        y = 0;
      } else if (this.y < this.maxScrollY) {
        y = this.maxScrollY;
      }

      if (x == this.x && y == this.y) {
        return false;
      }

      this.scrollTo(x, y, time, this.options.bounceEasing);

      return true;
    },

    disable: function() {
      this.enabled = false;
    },

    enable: function() {
      this.enabled = true;
    },

    refresh: function() {
      var rf = this.wrapper.offsetHeight; // Force reflow

      this.wrapperWidth = this.wrapper.clientWidth;
      this.wrapperHeight = this.wrapper.clientHeight;

      /* REPLACE START: refresh */

      this.scrollerWidth = this.scroller.offsetWidth;
      this.scrollerHeight = this.scroller.offsetHeight;

      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
      this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

      /* REPLACE END: refresh */

      this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
      this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

      if (!this.hasHorizontalScroll) {
        this.maxScrollX = 0;
        this.scrollerWidth = this.wrapperWidth;
      }

      if (!this.hasVerticalScroll) {
        this.maxScrollY = 0;
        this.scrollerHeight = this.wrapperHeight;
      }

      this.endTime = 0;
      this.directionX = 0;
      this.directionY = 0;

      this.wrapperOffset = utils.offset(this.wrapper);

      this._execEvent('refresh');

      this.resetPosition();

      // INSERT POINT: _refresh

    },

    on: function(type, fn) {
      if (!this._events[type]) {
        this._events[type] = [];
      }

      this._events[type].push(fn);
    },

    off: function(type, fn) {
      if (!this._events[type]) {
        return;
      }

      var index = this._events[type].indexOf(fn);

      if (index > -1) {
        this._events[type].splice(index, 1);
      }
    },

    _execEvent: function(type) {
      if (!this._events[type]) {
        return;
      }

      var i = 0,
        l = this._events[type].length;

      if (!l) {
        return;
      }

      for (; i < l; i++) {
        this._events[type][i].apply(this, [].slice.call(arguments, 1));
      }
    },

    scrollBy: function(x, y, time, easing) {
      x = this.x + x;
      y = this.y + y;
      time = time || 0;

      this.scrollTo(x, y, time, easing);
    },

    scrollTo: function(x, y, time, easing) {
      easing = easing || utils.ease.circular;

      this.isInTransition = this.options.useTransition && time > 0;

      if (!time || (this.options.useTransition && easing.style)) {
        this._transitionTimingFunction(easing.style);
        this._transitionTime(time);
        this._translate(x, y);
      } else {
        this._animate(x, y, time, easing.fn);
      }
    },

    scrollToElement: function(el, time, offsetX, offsetY, easing) {
      el = el.nodeType ? el : this.scroller.querySelector(el);

      if (!el) {
        return;
      }

      var pos = utils.offset(el);

      pos.left -= this.wrapperOffset.left;
      pos.top -= this.wrapperOffset.top;

      // if offsetX/Y are true we center the element to the screen
      if (offsetX === true) {
        offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
      }
      if (offsetY === true) {
        offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
      }

      pos.left -= offsetX || 0;
      pos.top -= offsetY || 0;

      pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
      pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

      time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;

      this.scrollTo(pos.left, pos.top, time, easing);
    },

    _transitionTime: function(time) {
      time = time || 0;

      this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

      if (!time && utils.isBadAndroid) {
        this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
      }

      // INSERT POINT: _transitionTime

    },

    _transitionTimingFunction: function(easing) {
      this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

      // INSERT POINT: _transitionTimingFunction

    },

    _translate: function(x, y) {
      if (this.options.useTransform) {

        /* REPLACE START: _translate */

        this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

        /* REPLACE END: _translate */

      } else {
        x = Math.round(x);
        y = Math.round(y);
        this.scrollerStyle.left = x + 'px';
        this.scrollerStyle.top = y + 'px';
      }

      this.x = x;
      this.y = y;

      // scrolling callback

      if (typeof this.options.scrolling === "function")
        this.options.scrolling.call(this);

      // INSERT POINT: _translate

    },

    _initEvents: function(remove) {
      var eventType = remove ? utils.removeEvent : utils.addEvent,
        target = this.options.bindToWrapper ? this.wrapper : window;

      eventType(window, 'orientationchange', this);
      eventType(window, 'resize', this);

      if (this.options.click) {
        eventType(this.wrapper, 'click', this, true);
      }

      if (!this.options.disableMouse) {
        eventType(this.wrapper, 'mousedown', this);
        eventType(target, 'mousemove', this);
        eventType(target, 'mousecancel', this);
        eventType(target, 'mouseup', this);
      }

      if (utils.hasPointer && !this.options.disablePointer) {
        eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
        eventType(target, utils.prefixPointerEvent('pointermove'), this);
        eventType(target, utils.prefixPointerEvent('pointercancel'), this);
        eventType(target, utils.prefixPointerEvent('pointerup'), this);
      }

      if (utils.hasTouch && !this.options.disableTouch) {
        eventType(this.wrapper, 'touchstart', this);
        eventType(target, 'touchmove', this);
        eventType(target, 'touchcancel', this);
        eventType(target, 'touchend', this);
      }

      eventType(this.scroller, 'transitionend', this);
      eventType(this.scroller, 'webkitTransitionEnd', this);
      eventType(this.scroller, 'oTransitionEnd', this);
      eventType(this.scroller, 'MSTransitionEnd', this);
    },

    getComputedPosition: function() {
      var matrix = window.getComputedStyle(this.scroller, null),
        x, y;

      if (this.options.useTransform) {
        matrix = matrix[utils.style.transform].split(')')[0].split(', ');
        x = +(matrix[12] || matrix[4]);
        y = +(matrix[13] || matrix[5]);
      } else {
        x = +matrix.left.replace(/[^-\d.]/g, '');
        y = +matrix.top.replace(/[^-\d.]/g, '');
      }

      return {
        x: x,
        y: y
      };
    },

    _animate: function(destX, destY, duration, easingFn) {
      var that = this,
        startX = this.x,
        startY = this.y,
        startTime = utils.getTime(),
        destTime = startTime + duration;

      function step() {
        var now = utils.getTime(),
          newX, newY,
          easing;

        if (now >= destTime) {
          that.isAnimating = false;
          that._translate(destX, destY);

          if (!that.resetPosition(that.options.bounceTime)) {
            that._execEvent('scrollEnd');
          }

          return;
        }

        now = (now - startTime) / duration;
        easing = easingFn(now);
        newX = (destX - startX) * easing + startX;
        newY = (destY - startY) * easing + startY;
        that._translate(newX, newY);

        if (that.isAnimating) {
          rAF(step);
        }
      }

      this.isAnimating = true;
      step();
    },
    handleEvent: function(e) {
      switch (e.type) {
        case 'touchstart':
        case 'pointerdown':
        case 'MSPointerDown':
        case 'mousedown':
          this._start(e);
          break;
        case 'touchmove':
        case 'pointermove':
        case 'MSPointerMove':
        case 'mousemove':
          this._move(e);
          break;
        case 'touchend':
        case 'pointerup':
        case 'MSPointerUp':
        case 'mouseup':
        case 'touchcancel':
        case 'pointercancel':
        case 'MSPointerCancel':
        case 'mousecancel':
          this._end(e);
          break;
        case 'orientationchange':
        case 'resize':
          this._resize();
          break;
        case 'transitionend':
        case 'webkitTransitionEnd':
        case 'oTransitionEnd':
        case 'MSTransitionEnd':
          this._transitionEnd(e);
          break;
        case 'wheel':
        case 'DOMMouseScroll':
        case 'mousewheel':
          this._wheel(e);
          break;
        case 'keydown':
          this._key(e);
          break;
        case 'click':
          if (!e._constructed) {
            e.preventDefault();
            e.stopPropagation();
          }
          break;
      }
    }
  };

  function Plugin(option) {
    var el = this;
    var option = option || {};
    if (typeof this === "function") {
      el = $(option.wrapper);
      if (el.length < 1)
        return;
      el = el[0];
    }

    if (!el.children) return;
    return new Scroller(el, option);
  }

  A.scroller = $.fn.scroller = $.scroller = Plugin;
  A.pt.scroller = function(option) {
    return Plugin.call(this.$[0], option);
  }
})(window, document, Math, window.arm);

/**
 * arm.pullrefresh
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-12-07 18:05:57
 * @version 2015-12-07 18:05:57
 */

;
! function($, A) {

  var _default = {
    onRefreshBefore: function() {},
    onRefreshReady: function() {},
    onRefresh: function() {},
    onRefreshDone: function() {},
    onLoadmoreBefore: function() {},
    onLoadmoreReady: function() {},
    onLoadmore: function() {},
    onLoadmoreDone: function() {},
    onComplete: function() {}
  };

  var _refresh = '<div class="ui-pullrefresh-tip pullrefresh">' +
    '<i class="ui-pullrefresh-down"></i><span></span>' +
    '</div>';

  var _loadmore = '<div class="ui-pullrefresh-tip pullloadmore">' +
    '<i class="ui-pullrefresh-up"></i><span></span>' +
    '</div>';

  var Pullrefresh = function(el, option) {
    var self = this;
    this.el = el,
      this.opt = $.extend(true, {}, _default, option || {});
    this._bindEvents();
  }

  Pullrefresh.prototype = {

      _bindEvents: function() {

        var self = this;
        self.$refresh = $(".ui-pullrefresh-refresh", self.el);
        if (self.$refresh.length < 1) {
          self.$refresh = $(_refresh);
          self.$refresh.isFromTpl = true;
        }
        self.$loadmore = $(".ui-pullrefresh-loadmore", self.el);
        if (self.$loadmore.length < 1) {
          self.$loadmore = $(_loadmore);
          self.$loadmore.isFromTpl = true;
        }
        self.inner = $(self.el).children()[0];
        $(self.el).addClass('ui-pullrefresh');
        $(self.inner).addClass("ui-pullrefresh-container");
        $(self.el).on("pullrefresh:start", function(e) {
          self._pullstart(e);
        }).on("pullrefresh:move", function(e) {
          self._pullmove(e);
        }).on("pullrefresh:end", function(e) {
          self._pullend(e);
        }).on('pullrefresh:transitionEnd', function(e) {
          self._pullTransEnd(e);
        });

        self.$refresh.prependTo(self.inner);
        self.$loadmore.appendTo(self.inner);
        self.refreshHeight = self.$refresh.height();
        self.loadmoreHeight = self.$loadmore.height();
        self.opt.refreshRange = self.opt.refreshRange ? self.opt.refreshRange : (self.refreshHeight + 25);
        self.opt.loadRange = self.opt.loadRange ? self.opt.loadRange : (self.loadmoreHeight);
        // scroller
        self._scroll = new A(self.el).scroller(self.opt);

      },
      _bindOne: function() {
        var self = this;
        $(self.el).off('.pullrefresh');
        if (!self.isfreshing) {
          $(self.el).one('refresh:before.pullrefresh', function(event) {
            self.opt.onRefreshBefore.call(self, event);
          }).one('refresh:ready.pullrefresh', function(event) {
            self.opt.onRefreshReady.call(self, event);
          }).one('refresh:action.pullrefresh', function(event) {
            self.opt.onRefresh.call(self, event);
          });
        }
        if (!self.isloading) {
          $(self.el).one('loadmore:before.pullrefresh', function(event) {
            self.opt.onLoadmoreBefore.call(self, event);
          }).one('loadmore:ready.pullrefresh', function(event) {
            self.opt.onLoadmoreReady.call(self, event);
          }).one('loadmore:action.pullrefresh', function(event) {
            self.opt.onLoadmore.call(self, event);
          });
        }
        $(self.el).one('loadmore:done.pullrefresh', function(event) {
          self.isloading = false;
          self.opt.onLoadmoreDone.call(self, event);
          self.opt.onComplete.call(self, 'loadmore');
        }).one('refresh:done.pullrefresh', function(event) {
          self.isfreshing = false;
          self.opt.onRefreshDone.call(self, event);
          self.opt.onComplete.call(self, 'refresh');
        });
      },
      _pullstart: function() {
        var self = this;
        scroll = self._scroll;
        scroll.pullrefreshEnd = false;
        self.isfreshing = self.isfreshing ? true : false;
        self.isloading = self.isloading ? true : false;
        self._bindOne();
      },

      _pullmove: function(e) {
        var self = this;
        scroll = this._scroll;
        var distance = 0;
        distance = scroll.y > 0 ? scroll.y : distance,
          distance = scroll.y < scroll.maxScrollY ? scroll.y - scroll.maxScrollY : distance;

        this.distance = distance;
        if (!self.isfreshing) {
          if (0 < distance && distance < self.opt.refreshRange) {
            self._trigger("refresh:before");
          }
          if (distance >= self.opt.refreshRange) {
            self._trigger("refresh:ready");
          }
        }
        if (!self.isloading) {
          if (0 > distance && distance > -self.opt.loadRange) {
            self._trigger("loadmore:before");
          }
          if (distance <= -self.opt.loadRange) {
            self._trigger("loadmore:ready");
          }
        }
      },

      _pullTransEnd: function() {

        var self = this,
          scroll = this._scroll;
        scroll.pullrefreshEnd = true;
        scroll.scrollTo(0, self.$refresh.height(), 500, scroll.options.bounceEasing);
      },

      _pullend: function(e) {
        var self = this,
          scroll = this._scroll
        if (self.state === "refresh:ready" && !scroll.pullrefreshEnd) {
          self.isfreshing = true;
          self._trigger('refresh:action');
        }
        if (self.state === "loadmore:ready" && !scroll.pullrefreshEnd) {
          self.isloading = true;
          self._trigger('loadmore:action');
        }
        if (self.isfreshing && !self.isloading && this.distance > self.$refresh.height()) {
          self._pullTransEnd();
        }
      },
      _update: function(type) {
        var self = this,
          scroll = this._scroll;
        scroll.refresh();
        if (type === "refresh") scroll.scrollTo(0, 0, 500, scroll.options.bounceEasing);
      },
      refreshed: function() {
        var self = this;
        self._update('refresh');
        self._trigger('refresh:done');
      },
      loadedmore: function() {
        var self = this;
        self._update('loadmore');
        self._trigger('loadmore:done');
      },
      _stateStyle: function(state) {
        var self = this;
        self.state = state;
        state = state.split(":");
        var handle = self['$' + state[0]];
        var isRefresh = state[0] === 'refresh';
        var isLoadmore = state[0] === 'loadmore';
        var handleAction = state[1];
        var stateClasses = {
          'before': 'ui-pullrefresh-' + (isRefresh ? "down" : "up"),
          'ready': 'ui-pullrefresh-' + (isRefresh ? "refresh" : "loading")
        }
        stateClasses.action = stateClasses.ready + " ani-loading";
        stateClasses.done = stateClasses.before;
        $('i', handle).removeClass().addClass(stateClasses[handleAction]);
      },
      _trigger: function(eventName) {
        var self = this,
          scroll = this._scroll;
        self._stateStyle(eventName);
        $(self.el).trigger(eventName);
      }

    }
    // 注册插件
  A.register('pullrefresh', Pullrefresh, true);

}(JQUERY, window.arm);
(function(g, e) {
  function i(o) {
    var n;
    for (n in o) {
      if (l[o[n]] !== e) {
        return true
      }
    }
    return false
  }

  function f() {
    var n = ["Webkit", "Moz", "O", "ms"],
      o;
    for (o in n) {
      if (i([n[o] + "Transform"])) {
        return "-" + n[o].toLowerCase() + "-"
      }
    }
    return ""
  }

  function m(q, p, o) {
    var n = q;
    if (typeof p === "object") {
      return q.each(function() {
        if (a[this.id]) {
          a[this.id].destroy()
        }
        new g.mobiscroll.classes[p.component || "Scroller"](this, p)
      })
    }
    if (typeof p === "string") {
      q.each(function() {
        var s, t = a[this.id];
        if (t && t[p]) {
          s = t[p].apply(this, Array.prototype.slice.call(o, 1));
          if (s !== e) {
            n = s;
            return false
          }
        }
      })
    }
    return n
  }
  var d = +new Date(),
    a = {},
    k = g.extend,
    l = document.createElement("modernizr").style,
    j = i(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]),
    c = i(["flex", "msFlex", "WebkitBoxDirection"]),
    h = f(),
    b = h.replace(/^\-/, "").replace(/\-$/, "").replace("moz", "Moz");
  g.fn.mobiscroll = function(n) {
    k(this, g.mobiscroll.components);
    return m(this, n, arguments)
  };
  g.mobiscroll = g.mobiscroll || {
    version: "2.15.1",
    util: {
      prefix: h,
      jsPrefix: b,
      has3d: j,
      hasFlex: c,
      testTouch: function(n, o) {
        if (n.type == "touchstart") {
          g(o).attr("data-touch", "1")
        } else {
          if (g(o).attr("data-touch")) {
            g(o).removeAttr("data-touch");
            return false
          }
        }
        return true
      },
      objectToArray: function(p) {
        var n = [],
          o;
        for (o in p) {
          n.push(p[o])
        }
        return n
      },
      arrayToObject: function(n) {
        var p = {},
          o;
        if (n) {
          for (o = 0; o < n.length; o++) {
            p[n[o]] = n[o]
          }
        }
        return p
      },
      isNumeric: function(n) {
        return n - parseFloat(n) >= 0
      },
      isString: function(n) {
        return typeof n === "string"
      },
      getCoord: function(o, p) {
        var n = o.originalEvent || o;
        return n.changedTouches ? n.changedTouches[0]["page" + p] : o["page" + p]
      },
      getPosition: function(q, o) {
        var r = window.getComputedStyle ? getComputedStyle(q[0]) : q[0].style,
          n,
          p;
        if (j) {
          g.each(["t", "webkitT", "MozT", "OT", "msT"],
            function(t, s) {
              if (r[s + "ransform"] !== e) {
                n = r[s + "ransform"];
                return false
              }
            });
          n = n.split(")")[0].split(", ");
          p = o ? (n[13] || n[5]) : (n[12] || n[4])
        } else {
          p = o ? r.top.replace("px", "") : r.left.replace("px", "")
        }
        return p
      },
      constrain: function(p, o, n) {
        return Math.max(o, Math.min(p, n))
      },
      vibrate: function(n) {
        if ("vibrate" in navigator) {
          navigator.vibrate(n || 50)
        }
      }
    },
    tapped: false,
    autoTheme: "ios",
    presets: {
      scroller: {},
      numpad: {},
      listview: {},
      menustrip: {}
    },
    themes: {
      frame: {},
      listview: {},
      menustrip: {}
    },
    i18n: {},
    instances: a,
    classes: {},
    components: {},
    defaults: {
      context: "body",
      mousewheel: true,
      vibrate: true
    },
    setDefaults: function(n) {
      k(this.defaults, n)
    },
    presetShort: function(n, q, o) {
      this.components[n] = function(p) {
        return m(this, k(p, {
          component: q,
          preset: o === false ? e : n
        }), arguments)
      }
    }
  };
  g.mobiscroll.classes.Base = function(p, q) {
    var o, w, x, t, u, r, n = g.mobiscroll,
      v = this;
    v.settings = {};
    v._presetLoad = function() {};
    v._init = function(s) {
      x = v.settings;
      k(q, s);
      if (v._hasDef) {
        r = n.defaults
      }
      k(x, v._defaults, r, q);
      if (v._hasTheme) {
        u = x.theme;
        if (u == "auto" || !u) {
          u = n.autoTheme
        }
        if (u == "default") {
          u = "mobiscroll"
        }
        q.theme = u;
        t = n.themes[v._class][u]
      }
      if (v._hasLang) {
        o = n.i18n[x.lang]
      }
      if (v._hasTheme) {
        v.trigger("onThemeLoad", [o, q])
      }
      k(x, t, o, r, q);
      if (v._hasPreset) {
        v._presetLoad(x);
        w = n.presets[v._class][x.preset];
        if (w) {
          w = w.call(p, v);
          k(x, w, q)
        }
      }
    };
    v._destroy = function() {
      v.trigger("onDestroy", []);
      delete a[p.id];
      v = null
    };
    v.trigger = function(z, y) {
      var s;
      y.push(v);
      g.each([r, t, w, q],
        function(B, A) {
          if (A && A[z]) {
            s = A[z].apply(p, y)
          }
        });
      return s
    };
    v.option = function(s, y) {
      var z = {};
      if (typeof s === "object") {
        z = s
      } else {
        z[s] = y
      }
      v.init(z)
    };
    v.getInst = function() {
      return v
    };
    q = q || {};
    if (!p.id) {
      p.id = "mobiscroll" + (++d)
    }
    a[p.id] = v
  }
})(JQUERY);
(function(f, i, n, h) {
  var c, s, o = f.mobiscroll,
    d = o.instances,
    a = o.util,
    q = a.jsPrefix,
    l = a.has3d,
    b = a.getCoord,
    p = a.constrain,
    m = a.isString,
    g = /android [1-3]/i.test(navigator.userAgent),
    k = /(iphone|ipod|ipad).* os 8_/i.test(navigator.userAgent),
    r = "webkitAnimationEnd animationend",
    j = function() {},
    e = function(t) {
      t.preventDefault()
    };
  o.classes.Frame = function(ab, ac, B) {
    var K, y, z, Y, T, G, x, t, A, J, N, W, af, D, U, I, M, P, ad, X, C, w, ae, u, S = this,
      R = f(ab),
      F = [],
      O = {};

    function E(ag) {
      if (N) {
        N.removeClass("dwb-a")
      }
      N = f(this);
      if (!N.hasClass("dwb-d") && !N.hasClass("dwb-nhl")) {
        N.addClass("dwb-a")
      }
      if (ag.type === "mousedown") {
        f(n).on("mouseup", H)
      }
    }

    function H(ag) {
      if (N) {
        N.removeClass("dwb-a");
        N = null
      }
      if (ag.type === "mouseup") {
        f(n).off("mouseup", H)
      }
    }

    function Z(ag) {
      if (ag.keyCode == 13) {
        S.select()
      } else {
        if (ag.keyCode == 27) {
          S.cancel()
        }
      }
    }

    function V(ag) {
      if (!ag) {
        x.focus()
      }
      S.ariaMessage(X.ariaMessage)
    }

    function aa(ah) {
      var ak, aj, ai, ag = X.focusOnClose;
      Y.remove();
      if (c && !ah) {
        setTimeout(function() {
            if (ag === h || ag === true) {
              s = true;
              ak = c[0];
              ai = ak.type;
              aj = ak.value;
              try {
                ak.type = "button"
              } catch (al) {}
              c.focus();
              ak.type = ai;
              ak.value = aj
            } else {
              if (ag) {
                if (d[f(ag).attr("id")]) {
                  o.tapped = false
                }
                f(ag).focus()
              }
            }
          },
          200)
      }
      S._isVisible = false;
      af("onHide", [])
    }

    function v(ag) {
      clearTimeout(O[ag.type]);
      O[ag.type] = setTimeout(function() {
          var ah = ag.type == "scroll";
          if (ah && !C) {
            return
          }
          S.position(!ah)
        },
        200)
    }

    function L(ag) {
      if (!x[0].contains(ag.target)) {
        x.focus()
      }
    }

    function Q(ah, ag) {
      if (!o.tapped) {
        if (ah) {
          ah()
        }
        if (f(n.activeElement).is("input,textarea")) {
          f(n.activeElement).blur()
        }
        c = ag;
        S.show()
      }
      setTimeout(function() {
          s = false
        },
        300)
    }
    o.classes.Base.call(this, ab, ac, true);
    S.position = function(aF) {
      var aq, az, au, an, ar, aC, ax, av, aA, ai, aB, ag, aD, aj, aE, ay, aH = 0,
        am = 0,
        ao = {},
        aG = Math.min(t[0].innerWidth || t.innerWidth(), G.width()),
        ak = t[0].innerHeight || t.innerHeight();
      if ((ae === aG && u === ak && aF) || ad) {
        return
      }
      if (S._isFullScreen || /top|bottom/.test(X.display)) {
        x.width(aG)
      }
      if (af("onPosition", [Y, aG, ak]) === false || !U) {
        return
      }
      aE = t.scrollLeft();
      ay = t.scrollTop();
      an = X.anchor === h ? R : f(X.anchor);
      if (S._isLiquid && X.layout !== "liquid") {
        if (aG < 400) {
          Y.addClass("dw-liq")
        } else {
          Y.removeClass("dw-liq")
        }
      }
      if (!S._isFullScreen && /modal|bubble/.test(X.display)) {
        A.width("");
        f(".mbsc-w-p", Y).each(function() {
          aq = f(this).outerWidth(true);
          aH += aq;
          am = (aq > am) ? aq : am
        });
        aq = aH > aG ? am : aH;
        A.width(aq).css("white-space", aH > aG ? "" : "nowrap")
      }
      I = S._isFullScreen ? aG : x.outerWidth();
      M = S._isFullScreen ? ak : x.outerHeight(true);
      C = M <= ak && I <= aG;
      S.scrollLock = C;
      if (X.display == "modal") {
        az = Math.max(0, aE + (aG - I) / 2);
        au = ay + (ak - M) / 2
      } else {
        if (X.display == "bubble") {
          aj = true;
          ai = f(".dw-arrw-i", Y);
          ax = an.offset();
          av = Math.abs(y.offset().top - ax.top);
          aA = Math.abs(y.offset().left - ax.left);
          ar = an.outerWidth();
          aC = an.outerHeight();
          az = p(aA - (x.outerWidth(true) - ar) / 2, aE + 3, aE + aG - I - 3);
          au = av - M;
          if ((au < ay) || (av > ay + ak)) {
            x.removeClass("dw-bubble-top").addClass("dw-bubble-bottom");
            au = av + aC
          } else {
            x.removeClass("dw-bubble-bottom").addClass("dw-bubble-top")
          }
          aB = ai.outerWidth();
          ag = p(aA + ar / 2 - (az + (I - aB) / 2), 0, aB);
          f(".dw-arr", Y).css({
            left: ag
          })
        } else {
          az = aE;
          if (X.display == "top") {
            au = ay
          } else {
            if (X.display == "bottom") {
              au = ay + ak - M
            }
          }
        }
      }
      au = au < 0 ? 0 : au;
      ao.top = au;
      ao.left = az;
      x.css(ao);
      G.height(0);
      aD = Math.max(au + M, X.context == "body" ? f(n).height() : y[0].scrollHeight);
      G.css({
        height: aD
      });
      if (aj && ((au + M > ay + ak) || (av > ay + ak))) {
        ad = true;
        setTimeout(function() {
            ad = false
          },
          300);
        t.scrollTop(Math.min(au + M - ak, aD - ak))
      }
      ae = aG;
      u = ak
    };
    S.attachShow = function(ag, ah) {
      F.push({
        readOnly: ag.prop("readonly"),
        el: ag
      });
      if (X.display !== "inline") {
        if (w && ag.is("input")) {
          ag.prop("readonly", true).on("mousedown.dw",
            function(ai) {
              ai.preventDefault()
            })
        }
        if (X.showOnFocus) {
          ag.on("focus.dw",
            function() {
              if (!s) {
                Q(ah, ag)
              }
            })
        }
        if (X.showOnTap) {
          ag.on("keydown.dw",
            function(ai) {
              if (ai.keyCode == 32 || ai.keyCode == 13) {
                ai.preventDefault();
                ai.stopPropagation();
                Q(ah, ag)
              }
            });
          S.tap(ag,
            function() {
              Q(ah, ag)
            })
        }
      }
    };
    S.select = function() {
      if (!U || S.hide(false, "set") !== false) {
        S._fillValue();
        af("onSelect", [S._value])
      }
    };
    S.cancel = function() {
      if (!U || S.hide(false, "cancel") !== false) {
        af("onCancel", [S._value])
      }
    };
    S.clear = function() {
      af("onClear", [Y]);
      if (U && !S.live) {
        S.hide(false, "clear")
      }
      S.setVal(null, true)
    };
    S.enable = function() {
      X.disabled = false;
      if (S._isInput) {
        R.prop("disabled", false)
      }
    };
    S.disable = function() {
      X.disabled = true;
      if (S._isInput) {
        R.prop("disabled", true)
      }
    };
    S.show = function(ah, ag) {
      var ai;
      if (X.disabled || S._isVisible) {
        return
      }
      if (W !== false) {
        if (X.display == "top") {
          W = "slidedown"
        }
        if (X.display == "bottom") {
          W = "slideup"
        }
      }
      S._readValue();
      af("onBeforeShow", []);
      ai = '<div lang="' + X.lang + '" class="mbsc-' + X.theme + (X.baseTheme ? " mbsc-" + X.baseTheme : "") + " dw-" + X.display + " " + (X.cssClass || "") + (S._isLiquid ? " dw-liq" : "") + (g ? " mbsc-old" : "") + (D ? "" : " dw-nobtn") + '">' + '<div class="dw-persp">' + (U ? '<div class="dwo"></div>' : "") + "<div" + (U ? ' role="dialog" tabindex="-1"' : "") + ' class="dw' + (X.rtl ? " dw-rtl" : " dw-ltr") + '">' + (X.display === "bubble" ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : "") + '<div class="dwwr">' + '<div aria-live="assertive" class="dw-aria dw-hidden"></div>' + (X.headerText ? '<div class="dwv">' + (m(X.headerText) ? X.headerText : "") + "</div>" : "") + '<div class="dwcc">';
      ai += S._generateContent();
      ai += "</div>";
      if (D) {
        ai += '<div class="dwbc">';
        f.each(J,
          function(ak, aj) {
            aj = m(aj) ? S.buttons[aj] : aj;
            if (aj.handler === "set") {
              aj.parentClass = "dwb-s"
            }
            if (aj.handler === "cancel") {
              aj.parentClass = "dwb-c"
            }
            aj.handler = m(aj.handler) ? S.handlers[aj.handler] : aj.handler;
            ai += "<div" + (X.btnWidth ? ' style="width:' + (100 / J.length) + '%"' : "") + ' class="dwbw ' + (aj.parentClass || "") + '"><div tabindex="0" role="button" class="dwb' + ak + " dwb-e " + (aj.cssClass === h ? X.btnClass : aj.cssClass) + (aj.icon ? " mbsc-ic mbsc-ic-" + aj.icon : "") + '">' + (aj.text || "") + "</div></div>"
          });
        ai += "</div>"
      }
      ai += "</div></div></div></div>";
      Y = f(ai);
      G = f(".dw-persp", Y);
      T = f(".dwo", Y);
      A = f(".dwwr", Y);
      z = f(".dwv", Y);
      x = f(".dw", Y);
      K = f(".dw-aria", Y);
      S._markup = Y;
      S._header = z;
      S._isVisible = true;
      P = "orientationchange resize";
      S._markupReady(Y);
      af("onMarkupReady", [Y]);
      if (U) {
        f(i).on("keydown", Z);
        if (X.scrollLock) {
          Y.on("touchmove mousewheel wheel",
            function(aj) {
              if (C) {
                aj.preventDefault()
              }
            })
        }
        if (q !== "Moz") {
          f("input,select,button", y).each(function() {
            if (!this.disabled) {
              f(this).addClass("dwtd").prop("disabled", true)
            }
          })
        }
        P += " scroll";
        o.activeInstance = S;
        Y.appendTo(y);
        if (l && W && !ah) {
          Y.addClass("dw-in dw-trans").on(r,
            function() {
              Y.off(r).removeClass("dw-in dw-trans").find(".dw").removeClass("dw-" + W);
              V(ag)
            }).find(".dw").addClass("dw-" + W)
        }
      } else {
        if (R.is("div") && !S._hasContent) {
          R.html(Y)
        } else {
          Y.insertAfter(R)
        }
      }
      af("onMarkupInserted", [Y]);
      S.position();
      t.on(P, v).on("focusin", L);
      Y.on("selectstart mousedown", e).on("click", ".dwb-e", e).on("keydown", ".dwb-e",
        function(aj) {
          if (aj.keyCode == 32) {
            aj.preventDefault();
            aj.stopPropagation();
            f(this).click()
          }
        }).on("keydown",
        function(am) {
          if (am.keyCode == 32) {
            am.preventDefault()
          } else {
            if (am.keyCode == 9) {
              var al = Y.find('[tabindex="0"]').filter(function() {
                  return this.offsetWidth > 0 || this.offsetHeight > 0
                }),
                aj = al.index(f(":focus", Y)),
                ak = al.length - 1,
                an = 0;
              if (am.shiftKey) {
                ak = 0;
                an = -1
              }
              if (aj === ak) {
                al.eq(an).focus();
                am.preventDefault()
              }
            }
          }
        });
      f("input", Y).on("selectstart mousedown",
        function(aj) {
          aj.stopPropagation()
        });
      setTimeout(function() {
          f.each(J,
            function(ak, aj) {
              S.tap(f(".dwb" + ak, Y),
                function(al) {
                  aj = m(aj) ? S.buttons[aj] : aj;
                  aj.handler.call(this, al, S)
                },
                true)
            });
          if (X.closeOnOverlay) {
            S.tap(T,
              function() {
                S.cancel()
              })
          }
          if (U && !W) {
            V(ag)
          }
          Y.on("touchstart mousedown", ".dwb-e", E).on("touchend", ".dwb-e", H);
          S._attachEvents(Y)
        },
        300);
      af("onShow", [Y, S._tempValue])
    };
    S.hide = function(ag, ah, ai) {
      if (!S._isVisible || (!ai && !S._isValid && ah == "set") || (!ai && af("onClose", [S._tempValue, ah]) === false)) {
        return false
      }
      if (Y) {
        if (q !== "Moz") {
          f(".dwtd", y).each(function() {
            f(this).prop("disabled", false).removeClass("dwtd")
          })
        }
        if (l && U && W && !ag && !Y.hasClass("dw-trans")) {
          Y.addClass("dw-out dw-trans").find(".dw").addClass("dw-" + W).on(r,
            function() {
              aa(ag)
            })
        } else {
          aa(ag)
        }
        t.off(P, v).off("focusin", L)
      }
      if (U) {
        f(i).off("keydown", Z);
        delete o.activeInstance
      }
    };
    S.ariaMessage = function(ag) {
      K.html("");
      setTimeout(function() {
          K.html(ag)
        },
        100)
    };
    S.isVisible = function() {
      return S._isVisible
    };
    S.setVal = j;
    S._generateContent = j;
    S._attachEvents = j;
    S._readValue = j;
    S._fillValue = j;
    S._markupReady = j;
    S._processSettings = j;
    S._presetLoad = function(ag) {
      ag.buttons = ag.buttons || (ag.display !== "inline" ? ["set", "cancel"] : []);
      ag.headerText = ag.headerText === h ? (ag.display !== "inline" ? "{value}" : false) : ag.headerText
    };
    S.tap = function(al, ak, ai) {
      var ah, ag, aj;
      if (X.tap) {
        al.on("touchstart.dw",
          function(am) {
            if (ai) {
              am.preventDefault()
            }
            ah = b(am, "X");
            ag = b(am, "Y");
            aj = false
          }).on("touchmove.dw",
          function(am) {
            if (Math.abs(b(am, "X") - ah) > 20 || Math.abs(b(am, "Y") - ag) > 20) {
              aj = true
            }
          }).on("touchend.dw",
          function(an) {
            var am = this;
            if (!aj) {
              an.preventDefault();
              ak.call(am, an)
            }
            o.tapped = true;
            setTimeout(function() {
                o.tapped = false
              },
              500)
          })
      }
      al.on("click.dw",
        function(am) {
          if (!o.tapped) {
            ak.call(this, am)
          }
          am.preventDefault()
        })
    };
    S.destroy = function() {
      S.hide(true, false, true);
      f.each(F,
        function(ah, ag) {
          ag.el.off(".dw").prop("readonly", ag.readOnly)
        });
      S._destroy()
    };
    S.init = function(ag) {
      S._init(ag);
      S._isLiquid = (X.layout || (/top|bottom/.test(X.display) ? "liquid" : "")) === "liquid";
      S._processSettings();
      R.off(".dw");
      W = g ? false : X.animate;
      J = X.buttons || [];
      U = X.display !== "inline";
      w = X.showOnFocus || X.showOnTap;
      t = f(X.context == "body" ? i : X.context);
      y = f(X.context);
      S.context = t;
      S.live = true;
      f.each(J,
        function(ai, ah) {
          if (ah == "ok" || ah == "set" || ah.handler == "set") {
            S.live = false;
            return false
          }
        });
      S.buttons.set = {
        text: X.setText,
        handler: "set"
      };
      S.buttons.cancel = {
        text: (S.live) ? X.closeText : X.cancelText,
        handler: "cancel"
      };
      S.buttons.clear = {
        text: X.clearText,
        handler: "clear"
      };
      S._isInput = R.is("input");
      D = J.length > 0;
      if (S._isVisible) {
        S.hide(true, false, true)
      }
      af("onInit", []);
      if (U) {
        S._readValue();
        if (!S._hasContent) {
          S.attachShow(R)
        }
      } else {
        S.show()
      }
      R.on("change.dw",
        function() {
          if (!S._preventChange) {
            S.setVal(R.val(), true, false)
          }
          S._preventChange = false
        })
    };
    S.buttons = {};
    S.handlers = {
      set: S.select,
      cancel: S.cancel,
      clear: S.clear
    };
    S._value = null;
    S._isValid = true;
    S._isVisible = false;
    X = S.settings;
    af = S.trigger;
    if (!B) {
      S.init(ac)
    }
  };
  o.classes.Frame.prototype._defaults = {
    lang: "zh",
    setText: "Set",
    selectedText: "Selected",
    closeText: "Close",
    cancelText: "Cancel",
    clearText: "Clear",
    disabled: false,
    closeOnOverlay: true,
    showOnFocus: false,
    showOnTap: true,
    display: "bottom",
    scrollLock: true,
    tap: true,
    btnClass: "dwb",
    btnWidth: true,
    focusOnClose: !k
  };
  o.themes.frame.mobiscroll = {
    rows: 2,
    showLabel: false,
    headerText: false,
    btnWidth: false,
    selectedLineHeight: true,
    selectedLineBorder: 1,
    dateOrder: "MMddyy",
    weekDays: "min",
    checkIcon: "ion-ios7-checkmark-empty",
    btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
    btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
    btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
    btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
  };
  f(i).on("focus",
    function() {
      if (c) {
        s = true
      }
    });
  f(n).on("mouseover mouseup mousedown click",
    function(t) {
      if (o.tapped) {
        t.stopPropagation();
        t.preventDefault();
        return false
      }
    })
})(JQUERY, window, document);

/**
 *** scroller
 **/
(function(i, l, m, f) {
  var g, c = i.mobiscroll,
    h = c.classes,
    j = c.util,
    b = j.jsPrefix,
    k = j.has3d,
    a = j.hasFlex,
    d = j.getCoord,
    n = j.constrain,
    e = j.testTouch;
  c.presetShort("scroller", "Scroller", false);
  h.Scroller = function(ak, am, G) {
    var aj, X, ae, an, aa, af, E, S, ab, t, P, w, J, ah, ao, N, q, U, Y, R, ad = this,
      ac = i(ak),
      Q = {},
      T = {},
      A = {},
      D = [];

    function F(p) {
      if (e(p, this) && !g && !ab && !X && !H(this)) {
        p.preventDefault();
        p.stopPropagation();
        g = true;
        ae = af.mode != "clickpick";
        q = i(".dw-ul", this);
        u(q);
        t = Q[U] !== f;
        ah = t ? M(q) : T[U];
        P = d(p, "Y");
        w = new Date();
        J = P;
        ag(q, U, ah, 0.001);
        if (ae) {
          q.closest(".dwwl").addClass("dwa")
        }
        if (p.type === "mousedown") {
          i(m).on("mousemove", I).on("mouseup", ai)
        }
      }
    }

    function I(p) {
      if (g) {
        if (ae) {
          p.preventDefault();
          p.stopPropagation();
          J = d(p, "Y");
          if (Math.abs(J - P) > 3 || t) {
            ag(q, U, n(ah + (P - J) / an, ao - 1, N + 1));
            t = true
          }
        }
      }
    }

    function ai(av) {
      if (g) {
        var aq = new Date() - w,
          ay = n(Math.round(ah + (P - J) / an), ao - 1, N + 1),
          ap = ay,
          ar,
          au,
          at = q.offset().top;
        av.stopPropagation();
        g = false;
        if (av.type === "mouseup") {
          i(m).off("mousemove", I).off("mouseup", ai)
        }
        if (k && aq < 300) {
          ar = (J - P) / aq;
          au = (ar * ar) / af.speedUnit;
          if (J - P < 0) {
            au = -au
          }
        } else {
          au = J - P
        }
        if (!t) {
          var aw = Math.floor((J - at) / an),
            ax = i(i(".dw-li", q)[aw]),
            p = ax.hasClass("dw-v"),
            s = ae;
          aq = 0.1;
          if (S("onValueTap", [ax]) !== false && p) {
            ap = aw
          } else {
            s = true
          }
          if (s && p) {
            ax.addClass("dw-hl");
            setTimeout(function() {
                ax.removeClass("dw-hl")
              },
              100)
          }
          if (!aa && (af.confirmOnTap === true || af.confirmOnTap[U]) && ax.hasClass("dw-sel")) {
            ad.select();
            return
          }
        } else {
          ap = n(Math.round(ah - au / an), ao, N);
          aq = ar ? Math.max(0.1, Math.abs((ap - ay) / ar) * af.timeUnit) : 0.1
        }
        if (ae) {
          x(q, U, ap, 0, aq, true)
        }
      }
    }

    function L(p) {
      X = i(this);
      if (e(p, this)) {
        W(p, X.closest(".dwwl"), X.hasClass("dwwbp") ? v : z)
      }
      if (p.type === "mousedown") {
        i(m).on("mouseup", O)
      }
    }

    function O(p) {
      X = null;
      if (ab) {
        clearInterval(R);
        ab = false
      }
      if (p.type === "mouseup") {
        i(m).off("mouseup", O)
      }
    }

    function B(p) {
      if (p.keyCode == 38) {
        W(p, i(this), z)
      } else {
        if (p.keyCode == 40) {
          W(p, i(this), v)
        }
      }
    }

    function r() {
      if (ab) {
        clearInterval(R);
        ab = false
      }
    }

    function C(s) {
      if (!H(this)) {
        s.preventDefault();
        s = s.originalEvent || s;
        var ap = s.deltaY || s.wheelDelta || s.detail,
          p = i(".dw-ul", this);
        u(p);
        ag(p, U, n(((ap < 0 ? -20 : 20) - A[U]) / an, ao - 1, N + 1));
        clearTimeout(E);
        E = setTimeout(function() {
            x(p, U, Math.round(T[U]), ap > 0 ? 1 : 2, 0.1)
          },
          200)
      }
    }

    function W(aq, p, ap) {
      aq.stopPropagation();
      aq.preventDefault();
      if (!ab && !H(p) && !p.hasClass("dwa")) {
        ab = true;
        var s = p.find(".dw-ul");
        u(s);
        clearInterval(R);
        R = setInterval(function() {
            ap(s)
          },
          af.delay);
        ap(s)
      }
    }

    function H(p) {
      if (i.isArray(af.readonly)) {
        var s = i(".dwwl", aj).index(p);
        return af.readonly[s]
      }
      return af.readonly
    }

    function K(ar) {
      var aq = '<div class="dw-bf">',
        s = D[ar],
        p = 1,
        au = s.labels || [],
        ap = s.values || [],
        at = s.keys || ap;
      i.each(ap,
        function(aw, av) {
          if (p % 20 === 0) {
            aq += '</div><div class="dw-bf">'
          }
          aq += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + at[aw] + '"' + (au[aw] ? ' aria-label="' + au[aw] + '"' : "") + ' style="height:' + an + "px;line-height:" + an + 'px;">' + '<div class="dw-i"' + (Y > 1 ? ' style="line-height:' + Math.round(an / Y) + "px;font-size:" + Math.round(an / Y * 0.8) + 'px;"' : "") + ">" + av + "</div></div>";
          p++
        });
      aq += "</div>";
      return aq
    }

    function u(p) {
      aa = p.closest(".dwwl").hasClass("dwwms");
      ao = i(".dw-li", p).index(i(aa ? ".dw-li" : ".dw-v", p).eq(0));
      N = Math.max(ao, i(".dw-li", p).index(i(aa ? ".dw-li" : ".dw-v", p).eq(-1)) - (aa ? af.rows - (af.mode == "scroller" ? 1 : 3) : 0));
      U = i(".dw-ul", aj).index(p)
    }

    function o(p) {
      var s = af.headerText;
      return s ? (typeof s === "function" ? s.call(ak, p) : s.replace(/\{value\}/i, p)) : ""
    }

    function M(p) {
      return Math.round(-j.getPosition(p, true) / an)
    }

    function y(s, p) {
      clearTimeout(Q[p]);
      delete Q[p];
      s.closest(".dwwl").removeClass("dwa")
    }

    function ag(ap, p, au, at, ar) {
      var s = -au * an,
        aq = ap[0].style;
      if (s == A[p] && Q[p]) {
        return
      }
      A[p] = s;
      if (k) {
        aq[b + "Transition"] = j.prefix + "transform " + (at ? at.toFixed(3) : 0) + "s ease-out";
        aq[b + "Transform"] = "translate3d(0," + s + "px,0)"
      } else {
        aq.top = s + "px"
      }
      if (Q[p]) {
        y(ap, p)
      }
      if (at && ar) {
        ap.closest(".dwwl").addClass("dwa");
        Q[p] = setTimeout(function() {
            y(ap, p)
          },
          at * 1000)
      }
      T[p] = au
    }

    function V(p, az, s, aB, av) {
      var ar, ay = i('.dw-li[data-val="' + p + '"]', az),
        aA = i(".dw-li", az),
        ax = aA.index(ay),
        ap = aA.length;
      if (aB) {
        u(az)
      } else {
        if (!ay.hasClass("dw-v")) {
          var aw = ay,
            au = ay,
            at = 0,
            aq = 0;
          while (ax - at >= 0 && !aw.hasClass("dw-v")) {
            at++;
            aw = aA.eq(ax - at)
          }
          while (ax + aq < ap && !au.hasClass("dw-v")) {
            aq++;
            au = aA.eq(ax + aq)
          }
          if (((aq < at && aq && s !== 2) || !at || (ax - at < 0) || s == 1) && au.hasClass("dw-v")) {
            ay = au;
            ax = ax + aq
          } else {
            ay = aw;
            ax = ax - at
          }
        }
      }
      ar = ay.hasClass("dw-sel");
      if (av) {
        if (!aB) {
          i(".dw-sel", az).removeAttr("aria-selected");
          ay.attr("aria-selected", "true")
        }
        i(".dw-sel", az).removeClass("dw-sel");
        ay.addClass("dw-sel")
      }
      return {
        selected: ar,
        v: aB ? n(ax, ao, N) : ax,
        val: ay.hasClass("dw-v") ? ay.attr("data-val") : null
      }
    }

    function al(ar, s, ap, p, aq) {
      if (S("validate", [aj, s, ar, p]) !== false) {
        i(".dw-ul", aj).each(function(aw) {
          var av = i(this),
            at = av.closest(".dwwl").hasClass("dwwms"),
            ay = aw == s || s === f,
            au = V(ad._tempWheelArray[aw], av, p, at, true),
            ax = au.selected;
          if (!ax || ay) {
            ad._tempWheelArray[aw] = au.val;
            ag(av, aw, au.v, ay ? ar : 0.1, ay ? aq : false)
          }
        });
        S("onValidated", []);
        ad._tempValue = af.formatValue(ad._tempWheelArray, ad);
        if (ad.live) {
          ad._hasValue = ap || ad._hasValue;
          Z(ap, ap, 0, true)
        }
        ad._header.html(o(ad._tempValue));
        if (ap) {
          S("onChange", [ad._tempValue])
        }
      }
    }

    function x(ap, p, at, s, ar, aq) {
      at = n(at, ao, N);
      ad._tempWheelArray[p] = i(".dw-li", ap).eq(at).attr("data-val");
      ag(ap, p, at, ar, aq);
      setTimeout(function() {
          al(ar, p, true, s, aq)
        },
        10)
    }

    function v(p) {
      var s = T[U] + 1;
      x(p, U, s > N ? ao : s, 1, 0.1)
    }

    function z(p) {
      var s = T[U] - 1;
      x(p, U, s < ao ? N : s, 2, 0.1)
    }

    function Z(aq, ar, ap, s, p) {
      if (ad._isVisible && !s) {
        al(ap)
      }
      ad._tempValue = af.formatValue(ad._tempWheelArray, ad);
      if (!p) {
        ad._wheelArray = ad._tempWheelArray.slice(0);
        ad._value = ad._hasValue ? ad._tempValue : null
      }
      if (aq) {
        S("onValueFill", [ad._hasValue ? ad._tempValue : "", ar]);
        if (ad._isInput) {
          ac.val(ad._hasValue ? ad._tempValue : "")
        }
        if (ar) {
          ad._preventChange = true;
          ac.change()
        }
      }
    }
    h.Frame.call(this, ak, am, true);
    ad.setVal = ad._setVal = function(aq, ap, ar, p, s) {
      ad._hasValue = aq !== null && aq !== f;
      ad._tempWheelArray = i.isArray(aq) ? aq.slice(0) : af.parseValue.call(ak, aq, ad) || [];
      Z(ap, ar === f ? ap : ar, s, false, p)
    };
    ad.getVal = ad._getVal = function(p) {
      var s = ad._hasValue || p ? ad[p ? "_tempValue" : "_value"] : null;
      return j.isNumeric(s) ? +s : s
    };
    ad.setArrayVal = ad.setVal;
    ad.getArrayVal = function(p) {
      return p ? ad._tempWheelArray : ad._wheelArray
    };
    ad.setValue = function(aq, ap, s, p, ar) {
      ad.setVal(aq, ap, ar, p, s)
    };
    ad.getValue = ad.getArrayVal;
    ad.changeWheel = function(p, ar, ap) {
      if (aj) {
        var s = 0,
          aq = p.length;
        i.each(af.wheels,
          function(au, at) {
            i.each(at,
              function(aw, av) {
                if (i.inArray(s, p) > -1) {
                  D[s] = av;
                  i(".dw-ul", aj).eq(s).html(K(s));
                  aq--;
                  if (!aq) {
                    ad.position();
                    al(ar, f, ap);
                    return false
                  }
                }
                s++
              });
            if (!aq) {
              return false
            }
          })
      }
    };
    ad.getValidCell = V;
    ad.scroll = ag;
    ad._generateContent = function() {
      var ap, s = "",
        p = 0;
      i.each(af.wheels,
        function(ar, aq) {
          s += '<div class="mbsc-w-p dwc' + (af.mode != "scroller" ? " dwpm" : " dwsc") + (af.showLabel ? "" : " dwhl") + '">' + '<div class="dwwc"' + (af.maxWidth ? "" : ' style="max-width:600px;"') + ">" + (a ? "" : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>');
          i.each(aq,
            function(au, at) {
              D[p] = at;
              ap = at.label !== f ? at.label : au;
              s += "<" + (a ? "div" : "td") + ' class="dwfl"' + ' style="' + (at.hide ? "display:none;" : "") + (af.fixedWidth ? ("width:" + (af.fixedWidth[p] || af.fixedWidth) + "px;") : (af.minWidth ? ("min-width:" + (af.minWidth[p] || af.minWidth) + "px;") : "min-width:" + af.width + "px;") + (af.maxWidth ? ("max-width:" + (af.maxWidth[p] || af.maxWidth) + "px;") : "")) + '">' + '<div class="dwwl dwwl' + p + (at.multiple ? " dwwms" : "") + '">' + (af.mode != "scroller" ? '<div class="dwb-e dwwb dwwbp ' + (af.btnPlusClass || "") + '" style="height:' + an + "px;line-height:" + an + 'px;"><span>+</span></div>' + '<div class="dwb-e dwwb dwwbm ' + (af.btnMinusClass || "") + '" style="height:' + an + "px;line-height:" + an + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + ap + "</div>" + '<div tabindex="0" aria-live="off" aria-label="' + ap + '" role="listbox" class="dwww">' + '<div class="dww" style="height:' + (af.rows * an) + 'px;">' + '<div class="dw-ul" style="margin-top:' + (at.multiple ? (af.mode == "scroller" ? 0 : an) : af.rows / 2 * an - an / 2) + 'px;">';
              s += K(p) + '</div></div><div class="dwwo"></div></div><div class="dwwol"' + (af.selectedLineHeight ? ' style="height:' + an + "px;margin-top:-" + (an / 2 + (af.selectedLineBorder || 0)) + 'px;"' : "") + "></div></div>" + (a ? "</div>" : "</td>");
              p++
            });
          s += (a ? "" : "</tr></table>") + "</div></div>"
        });
      return s
    };
    ad._attachEvents = function(p) {
      p.on("keydown", ".dwwl", B).on("keyup", ".dwwl", r).on("touchstart mousedown", ".dwwl", F).on("touchmove", ".dwwl", I).on("touchend", ".dwwl", ai).on("touchstart mousedown", ".dwwb", L).on("touchend", ".dwwb", O);
      if (af.mousewheel) {
        p.on("wheel mousewheel", ".dwwl", C)
      }
    };
    ad._markupReady = function(p) {
      aj = p;
      al()
    };
    ad._fillValue = function() {
      ad._hasValue = true;
      Z(true, true, 0, true)
    };
    ad._readValue = function() {
      var p = ac.val() || "";
      if (p !== "") {
        ad._hasValue = true
      }
      ad._tempWheelArray = ad._hasValue && ad._wheelArray ? ad._wheelArray.slice(0) : af.parseValue.call(ak, p, ad) || [];
      Z()
    };
    ad._processSettings = function() {
      af = ad.settings;
      S = ad.trigger;
      an = af.height;
      Y = af.multiline;
      ad._isLiquid = (af.layout || (/top|bottom/.test(af.display) && af.wheels.length == 1 ? "liquid" : "")) === "liquid";
      if (af.formatResult) {
        af.formatValue = af.formatResult
      }
      if (Y > 1) {
        af.cssClass = (af.cssClass || "") + " dw-ml"
      }
      if (af.mode != "scroller") {
        af.rows = Math.max(3, af.rows)
      }
    };
    ad._selectedValues = {};
    if (!G) {
      ad.init(am)
    }
  };
  h.Scroller.prototype = {
    _hasDef: true,
    _hasTheme: true,
    _hasLang: true,
    _hasPreset: true,
    _class: "scroller",
    _defaults: i.extend({},
      h.Frame.prototype._defaults, {
        minWidth: 80,
        height: 40,
        rows: 2,
        multiline: 1,
        delay: 300,
        readonly: false,
        showLabel: true,
        confirmOnTap: true,
        wheels: [],
        mode: "scroller",
        preset: "",
        speedUnit: 0.0012,
        timeUnit: 0.08,
        formatValue: function(o) {
          return o.join(" ")
        },
        parseValue: function(t, s) {
          var u = [],
            o = [],
            p = 0,
            r,
            q;
          if (t !== null && t !== f) {
            u = (t + "").split(" ")
          }
          i.each(s.settings.wheels,
            function(w, v) {
              i.each(v,
                function(y, x) {
                  q = x.keys || x.values;
                  r = q[0];
                  i.each(q,
                    function(z, A) {
                      if (u[p] == A) {
                        r = A;
                        return false
                      }
                    });
                  o.push(r);
                  p++
                })
            });
          return o
        }
      })
  };
  c.themes.scroller = c.themes.frame
})(JQUERY, window, document);
/*
 ** datetime
 */

(function(b, c) {
  var a = b.mobiscroll;
  a.datetime = {
    defaults: {
      shortYearCutoff: "+10",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
      amText: "am",
      pmText: "pm",
      getYear: function(e) {
        return e.getFullYear()
      },
      getMonth: function(e) {
        return e.getMonth()
      },
      getDay: function(e) {
        return e.getDate()
      },
      getDate: function(n, e, l, k, g, j, f) {
        return new Date(n, e, l, k || 0, g || 0, j || 0, f || 0)
      },
      getMaxDayOfMonth: function(e, d) {
        return 32 - new Date(e, d, 32).getDate()
      },
      getWeekNumber: function(f) {
        f = new Date(f);
        f.setHours(0, 0, 0);
        f.setDate(f.getDate() + 4 - (f.getDay() || 7));
        var e = new Date(f.getFullYear(), 0, 1);
        return Math.ceil((((f - e) / 86400000) + 1) / 7)
      }
    },
    formatDate: function(p, e, f) {
      if (!e) {
        return null
      }
      var q = b.extend({},
          a.datetime.defaults, f),
        n = function(h) {
          var i = 0;
          while (k + 1 < p.length && p.charAt(k + 1) == h) {
            i++;
            k++
          }
          return i
        },
        j = function(i, r, h) {
          var s = "" + r;
          if (n(i)) {
            while (s.length < h) {
              s = "0" + s
            }
          }
          return s
        },
        g = function(h, t, r, i) {
          return (n(h) ? i[t] : r[t])
        },
        k,
        m,
        d = "",
        o = false;
      for (k = 0; k < p.length; k++) {
        if (o) {
          if (p.charAt(k) == "'" && !n("'")) {
            o = false
          } else {
            d += p.charAt(k)
          }
        } else {
          switch (p.charAt(k)) {
            case "d":
              d += j("d", q.getDay(e), 2);
              break;
            case "D":
              d += g("D", e.getDay(), q.dayNamesShort, q.dayNames);
              break;
            case "o":
              d += j("o", (e.getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 86400000, 3);
              break;
            case "m":
              d += j("m", q.getMonth(e) + 1, 2);
              break;
            case "M":
              d += g("M", q.getMonth(e), q.monthNamesShort, q.monthNames);
              break;
            case "y":
              m = q.getYear(e);
              d += (n("y") ? m : (m % 100 < 10 ? "0" : "") + m % 100);
              break;
            case "h":
              var l = e.getHours();
              d += j("h", (l > 12 ? (l - 12) : (l === 0 ? 12 : l)), 2);
              break;
            case "H":
              d += j("H", e.getHours(), 2);
              break;
            case "i":
              d += j("i", e.getMinutes(), 2);
              break;
            case "s":
              d += j("s", e.getSeconds(), 2);
              break;
            case "a":
              d += e.getHours() > 11 ? q.pmText : q.amText;
              break;
            case "A":
              d += e.getHours() > 11 ? q.pmText.toUpperCase() : q.amText.toUpperCase();
              break;
            case "'":
              if (n("'")) {
                d += "'"
              } else {
                o = true
              }
              break;
            default:
              d += p.charAt(k)
          }
        }
      }
      return d
    },
    parseDate: function(v, n, x) {
      var k = b.extend({},
          a.datetime.defaults, x),
        j = k.defaultValue || new Date();
      if (!v || !n) {
        return j
      }
      if (n.getTime) {
        return n
      }
      n = (typeof n == "object" ? n.toString() : n + "");
      var d = k.shortYearCutoff,
        f = k.getYear(j),
        z = k.getMonth(j) + 1,
        t = k.getDay(j),
        i = -1,
        w = j.getHours(),
        o = j.getMinutes(),
        g = 0,
        l = -1,
        r = false,
        m = function(s) {
          var B = (e + 1 < v.length && v.charAt(e + 1) == s);
          if (B) {
            e++
          }
          return B
        },
        A = function(B) {
          m(B);
          var C = (B == "@" ? 14 : (B == "!" ? 20 : (B == "y" ? 4 : (B == "o" ? 3 : 2)))),
            D = new RegExp("^\\d{1," + C + "}"),
            s = n.substr(u).match(D);
          if (!s) {
            return 0
          }
          u += s[0].length;
          return parseInt(s[0], 10)
        },
        h = function(C, E, B) {
          var F = (m(C) ? B : E),
            D;
          for (D = 0; D < F.length; D++) {
            if (n.substr(u, F[D].length).toLowerCase() == F[D].toLowerCase()) {
              u += F[D].length;
              return D + 1
            }
          }
          return 0
        },
        q = function() {
          u++
        },
        u = 0,
        e;
      for (e = 0; e < v.length; e++) {
        if (r) {
          if (v.charAt(e) == "'" && !m("'")) {
            r = false
          } else {
            q()
          }
        } else {
          switch (v.charAt(e)) {
            case "d":
              t = A("d");
              break;
            case "D":
              h("D", k.dayNamesShort, k.dayNames);
              break;
            case "o":
              i = A("o");
              break;
            case "m":
              z = A("m");
              break;
            case "M":
              z = h("M", k.monthNamesShort, k.monthNames);
              break;
            case "y":
              f = A("y");
              break;
            case "H":
              w = A("H");
              break;
            case "h":
              w = A("h");
              break;
            case "i":
              o = A("i");
              break;
            case "s":
              g = A("s");
              break;
            case "a":
              l = h("a", [k.amText, k.pmText], [k.amText, k.pmText]) - 1;
              break;
            case "A":
              l = h("A", [k.amText, k.pmText], [k.amText, k.pmText]) - 1;
              break;
            case "'":
              if (m("'")) {
                q()
              } else {
                r = true
              }
              break;
            default:
              q()
          }
        }
      }
      if (f < 100) {
        f += new Date().getFullYear() - new Date().getFullYear() % 100 + (f <= (typeof d != "string" ? d : new Date().getFullYear() % 100 + parseInt(d, 10)) ? 0 : -100)
      }
      if (i > -1) {
        z = 1;
        t = i;
        do {
          var p = 32 - new Date(f, z - 1, 32).getDate();
          if (t <= p) {
            break
          }
          z++;
          t -= p
        } while (true)
      }
      w = (l == -1) ? w : ((l && w < 12) ? (w + 12) : (!l && w == 12 ? 0 : w));
      var y = k.getDate(f, z - 1, t, w, o, g);
      if (k.getYear(y) != f || k.getMonth(y) + 1 != z || k.getDay(y) != t) {
        return j
      }
      return y
    }
  };
  a.formatDate = a.datetime.formatDate;
  a.parseDate = a.datetime.parseDate
})(JQUERY);
(function(d, f) {
  var b = d.mobiscroll,
    g = b.datetime,
    a = new Date(),
    e = {
      startYear: a.getFullYear() - 100,
      endYear: a.getFullYear() + 1,
      separator: " ",
      dateFormat: "mm/dd/yy",
      dateOrder: "mmddy",
      timeWheels: "hhiiA",
      timeFormat: "hh:ii A",
      dayText: "Day",
      monthText: "Month",
      yearText: "Year",
      hourText: "Hours",
      minuteText: "Minutes",
      ampmText: "&nbsp;",
      secText: "Seconds",
      nowText: "Now"
    },
    c = function(h) {
      var U = d(this),
        av = {},
        u;
      if (U.is("input")) {
        switch (U.attr("type")) {
          case "date":
            u = "yy-mm-dd";
            break;
          case "datetime":
            u = "yy-mm-ddTHH:ii:ssZ";
            break;
          case "datetime-local":
            u = "yy-mm-ddTHH:ii:ss";
            break;
          case "month":
            u = "yy-mm";
            av.dateOrder = "mmyy";
            break;
          case "time":
            u = "HH:ii:ss";
            break
        }
        var aE = U.attr("min"),
          w = U.attr("max");
        if (aE) {
          av.minDate = g.parseDate(u, aE)
        }
        if (w) {
          av.maxDate = g.parseDate(u, w)
        }
      }
      var X, W, P, B, q, v, Y, ae, j, ak, am = d.extend({},
          h.settings),
        Q = d.extend(h.settings, b.datetime.defaults, e, av, am),
        r = 0,
        aA = [],
        E = [],
        ab = [],
        T = {},
        D = {},
        Z = {
          y: M,
          m: an,
          d: ad,
          h: L,
          i: aq,
          s: H,
          u: m,
          a: A
        },
        at = Q.invalid,
        G = Q.valid,
        S = Q.preset,
        l = Q.dateOrder,
        ac = Q.timeWheels,
        aD = l.match(/D/),
        I = ac.match(/a/i),
        ap = ac.match(/h/),
        ai = S == "datetime" ? Q.dateFormat + Q.separator + Q.timeFormat : S == "time" ? Q.timeFormat : Q.dateFormat,
        J = new Date(),
        R = Q.steps || {},
        aj = R.hour || Q.stepHour || 1,
        ag = R.minute || Q.stepMinute || 1,
        af = R.second || Q.stepSecond || 1,
        ay = R.zeroBased,
        t = Q.minDate || new Date(Q.startYear, 0, 1),
        au = Q.maxDate || new Date(Q.endYear, 11, 31, 23, 59, 59),
        F = ay ? 0 : t.getHours() % aj,
        C = ay ? 0 : t.getMinutes() % ag,
        y = ay ? 0 : t.getSeconds() % af,
        aC = z(aj, F, (ap ? 11 : 23)),
        az = z(ag, C, 59),
        ax = z(ag, C, 59);
      u = u || ai;
      if (S.match(/date/i)) {
        d.each(["y", "m", "d"],
          function(k, i) {
            X = l.search(new RegExp(i, "i"));
            if (X > -1) {
              ab.push({
                o: X,
                v: i
              })
            }
          });
        ab.sort(function(k, i) {
          return k.o > i.o ? 1 : -1
        });
        d.each(ab,
          function(o, k) {
            T[k.v] = o
          });
        q = [];
        for (W = 0; W < 3; W++) {
          if (W == T.y) {
            r++;
            B = [];
            P = [];
            v = Q.getYear(t);
            Y = Q.getYear(au);
            for (X = v; X <= Y; X++) {
              P.push(X);
              B.push((l.match(/yy/i) ? X : (X + "").substr(2, 2)) + (Q.yearSuffix || ""))
            }
            x(q, P, B, Q.yearText, false)
          } else {
            if (W == T.m) {
              r++;
              B = [];
              P = [];
              for (X = 0; X < 12; X++) {
                var aF = l.replace(/[dy]/gi, "").replace(/mm/, (X < 9 ? "0" + (X + 1) : X + 1) + (Q.monthSuffix || "")).replace(/m/, X + 1 + (Q.monthSuffix || ""));
                P.push(X);
                B.push(aF.match(/MM/) ? aF.replace(/MM/, '<span class="dw-mon">' + Q.monthNames[X] + "</span>") : aF.replace(/M/, '<span class="dw-mon">' + Q.monthNamesShort[X] + "</span>"))
              }
              x(q, P, B, Q.monthText, false)
            } else {
              if (W == T.d) {
                r++;
                B = [];
                P = [];
                for (X = 1; X < 32; X++) {
                  P.push(X);
                  B.push((l.match(/dd/i) && X < 10 ? "0" + X : X) + (Q.daySuffix || ""))
                }
                x(q, P, B, Q.dayText, Q.monthSelect)
              }
            }
          }
        }
        E.push(q)
      }
      if (S.match(/time/i)) {
        ae = true;
        ab = [];
        d.each(["h", "i", "s", "a"],
          function(o, k) {
            o = ac.search(new RegExp(k, "i"));
            if (o > -1) {
              ab.push({
                o: o,
                v: k
              })
            }
          });
        ab.sort(function(k, i) {
          return k.o > i.o ? 1 : -1
        });
        d.each(ab,
          function(o, k) {
            T[k.v] = r + o
          });
        q = [];
        for (W = r; W < r + 4; W++) {
          if (W == T.h) {
            r++;
            B = [];
            P = [];
            for (X = F; X < (ap ? 12 : 24); X += aj) {
              P.push(X);
              B.push(ap && X === 0 ? 12 : ac.match(/hh/i) && X < 10 ? "0" + X : X)
            }
            x(q, P, B, Q.hourText)
          } else {
            if (W == T.i) {
              r++;
              B = [];
              P = [];
              for (X = C; X < 60; X += ag) {
                P.push(X);
                B.push(ac.match(/ii/) && X < 10 ? "0" + X : X)
              }
              x(q, P, B, Q.minuteText)
            } else {
              if (W == T.s) {
                r++;
                B = [];
                P = [];
                for (X = y; X < 60; X += af) {
                  P.push(X);
                  B.push(ac.match(/ss/) && X < 10 ? "0" + X : X)
                }
                x(q, P, B, Q.secText)
              } else {
                if (W == T.a) {
                  r++;
                  var K = ac.match(/A/);
                  x(q, [0, 1], K ? [Q.amText.toUpperCase(), Q.pmText.toUpperCase()] : [Q.amText, Q.pmText], Q.ampmText)
                }
              }
            }
          }
        }
        E.push(q)
      }

      function ao(p, k, o) {
        if (T[k] !== f) {
          return +p[T[k]]
        }
        if (D[k] !== f) {
          return D[k]
        }
        if (o !== f) {
          return o
        }
        return Z[k](J)
      }

      function x(s, p, o, aH, i) {
        s.push({
          values: o,
          keys: p,
          label: aH,
          hide: i
        })
      }

      function O(k, o, p, i) {
        return Math.min(i, Math.floor(k / o) * o + p)
      }

      function M(i) {
        return Q.getYear(i)
      }

      function an(i) {
        return Q.getMonth(i)
      }

      function ad(i) {
        return Q.getDay(i)
      }

      function L(k) {
        var i = k.getHours();
        i = ap && i >= 12 ? i - 12 : i;
        return O(i, aj, F, aC)
      }

      function aq(i) {
        return O(i.getMinutes(), ag, C, az)
      }

      function H(i) {
        return O(i.getSeconds(), af, y, ax)
      }

      function m(i) {
        return i.getMilliseconds()
      }

      function A(i) {
        return I && i.getHours() > 11 ? 1 : 0
      }

      function aB(s) {
        if (s === null) {
          return s
        }
        var o = ao(s, "y"),
          p = ao(s, "m"),
          k = Math.min(ao(s, "d", 1), Q.getMaxDayOfMonth(o, p)),
          i = ao(s, "h", 0);
        return Q.getDate(o, p, k, ao(s, "a", 0) ? i + 12 : i, ao(s, "i", 0), ao(s, "s", 0), ao(s, "u", 0))
      }

      function z(o, k, i) {
        return Math.floor((i - k) / o) * o + k
      }

      function al(aI, o) {
        var p, s, k = false,
          aH = false,
          i = 0,
          aJ = 0;
        t = aB(aG(t));
        au = aB(aG(au));
        if (ah(aI)) {
          return aI
        }
        if (aI < t) {
          aI = t
        }
        if (aI > au) {
          aI = au
        }
        p = aI;
        s = aI;
        if (o !== 2) {
          k = ah(p);
          while (!k && p < au) {
            p = new Date(p.getTime() + 1000 * 60 * 60 * 24);
            k = ah(p);
            i++
          }
        }
        if (o !== 1) {
          aH = ah(s);
          while (!aH && s > t) {
            s = new Date(s.getTime() - 1000 * 60 * 60 * 24);
            aH = ah(s);
            aJ++
          }
        }
        if (o === 1 && k) {
          return p
        }
        if (o === 2 && aH) {
          return s
        }
        return aJ <= i && aH ? s : p
      }

      function ah(i) {
        if (i < t) {
          return false
        }
        if (i > au) {
          return false
        }
        if (V(i, G)) {
          return true
        }
        if (V(i, at)) {
          return false
        }
        return true
      }

      function V(s, p) {
        var o, k, i;
        if (p) {
          for (k = 0; k < p.length; k++) {
            o = p[k];
            i = o + "";
            if (!o.start) {
              if (o.getTime) {
                if (s.getFullYear() == o.getFullYear() && s.getMonth() == o.getMonth() && s.getDate() == o.getDate()) {
                  return true
                }
              } else {
                if (!i.match(/w/i)) {
                  i = i.split("/");
                  if (i[1]) {
                    if ((i[0] - 1) == s.getMonth() && i[1] == s.getDate()) {
                      return true
                    }
                  } else {
                    if (i[0] == s.getDate()) {
                      return true
                    }
                  }
                } else {
                  i = +i.replace("w", "");
                  if (i == s.getDay()) {
                    return true
                  }
                }
              }
            }
          }
        }
        return false
      }

      function aa(s, aJ, k, aH, o, aK, i) {
        var p, aI, aL;
        if (s) {
          for (p = 0; p < s.length; p++) {
            aI = s[p];
            aL = aI + "";
            if (!aI.start) {
              if (aI.getTime) {
                if (Q.getYear(aI) == aJ && Q.getMonth(aI) == k) {
                  aK[Q.getDay(aI) - 1] = i
                }
              } else {
                if (!aL.match(/w/i)) {
                  aL = aL.split("/");
                  if (aL[1]) {
                    if (aL[0] - 1 == k) {
                      aK[aL[1] - 1] = i
                    }
                  } else {
                    aK[aL[0] - 1] = i
                  }
                } else {
                  aL = +aL.replace("w", "");
                  for (W = aL - aH; W < o; W += 7) {
                    if (W >= 0) {
                      aK[W] = i
                    }
                  }
                }
              }
            }
          }
        }
      }

      function aw(k, aX, aK, a3, aI, aR, a4, a7, aO) {
        var a5, aT, aQ, a2, a1, aN, aL, s, o, aU, aS, aP, aM, a6, p, a0, aZ, aW, aH = {},
          aY = {
            h: aj,
            i: ag,
            s: af,
            a: 1
          },
          aV = Q.getDate(aI, aR, a4),
          aJ = ["a", "h", "i", "s"];
        if (k) {
          d.each(k,
            function(a8, a9) {
              if (a9.start) {
                a9.apply = false;
                a5 = a9.d;
                aT = a5 + "";
                aQ = aT.split("/");
                if (a5 && ((a5.getTime && aI == Q.getYear(a5) && aR == Q.getMonth(a5) && a4 == Q.getDay(a5)) || (!aT.match(/w/i) && ((aQ[1] && a4 == aQ[1] && aR == aQ[0] - 1) || (!aQ[1] && a4 == aQ[0]))) || (aT.match(/w/i) && aV.getDay() == +aT.replace("w", "")))) {
                  a9.apply = true;
                  aH[aV] = true
                }
              }
            });
          d.each(k,
            function(i, a8) {
              aM = 0;
              a6 = 0;
              aS = 0;
              aP = f;
              aN = true;
              aL = true;
              p = false;
              if (a8.start && (a8.apply || (!a8.d && !aH[aV]))) {
                a2 = a8.start.split(":");
                a1 = a8.end.split(":");
                for (aU = 0; aU < 3; aU++) {
                  if (a2[aU] === f) {
                    a2[aU] = 0
                  }
                  if (a1[aU] === f) {
                    a1[aU] = 59
                  }
                  a2[aU] = +a2[aU];
                  a1[aU] = +a1[aU]
                }
                a2.unshift(a2[0] > 11 ? 1 : 0);
                a1.unshift(a1[0] > 11 ? 1 : 0);
                if (ap) {
                  if (a2[1] >= 12) {
                    a2[1] = a2[1] - 12
                  }
                  if (a1[1] >= 12) {
                    a1[1] = a1[1] - 12
                  }
                }
                for (aU = 0; aU < aX; aU++) {
                  if (aA[aU] !== f) {
                    s = O(a2[aU], aY[aJ[aU]], j[aJ[aU]], ak[aJ[aU]]);
                    o = O(a1[aU], aY[aJ[aU]], j[aJ[aU]], ak[aJ[aU]]);
                    a0 = 0;
                    aZ = 0;
                    aW = 0;
                    if (ap && aU == 1) {
                      a0 = a2[0] ? 12 : 0;
                      aZ = a1[0] ? 12 : 0;
                      aW = aA[0] ? 12 : 0
                    }
                    if (!aN) {
                      s = 0
                    }
                    if (!aL) {
                      o = ak[aJ[aU]]
                    }
                    if ((aN || aL) && (s + a0 < aA[aU] + aW && aA[aU] + aW < o + aZ)) {
                      p = true
                    }
                    if (aA[aU] != s) {
                      aN = false
                    }
                    if (aA[aU] != o) {
                      aL = false
                    }
                  }
                }
                if (!aO) {
                  for (aU = aX + 1; aU < 4; aU++) {
                    if (a2[aU] > 0) {
                      aM = aY[aK]
                    }
                    if (a1[aU] < ak[aJ[aU]]) {
                      a6 = aY[aK]
                    }
                  }
                }
                if (!p) {
                  s = O(a2[aX], aY[aK], j[aK], ak[aK]) + aM;
                  o = O(a1[aX], aY[aK], j[aK], ak[aK]) - a6;
                  if (aN) {
                    aS = ar(a7, s, ak[aK], 0)
                  }
                  if (aL) {
                    aP = ar(a7, o, ak[aK], 1)
                  }
                }
                if (aN || aL || p) {
                  if (aO) {
                    d(".dw-li", a7).slice(aS, aP).addClass("dw-v")
                  } else {
                    d(".dw-li", a7).slice(aS, aP).removeClass("dw-v")
                  }
                }
              }
            })
        }
      }

      function n(k, i) {
        return d(".dw-li", k).index(d('.dw-li[data-val="' + i + '"]', k))
      }

      function ar(o, k, i, p) {
        if (k < 0) {
          return 0
        }
        if (k > i) {
          return d(".dw-li", o).length
        }
        return n(o, k) + p
      }

      function aG(k, o) {
        var i = [];
        if (k === null || k === f) {
          return k
        }
        d.each(["y", "m", "d", "a", "h", "i", "s", "u"],
          function(p, s) {
            if (T[s] !== f) {
              i[T[s]] = Z[s](k)
            }
            if (o) {
              D[s] = Z[s](k)
            }
          });
        return i
      }

      function N(k) {
        var s, o, aH, p = [];
        if (k) {
          for (s = 0; s < k.length; s++) {
            o = k[s];
            if (o.start && o.start.getTime) {
              aH = new Date(o.start);
              while (aH <= o.end) {
                p.push(new Date(aH.getFullYear(), aH.getMonth(), aH.getDate()));
                aH.setDate(aH.getDate() + 1)
              }
            } else {
              p.push(o)
            }
          }
          return p
        }
        return k
      }
      h.getVal = function(i) {
        return h._hasValue || i ? aB(h.getArrayVal(i)) : null
      };
      h.setDate = function(p, o, k, i, s) {
        h.setArrayVal(aG(p), o, s, i, k)
      };
      h.getDate = h.getVal;
      h.format = ai;
      h.order = T;
      h.handlers.now = function() {
        h.setDate(new Date(), false, 0.3, true, true)
      };
      h.buttons.now = {
        text: Q.nowText,
        handler: "now"
      };
      at = N(at);
      G = N(G);
      j = {
        y: t.getFullYear(),
        m: 0,
        d: 1,
        h: F,
        i: C,
        s: y,
        a: 0
      };
      ak = {
        y: au.getFullYear(),
        m: 11,
        d: 31,
        h: aC,
        i: az,
        s: ax,
        a: 1
      };
      return {
        wheels: E,
        headerText: Q.headerText ?
          function() {
            return g.formatDate(ai, aB(h.getArrayVal(true)), Q)
          } : false,
        formatValue: function(i) {
          return g.formatDate(u, aB(i), Q)
        },
        parseValue: function(i) {
          if (!i) {
            D = {}
          }
          return aG(i ? g.parseDate(u, i, Q) : (Q.defaultValue || new Date()), !!i && !!i.getTime)
        },
        validate: function(k, aI, p, s) {
          var o = al(aB(h.getArrayVal(true)), s),
            aM = aG(o),
            aK = ao(aM, "y"),
            aH = ao(aM, "m"),
            aL = true,
            aJ = true;
          d.each(["y", "m", "d", "a", "h", "i", "s"],
            function(aV, aS) {
              if (T[aS] !== f) {
                var aR = j[aS],
                  aU = ak[aS],
                  aQ = 31,
                  aN = ao(aM, aS),
                  aX = d(".dw-ul", k).eq(T[aS]);
                if (aS == "d") {
                  aQ = Q.getMaxDayOfMonth(aK, aH);
                  aU = aQ;
                  if (aD) {
                    d(".dw-li", aX).each(function() {
                      var aY = d(this),
                        a0 = aY.data("val"),
                        i = Q.getDate(aK, aH, a0).getDay(),
                        aZ = l.replace(/[my]/gi, "").replace(/dd/, (a0 < 10 ? "0" + a0 : a0) + (Q.daySuffix || "")).replace(/d/, a0 + (Q.daySuffix || ""));
                      d(".dw-i", aY).html(aZ.match(/DD/) ? aZ.replace(/DD/, '<span class="dw-day">' + Q.dayNames[i] + "</span>") : aZ.replace(/D/, '<span class="dw-day">' + Q.dayNamesShort[i] + "</span>"))
                    })
                  }
                }
                if (aL && t) {
                  aR = Z[aS](t)
                }
                if (aJ && au) {
                  aU = Z[aS](au)
                }
                if (aS != "y") {
                  var aP = n(aX, aR),
                    aO = n(aX, aU);
                  d(".dw-li", aX).removeClass("dw-v").slice(aP, aO + 1).addClass("dw-v");
                  if (aS == "d") {
                    d(".dw-li", aX).removeClass("dw-h").slice(aQ).addClass("dw-h")
                  }
                }
                if (aN < aR) {
                  aN = aR
                }
                if (aN > aU) {
                  aN = aU
                }
                if (aL) {
                  aL = aN == aR
                }
                if (aJ) {
                  aJ = aN == aU
                }
                if (aS == "d") {
                  var aT = Q.getDate(aK, aH, 1).getDay(),
                    aW = {};
                  aa(at, aK, aH, aT, aQ, aW, 1);
                  aa(G, aK, aH, aT, aQ, aW, 0);
                  d.each(aW,
                    function(aZ, aY) {
                      if (aY) {
                        d(".dw-li", aX).eq(aZ).removeClass("dw-v")
                      }
                    })
                }
              }
            });
          if (ae) {
            d.each(["a", "h", "i", "s"],
              function(aP, aN) {
                var aR = ao(aM, aN),
                  aQ = ao(aM, "d"),
                  aO = d(".dw-ul", k).eq(T[aN]);
                if (T[aN] !== f) {
                  aw(at, aP, aN, aM, aK, aH, aQ, aO, 0);
                  aw(G, aP, aN, aM, aK, aH, aQ, aO, 1);
                  aA[aP] = +h.getValidCell(aR, aO, s).val
                }
              })
          }
          h._tempWheelArray = aM
        }
      }
    };
  d.each(["date", "time", "datetime"],
    function(j, h) {
      b.presets.scroller[h] = c
    })
})(JQUERY);
(function(a) {
  a.each(["date", "time", "datetime"],
    function(c, b) {
      a.mobiscroll.presetShort(b)
    })
})(JQUERY);
(function(a) {
  a.mobiscroll.i18n.zh = a.extend(a.mobiscroll.i18n.zh, {
    setText: "确定",
    cancelText: "取消",
    clearText: "清除",
    selectedText: "选择",
    dateFormat: "yy-mm-dd",
    dateOrder: "yymmdd",
    dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    dayText: "日",
    hourText: "时",
    minuteText: "分",
    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    monthText: "月",
    secText: "秒",
    timeFormat: "HH:ii:ss",
    timeWheels: "HHiiss",
    yearText: "年",
    nowText: "当前",
    pmText: "下午",
    amText: "上午",
    dateText: "日",
    timeText: "时间",
    calendarText: "日历",
    closeText: "关闭",
    fromText: "开始时间",
    toText: "结束时间",
    wholeText: "合计",
    fractionText: "分数",
    unitText: "单位",
    labels: ["年", "月", "日", "小时", "分钟", "秒", ""],
    labelsShort: ["年", "月", "日", "点", "分", "秒", ""],
    startText: "开始",
    stopText: "停止",
    resetText: "重置",
    lapText: "圈",
    hideText: "隐藏",
    backText: "背部",
    undoText: "复原"
  });

})(JQUERY);

/*
 ** select
 */

(function($, undefined) {
  var ms = $.mobiscroll,
    util = ms.util,
    isString = util.isString,
    defaults = {
      batch: 40,
      inputClass: '',
      invalid: [],
      rtl: false,
      showInput: true,
      groupLabel: 'Groups',
      checkIcon: 'checkmark',
      dataText: 'text',
      dataValue: 'value',
      dataGroup: 'group',
      dataDisabled: 'disabled'
    };

  ms.presetShort('select');

  ms.presets.scroller.select = function(inst) {
    var change,
      defaultValue,
      group,
      groupArray,
      groupChanged,
      groupTap,
      groupWheelIdx,
      i,
      input,
      optionArray,
      optionWheelIdx,
      option,
      origValues,
      prevGroup,
      timer,
      batchChanged = {},
      batchStart = {},
      batchEnd = {},
      tempBatchStart = {},
      tempBatchEnd = {},
      orig = $.extend({}, inst.settings),
      s = $.extend(inst.settings, defaults, orig),
      batch = s.batch,
      layout = s.layout || (/top|bottom/.test(s.display) ? 'liquid' : ''),
      isLiquid = layout == 'liquid',
      elm = $(this),
      multiple = s.multiple || elm.prop('multiple'),
      maxSelect = util.isNumeric(s.multiple) ? s.multiple : Infinity,
      id = this.id + '_dummy',
      lbl = $('label[for="' + this.id + '"]').attr('for', id),
      label = s.label !== undefined ? s.label : (lbl.length ? lbl.text() : elm.attr('name')),
      selectedClass = 'dw-msel mbsc-ic mbsc-ic-' + s.checkIcon,
      origReadOnly = s.readonly,
      data = s.data,
      hasData = !!data,
      hasGroups = hasData ? !!s.group : $('optgroup', elm).length,
      groupSetup = s.group,
      groupWheel = hasGroups && groupSetup && groupSetup.groupWheel !== false,
      groupSep = hasGroups && groupSetup && groupWheel && groupSetup.clustered === true,
      groupHdr = hasGroups && (!groupSetup || (groupSetup.header !== false && !groupSep)),
      values = elm.val() || [],
      invalid = [],
      selectedValues = {},
      options = {},
      groups = {};

    function prepareData() {
      var gr,
        lbl,
        opt,
        txt,
        val,
        l = 0,
        c = 0,
        groupIndexes = {};

      options = {};
      groups = {};

      optionArray = [];
      groupArray = [];

      // Reset invalids
      invalid.length = 0;

      if (hasData) {
        $.each(s.data, function(i, v) {
          txt = v[s.dataText];
          val = v[s.dataValue];
          lbl = v[s.dataGroup];
          opt = {
            value: val,
            text: txt,
            index: i
          };
          options[val] = opt;
          optionArray.push(opt);

          if (hasGroups) {
            if (groupIndexes[lbl] === undefined) {
              gr = {
                text: lbl,
                value: c,
                options: [],
                index: c
              };
              groups[c] = gr;
              groupIndexes[lbl] = c;
              groupArray.push(gr);
              c++;
            } else {
              gr = groups[groupIndexes[lbl]];
            }
            if (groupSep) {
              opt.index = gr.options.length;
            }
            opt.group = groupIndexes[lbl];
            gr.options.push(opt);
          }
          if (v[s.dataDisabled]) {
            invalid.push(val);
          }
        });
      } else {
        if (hasGroups) {
          $('optgroup', elm).each(function(i) {
            groups[i] = {
              text: this.label,
              value: i,
              options: [],
              index: i
            };
            groupArray.push(groups[i]);
            $('option', this).each(function(j) {
              opt = {
                value: this.value,
                text: this.text,
                index: groupSep ? j : l++,
                group: i
              };
              options[this.value] = opt;
              optionArray.push(opt);
              groups[i].options.push(opt);
              if (this.disabled) {
                invalid.push(this.value);
              }
            });
          });
        } else {
          $('option', elm).each(function(i) {
            opt = {
              value: this.value,
              text: this.text,
              index: i
            };
            options[this.value] = opt;
            optionArray.push(opt);
            if (this.disabled) {
              invalid.push(this.value);
            }
          });
        }
      }

      if (optionArray.length) {
        defaultValue = optionArray[0].value;
      }

      if (groupHdr) {
        optionArray = [];
        l = 0;
        $.each(groups, function(i, gr) {
          val = '__group' + i;
          opt = {
            text: gr.text,
            value: val,
            group: i,
            index: l++
          };
          options[val] = opt;
          optionArray.push(opt);
          invalid.push(opt.value);
          $.each(gr.options, function(j, opt) {
            opt.index = l++;
            optionArray.push(opt);
          });
        });
      }
    }

    function genValues(w, data, dataMap, value, index, multiple, label) {
      var i,
        wheel,
        keys = [],
        values = [],
        selectedIndex = dataMap[value] !== undefined ? dataMap[value].index : 0,
        start = Math.max(0, selectedIndex - batch),
        end = Math.min(data.length - 1, start + batch * 2);

      if (batchStart[index] !== start || batchEnd[index] !== end) {
        for (i = start; i <= end; i++) {
          values.push(data[i].text);
          keys.push(data[i].value);
        }
        batchChanged[index] = true;
        tempBatchStart[index] = start;
        tempBatchEnd[index] = end;

        wheel = {
          multiple: multiple,
          values: values,
          keys: keys,
          label: label
        };

        if (isLiquid) {
          w[0][index] = wheel;
        } else {
          w[index] = [wheel];
        }
      } else {
        batchChanged[index] = false;
      }
    }

    function genGroupWheel(w) {
      genValues(w, groupArray, groups, group, groupWheelIdx, false, s.groupLabel);
    }

    function genOptWheel(w) {
      genValues(w, groupSep ? groups[group].options : optionArray, options, option, optionWheelIdx, multiple, label);
    }

    function genWheels() {
      var w = [
        []
      ];

      if (groupWheel) {
        genGroupWheel(w);
      }

      genOptWheel(w);

      return w;
    }

    function getOption(v) {
      if (multiple) {
        if (v && isString(v)) {
          v = v.split(',');
        }
        if ($.isArray(v)) {
          v = v[0];
        }
      }

      option = v === undefined || v === null || v === '' || !options[v] ? defaultValue : v;

      if (groupWheel) {
        group = options[option] ? options[option].group : null;
        prevGroup = group;
      }
    }

    function getVal(temp, group) {
      var val = temp ? inst._tempWheelArray : (inst._hasValue ? inst._wheelArray : null);
      return val ? (s.group && group ? val : val[optionWheelIdx]) : null;
    }

    function onFill() {
      var txt,
        val,
        sel = [],
        i = 0;

      if (multiple) {
        val = [];

        for (i in selectedValues) {
          sel.push(options[i] ? options[i].text : '');
          val.push(i);
        }

        txt = sel.join(', ');
      } else {
        val = option;
        txt = options[option] ? options[option].text : '';
      }

      inst._tempValue = val;

      input.val(txt);
      elm.val(val);
    }

    function onTap(li) {
      var val = li.attr('data-val'),
        selected = li.hasClass('dw-msel');

      if (multiple && li.closest('.dwwl').hasClass('dwwms')) {
        if (li.hasClass('dw-v')) {
          if (selected) {
            li.removeClass(selectedClass).removeAttr('aria-selected');
            delete selectedValues[val];
          } else if (util.objectToArray(selectedValues).length < maxSelect) {
            li.addClass(selectedClass).attr('aria-selected', 'true');
            selectedValues[val] = val;
          }
        }
        return false;
      } else if (li.hasClass('dw-w-gr')) {
        groupTap = li.attr('data-val');
      }
    }

    if (!s.invalid.length) {
      s.invalid = invalid;
    }

    if (groupWheel) {
      groupWheelIdx = 0;
      optionWheelIdx = 1;
    } else {
      groupWheelIdx = -1;
      optionWheelIdx = 0;
    }

    if (multiple) {
      elm.prop('multiple', true);

      if (values && isString(values)) {
        values = values.split(',');
      }
      for (i = 0; i < values.length; i++) {
        selectedValues[values[i]] = values[i];
      }
    }

    prepareData();

    getOption(elm.val());

    $('#' + id).remove();

    if (elm.next().is('input.mbsc-control')) {
      input = elm.off('.mbsc-form').next().removeAttr('tabindex');
    } else {
      input = $('<input type="text" id="' + id + '" class="mbsc-control mbsc-control-ev ' + s.inputClass + '" readonly />');

      if (s.showInput) {
        input.insertBefore(elm);
      }
    }

    inst.attachShow(input.attr('placeholder', s.placeholder || ''));

    elm.addClass('dw-hsel').attr('tabindex', -1).closest('.ui-field-contain').trigger('create');

    onFill();

    // Extended methods
    // ---

    inst.setVal = function(val, fill, change, temp, time) {
      if (multiple) {
        if (val && isString(val)) {
          val = val.split(',');
        }
        selectedValues = util.arrayToObject(val);
        val = val ? val[0] : null;
      }
      inst._setVal(val, fill, change, temp, time);
    };

    inst.getVal = function(temp, group) {
      if (multiple) {
        return util.objectToArray(selectedValues);
      }
      return getVal(temp, group);
    };

    inst.refresh = function() {
      prepareData();

      batchStart = {};
      batchEnd = {};

      s.wheels = genWheels();

      batchStart[groupWheelIdx] = tempBatchStart[groupWheelIdx];
      batchEnd[groupWheelIdx] = tempBatchEnd[groupWheelIdx];
      batchStart[optionWheelIdx] = tempBatchStart[optionWheelIdx];
      batchEnd[optionWheelIdx] = tempBatchEnd[optionWheelIdx];

      // Prevent wheel generation on initial validation
      change = true;

      getOption(option);

      inst._tempWheelArray = groupWheel ? [group, option] : [option];

      if (inst._isVisible) {
        inst.changeWheel(groupWheel ? [groupWheelIdx, optionWheelIdx] : [optionWheelIdx], 0, true);
      }
    };

    // @deprecated since 2.14.0, backward compatibility code
    // ---
    inst.getValues = inst.getVal;

    inst.getValue = getVal;
    // ---

    // ---

    return {
      width: 50,
      layout: layout,
      headerText: false,
      anchor: input,
      confirmOnTap: groupWheel ? [false, true] : true,
      formatValue: function(d) {
        var i,
          opt,
          sel = [];

        if (multiple) {
          for (i in selectedValues) {
            sel.push(options[i] ? options[i].text : '');
          }
          return sel.join(', ');
        }

        opt = d[optionWheelIdx];

        return options[opt] ? options[opt].text : '';
      },
      parseValue: function(val) {
        getOption(val === undefined ? elm.val() : val);
        return groupWheel ? [group, option] : [option];
      },
      onValueTap: onTap,
      onValueFill: onFill,
      onBeforeShow: function() {
        if (multiple && s.counter) {
          s.headerText = function() {
            var length = 0;
            $.each(selectedValues, function() {
              length++;
            });
            return (length > 1 ? s.selectedPluralText || s.selectedText : s.selectedText).replace(/{count}/, length);
          };
        }

        getOption(elm.val());


        if (groupWheel) {
          inst._tempWheelArray = [group, option];
        }

        inst.refresh();
      },
      onMarkupReady: function(dw) {
        dw.addClass('dw-select');

        $('.dwwl' + groupWheelIdx, dw).on('mousedown touchstart', function() {
          clearTimeout(timer);
        });

        $('.dwwl' + optionWheelIdx, dw).on('mousedown touchstart', function() {
          if (!groupChanged) {
            clearTimeout(timer);
          }
        });

        if (groupHdr) {
          $('.dwwl' + optionWheelIdx, dw).addClass('dw-select-gr');
        }

        if (multiple) {
          dw.addClass('dwms');

          $('.dwwl', dw).on('keydown', function(e) {
            if (e.keyCode == 32) { // Space
              e.preventDefault();
              e.stopPropagation();
              onTap($('.dw-sel', this));
            }
          }).eq(optionWheelIdx).attr('aria-multiselectable', 'true');

          origValues = $.extend({}, selectedValues);
        }
      },
      validate: function(dw, i, time, dir) {
        var j,
          v,
          changes = [],
          temp = inst.getArrayVal(true),
          tempGr = temp[groupWheelIdx],
          tempOpt = temp[optionWheelIdx],
          t1 = $('.dw-ul', dw).eq(groupWheelIdx),
          t2 = $('.dw-ul', dw).eq(optionWheelIdx);

        if (batchStart[groupWheelIdx] > 1) {
          $('.dw-li', t1).slice(0, 2).removeClass('dw-v').addClass('dw-fv');
        }

        if (batchEnd[groupWheelIdx] < groupArray.length - 2) {
          $('.dw-li', t1).slice(-2).removeClass('dw-v').addClass('dw-fv');
        }

        if (batchStart[optionWheelIdx] > 1) {
          $('.dw-li', t2).slice(0, 2).removeClass('dw-v').addClass('dw-fv');
        }

        if (batchEnd[optionWheelIdx] < (groupSep ? groups[tempGr].options : optionArray).length - 2) {
          $('.dw-li', t2).slice(-2).removeClass('dw-v').addClass('dw-fv');
        }

        if (!change) {
          option = tempOpt;

          if (groupWheel) {
            group = options[option].group;

            // If group changed, load group options
            if (i === undefined || i === groupWheelIdx) {
              group = +temp[groupWheelIdx];
              groupChanged = false;
              if (group !== prevGroup) {
                option = groups[group].options[0].value;
                batchStart[optionWheelIdx] = null;
                batchEnd[optionWheelIdx] = null;
                groupChanged = true;
                s.readonly = [false, true];
              } else {
                s.readonly = origReadOnly;
              }
            }
          }

          // Adjust value to the first group option if group header was selected
          if (hasGroups && (/__group/.test(option) || groupTap)) {
            option = groups[options[groupTap || option].group].options[0].value;
            tempOpt = option;
            groupTap = false;
          }

          // Update values if changed
          // Don't set the new option yet (if group changed), because it's not on the wheel yet
          inst._tempWheelArray = groupWheel ? [tempGr, tempOpt] : [tempOpt];

          // Generate new wheel batches
          if (groupWheel) {
            genGroupWheel(s.wheels);

            if (batchChanged[groupWheelIdx]) {
              changes.push(groupWheelIdx);
            }
          }

          genOptWheel(s.wheels);

          if (batchChanged[optionWheelIdx]) {
            changes.push(optionWheelIdx);
          }

          clearTimeout(timer);
          timer = setTimeout(function() {
            if (changes.length) {
              change = true;
              groupChanged = false;
              prevGroup = group;

              // Save current batch boundaries
              batchStart[groupWheelIdx] = tempBatchStart[groupWheelIdx];
              batchEnd[groupWheelIdx] = tempBatchEnd[groupWheelIdx];
              batchStart[optionWheelIdx] = tempBatchStart[optionWheelIdx];
              batchEnd[optionWheelIdx] = tempBatchEnd[optionWheelIdx];

              // Set the updated values
              inst._tempWheelArray = groupWheel ? [tempGr, option] : [option];

              // Change the wheels
              inst.changeWheel(changes, 0, i !== undefined);
            }

            if (groupWheel) {
              if (i === optionWheelIdx) {
                inst.scroll(t1, groupWheelIdx, inst.getValidCell(group, t1, dir, false, true).v, 0.1);
              }
              inst._tempWheelArray[groupWheelIdx] = group;
            }

            // Restore readonly status
            s.readonly = origReadOnly;
          }, i === undefined ? 100 : time * 1000);

          if (changes.length) {
            return groupChanged ? false : true;
          }
        }

        // Add selected styling to selected elements in case of multiselect
        if (i === undefined && multiple) {
          v = selectedValues;
          j = 0;

          $('.dwwl' + optionWheelIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected');

          for (j in v) {
            $('.dwwl' + optionWheelIdx + ' .dw-li[data-val="' + v[j] + '"]', dw).addClass(selectedClass).attr('aria-selected', 'true');
          }
        }

        // Add styling to group headers
        if (groupHdr) {
          $('.dw-li[data-val^="__group"]', dw).addClass('dw-w-gr');
        }

        // Disable invalid options
        $.each(s.invalid, function(i, v) {
          $('.dw-li[data-val="' + v + '"]', t2).removeClass('dw-v dw-fv');
        });

        change = false;
      },
      onValidated: function() {
        option = inst._tempWheelArray[optionWheelIdx];
      },
      onClear: function(dw) {
        selectedValues = {};
        input.val('');
        $('.dwwl' + optionWheelIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected');
      },
      onCancel: function() {
        if (!inst.live && multiple) {
          selectedValues = $.extend({}, origValues);
        }
      },
      onDestroy: function() {
        if (!input.hasClass('mbsc-control')) {
          input.remove();
        }
        elm.removeClass('dw-hsel').removeAttr('tabindex');
      }
    };
  };
})(JQUERY);
/**
 * arm.pullaction
 * @authors NatLiu (natcube@gmail.com)
 * @date    2016-08-17 21:56:21
 * @version $Id$
 */
;
(function($, A) {
  /*
  静态参数
   */
  var OFFSET = 3,
    ACTIONs = {
      "1": "pullDown",
      "-1": 'pullUp'
    },
    ACCURACY = 1.8,
    STEPRADIO = 1.7,
    STATES = ['before', 'ready', 'action', 'error', 'success', 'complete', 'empty'],
    SPEED = 300,
    INTERVAL = 3e5,
    EASE = A.utils.ease.circular;
  /*
  默认参数
   */
  var _defaults = {
      className: 'ui-pullaction-wrap',
      height: "auto",
      pullDown: {
        html: {
          before: '<i class="ui-icon-more"></i> 下拉刷新...',
          ready: '<i class="ui-icon-more"></i> 释放刷新...',
          action: '<i class="ui-icon-change ui-icon-changing"></i> 正在刷新...',
          error: '<i class="ui-icon-warn"></i> 刷新失败...',
          success: '<i class="ui-icon-success"></i> 刷新成功...'
        },
        size: 40
      },
      pullUp: {
        html: {
          before: '<i class="ui-icon-more"></i> 上拉更多...',
          ready: '<i class="ui-icon-more"></i> 释放加载...',
          action: '<i class="ui-icon-change ui-icon-changing"></i> 正在加载...',
          error: '<i class="ui-icon-warn"></i> 加载失败...',
          success: '<i class="ui-icon-success"></i> 加载成功...'
        },
        size: 50
      },
      template: '',
      stepRatio: STEPRADIO,
      target: null,
      clickLoad: false,
      loadBtn: {
        html: {
          before: '<i class="ui-icon-more"></i> 点击加载...',
          action: '<i class="ui-icon-change ui-icon-changing"></i> 正在加载...',
          error: '<i class="ui-icon-warn"></i> 点击重试...',
          success: '<i class="ui-icon-more"></i> 点击加载...',
          empty: '<i class="ui-icon-info"></i> 没有了...'
        },
        target: null
      },
      fnAjaxSettings: $.noop,
      fnDataFilter: $.noop,
      ajaxUrl: '',
      ajaxDataProp: 'data',
      otherParams: {},
      toStringData: false,
      startIndex: 1,
      pageIndex: 1,
      pageRows: 10,
      accuracy: ACCURACY,
      speed: SPEED,
      ease: EASE,
      initRefresh: false,
      autoRefresh: false,
      interval: INTERVAL,
      goTop: 0,
      goTopHtml: '<i class="ui-icon-gototop"></i>',
      pullDownBefore: $.noop,
      pullUpBefore: $.noop,
      pullDownReady: $.noop,
      pullUpReady: $.noop,
      pullDownAction: $.noop,
      pullUpAction: $.noop,
      pullDownError: $.noop,
      pullUpError: $.noop,
      pullDownSuccess: $.noop,
      pullUpSuccess: $.noop,
      callback: $.noop
    },
    transitionEnd = A.support.transition && A.support.transition.end,
    preventDefault = false;

  function _prevent(event) {
    event.preventDefault();
  }

  function prevent() {
    if (!preventDefault) {
      $(document).on(A.touchEvents.touchMove, _prevent);
      preventDefault = true;
    }
  }

  function disPrevent() {
    $(document).off(A.touchEvents.touchMove, _prevent);
    preventDefault = false;
  }

  var responseData = {};

  function setData(key, value) {
    responseData[key] = value;
  }

  function getData(key) {
    return $.extend(true, {}, responseData)[key];
  }

  function copyData(data) {
    var _data;
    if ($.isPlainObject(data)) {
      _data = $.extend(true, {}, data);
    } else if ($.isArray(_data)) {
      _data = data.slice(0);
    } else {
      _data = data;
    }
    return _data;
  }

  /*
  构造函数
   */

  var PullAction = function(element, options) {
    this.$element = $(element).addClass('ui-pullaction-scroller');
    this.options = $.extend(true, {}, _defaults, options || {});
    this.id = A.utils.generateGUID('pullaction');
    this._init();
    this.getData = function() {
      return getData(this.id);
    };
  }

  /*
  _init:初始化
   */

  PullAction.prototype._init = function() {
    var that = this,
      opt = this.options;
    this.$wrapper = $('<div class="ui-pullaction" id="' + this.id + '" />').addClass(opt.className);
    this.$inner = $('<div class="ui-pullaction-inner" />');
    this.$parent = this.$element.parent();
    this.$pullDown = $('<div class="ui-pullaction-down" />');
    this.$pullUp = $('<div class="ui-pullaction-up" />');
    this.$loadBtn = $('<div class="ui-pullaction-loadbtn" />');
    this.$goTop = $('<div class="ui-pullaction-gotop" />');
    this.$element.wrap(this.$inner);
    this.$inner.wrap(this.$wrapper);
    this.$wrapper.append(this.$pullUp);
    this.$wrapper.prepend(this.$pullDown);
    this.$target = this.$element;
    if ($(opt.target, this.$element).length)
      this.$target = $(opt.target, this.$element);

    if (opt.clickLoad) {
      if ($(opt.loadBtn.target, this.$element).length)
        this.$loadBtn = $(opt.loadBtn.target, this.$element);
      this.$inner.append(this.$loadBtn.hide());
    }

    if (opt.goTop && opt.goTop > 0)
      this.$wrapper.append(this.$goTop.html(opt.goTopHtml));


    this.ajaxData = {};
    this.status = {
      pulling: false,
      translating: false,
      distance: 0,
      action: 0,
      code: -1,
      ajax: false,
      text: "init"
    };
    this._transition(0);
    this._transform(0);
    this._bindEvents();
    this._setHeight();
    if (opt.initRefresh && !opt.autoRefresh)
      this.action(1);

    this._autoRefresh();
  };

  /*
  _bindEvents:绑定事件
   */

  PullAction.prototype._bindEvents = function() {
    var that = this,
      opt = this.options;
    var goTop = opt.goTop && opt.goTop > 0 ? opt.goTop : 0;

    $(window).on('resize', function(event) {
      that._setHeight();
    });

    this.$target.on('change', function(event) {
      that._setHeight();
    });

    this.$inner.on('scroll', function(event) {
      that.status.scrollTop = $(this).scrollTop();
      that.$goTop.toggleClass("block", goTop && that.status.scrollTop > goTop);
      that._cancelPull(event);
    });

    this.$wrapper.touch("drag", function(event) {
      that._pulling(event);
    }).on(A.touchEvents.touchEnd, function(event) {
      that._pullEnd(event);
    }).on(A.touchEvents.touchCancel, function(event) {
      that._pullEnd(event);
    }).on(A.touchEvents.touchStart, function(event) {
      prevent();
      that._pullStart(event);
    });

    this.$loadBtn.on('click', function(event) {
      event.preventDefault();
      that._ajax(-1);
    });

    this.$goTop.on('click', function(event) {
      event.preventDefault();
      that.$inner.scrollTop(0);
    });

  }

  /*
  auto refresh
   */
  PullAction.prototype._autoRefresh = function() {
    var that = this,
      opt = this.options;
    var timer = (function() {
      return function() {
        if (!opt.autoRefresh)
          return;
        that.action(1);
        return setTimeout(function() {
          that.status.timer = timer();
        }, opt.interval || INTERVAL);
      }
    })();
    return this.status.timer = timer();
  };

  /*
  stop refresh
   */
  PullAction.prototype.stopAutoRefresh = function() {
    this.options.autoRefresh = false;
  };

  /*
  start refresh
   */
  PullAction.prototype.startAutoRefresh = function() {
    this.options.autoRefresh = true;
    this._autoRefresh();
  };

  /*
  _setHeight:设置高度
   */

  PullAction.prototype._setHeight = function(height, scrollTo) {
    var that = this,
      opt = this.options;
    this.height = height || opt.height;
    if (!height || height === "auto")
      this.height = this.$parent.height();
    this.scrollHeight = this.$element.height() - this.height;
    this.$wrapper.height(this.height);
    if (scrollTo !== undefined) {
      this.$inner.scrollTop(scrollTo);
    }
  }

  /*
  执行刷新和加载更多方法
   */

  PullAction.prototype.action = function(action) {
    var that = this,
      opt = this.options;
    this.status.action = action;
    this.status.autoAction = true;
    var state = this._getState(),
      distance = opt[state.name].size * state.action,
      time = (opt.speed || SPEED) * Math.abs(distance) / 25;
    this._pullCallback(state.name, 2);
    this._translate(distance, time);
  };

  /*
  pullStart
   */
  PullAction.prototype._pullStart = function(event) {
    var that = this,
      opt = this.options;
    this.status.scrollTop = this.$inner.scrollTop();
    this.status._scrollTop = this.status.scrollTop;
    this.status._distance = this.status.distance || 0;
  };

  /*
  pullable
   */

  PullAction.prototype._pullable = function(event) {
      var that = this,
        opt = this.options;
      var top = this.status.scrollTop,
        h = this.scrollHeight,
        y = event.touch.moveY,
        curY = event.touch.curY;

      if (curY < OFFSET || curY + OFFSET > $(window).height() ||
        (top > OFFSET && top + OFFSET < h)) {
        return false;
      }

      if (!this.status.action) {
        if (top < OFFSET && y > 0) {
          this.status.action = 1;
        } else if (top + OFFSET > h && y < 0) {
          this.status.action = -1;
        } else {
          return false;
        }
      }
      if (y * this.status.action < 0 || (this.status.action == -1 && opt.clickLoad)) {
        return false;
      }
      if (this.status.ajax) {
        if ((this.status.action > 0 && top > OFFSET) ||
          (this.status.action < 0 && top < h - OFFSET))
          return false;
      }

      return true;
    }
    /*
    pulling
     */
  PullAction.prototype._pulling = function(event) {
    var that = this,
      opt = this.options;
    var top = this.status.scrollTop,
      pos = this.status._distance,
      h = this.scrollHeight,
      y = event.touch.moveY;
    if (this.status.autoAction)
      return;
    if (!this._pullable(event))
      return this._cancelPull(event);

    this.status.pulling = true;
    this.$inner.css('overflow', "hidden");
    var scroll = this.status._scrollTop;
    if (this.status.action == -1) {
      scroll = this.status._scrollTop - h;
    }
    var distance = (y - scroll) / (opt.accuracy || ACCURACY) + pos;
    this._translate(distance);
  };

  /*
  _cancelPull
   */
  PullAction.prototype._cancelPull = function(event) {
    var that = this,
      opt = this.options;
    this._pullEnd(event, true);
  };

  /*
  pullEnd
   */
  PullAction.prototype._pullEnd = function(event, cancel) {
    var that = this,
      opt = this.options;
    this.$inner.css('overflow', 'auto');
    disPrevent();
    if (!this.status.distance)
      return;
    this.status.pulling = false;
    var state = this._getState();
    var distance = 0,
      time = 0;
    if (state && state.code)
      distance = opt[state.name].size * state.action;

    if (state || cancel) {
      time = opt.speed || SPEED;
    }
    this._translate(distance, time);
  };

  /*
  transition
   */
  PullAction.prototype._transition = function(time) {
    var that = this,
      opt = this.options;
    var ease = opt.ease || EASE || "linear";
    this.$pullUp[0].style[A.utils.prefixStyle('transition')] = "transform";
    this.$pullDown[0].style[A.utils.prefixStyle('transition')] = "transform";
    this.$inner[0].style[A.utils.prefixStyle('transition')] = "transform";
    this.$inner[0].style[A.utils.style.transitionTimingFunction] = ease;
    this.$pullDown[0].style[A.utils.style.transitionTimingFunction] = ease;
    this.$pullUp[0].style[A.utils.style.transitionTimingFunction] = ease;
    this.$inner[0].style[A.utils.style.transitionDuration] = time + "ms";
    this.$pullDown[0].style[A.utils.style.transitionDuration] = time + "ms";
    this.$pullUp[0].style[A.utils.style.transitionDuration] = time + "ms";
  };

  /*
  transform
   */

  PullAction.prototype._transform = function(distance) {
    var that = this,
      opt = this.options;
    this.$inner[0].style[A.utils.style.transform] = 'translateY(' + distance + 'px)';
    this.$pullDown[0].style[A.utils.style.transform] = 'translateY(' + distance + 'px)';
    this.$pullUp[0].style[A.utils.style.transform] = 'translateY(' + distance + 'px)';
  };

  /*
  _translate
   */
  PullAction.prototype._translate = function(distance, time) {
    var that = this,
      opt = this.options;
    var distance = distance || 0,
      time = time || 0;

    this.status.distance = distance;
    this.status.translating = true;
    this._transition(time);
    if (transitionEnd && time) {
      this.$inner.one(transitionEnd, function() {
        that._translateEnd();
      }).emulateTransitionEnd(time);
    } else {
      that._translateEnd();
    }
    this._transform(distance);
  };

  /*
  _pullEnd
   */
  PullAction.prototype._translateEnd = function() {
    var that = this,
      opt = this.options;
    this.status.translating = false;
    this._setState();
  };

  /*
  getState
   */
  PullAction.prototype._getState = function() {
    var that = this,
      opt = this.options;
    var distance = this.status.distance,
      delta = Math.abs(distance),
      action = this.status.action;

    if (!action)
      return;
    var name = ACTIONs[action],
      pullSet = opt[name],
      stepSize = pullSet.size * opt.stepRatio;
    var code = 0;
    if (delta > stepSize)
      code = 1;
    if ((delta === pullSet.size && !this.status.pulling) || this.status.ajax)
      code = 2;

    return {
      name: name,
      delta: delta,
      code: code,
      action: action
    };
  };

  /*
  pullCall
   */
  PullAction.prototype._pullCallback = function(actionName, stateCode) {
    var that = this,
      opt = this.options;
    var pullSet = opt[actionName],
      stateName = STATES[stateCode],
      fnName = actionName + A.utils.firstUpper(stateName),
      stateHtml = pullSet.html[stateName];
    stateHtml && this['$' + actionName].html(stateHtml);
    if (opt.clickLoad) {
      var html = opt.loadBtn.html[stateName];
      html && this.$loadBtn.html(html);
    }
    if ($.isFunction(opt[fnName]))
      opt[fnName].call(this, fnName);

    this.status.code = stateCode;
    if (stateCode === 5)
      this.status.code = -1;
  };

  /*
  _state
   */
  PullAction.prototype._setState = function() {
    var that = this,
      opt = this.options;
    var state = this._getState();
    if (!state)
      return;
    if (state.code == 2 && !this.status.ajax) {
      this._ajax(state.action);
    }
    if (this.status.code === state.code)
      return;

    this._pullCallback(state.name, state.code);
    return state;
  }

  /*
  _ajax:执行Ajax请求
   */

  PullAction.prototype._ajax = function(action) {
    var that = this,
      opt = this.options,
      action = action || 1;
    if (this.status && this.status.ajax)
      return opt.jqXHR;
    if (action == -1 && this.status.lastpage)
      return this._error(-1, this._getState());

    this.status.ajax = true;
    this.ajaxData = this.ajaxData || {};
    if (!('pageIndex' in this.ajaxData))
      this.ajaxData.pageIndex = opt.pageIndex;
    if (!('pageRows' in this.ajaxData))
      this.ajaxData.pageRows = opt.pageRows;

    if (action == 1) {
      this.status.lastpage = false;
      this.ajaxData.pageIndex = opt.startIndex;
    }
    var data = $.extend(true, {}, opt.otherParams, this.ajaxData);
    if ($.isFunction(opt.fnAjaxSettings)) {
      var _settins = opt.fnAjaxSettings(data, opt.ajaxUrl, action);
    }
    var settings = $.extend({
      url: opt.ajaxUrl,
      type: 'GET',
      dataType: 'json',
      data: data
    }, $.isPlainObject(_settins) ? _settins : {}, {
      success: function(data, textStatus, jqXHR) {
        that.status.timeStamp = Number(new Date());
        setData(that.id, $.extend(true, {}, data));
        if ($.isFunction(opt.fnDataFilter))
          data = opt.fnDataFilter(data, textStatus, jqXHR) || data;
        that._ajaxSuccess(data, textStatus, jqXHR, action);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        that._ajaxError(jqXHR, textStatus, errorThrown, action);
      },
      complete: function(jqXHR, textStatus) {
        that._ajaxComplete(jqXHR, textStatus, action);
      }
    });

    $.extend(true, settings.data, opt.otherParams);

    if (opt.toStringData && window.JSON)
      settings.data = JSON.stringify(settings.data);

    return opt.jqXHR = $.ajax(settings);
  }

  /*
  _ajaxSuccess:ajax成功处理函数
   */

  PullAction.prototype._ajaxSuccess = function(data, textStatus, jqXHR, action) {
    var that = this,
      opt = this.options;
    this.status.text = textStatus;
    this.status.ajaxCode = jqXHR.status;
    this._pullCallback(ACTIONs[action], 4);
    this._callback(data, action);
  }

  /*
  _ajaxError:ajax失败处理函数
   */

  PullAction.prototype._ajaxError = function(jqXHR, textStatus, errorThrown, action) {
    var that = this,
      opt = this.options;
    this.status.text = textStatus;
    this.status.ajaxCode = jqXHR.status;
    this._pullCallback(ACTIONs[action], 3);
  }

  /*
  _ajaxComplete:ajax完成处理函数
   */

  PullAction.prototype._ajaxComplete = function(jqXHR, textStatus, action) {
    var that = this,
      opt = this.options;
    this.status.text = textStatus;
    this.status.ajaxCode = jqXHR.status;
    this.status.ajax = false;
    this._pullCallback(ACTIONs[action], 5);
    this.status.action = 0;
    this.status.autoAction = false;
    this._cancelPull();
  }

  /*
  error
   */

  PullAction.prototype._error = function(errorCode, state) {
    var that = this,
      opt = this.options;
    this.status.action = 0;
    this._cancelPull();
    if (errorCode == -1)
      this._pullCallback(ACTIONs[-1], 6);
    if ($.isFunction(opt.fail))
      opt.fail.apply(this, arguments);
  };

  /*
  _callback:成功回调
   */
  PullAction.prototype._callback = function(data, action) {
    var that = this,
      opt = this.options;
    var count = data.length;
    if (opt.clickLoad) {
      this.$loadBtn.show();
    }
    if (opt.ajaxDataProp && typeof data === "object" && data[opt.ajaxDataProp]) {
      count = data[opt.ajaxDataProp].length;
    }
    if (count >= this.ajaxData.pageRows) {
      this.ajaxData.pageIndex++;
    } else {
      this.status.lastpage = true;
    }
    if (!count) {
      if (action === -1)
        this._error(-1, this._getState());

      if (action === 1)
        this._error(1, this._getState());
    }

    if ($.isFunction(opt.done))
      opt.done.call(this, copyData(data), action);

    count && this._render(copyData(data), action);
  };

  /*
  _render:render渲染数据
   */

  PullAction.prototype._render = function(data, action) {
    var that = this,
      opt = this.options;
    var scrollTo = action == -1 ? this.scrollHeight + this.height / 3 : 0,
      target = this.$target;

    if ($.isFunction(opt.onRender)) {
      opt.onRender.call(this, data, target, action);
    } else {
      var html = "";
      if (opt.template) {
        html = A.tpl(opt.template).render(data);
      }
      if (html) {
        target[action == "1" ? "html" : "append"](html);
        $.isFunction(opt.onRendered) && opt.onRendered.call(that, data, target, action, $(html));
      }
    }
    this._setHeight(null, scrollTo);
  };

  A.register('pullaction', PullAction, true);

})(JQUERY, window.arm)
/**
 *
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-12-09 14:36:52
 * @version 2015-12-09 14:36:52
 */

;
(function($, A) {
  var j = [43856, 19416, 19168, 42352, 21717, 53856, 55632, 25940, 22191, 39632, 21970, 19168, 42422, 42192, 53840, 53845, 46415, 54944, 44450, 38320, 18807, 18815, 42160, 46261, 27216, 27968, 43860, 11119, 38256, 21234, 18800, 25958, 54432, 59984, 27285, 23263, 11104, 34531, 37615, 51415, 51551, 54432, 55462, 46431, 22176, 42420, 9695, 37584, 53938, 43344, 46423, 27808, 46416, 21333, 19887, 42416, 17779, 21183, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 38310, 38335, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 23232, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 20854, 21183, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 53430, 53855, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 45653, 27951, 44448, 19299, 37759, 18936, 18800, 25776, 26790, 59999, 27424, 42692, 43759, 37600, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 19285, 19311, 42352, 21732, 53856, 59752, 54560, 55968, 27302, 22239, 19168, 43476, 42192, 53584, 62034, 54560];
  var o = ["9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "9778397bd19801ec9210c965cc920e", "97b6b97bd19801ec95f8c965cc920f", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd197c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bcf97c3598082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd19801ec9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bd07f1487f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b97bd197c36c9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b70c9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "977837f0e37f149b0723b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0723b06bd", "7f07e7f0e37f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e37f14998083b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14898082b0723b02d5", "7f07e7f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66aa89801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e26665b66a449801e9808297c35", "665f67f0e37f1489801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722"];
  var l = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
  var h = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  var d = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  var p = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
  var k = ["初", "十", "廿", "三十"];
  var g = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  var n = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"];
  var m = {
    yearDataCache: {},
    getDate: function(u) {
      var x = Math.ceil((u - new Date(1899, 1, 10)) / 86400000);
      var w = 1899;
      var s;
      var r;
      var q;
      var t;
      var v;
      for (; w < 2100 && x > 0; w++) {
        s = this.getYearDays(w);
        x -= s
      }
      x < 0 && (x += s, w--);
      q = w;
      r = this.getLeapMonth(q) || false;
      for (w = 1; w <= 12; w++) {
        s = this.getMonthDays(q, w);
        if (r === true) {
          r = false;
          w--;
          s = this.getLeapDays(q);
          if (x < s) {
            t = true
          }
        }
        if (r === w) {
          r = true
        }
        if (x < s) {
          v = s === 30;
          break
        }
        x -= s
      }
      return {
        lunarYear: q,
        lunarMonth: w,
        lunarDay: x + 1,
        isLeap: t,
        isBigMonth: v
      }
    },
    getYearDays: function(q) {
      var r;
      var t = this.yearDataCache;
      if (t[q]) {
        return t[q]
      }
      var s = 348;
      var u = j[q - 1899];
      for (r = 32768; r > 8; r >>= 1) {
        s += r & u ? 1 : 0
      }
      s += this.getLeapDays(q);
      t[q] = s;
      return s
    },
    getLeapDays: function(q) {
      return this.getLeapMonth(q) ? (j[q - 1899 + 1] & 15 === 15 ? 30 : 29) : 0
    },
    getLeapMonth: function(r) {
      var q = j[r - 1899] & 15;
      return q == 15 ? 0 : q
    },
    getMonthDays: function(r, q) {
      return (j[r - 1899] & (65536 >> q)) ? 30 : 29
    }
  };
  var b = function(u, r) {
    var v = o[u - 1900];
    var t = [];
    var s = 0;
    var q;
    for (; s < 30; s += 5) {
      q = (+("0x" + v.substr(s, 5))).toString();
      t.push(q.substr(0, 1));
      t.push(q.substr(1, 2));
      t.push(q.substr(3, 1));
      t.push(q.substr(4, 2))
    }
    return new Date(u, parseInt(r / 2, 10), t[r])
  };
  var c = {
    calculate: function(q) {
      return h[q % 10] + d[q % 12]
    },
    getGzYear: function(r, s, q) {
      return this.calculate(s - 1900 + 36 - (q === s ? 0 : 1))
    },
    getGzMonth: function(q, r, s) {
      var t = b(r, q.getMonth() * 2);
      return this.calculate((r - 1900) * 12 + s + 12 - (q < t ? 1 : 0))
    },
    getGzDay: function(q) {
      return this.calculate(Math.ceil(q / 86400000 + 25567 + 10))
    }
  };
  var i = {
    b0101: "b,春节 ",
    b0115: "b,元宵节",
    b0202: "b,龙头节",
    b0505: "b,端午节",
    b0707: "b,七夕节",
    b0715: "b,中元节",
    b0815: "b,中秋节",
    b0909: "b,重阳节",
    b1001: "b,寒衣节",
    b1015: "b,下元节",
    b1208: "b,腊八节",
    b1223: "b,小年",
    i0202: "i,湿地日,1996",
    i0308: "i,妇女节,1975",
    i0315: "i,消费者权益日,1983",
    i0401: "i,愚人节,1564",
    i0422: "i,地球日,1990",
    i0501: "i,劳动节,1889",
    i0512: "i,护士节,1912",
    i0518: "i,博物馆日,1977",
    i0605: "i,环境日,1972",
    i0623: "i,奥林匹克日,1948",
    i1020: "i,骨质疏松日,1998",
    i1117: "i,学生日,1942",
    i1201: "i,艾滋病日,1988",
    h0101: "h,元旦",
    h0312: "h,植树节,1979",
    h0504: "h,五四青年节,1939",
    h0601: "h,儿童节,1950",
    h0701: "h,建党节,1941",
    h0801: "h,建军节,1933",
    h0903: "h,抗战胜利日,1945",
    h0930: "h,烈士纪念日,1949",
    h0910: "h,教师节,1985",
    h1001: "h,国庆节,1949",
    h1204: "h,宪法日,1982",
    h1213: "h,国家公祭日,1937",
    c1224: "c,平安夜",
    c1225: "c,圣诞节",
    c0214: "c,情人节",
    w0520: "a,母亲节,1913",
    w0630: "a,父亲节",
    w1144: "a,感恩节"
  };
  var e = function(q) {
    return q < 10 ? "0" + q : q
  };
  var a = function(r, C, term) {
    var y = r.getFullYear();
    var w = r.getMonth() + 1;
    var B = r.getDate();
    var q = r.getDay();
    var s = Math.ceil(B / 7);
    var W = "w" + e(w) + s + q;
    var t = "b" + e(C.lunarMonth) + e(C.lunarDay);
    var I = "i" + e(w) + e(B);
    var h = "h" + e(w) + e(B);
    var c = "c" + e(w) + e(B);
    var x = [];
    var D;
    if (C.lunarMonth === 12 && C.lunarDay === (C.isBigMonth ? 30 : 29)) {
      x.push("t,除夕")
    }
    if (term && term === "清明") {
      x.push("t,清明节");
    }
    x.push(i[t], i[h], i[W], i[c], i[I]);
    var u = 0;
    var out = [];
    for (; u < x.length; u++) {
      if (x[u]) {
        D = x[u].split(",");
        if (D[2] && y < Number(D[2])) {
          continue
        }
        out.push({
          type: D[0],
          desc: D[1],
          value: D[1]
        })
      }
    }
    out.sort(function(F, E) {
      if (F && E) {
        return F.type.charCodeAt(0) - E.type.charCodeAt(0)
      }
      return !F ? 1 : -1
    });
    return out;
  };
  var f = function(r) {
    var w = r.getFullYear();
    var u = r.getMonth() + 1;
    var y = r.getDate();
    var v = (u - 1) * 2;
    var s = b(w, v);
    var q;
    var t = "";
    if (y != s.getDate()) {
      q = b(w, v + 1);
      if (y == q.getDate()) {
        t = l[v + 1]
      }
    } else {
      t = l[v]
    }
    var x = m.getDate(r);
    return {
      animal: p[(x.lunarYear - 4) % 12],
      gzDate: c.getGzDay(r),
      gzMonth: c.getGzMonth(r, w, u),
      gzYear: c.getGzYear(r, w, x.lunarYear),
      lunarYear: x.lunarYear,
      lunarMonth: x.lunarMonth,
      lunarDate: x.lunarDay,
      lMonth: (x.isLeap ? "闰" : "") + n[x.lunarMonth - 1],
      lDate: x.lunarDay % 10 == 0 ? ["初十", "二十", "三十"][x.lunarDay / 10 - 1] : k[parseInt(x.lunarDay / 10, 10)] + g[parseInt(x.lunarDay % 10, 10)],
      term: t,
      festival: (function() {
        return a(r, x, t)
      })(),
      isBigMonth: x.isBigMonth,
      oDate: r,
      cnDay: "日一二三四五六七".charAt(r.getDay())
    }
  };
  A.utils.lunar = function(q) {
    var q = new Date(q);
    var y = q.getFullYear();
    return y < 1900 || y > 2100 ? false : f(q);
  }
})(JQUERY, window.arm);

/**
 *
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-16 11:05:20
 * @version 2015-11-16 11:05:20
 */

! function($, A) {
  var _default = {

    daysIndexOfWeek: [0, 1, 2, 3, 4, 5, 6],
    daysLabelOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    calendarTheme: "default",
    tpl: {
      build: '<%# if(d.toolbar){ %><div class="calendar-toolbar">' +
        '<div class="calendar-title" data-calendar-title></div>' +
        '<%# if(d.modeBtn){ %><div class="ui-btn-multi calendar-tool calendar-view-switch"><a data-calendar-view="month" class="ui-btn"><%d.string.month%></a><a data-calendar-view="week" class="ui-btn"><%d.string.week%></a><a data-calendar-view="day" class="ui-btn"><%d.string.day%></a></div><%# } %>' +
        '<%# if(d.todayBtn){ %><a data-calendar-control="today" class="calendar-tool calendar-today"><%d.string.today%></a><%#}%>' +
        '<%# if(d.navigation){ %><a data-calendar-control="prev" class="calendar-tool calendar-prev"><%d.navigation.prev%></a>' +
        '<a data-calendar-control="next" class="calendar-tool calendar-next"><%d.navigation.next%></a><%#}%>' +
        '</div><%# } %>' +
        '<%# if(d.calendar){ %><div class="calendar-wrap">' +
        '<ul class="ui-tiled calendar-week-bar ui-border-b"><%# for (var i = 0; i < d.daysIndexOfWeek.length; i++) { %>' +
        '<li class="calendar-week-label week-label-<%i%> week-<%d.daysIndexOfWeek[i]%>-label"><% d.daysLabelOfWeek[d.daysIndexOfWeek[i]] %></li>' +
        '<%# }%></ul>' +
        '<div class="calendar-days-box ui-border-r"></div>' +
        '</div><%# } %>',
      grid: '<div class="calendar-days calendar-<%d.role%>-view"><%# for (var i = 0; i < d.rows; i++) { %>' +
        '<div class="ui-row-flex ui-border-b calendar-row row-<%i%>" data-weeknumber="<%i+d.weekIndex%>">' +
        '<%# for (var j = 0; j < d.daysIndexOfWeek.length; j++) { var grid = i*d.daysIndexOfWeek.length+j; %>' +
        '<div class="ui-col ui-border-l ui-center calendar-grid grid-<%grid%> grid-week-<%d.daysIndexOfWeek[j]%><%# if(d.dates[grid].siblings){ %> grid-siblings grid-siblings-<%d.dates[grid].siblings%><%# } %><%# if(d.dates[grid].date===d.today){ %> grid-today<%# } %><%# if(d.dates[grid].date===d.curday){ %> grid-curday<%# } %><%# if(d.hidePolish&&d.dates[grid].siblings){ %> grid-hidden"<%# }else{ %>" data-date="<%d.dates[grid].date%>"<%# }%>>' +
        '<div class="grid">' +
        '<div class="day-number"><%d.dates[grid].D%></div>' +
        '</div>' +
        '</div>' +
        '<%# } %>' +
        '</div>' +
        '<%# } %></div>'
    },
    selector: {
      wrap: '.calendar-wrap',
      toolbar: '.calendar-toolbar',
      box: '.calendar-days-box',
      grid: '.calendar-grid',
      date: '[data-date]',
      today: '.calendar-today',
      days: '.calendar-days',
      gridBox: '.grid',
      dayNum: '.day-number'
    },
    classNames: {
      curday: 'grid-curday',
      mode: 'view-mode',
      lunar: 'grid-lunar',
      festival: 'grid-festival'
    },
    string: {
      today: "今",
      week: "周",
      month: "月",
      day: "日",
      index: "第",
      weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    },
    format: {
      day: "yyyy年M月d日",
      month: "yyyy年M月",
      lunar: "农历M月"
    },
    sixRows: 1,
    rows: 5,
    toolbar: true,
    viewMode: "month",
    modeBtn: 1,
    todayBtn: 1,
    navigation: {
      prev: '<i class="ui-icon-prev"></i>',
      next: '<i class="ui-icon-next"></i>'
    },
    swipe: 1,
    weekNumber: 1,
    slide: 400,
    transitionType: "ease",
    hidePolish: 0,
    lunar: 1,
    festival: 1,
    holiday: 0,
    curday: new Date()
  }

  var _config = {
    dateFormat: "yyyy/MM/dd",
    monthFormat: "yyyy/MM",
    calendarClass: 'arm-calendar',
    holidayTip: {
      "1": "休",
      "2": "班"
    },
    viewModes: ['month', 'week', 'day']
  }

  function getDate(date, single, format) {
    if (/string|object/i.test(typeof date)) {
      var _date = new Date(date);
    } else {
      var _date = new Date();
      single = typeof single === "undefined" ? date : single;
    }
    return single ? _date.format(format || _config.dateFormat) : _date;
  }

  function clipDate(_date, format) {
    var date = getDate(_date, false);
    var d = {
      Y: date.getFullYear(),
      M: date.getMonth(),
      D: date.getDate(),
      H: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      S: date.getMilliseconds(),
      t: date.getTime(),
      w: date.getDay()
    }
    d.days = (new Date(d.Y, d.M + 1, 0)).getDate();
    d[0] = date;
    d.date = date.format(format || _config.dateFormat);
    d.day = date.format(_config.dateFormat);
    d.month = date.format(_config.monthFormat);
    return d;
  }

  function getWeekNumber(_date, daysIndex) {
    var date = clipDate(_date),
      weekdays = daysIndex.length,
      day1Index = $.inArray(new Date(date.Y, 0, 1).getDay(), daysIndex),
      startTime = Number(day1Index === 0 ? new Date(date.Y, 0, 1) : new Date(date.Y, 0, weekdays - day1Index + 1)),
      endTime = Number(new Date(date.Y, date.M, date.D)),
      deltaWeek = Math.floor((endTime - startTime) / 86400 / weekdays / 1000) + 1;
    if (endTime < 0)
      return 1;
    if (day1Index === 0)
      return deltaWeek;
    return deltaWeek + 1;
  }

  function getPrev(date, by, step) {
    var _date = clipDate(date),
      year = _date.Y,
      month = _date.M,
      day = _date.D;
    var by = by || "day";
    var step = typeof step === "undefined" ? 1 : step;
    if (step === 0)
      return _date[0];
    if (by === "day") {
      day -= step;
    }
    if (by === "week")
      day = day - 7;

    if (day < 1)
      by = "month";

    if (by === "month") {
      month--;
      if (month < 0) {
        by = "year";
        month = 11;
      }
    }
    if (by === "year")
      year--;

    var days = new Date(year, month + 1, 0).getDate();
    if (day > days)
      day = days;
    if (day < 1)
      day += days;
    return new Date(year, month, day);
  }

  function getNext(date, by, step) {
    var _date = clipDate(date),
      year = _date.Y,
      month = _date.M,
      day = _date.D;
    var by = by || "month";
    var step = typeof step === "undefined" ? 1 : step;
    if (step === 0)
      return _date[0];
    if (by === "day")
      day += step;
    if (by === "week")
      day = day + 7;

    if (day > _date.days) {
      by = "month";
      day -= _date.days;
    }

    if (by === "month") {
      month++;
      if (month > 11) {
        by = "year";
        month = 0;
      }
    }
    if (by === "year")
      year++;

    var days = new Date(year, month + 1, 0).getDate();
    if (day > days)
      day = days;
    if (day < 1)
      day += days;
    return new Date(year, month, day);
  }

  $.extend(true, A.utils, {
    clipDate: clipDate,
    getDate: getDate,
    getPrevDate: getPrev,
    getNextDate: getNext
  });


  function Clndr(element, options) {
    var C = this;
    C.$element = $(element);
    C.options = $.extend(true, {}, _default, options);
    if ($.isFunction(C.options.render)) {
      C.$container = C.$element.children();
    } else {
      C.$element.html('<div class="' + _config.calendarClass + '" />');
      C.$container = $(".arm-calendar", C.$element);
    }
    C.$container.addClass(_config.calendarClass + "-" + C.options.calendarTheme);
    C.boxDistance = 0;
    C._init();
  }

  Clndr.prototype._init = function() {
    var C = this,
      O = C.options;
    // 绑定事件
    C.bindEvents();
    // 构建日历
    C.build();
    //初始化日历
    C.setCurday(O.curday);
  }

  Clndr.prototype.bindEvents = function() {
    var C = this,
      O = C.options;
    C.$element.on('clndr:build', function(event) {
      $.isFunction(O.onbuild) && O.onbuild.call(C, event);
    }).on('clndr:render', function(event) {
      $.isFunction(O.onrender) && O.onrender.call(C, event);
    }).on('clndr:change', function(event) {
      C.view();
      $.isFunction(O.onchange) && O.onchange.call(C, event);
    });

    C.$container.on("clndr:viewmode", function() {
      C.build();
      C.render();
      C.view();
    }).on("click", "[data-calendar-view]", function() {
      var mode = $(this).data("calendar-view");
      C.changeMode(mode);
    }).touch("tap", "[data-calendar-control]", function(e) {
      var action = $(this).data("calendar-control");
      C[action] && C[action]();
    }).touch("swipeLeft", O.selector.wrap, function(e) {
      e.preventDefault();
      O.swipe && e.touch.angleX && C.next();
    }).touch("swipeRight", O.selector.wrap, function(e) {
      e.preventDefault();
      O.swipe && e.touch.angleX && C.prev();
    }).touch("tap", O.selector.date, function() {
      C.setCurday($(this).data("date"));
    }).touch("drag", O.selector.wrap, function(e) {
      if (O.slide && e.touch.dragX) {
        C.translateBox(e.touch.moveX);
      }
    }).touch("dragEnd", O.selector.wrap, function(e) {
      if (C.boxDistance && !C.transitioning) {
        if (C.boxDistance > C.containerWidth / 2)
          return C.slideBox(-1);
        if (C.boxDistance < -C.containerWidth / 2)
          return C.slideBox(1);
        C.slideBox(0);
      }
    });

  }

  Clndr.prototype.build = function() {
    var C = this,
      O = C.options;

    var data = {
      toolbar: O.toolbar,
      calendar: O.viewMode !== "day",
      daysIndexOfWeek: O.daysIndexOfWeek,
      daysLabelOfWeek: O.daysLabelOfWeek,
      string: O.string,
      modeBtn: O.modeBtn,
      todayBtn: O.todayBtn,
      navigation: O.navigation
    }
    if ($.isFunction(O.build))
      return O.build.call(C, data);
    var html = A.tpl(O.tpl.build).render(data);
    C.$container.html(html);
    C.containerWidth = C.$container.width();
    C.$element.trigger('clndr:build', [C]);
  }

  Clndr.prototype.getRenderDates = function(curday, role) {
    var C = this,
      O = C.options;
    var curday = curday || C.curday;
    var date = clipDate(curday);
    var prevDate = clipDate(getPrev(curday, O.viewMode));
    var nextDate = clipDate(getNext(curday, O.viewMode));
    var weekdays = O.daysIndexOfWeek.length;
    var weekIndex = getWeekNumber(curday, O.daysIndexOfWeek);
    var renderDates = [];
    if (O.viewMode === "day") {
      renderDates.push(date);
    } else if (O.viewMode === "week") {
      var rows = 1;
      var dayIndex = $.inArray(date.w, O.daysIndexOfWeek);
      var firstDay = getPrev(curday, "day", dayIndex);
      for (var i = 0; i < weekdays; i++) {
        var d = clipDate(getNext(firstDay, "day", i));
        renderDates.push(d);
      };
    } else {

      var day1 = new Date(date.Y, date.M, 1);
      var day1Index = $.inArray(day1.getDay(), O.daysIndexOfWeek);
      var daysIndex = $.inArray(new Date(date.Y, date.M, date.days).getDay(), O.daysIndexOfWeek);
      var autoRows = Math.ceil((date.days + day1Index - weekdays) / weekdays) + 1;
      var rows = O.sixRows ? 6 : (O.rows ? O.rows : autoRows);
      var daysoff = (rows - autoRows + 1) * weekdays - 1 - daysIndex;
      var weekIndex = getWeekNumber(day1, O.daysIndexOfWeek);

      if (day1Index > 0) {
        for (var i = day1Index - 1; i >= 0; i--) {
          var d = $.extend(true, clipDate(new Date(prevDate.Y, prevDate.M, prevDate.days - i)), {
            siblings: O.viewMode
          });
          renderDates.push(d);
        };
      }
      for (var i = 0; i < date.days; i++) {
        var d = clipDate(new Date(date.Y, date.M, i + 1));
        renderDates.push(d);
      }

      if (daysoff > 0) {
        for (var i = 0; i < daysoff; i++) {
          var d = $.extend(true, clipDate(new Date(nextDate.Y, nextDate.M, i + 1)), {
            siblings: O.viewMode
          });
          renderDates.push(d);
        }
      }
    }
    var data = {
      dates: renderDates,
      string: O.string,
      daysIndexOfWeek: O.daysIndexOfWeek,
      rows: rows,
      weekIndex: weekIndex,
      weekNumber: O.weekNumber,
      today: getDate(true),
      curday: curday,
      curDate: date,
      prevDate: prevDate,
      nextDate: nextDate,
      role: role || "cur",
      hidePolish: O.hidePolish && O.viewMode === "month"
    }
    return data;
  }

  Clndr.prototype.render = function() {
    var C = this,
      O = C.options;
    var data = C.getRenderDates();
    var prevData = C.getRenderDates(data.prevDate.date, "prev");
    var nextData = C.getRenderDates(data.nextDate.date, "next");
    C.renderDates = data.dates;
    C.prevDates = prevData.dates;
    C.nextDates = nextData.dates;
    C.$render = $('<div class="arm-calendar-days">');
    C.$render.html(A.tpl(O.tpl.grid).render(data));
    $(O.selector.box, C.$container).html(C.$render);
    C.$element.trigger('clndr:render', [C]);
    if (O.slide) {
      C.$render.prepend(A.tpl(O.tpl.grid).render(prevData))
        .append(A.tpl(O.tpl.grid).render(nextData));
    }
    C.addIns();
  }

  Clndr.prototype.addIns = function() {
    var C = this,
      O = C.options;

    $('[data-date]', C.$container).each(function() {
      var date = $(this).data("date");
      if (O.lunar || O.festival) {
        var lunar = A.utils.lunar(date);
        if (lunar) {
          $(this).addClass(O.classNames.lunar);
          var text = lunar.term ? ' day-festival">' + lunar.term : '">' + lunar.lDate;
          if (O.festival && lunar.festival && lunar.festival.length) {
            $(this).addClass(O.classNames.festival);
            text = ' day-festival">' + lunar.festival[0].value;
          }
          $(O.selector.gridBox, this).append('<div class="day-lunar' + text + '</div>');
        }
      }
    });
  }

  Clndr.prototype.view = function() {
    var C = this,
      O = C.options;
    var curdate = C.curDate;
    var title = {
      day: curdate[0].format(O.format.day) + " " + O.string.weekdays[curdate.w],
      month: curdate[0].format(O.format.month) + (O.lunar && curdate.lunar ? " " + O.format.lunar.replace(/[m]+/i, curdate.lunar.lMonth) : ""),
      week: curdate[0].format(O.format.month) + " " + O.string.index + getWeekNumber(C.curday, O.daysIndexOfWeek) + O.string.week
    }
    $('.' + O.classNames.mode, C.$container).removeClass(O.classNames.mode);
    $('[data-calendar-view="' + O.viewMode + '"]', C.$container).addClass(O.classNames.mode);
    $("[data-calendar-title]", C.$container).html(title[O.viewMode]);
    $("." + O.classNames.curday, C.$container).removeClass(O.classNames.curday);
    $('[data-date="' + C.curday + '"]', C.$container).addClass(O.classNames.curday);
    $(O.selector.today, C.$container).toggle(getDate(true) !== C.curday);
  }

  Clndr.prototype.changeMode = function(mode) {
    var C = this,
      O = C.options;
    if (O.viewMode !== mode && $.inArray(mode, _config.viewModes) !== -1) {
      O.viewMode = mode;
      C.$container.trigger("clndr:viewmode");
    }
  }

  Clndr.prototype.setCurday = function(date) {
    var C = this,
      O = C.options;
    var curday = getDate(date, true);
    if (curday !== C.curday) {
      C.curday = curday;
      C.curDate = clipDate(curday);
      C.curDate.lunar = A.utils.lunar(curday);
      C.$element.trigger('clndr:change', [C]);
      if (!C.renderDates) {
        C.render();
      } else {
        var dateInRender = A.inObject(C.renderDates, function(date, index) {
          return date.date === curday;
        });
        if (dateInRender === -1 || (O.viewMode === "month" && C.renderDates[dateInRender].siblings)) {
          C.render();
        }
      }
    }
    return curday;
  }

  Clndr.prototype.translateBox = function(distance) {
    var C = this,
      O = C.options;
    C.boxDistance = distance;
    C.$render[0].style[A.utils.prefixStyle("transform")] = "translateX(" + distance + "px)";
  }

  Clndr.prototype.slideBox = function(dir) {
    var C = this,
      O = C.options;
    if (C.transitioning)
      return;
    C.transitioning = true;
    var width = $(O.selector.box, C.$container).width();
    var distance = -width * dir;
    C.$render.removeAttr('style');
    C.$render[0].style[A.utils.prefixStyle("transition")] = "transform " + O.slide + "ms " + O.transitionType;
    C.translateBox(distance);
    C.$container.one(A.support.transition.end, function() {
      C.$render.removeAttr('style');
      C.transitioning = false;
      C.boxDistance = 0;
      if (dir < 0)
        C.setCurday(getPrev(C.curday, O.viewMode));
      if (dir > 0)
        C.setCurday(getNext(C.curday, O.viewMode));
    }).emulateTransitionEnd(O.slide);
  }

  Clndr.prototype.prev = function() {
    var C = this,
      O = C.options;
    if (O.slide)
      return C.slideBox(-1);
    C.setCurday(getPrev(C.curday, O.viewMode));
  }

  Clndr.prototype.next = function() {
    var C = this,
      O = C.options;
    if (O.slide)
      return C.slideBox(1);
    C.setCurday(getNext(C.curday, O.viewMode));
  }

  Clndr.prototype.today = function() {
    var C = this,
      O = C.options;
    C.setCurday(new Date());
  }

  // 注册插件
  A.register("calendar", Clndr, true);

}(JQUERY, window.arm);
/**
 *
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-09-09 10:08:19
 * @version 2015-09-09 10:08:19
 */

;
(function($, A) {
  var config = {
    api: 'http://api.map.baidu.com/',
    v: '2.0',
    ak: A.config('BMapKey') || 'YN79qK7VCGEOBTNzFEX0v5ej',
    paths: {
      map: 'getscript',
      locationIp: 'location/ip',
      staticimage: 'staticimage',
      geoconv: 'geoconv/v1/'
    }
  }
  var _default = {
    coord: '118.783681,31.981661'
  }

  function API(api) {
    return config.api + config.paths[api];
  }

  function pointToCoord(point) {
    if ($.isPlainObject(point))
      return point.x + "," + point.y;
  }

  function coordToPoint(coord) {
    if (/^(\s+)?\d+(\.\d+)?\D+\d+(\.\d+)?(\s+)?$/.test(coord)) {
      var point = $.trim(coord).split(/\D+/);
      return {
        x: Number(point[0]),
        y: Number(point[1])
      }
    }
  }

  var BMapAPI = API('map') + "?v=" + config.v + "&ak=" + config.ak + "&t=" + (new Date).getTime();

  var Map = {
    version: config.v,
    api: "baidu",
    pointToCoord: pointToCoord,
    coordToPoint: coordToPoint
  }

  Map.geoconv = function(args, success, error) {
    if (typeof args === "string") {
      args = {
        coords: args
      };
    }
    args = $.extend(true, {
      ak: config.ak,
      from: 1,
      to: 5
    }, args);
    success = $.isFunction(success) ? success : $.noop;
    error = $.isFunction(error) ? error : $.noop;
    $.ajax({
      url: API('geoconv'),
      dataType: 'jsonp',
      data: args,
      success: function(response) {
        if (response.status) {
          error(response);
        } else {
          success(response);
        }
      },
      error: function(xhr, errorType, err) {
        error({
          status: errorType,
          error: err
        });
      }
    });
  }

  Map.getCoord = function(point, success, error) {

    if ($.isPlainObject(point)) {
      var args = {
        coords: pointToCoord(point),
        from: point.type
      }
    }
    success = $.isFunction(success) ? success : $.noop;
    error = $.isFunction(error) ? error : $.noop;
    if (args && args.type === 5) {
      return success(coordToPoint(args.coords));
    }
    Map.geoconv(args, function(data) {
      success(data.result[0]);
    }, error);
  }

  Map.getLocationByIp = function(ip, success, error) {
    if ($.isFunction(ip)) {
      error = success;
      success = ip;
      ip = "";
    }
    var options = {
      ak: config.ak,
      coor: 'bd09ll',
      ip: ip
    };
    success = $.isFunction(success) ? success : $.noop;
    error = $.isFunction(error) ? error : $.noop;
    $.ajax({
      url: API('locationIp'),
      dataType: 'jsonp',
      data: options,
      success: function(response) {
        if (response.status) {
          error(response);
        } else {
          success(response);
        }
      },
      error: function(xhr, errorType, error) {
        error({
          status: errorType,
          error: error
        });
      }
    });
  }

  Map.getPosition = function(success, error, args) {
    success = $.isFunction(success) ? success : $.noop;
    error = $.isFunction(error) ? error : $.noop;
    args = $.extend(true, {
      enableHighAccuracy: true,
      timeout: 20000
    }, args);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        position.content = {
          point: {
            x: position.coords.longitude,
            y: position.coords.latitude,
            type: 1
          }
        }
        success(position);
      }, error, args);
    } else {
      getLocationByIp(success, error);
    }
  }

  Map.staticimage = function(args, single) {
    if (args === true)
      single = true;
    args = $.extend(true, {
      zoom: 17,
      scale: 2,
      width: 400,
      height: 300,
      copyright: 1,
      center: _default.coord
    }, args);
    if (pointToCoord(args.center))
      args.center = pointToCoord(args.center);
    this.src = API('staticimage') + "?" + $.param(args);
    return single ? this.src : '<img width="' + args.width + '" height="' + args.height + '" src="' + this.src + '">';
  }

  Map.staticimage.prototype.creatTo = function(selector) {
    var $img = $('<img src="' + this.src + '">');
    $(selector).html($img);
    return $img;
  }

  Map.creatMap = function(element, args) {
    $element = $(element);
    if (!$element.length || !$element[0].nodeType)
      return A.console().warn('dom is needed to creat a map!');

    var elem = $element[0];
    $(elem).addClass('ui-map-holder');
    if (typeof args === "string")
      args = {
        center: args
      };
    var options = $.extend(true, {
      center: _default.coord,
      mapOptions: {
        enableHighResolution: true
      },
      navigationControl: true,
      geolocationControl: true,
      locationSuccess: $.noop,
      locationError: $.noop,
      onCreated: $.noop,
      mapTypeControl: false,
      zoom: 17
    }, args);
    var map = {};
    A.use([BMapAPI], function() {
      A.BMap = A.BMap || BMap;
      map.Map = new BMap.Map(elem, options.mapOptions);
      map.Map.addEventListener("tilesloaded", options.onRender);
      map.Point = options.center;
      if (pointToCoord(options.center)) {
        map.Point = new BMap.Point(options.center.x, options.center.y);
      }
      map.Zoom = options.zoom;
      map.Map.centerAndZoom(map.Point, map.Zoom);

      // 添加带有定位的导航控件
      if (options.navigationControl) {
        map.navigationControl = new BMap.NavigationControl($.extend(true, {
          // 靠右上角位置
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          // SMALL类型
          type: BMAP_NAVIGATION_CONTROL_SMALL
        }, options.navigationControl));
        map.Map.addControl(map.navigationControl);
      }
      if (options.geolocationControl) {
        map.geolocationControl = new BMap.GeolocationControl($.extend(true, {}, options.geolocationControl));
        map.geolocationControl.addEventListener("locationSuccess", function(e) {
          options.locationSuccess.call(map, e);
        });
        map.geolocationControl.addEventListener("locationError", function(e) {
          options.locationError.call(map, e);
        });
        map.Map.addControl(map.geolocationControl);
      }

      if (options.mapTypeControl) {
        map.mapTypeControl = new BMap.MapTypeControl($.extend(true, {
          // 靠左上角位置
          anchor: BMAP_ANCHOR_TOP_LEFT,
          mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP]
        }, options.mapTypeControl));
        map.Map.addControl(map.mapTypeControl);
      }

      options.onCreated.call(map);
    })
  }

  A.map = Map;
})(JQUERY, window.arm)
