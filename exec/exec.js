

function runJs(js){
    //clear dangerous objects
    eval(`
        window=null;
        document=null;
        XMLHttpRequest=null;
        XMLHttpRequestUpload=null;
        eval = null;
    `);

    //run the js
    eval(js);
}

function setup(){
    createCanvas(500,500);
    rect(0,0,100,100);
    rect(400,400,100,100);

    document.getElementById("defaultCanvas0").style.width = "100vmin";
    document.getElementById("defaultCanvas0").style.height = "100vmin";
}