import { home } from "./dom.js"
export function pagehome() {
    document.body.innerHTML = ""
    document.getElementById("main-style").href = "frontend/static/css/index.css";
    document.body.innerHTML = home
}