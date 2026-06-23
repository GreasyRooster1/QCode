import textContent from '/VERSION.txt?raw';
const versionEl = document.querySelector(".footer-content .version")


function displayVersion(){
    console.log(textContent)
    versionEl.innerHTML = textContent;
}

export {displayVersion};