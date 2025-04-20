import { registerdom } from "./dom.js"

export function registerandlogin() {
    document.getElementById("main-style").href = "frontend/static/css/registerandlogin.css";
    document.body.innerHTML = registerdom
    const reg = document.getElementById("signup")
    const log = document.getElementById("signin")


    reg.addEventListener("click", debounce(function(){
       register()
    }) , 1000)

    log.addEventListener("click", debounce(function(){
       login()
    }) , 1000)

}

function debounce(func , delay) {
    let timer;
    return function(...arg){
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, arg)
        }, delay)
    }
}


function  register() {
    
}