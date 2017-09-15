/**
 *
 * @authors leomYili
 * @date    2016-01-13 17:04:08
 * @version 1.0.0
 */
function zDoc() {};
zDoc.prototype = {
  //使用模板生成html页面
  Render: function(source, data, el) {
    var render = template.compile(source);
    var html = render(data);
    document.getElementById(el).innerHTML = html;
  }
}
$(window).scroll(function() {
  if ($(window).scrollTop() >= 100) {
    $('.actGotop').fadeIn(300);
  } else {
    $('.actGotop').fadeOut(300);
  }
});
$('.actGotop').click(function() {
  $('html,body').animate({
    scrollTop: '0px'
  }, 800);
});
