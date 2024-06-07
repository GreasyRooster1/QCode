function loadLessons(){
    let lessonsRef = database.ref('lessons');
    lessonsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        clearLessons();
        for(const [lessonId, lessonData] of Object.entries(data)){
            console.log(lessonId,lessonData);
        }
    });
}

function clearLessons(){
    lessonsDisplay.innerHTML = "";
}