import {db} from "../firebase";
import {getStoredUser} from "../auth";
import {get, ref} from "firebase/database";

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
    db.ref("userdata/"+getStoredUser().uid+"/points").set(val)
}

export {reCalculateUserPoints}