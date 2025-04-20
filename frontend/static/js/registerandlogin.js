import { registerdom, logindom } from "./dom.js"
import { registerInfo, LoginInfo } from "./api.js"
export function registerandlogin() {


    document.getElementById("main-style").href = "frontend/static/css/registerandlogin.css";
    document.body.innerHTML = ""
    document.body.innerHTML = registerdom
    const reg = document.getElementById("signup")
    const log = document.getElementById("signin")
    reg.style.background = "green"
    reg.addEventListener("click", registerInfo())

    log.addEventListener("click",
        login
    )

}


function login() {
    document.getElementById("main-style").href = "frontend/static/css/registerandlogin.css";
    document.body.innerHTML = ""
    document.body.innerHTML = logindom
    const gg = document.getElementsByClassName("registering");
    if (gg) {
        gg[0].style.height = "250px";
    }
    const log = document.getElementById("signin")
    log.style.background = "green"
    const reg = document.getElementById("signup")
    reg.addEventListener("click",
        registerandlogin
    )
    LoginInfo()
}
