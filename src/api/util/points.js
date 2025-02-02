import {db} from "../firebase";
import {getStoredUser} from "../auth";
import {get, ref, set} from "firebase/database";

function reCalculateUserPoints(exitFunc){
    get(ref(db,"userdata/"+getStoredUser().uid+"/badges")).then((snap)=>{
        let data = snap.val();
        let badges = data.values().toArray().filter(b => b!==undefined);
        let totalPoints = 0;
        let count = 0;

       console.log(data)

        for(let badge of badges){
            get(ref(db,"badges/"+badge.id+"/value")).then((snap)=>{
                totalPoints+=snap.val();
                console.log(count,badges.length)
                if(count===badges.length){
                    setPointValue(totalPoints);
                    exitFunc(totalPoints);
                }
            })
            count++;
        }

    });
}

function setPointValue(val){
    set(ref(db,"userdata/"+getStoredUser().uid+"/points"),val)
}

export {reCalculateUserPoints}