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
    date.innerHTML = data.date;

    announcementWrapper.classList.add("announcement")
    title.classList.add("title")
    content.classList.add("content")
    date.classList.add("date")

    announcementWrapper.appendChild(title)
    announcementWrapper.appendChild(content)
    announcementWrapper.appendChild(date)
    announcementsDisplay.appendChild(announcementWrapper);
}

function clearAnnouncements(){
    lessonsDisplay.innerHTML = "";
}
