import { registerdom , logindom } from "./dom.js"
import { registerInfo , LoginInfo } from "./api.js"
export function registerandlogin() {
    document.getElementById("main-style").href = "frontend/static/css/registerandlogin.css";
    document.body.innerHTML = ""
    document.body.innerHTML = registerdom
    const reg = document.getElementById("signup")
    const log = document.getElementById("signin")
    reg.style.background = "green"
    reg.addEventListener("click", debounce(function(){
        registerInfo()
    }) , 500)

    log.addEventListener("click", debounce(function(){
       login()
    }) , 500)

}

export function debounce(func , delay) {
    let timer;
    return function(...arg){
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, arg)
        }, delay)
    }
}


function login() {
    document.getElementById("main-style").href = "frontend/static/css/registerandlogin.css";
    document.body.innerHTML = ""
    document.body.innerHTML = logindom
    const log = document.getElementById("signin")
    log.style.background = "green"
    const reg = document.getElementById("signup")
    reg.addEventListener("click", debounce(function(){
        registerandlogin()
    }) , 500)
    LoginInfo()
}
