import { home, creatpost } from "./dom.js"
export function pagehome() {
    document.body.innerHTML = ""
    document.getElementById("main-style").href = "frontend/static/css/index.css";
    document.body.innerHTML = home
    const pc = document.getElementById("AddPost")
    pc.addEventListener("onclick", console.log("ggggg   ")
    )
    console.log(pc);
    
}

const  creat = () => {
    document.body.appendChild = creatpost
}