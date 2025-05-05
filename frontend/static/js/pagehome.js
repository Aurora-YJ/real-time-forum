import { home } from "./dom.js";
import { fetchpost } from "./api.js";
export function pagehome() {
    document.body.innerHTML = home; 
    document.getElementById("main-style").href = "frontend/static/css/index.css";
    
    const addPostBtn = document.getElementById("AddPostbtn");
    addPostBtn.addEventListener("click", creatpostinput);

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
    deletePostBtn.addEventListener("click", function() {
        divcreatpost.remove(); 
    });
    fetchpost()
}
