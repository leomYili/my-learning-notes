(function(){
    setTimeout(function(){
        var link = document.createElement("link")
        link.href = "./nav.css"
        link.rel = "stylesheet"

        console.log(link);

        document.body.appendChild(link);
    },3000)

    setTimeout(function(){
        var link = document.createElement("link")
        link.href = "./styles.css"
        link.rel = "stylesheet"

        document.body.insertBefore(link,document.body.firstChild);
    },6000)
})()