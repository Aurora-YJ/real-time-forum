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
        showPost(repdata)

    } catch (error) {
        console.error(error);
    }
}




function showPost(repdata) {
    console.log(repdata.message);
    
    const allposts = document.getElementById("allposts")

    repdata.message.forEach(p => {

        const onepost = document.createElement("div")
        onepost.setAttribute("class", "post")

        const userbar = document.createElement("div")
        userbar.setAttribute("class", "userbar")

        const ul = document.createElement("ul")
        ul.setAttribute("class", "ulInUserbar")

        const imageandname = document.createElement("div")
        imageandname.setAttribute("class", "imageandname")

        const creatdate = document.createElement("li")
        creatdate.setAttribute("class", "creatdate")
        creatdate.innerHTML = `creat at: ${p.CreataAt}`


        const foricon = document.createElement("li")
        foricon.innerHTML = `<i class="fa-solid fa-user"></i>`


        const forname = document.createElement("li")
        forname.innerHTML = `${p.Creator}`


        imageandname.appendChild(foricon)
        imageandname.appendChild(forname)
        ul.appendChild(imageandname)
        ul.appendChild(creatdate)
        userbar.appendChild(ul)


        // for content
        const content = document.createElement("div")
        content.setAttribute("class", "content")

        const title = document.createElement("h3")
        title.innerHTML = `${p.Title}`

        const description = document.createElement("p")
        description.innerHTML = `${p.Content}`


        
        content.appendChild(title)
        content.appendChild(description)
        onepost.appendChild(userbar)
        onepost.appendChild(content)
        allposts.appendChild(onepost)
    })


}


function creatpostinput() {
    const divcreatpost = document.createElement("div");

    divcreatpost.setAttribute("id", "creatpostt");
    divcreatpost.classList.add("creatpost");

    divcreatpost.innerHTML = `
        <input id="titleID" type="text" placeholder="Post Title" />
        <textarea id="contentID" placeholder="Write your post here..."></textarea>
         <button id="Submitpost">Submit</button>
        <button id="deletePostBtn">SKIP</button>
    `;

    document.body.appendChild(divcreatpost);

    const deletePostBtn = document.getElementById("deletePostBtn");
    deletePostBtn.addEventListener("click", function () {
        divcreatpost.remove();
    });
    FetchCreatPost()
}
