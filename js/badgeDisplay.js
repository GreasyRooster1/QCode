const badges = document.querySelectorAll(".badge")
const badgeDisplay = document.querySelector(".badges-display");

let badgeDetails = {
    name:"",
    desc:"",
    image:"",
    value:"",
}

badgeDisplay.addEventListener("click",function (event) {
    console.log(event.currentTarget);
})