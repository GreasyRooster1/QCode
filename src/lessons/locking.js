import {ref} from "firebase/database";
import {getStoredUser} from "../api/auth";
import {db} from "../api/firebase";
import {propagateLocked} from "./lesson";

const arduinoRootId = "intro-to-arduino"

function checkLocks(){
    checkArduinoLock();
    //more in the future...
}

function checkArduinoLock(){
    get(ref(db,"userpermissions/"+getStoredUser().uid+"/purchasedArduino")).then((snapshot)=>{
        if(!snapshot.exists()||!snapshot.val()){
            propagateLocked(arduinoRootId)
        }else{
            console.log("Arduino unlocked!")
        }
    })
}

export {checkLocks,arduinoRootId};