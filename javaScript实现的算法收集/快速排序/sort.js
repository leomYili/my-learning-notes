(function(){
    var aaa= function(sd){
        return (function(callback){
            return (function(){
                console.log(sd);
                callback("222");
            })();
        })();
    }

    var ssss = aaa("aaaa");
    console.log(ssss);
    /* ssss(function(value){
       console.log(value); 
    }) */
})();