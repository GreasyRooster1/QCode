function reCalculateUserPoints(exitFunc){
    database.ref("userdata/"+getStoredUser().uid+"/badges").once("value", function(snap){
        let data = snap.val();
        let badges = data.values().toArray().filter(b => b!==undefined);
        let totalPoints = 0;
        let count = 0;

       console.log(data)

        for(let badge of badges){
            database.ref("badges/"+badge.id+"/value").once("value", function(snap){
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
    database.ref("userdata/"+getStoredUser().uid+"/points").set(val)
}