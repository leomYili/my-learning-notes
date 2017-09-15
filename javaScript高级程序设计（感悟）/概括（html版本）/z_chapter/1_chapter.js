/**
 *
 * @authors leomYili
 * @date    2015-10-21 15:16:59
 * @version 1.0.0
 */
(function() {
    var source1 = '<div class="page-header">' +
        '<h1 class="text-center"><%=name%><small>第一章<i class="glyphicon glyphicon-bookmark"></i></small></h1>' +
        '</div>' +
        '<p class="lead"><%=content%></p>' +
        '<dl>' +
        '<% for (var i = 0; i < subStr.length; i ++) { %>' +
        '<dt><h3 id="subStr<%=i%>"><%=subStr[i].name%></h3></dt>' +
        '<dd class="lead"><%=subStr[i].content%></dd>' +
        '<ol class="lead">' +
        '<% for (var j = 0; j < subStr[i].extra_content.length; j ++) { %>' +
        '<li><%=subStr[i].extra_content[j].content%></li>' +
        '<% } %>' +
        '</ol>' +
        '<blockquote>' +
        '<% for (var j = 0; j < subStr[i].subStr.length; j ++) { %>' +
        '<a class="dblock" id="subStr<%=i%>_<%=j%>" href="mailto:#"><i class="glyphicon glyphicon-grain"></i> <%=subStr[i].subStr[j].name%></a>' +
        '<% } %>' +
        '</blockquote>' +
        '<% } %>' +
        '</dl>' +
        '<h3 id="subStrSum">小结</h3>' +
        '<p class="lead"><%=sum%></p>';
    var article = new zDoc();
    article.Render(source1, first_chapter, 'content');

    var source2 = '<% for (var i = 0; i < subStr.length; i ++) { %>' +
      '<li>' +
      '<a href="#subStr<%=i%>"><%=#subStr[i].name%></a>' +
      '<% if(subStr[i].subStr.length>0) { %>'+
      '<ul class="nav z-document-content-str">' +
      '<% for (var j = 0; j < subStr[i].subStr.length; j ++) { %>' +
      '<li><a href="#subStr<%=#i%>_<%=#j%>"><%=#subStr[i].subStr[j].name%></a></li>' +
      '<% } %>' +
      '</ul>' +
      '<% } %>'+
      '</li>' +
      '<% } %>' +
      '<li><a href="#subStrSum">小结</a></li>';
    var nav = new zDoc();
    nav.Render(source2, first_chapter, 'accordion');
})();
