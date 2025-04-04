import textContent from '../VERSION';
const versionEl = document.querySelector(".footer-content .version")


function displayVersion(){
    console.log(textContent)
    versionEl.innerHTML = textContent;
}

export {displayVersion};