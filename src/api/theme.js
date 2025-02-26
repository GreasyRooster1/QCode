import {onValue, ref, set,get} from "firebase/database";
import {getStoredUser} from "./auth";
import {db} from "./firebase";


function loadTheme(){
    debugger;
    loadThemeFromLocal()
    loadThemeFromDB()
}

function loadThemeFromLocal(){
    let theme = JSON.parse(localStorage.getItem('theme'));
    if(theme===null)return;
    setPageTheme(theme);
}

function loadThemeFromDB(){
    onValue(ref(db,"userdata/"+getStoredUser().uid+"/theme"),(snap)=>{
        if(!snap.exists()){
            set(ref(db,"userdata/"+getStoredUser().uid+"/theme"),"default");
            return
        }
        let themeId = snap.val();

        if(themeId==="default"){
            removeTheme()
            return;
        }
        console.log(snap.val(),"themes/"+themeId);
        get(ref(db,"themes/"+themeId)).then((snap)=>{
            let theme = snap.val()
            console.log(theme)
            localStorage.setItem('theme',JSON.stringify(theme));
            setPageTheme(theme)
        })
    })
}

function setPageTheme(theme){
    removeTheme()
    let prevThemeEl = document.querySelector(".theme-style-el");
    if(theme.address===prevThemeEl.src){
        return;
    }
    let styleEl = document.createElement("link");
    styleEl.setAttribute("rel","stylesheet");
    styleEl.setAttribute("href", theme.address);
    styleEl.classList.add("theme-style-el");
    prevThemeEl.remove();
    document.head.appendChild(styleEl);
}

function removeTheme(){
    document.querySelector(".theme-style-el")?.remove();
}

loadTheme();

export {loadTheme};