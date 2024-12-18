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
    for(let lesson of lessonsIndex){
        if(!lesson.statusChecked){
            return;
        }
    }
    updatedStatus = true;
    updateLessonStatusDb()
}

function updateLessonStatusDb(){
    let statuses = {}

    for(let lesson of lessonsIndex){
        let status = {
            completed:lesson.completed,
            started:lesson.started,
        }
        statuses[lesson.id] = status;
    }
    console.log(statuses)
    //database.ref("userdata/"+getStoredUser().uid+"/lessonStatuses").set(statuses)
}