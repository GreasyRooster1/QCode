class ProjectDisplay {
    constructor(projectData,index){
        this.index = index;
        this.project = projectData;
        this.iWindow = null;
        this.createDomElement();
        this.setupDOMEvents();
        this.updateInteractions()
        this.updateUserData();
    }

    createDomElement(){
        this.domElement = document.createElement("div");

        this.iframe = document.createElement("iframe");
        this.overlayWrapper = document.createElement("div");

        this.title = document.createElement("span");
        this.titleWrapper = document.createElement("span");

        this.interactTrayWrapper = document.createElement("div");
        this.interactTray = document.createElement("span");

        this.heartWrapper = document.createElement("span");
        this.heartIcon = document.createElement("span");
        this.heartCount = document.createElement("span");
        this.heartWrapper.appendChild(this.heartIcon);
        this.heartWrapper.appendChild(this.heartCount);

        this.starWrapper = document.createElement("span");
        this.starIcon = document.createElement("span");
        this.starCount = document.createElement("span");
        this.starWrapper.appendChild(this.starIcon);
        this.starWrapper.appendChild(this.starCount);

        this.userDisplay = document.createElement("span");
        this.userNameDisplay = document.createElement("span");
        this.userIconDisplay = document.createElement("img");

        this.openIcon = document.createElement("div");

        this.userDisplay.appendChild(this.userIconDisplay)
        this.userDisplay.appendChild(this.userNameDisplay)

        this.titleWrapper.appendChild(this.title);

        this.interactTray.appendChild(this.heartWrapper);
        this.interactTray.appendChild(this.starWrapper);

        this.interactTrayWrapper.appendChild(this.interactTray);
        this.interactTrayWrapper.appendChild(this.userDisplay);
        this.interactTrayWrapper.appendChild(this.openIcon);
        this.overlayWrapper.appendChild(this.titleWrapper);
        this.overlayWrapper.appendChild(this.interactTrayWrapper);


        this.domElement.appendChild(this.iframe);
        this.domElement.appendChild(this.overlayWrapper);


        this.domElement.classList.add("project-display");

        this.iframe.src = "../editor/exec/exec.html";

        this.title.classList.add("title");
        this.titleWrapper.classList.add("title-wrapper");

        this.interactTray.classList.add("interact-tray");
        this.heartWrapper.classList.add("hearts-wrapper");
        this.heartCount.classList.add("heart-count");
        this.heartCount.classList.add("interaction-count");
        this.heartIcon.classList.add("heart-icon");

        this.starWrapper.classList.add("star-wrapper");
        this.starCount.classList.add("star-count");
        this.starCount.classList.add("interaction-count");
        this.starIcon.classList.add("star-icon");

        this.openIcon.classList.add("open-icon");

        this.userDisplay.classList.add("user-display");

        this.interactTrayWrapper.classList.add("interact-tray-wrapper");

        this.overlayWrapper.classList.add("overlay-wrapper");

        this.heartIcon.innerHTML = "<i class='far fa-heart'></i>";
        this.starIcon.innerHTML = "<i class='far fa-star'></i>";

        this.openIcon.innerHTML = "<i class='fas fa-share-square'></i>";

        this.heartCount.innerHTML = "0";
        this.starCount.innerHTML = "0";

        this.title.innerHTML = this.project.name;

        this.heartIcon.setAttribute("data-index", this.index);
        this.starIcon.setAttribute("data-index", this.index);

    }

    setupDOMEvents(){
        this.heartIcon.addEventListener("click", function(){
            let thisProject = projectDataHeap[this.getAttribute("data-index")];
            if(thisProject.project.isLiked()){
                thisProject.project.removeLike();
            }else{
                thisProject.project.like();
            }
            thisProject.updateInteractions();
        })
        this.starIcon.addEventListener("click", function(){
            let thisProject = projectDataHeap[this.getAttribute("data-index")];
            if(thisProject.project.isStared()){
                thisProject.project.removeStar();
            }else{
                thisProject.project.star();
            }
            thisProject.updateInteractions();
        })
        this.openIcon.addEventListener("click",()=>{
            console.log("project.html?shareboardid="+this.project.pid)
            window.location.href = "project.html?shareboardid="+this.project.pid;
        });
    }

    updateInteractions(){
        this.heartIcon.firstElementChild.classList.remove("fas","far")
        if(this.project.isLiked()){
            this.heartIcon.firstElementChild.classList.add("fas")
        }else{
            this.heartIcon.firstElementChild.classList.add("far")
        }

        this.starIcon.firstElementChild.classList.remove("fas","far")
        if(this.project.isStared()){
            this.starIcon.firstElementChild.classList.add("fas")
        }else{
            this.starIcon.firstElementChild.classList.add("far")
        }

        this.heartCount.innerHTML = this.project.likeCount();
        this.starCount.innerHTML = this.project.starCount();
    }

    updateUserData(){
        database.ref("userdata/"+this.project.author+"/username").once("value",(snapshot) => {
            console.log(this);
            this.userNameDisplay.innerHTML = snapshot.val();
        })

        database.ref("userdata/"+this.project.author+"/profileIcon").once("value",(snapshot) => {
            this.userIconDisplay.setAttribute("src", snapshot.val());
        })

    }

    appendToDom(){
        document.querySelector(this.parent).appendChild(this.domElement);
    }

    runCode(){
        this.iWindow = this.iframe.contentWindow;

        this.iWindow.postMessage(this.project.code);
    }

    loadCode(){
        this.project.loadProjectCode(function (code,project){
            project.project.code = code;
            project.runCode();
        },this)
    }

    updateClass(){
        this.domElement.classList.add(this.domClass);
    }
}