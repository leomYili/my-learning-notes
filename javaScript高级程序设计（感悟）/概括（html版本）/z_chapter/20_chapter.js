/**
 *
 * @authors leomYili
 * @date    2016-04-14 09:24:44
 * @version v1.0
 */
(function() {
    var source1 = '<div class="page-header">' +
        '<h1 class="text-center"><%=#name%><small><%=#small%><i class="glyphicon glyphicon-bookmark"></i></small></h1>' +
        '</div>' +
        '<p class="lead"><%=#content%></p>' +
        '<dl>' +
        '<% for (var i = 0; i < subStr.length; i ++) { %>' +
        '<dt><h3 id="subStr<%=#i%>"><%=#subStr[i].name%></h3></dt>' +
        '<% for (var j = 0; j < subStr[i].content.length; j ++) { %>' +
        '<dd class="lead"><%=#subStr[i].content[j].body%></dd>' +
        '<% if(subStr[i].content[j].conSub.length >0){%>' +
        '<ol class="lead">' +
        '<% for (var m = 0; m < subStr[i].content[j].conSub.length; m ++) { %>' +
        '<li><%=#subStr[i].content[j].conSub[m].name%></li>' +
        '<% } %>' +
        '</ol>' +
        '<% } %>' +
        '<% } %>' +
        '<% if(subStr[i].extra_content.length >0){%>' +
        '<blockquote>' +
        '<% for (var j = 0; j < subStr[i].extra_content.length; j ++) { %>' +
        '<p><%=subStr[i].extra_content[j].name%></p>' +
        '<% } %>' +
        '</blockquote>' +
        '<% } %>' +
        '<% if(subStr[i].subStr.length >0){%>' +
        '<dl>' +
        '<% for (var j = 0; j < subStr[i].subStr.length; j ++) { %>' +
        '<dt><h5 id="subStr<%=i%>_<%=j%>"><%=#subStr[i].subStr[j].name%></h5></dt>' +
        '<% for (var m = 0; m < subStr[i].subStr[j].content.length; m ++) { %>' +
        '<dd class="lead"><%=#subStr[i].subStr[j].content[m].body%></dd>' +
        '<% if(subStr[i].subStr[j].content[m].conSub.length >0){%>' +
        '<ol class="lead">' +
        '<% for (var n = 0; n < subStr[i].subStr[j].content[m].conSub.length; n ++) { %>' +
        '<li><%=#subStr[i].subStr[j].content[m].conSub[n].name%></li>' +
        '<% } %>' +
        '</ol>' +
        '<% } %>' +
        '<% } %>' +
        '<% if(subStr[i].subStr[j].extra_content.length >0){%>' +
        '<blockquote>' +
        '<% for (var n = 0; n < subStr[i].subStr[j].extra_content.length; n ++) { %>' +
        '<p><%=subStr[i].subStr[j].extra_content[n].name%></p>' +
        '<% } %>' +
        '</blockquote>' +
        '<% } %>' +
        '<% } %>' +
        '</dl>' +
        '<% } %>' +
        '<% } %>' +
        '</dl>' +
        '<h3 id="subStrSum">小结</h3>' +
        '<% for (var i = 0; i < sum.length; i ++) { %>' +
        '<p class="lead"><%=#sum[i].content%></p>' +
        '<ol class="lead">' +
        '<% for (var j = 0; j < sum[i].conSub.length; j ++) { %>' +
        '<li><%=#sum[i].conSub[j].name%></li>' +
        '<% } %>' +
        '</ol>' +
        '<% } %>';
    var article = new zDoc();
    article.Render(source1, twenty_chapter, 'content');

    var source2 = '<% for (var i = 0; i < subStr.length; i ++) { %>' +
        '<li>' +
        '<a href="#subStr<%=i%>"><%=#subStr[i].name%></a>' +
        '<% if(subStr[i].subStr.length>0) { %>' +
        '<ul class="nav z-document-content-str">' +
        '<% for (var j = 0; j < subStr[i].subStr.length; j ++) { %>' +
        '<li><a href="#subStr<%=#i%>_<%=#j%>"><%=#subStr[i].subStr[j].name%></a></li>' +
        '<% } %>' +
        '</ul>' +
        '<% } %>' +
        '</li>' +
        '<% } %>' +
        '<li><a href="#subStrSum">小结</a></li>';
    var nav = new zDoc();
    nav.Render(source2, twenty_chapter, 'accordion');
})();
