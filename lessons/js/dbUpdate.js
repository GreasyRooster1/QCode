let updatedStatus = false;

function beginCheckingStatuses(){
    let interval = setInterval(()=>{
        checkStatuses(interval);
    },1000)
}

function checkStatuses(interval){
    if(updatedStatus){
        clearInterval(interval)
        return;
    }
    if( Object.entries(lessonsIndex).length<1){
        return;
    }
    for(let lesson of lessonsIndex){
        if(!lesson.statusChecked){
            console.log(lesson)
            return;
        }
    }
    updatedStatus = true;
    updateLessonStatusDb()
}

function updateLessonStatusDb(){
    let statuses = {}
    console.log(lessonsIndex)

    for(let [id,lesson] of Object.entries(lessonsIndex)){
        console.log(lesson)
        let status = {
            completed:lesson.completed,
            started:lesson.started,
        }
        statuses[lesson.id] = status;
    }
    console.log(statuses)
    //database.ref("userdata/"+getStoredUser().uid+"/lessonStatuses").set(statuses)
}