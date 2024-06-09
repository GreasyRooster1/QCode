function reCalculateUserPoints(){
    database.ref("userdata/"+getStoredUser().uid+"/badges").once("value", function(snap){
       let data = snap.val();
       let totalPoints = 0;
       let count = 0

       for(let badge of data){

           database.ref("badges/"+badge.id+"/value").once("value", function(snap){
               totalPoints+=snap.val();

               if(count===data.length){
                   setPointValue(totalPoints);
               }
           })

           count++;
       }

    });
}

function setPointValue(val){
    database.ref("userdata/"+getStoredUser().uid+"/points").set(val)
}