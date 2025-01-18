import {get, ref, set} from "firebase/database";
import {db} from "./firebase";
import {getStoredUser} from "./auth";

const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function getSharedProjectId(project, user){
    return cyrb53(project+"$$$"+user,13);
}

class ShareBoardProject{
    constructor(pid,metadata){
        this.shareDate = metadata.shareDate;
        this.createdDate = metadata.createdDate;
        this.author = metadata.author;
        this.name = metadata.name;
        this.likedBy = metadata.likedBy;
        this.staredBy = metadata.staredBy;
        this.pid = pid;

        this.code = null;

        if(this.likedBy===undefined){
            this.likedBy = {};
        }
        if(this.staredBy===undefined){
            this.staredBy = {};
        }
    }

    loadProjectCode(next=function(){}){
        get(ref(db,"sharedProjects/projectData/"+this.pid)).then((snapshot) => {
            this.code = snapshot.val();
            next(snapshot.val(),arguments[1]);
        })
    }

    like(){
        set(ref(db,"sharedProjects/metadata/"+this.pid+"/likedBy/"+getStoredUser().uid),Date.now()/1000)
        this.likedBy[getStoredUser().uid] = Date.now()/1000;
    }

    star(){
        set(ref(db,"sharedProjects/metadata/"+this.pid+"/staredBy/"+getStoredUser().uid),Date.now()/1000);
        this.staredBy[getStoredUser().uid] = Date.now()/1000;
    }

    removeLike(){
        set(db.ref("sharedProjects/metadata/"+this.pid+"/likedBy/"+getStoredUser().uid),null)
        delete this.likedBy[getStoredUser().uid]
    }

    removeStar(){
        set(ref(db,"sharedProjects/metadata/"+this.pid+"/staredBy/"+getStoredUser().uid),null)
        delete this.staredBy[getStoredUser().uid]
    }

    isLiked(){
        if(this.likedBy==={}){
            return false;
        }
        return this.likedBy.hasOwnProperty(getStoredUser().uid);
    }

    isStared(){
        if(this.staredBy==={}){
            return false;
        }
        return this.staredBy.hasOwnProperty(getStoredUser().uid);
    }

    likeCount(){
        if(this.likedBy==={}){
            return 0;
        }
        return Object.keys(this.likedBy).length
    }

    starCount(){
        if(this.staredBy==={}){
            return 0;
        }
        return Object.keys(this.staredBy).length
    }
}

function getShareBoardFeaturedProjects(next=function(){}){
    let projects = [];
    get(ref(db,"sharedProjects/featured")).then((snapshot) => {
        (async() => {
            let data = snapshot.val();
            for (let [_, pid] of Object.entries(data)) {
                let snapshot = await get(db, ref("sharedProjects/metadata/" + pid));
                projects.push(new ShareBoardProject(pid, snapshot.val()));
            }
            next(projects);
        })();
    });
}

function getShareBoardProjects(next=function(){}){
    let projects = [];
    get(ref(db,"sharedProjects/metadata")).then((snapshot) => {
        let data = snapshot.val();
        for (let [pid, metadata] of Object.entries(data)) {
            console.log(metadata.shareDate)
            projects.push(new ShareBoardProject(pid, metadata));
        }
        projects.sort((a, b) => b.shareDate-a.shareDate);
        console.log(projects);
        next(projects);
    })
}

export {getShareBoardFeaturedProjects,getShareBoardProjects,getSharedProjectId,ShareBoardProject}