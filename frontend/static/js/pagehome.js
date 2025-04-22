import { home, creatpostin } from "./dom.js"
export function pagehome() {
    document.body.innerHTML = ""
    document.getElementById("main-style").href = "frontend/static/css/index.css";
    document.body.innerHTML = home
    const pc = document.getElementById("AddPostbtn")
    pc.addEventListener("click", (e) => {
        if (e) {     
                         
        }
    })
}