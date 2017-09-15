(function() {
  console.info(Zepto);
  console.info($);

  /**
   * 测试zepto中的fragment方法
   * @param  {[type]} html       [description]
   * @param  {[type]} name       [description]
   * @param  {[type]} properties [description]
   * @return {[type]}            [description]
   */
  function fragmentTest(html, name, properties) {
    var dom, nodes, container, singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
      fragmentRE = /^\s*<(\w+|!)[^>]*>/,
      containers = {
        'tr': document.createElement('tbody'),
        'tbody': table,
        'thead': table,
        'tfoot': table,
        'td': tableRow,
        'th': tableRow,
        '*': document.createElement('div')
      },table = document.createElement('table'),tableRow = document.createElement('tr');
    var slice = [].slice;

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
        console.debug(container);
        console.debug(dom);
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

  fragmentTest('<div class="jumbotron"></div>');


})();
