/**
 *
 * @authors leomYili (you@example.org)
 * @date    2015-10-21 15:16:59
 * @version $Id$
 */
(function() {
  var source = '<% for (var i = 0; i < data.items.length; i ++) { %><ul class="ui-list ui-border-tb ulmt"><li class="ui-border-t"><div class="ui-list-info"><h3 class="ui-nowrap"><%=data.items[i].kcmc%></h3></div></li><li class="ui-border-t"><div class="ui-list-info"><p class="ui-nowrap"><span class="setms">课程编号</span><span class="setvalue"><%=data.items[i].kcdm%></span><span class="setmv">学分</span><span class="setsp"><%=data.items[i].xs%></span></p></div></li><li class="ui-border-t"><div class="ui-list-info"><p class="ui-nowrap"><span class="setms">是否学位课</span><span class="setvalue"><%=data.items[i].sfxwk%></span><span class="setmv">学时</span><span class="setsp"><%=data.items[i].xf%></span></p></div></li></ul><% } %>';
  var render = template.compile(source);
  var html = render(data);

  document.getElementById('content').innerHTML = html;
})();
