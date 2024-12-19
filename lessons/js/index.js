function init(){
    removeNavArrow()
    setupButtons()
}

function setupButtons(){
    document.querySelector(".recenter").addEventListener('click', function(){
        camera.zoom = 1;
        camera.x = 0;
        camera.y = 0;
    })
    // document.querySelector(".dark-mode").addEventListener('click', function(){
    //     swapColors()
    // })
    document.querySelector(".zoom-in").addEventListener('click', function(){
        camera.zoom *= 1.2;
    })
    document.querySelector(".zoom-out").addEventListener('click', function(){
        camera.zoom *= 0.8;
    })
}

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

init();