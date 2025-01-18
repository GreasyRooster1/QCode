import {onValue, ref} from "firebase/database";
import {db} from "../../api/firebase";
import {announcementsDisplay} from "../index";

function loadAnnouncements(){
    onValue(ref(db,'announcements'),(snapshot) => {
        const data = snapshot.val();
        clearAnnouncements();
        console.log(data);
        let arr = []
        for(const [announcementId, announcementData] of Object.entries(data)){
            arr.push(announcementData);
        }
        arr.reverse();
        for (let announcementData of arr){
            if(!announcementData.visible){
                continue;
            }
            createAnnouncementElement(announcementData);
        }
    });
}

function createAnnouncementElement(data){
    let announcementWrapper = document.createElement("div");
    let title = document.createElement("div");
    let content = document.createElement("div");
    let date = document.createElement("div");

    title.innerHTML = data.title;
    content.innerHTML = data.content;
    date.innerHTML = timeDifference(data.unixTimestamp*1000);

    announcementWrapper.classList.add("announcement")
    title.classList.add("title");
    content.classList.add("content");
    date.classList.add("date");

    date.setAttribute("data-date",data.unixTimestamp);
    date.addEventListener("mouseover",dateHoverIn);
    date.addEventListener("mouseout",dateHoverOut);

    announcementWrapper.appendChild(title)
    announcementWrapper.appendChild(content)
    announcementWrapper.appendChild(date)
    announcementsDisplay.appendChild(announcementWrapper);
}

function dateHoverIn(e){
    e.target.innerHTML = getDateString(e.target.getAttribute("data-date"));
}
function dateHoverOut(e){
    e.target.innerHTML = timeDifference(e.target.getAttribute("data-date")*1000);
}



function clearAnnouncements(){
    announcementsDisplay.innerHTML = "";
}

export {loadAnnouncements}