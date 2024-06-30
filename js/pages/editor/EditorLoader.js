class EditorLoader {
    static onLoad(){
        if(!this.getUrlData()){
            console.log("project failed to load");
            return;
        }

        this.getProjectLesson()

        this.loadProjectCode()
        this.loadProjectLesson()
    }

    static getUrlData(){
        const searchParams = new URLSearchParams(window.location.search);

        if(searchParams.has("lessonCreator")){
            //setupLessonCreator();
            EditorData.isLessonCreatorActive = true;
            return true;
        }

        if(searchParams.has("projectId")){
            EditorData.projectId = searchParams.get("projectId");
        }

        if(searchParams.has("cNum")){
            EditorData.currentChapter = parseInt(searchParams.get("cNum"));
        }

        if(searchParams.has("uid")) {
            if(searchParams.get("uid")===FBAuth.getStoredUser().uid){
                return true;
            }
        }

        return false;
    }

    static getProjectLesson(){
        FBDatabase.queryUserValue("projects/"+EditorData.projectId+"/lessonId", (data)=>{
            EditorData.lessonId = data;
        })
    }


    static loadProjectCode(){
        FBDatabase.queryUserValue("projects/"+EditorData.projectId+"/code", (data)=>{
            EditorHelper.writeToEditor(data);
        })
    }

    static loadProjectLesson(){
        FBDatabase.querySpecific("lessons/"+EditorData.lessonId+"/chapters/"+EditorData.currentChapter, (data)=>{
            EditorHelper.clearSteps();
        })
    }


}

LoadRegistry.register(EditorLoader.onLoad);