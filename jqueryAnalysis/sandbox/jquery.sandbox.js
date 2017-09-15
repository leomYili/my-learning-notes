(function(global,factory){
  "use strict";

  if(typeof module ==="object" && typeof module.exports === "object"){
    console.debug("11");
  }else{
    factory(global);
  }
})(window,function(window,noGlobal){
  var jQuery= function(){
    console.debug("1");
    return 1;
  }
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }

  return jQuery;
});
