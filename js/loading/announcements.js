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

function createAnnouncementElement(lessonId,lessonData){
    let linkWrapper = document.createElement("div");
    let link = document.createElement("span");

    link.classList.add("lesson-link");

    link.innerHTML = lessonData.title;

    linkWrapper.appendChild(link)
    announcementsDisplay.appendChild(linkWrapper);
}

function clearAnnouncements(){
    lessonsDisplay.innerHTML = "";
}
