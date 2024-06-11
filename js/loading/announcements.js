function loadAnnouncements(){
    database.ref('announcements').on('value', (snapshot) => {
        const data = snapshot.val();
        clearAnnouncements();
        console.log(data);
        for(const [announcementId, announcementData] of Object.entries(data)){
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

function getDateString(unixStamp){
    let date = new Date(unixStamp * 1000);

    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    return month+"/"+day+"/"+year;
}

function timeDifference(previous) {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let current = Date.now()

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}

function clearAnnouncements(){
    announcementsDisplay.innerHTML = "";
}
