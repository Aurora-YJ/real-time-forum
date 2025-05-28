import { home } from "./dom.js";
import { FetchCreatPost } from "./api.js"

export async function pagehome() {
    document.body.innerHTML = "";
    document.body.innerHTML = home;
    document.getElementById("main-style").href = "frontend/static/css/index.css";

    const addPostBtn = document.getElementById("AddPostbtn");
    addPostBtn.addEventListener("click", creatpostinput);
    try {
        const rep = await fetch("/fetchposts", {
            method: "GET",
        })
        if (!rep.ok) {
            console.log("ERROR TO GET POSTS")
        }
        const repdata = await rep.json()
        console.log(repdata);
        
    } catch (error) {
        console.error(error);
    }
}

function creatpostinput() {
    const divcreatpost = document.createElement("div");

    divcreatpost.setAttribute("id", "creatpostt");
    divcreatpost.classList.add("creatpost");

    divcreatpost.innerHTML = `
        <input id="titleID" type="text" placeholder="Post Title" />
        <textarea id="contentID" placeholder="Write your post here..."></textarea>
         <button id="Submitpost">Submit</button>
        <button id="deletePostBtn">SKIP</button> <!-- زر الحذف -->
    `;

    document.body.appendChild(divcreatpost);

    const deletePostBtn = document.getElementById("deletePostBtn");
    deletePostBtn.addEventListener("click", function () {
        divcreatpost.remove();
    });
    FetchCreatPost()
}
