class LoginAdmin {
    static isAdminLogin = false;
    static styleVariables = [
        "background-color",
        "login-pane-color",
        "input-container-color",
        "input-wrapper-color",

        "button-container-color",
        "button-color",
        "button-color-hover",

        "auth-container-color"
    ]

    static switchStyleToAdmin() {
        let root = document.querySelector(":root")
        let rootStyle = getComputedStyle(root);
        for(let name of LoginAdmin.styleVariables) {
            let adminProp = rootStyle.getPropertyValue("--admin-"+name);
            root.style.setProperty("--"+name,adminProp);
        }
    }
}