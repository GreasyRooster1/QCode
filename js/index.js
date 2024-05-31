const badgeDisplay = document.querySelector(".badges-display");


function loadBadges(){
    let user = getStoredUser();
    let badgesRef = database.ref('userdata/'+user.uid+"/badges");
    badgesRef.on('value', (snapshot) => {
        const data = snapshot.val();

        badgeDisplay.innerHTML = "";
        for(let badge of data){


            let badgeConnect = firebase.database().ref().child("badges").child(badge.id).get();
            badgeConnect.then((snap)=>{
                let badgeProperties = snap.val();
                let badgeElement = document.createElement("div");
                badgeElement.classList.add("badge");
                let img = document.createElement("img");
                img.setAttribute("src",badgeProperties.image);
                img.setAttribute("alt",badgeProperties.name+" badge");
                img.setAttribute("title",badgeProperties.name);
                badgeElement.appendChild(img);
                badgeDisplay.appendChild(badgeElement)
            });
        }
    });
}

loadBadges();