import { home } from "./dom.js";
import { FetchCreatPost } from "./api.js"
import { showMsgUsr } from "./chat.js"

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
        showMsgUsr()
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
        const dateObj = new Date(p.CreataAt);
        const datee = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        creatdate.innerHTML = `creat at: ${datee}`


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

        // catigoryandcomment

        const catyandcmt = document.createElement("div")
        catyandcmt.setAttribute("class", "catigoryandcomment")

        const category = document.createElement("div")
        category.setAttribute("class", "category")

        const pp = document.createElement("p")
        pp.innerHTML = `categorys: `

        /* this for categorys*/

        /* end */






        const comment = document.createElement("div")
        comment.setAttribute("class", "comment")


        const spancmmt = document.createElement("span")
        spancmmt.innerHTML = `${p.CountComment}`

        const btncmmt = document.createElement("button")
        btncmmt.innerHTML = `<i class="fa-solid fa-comments"></i>`

        comment.appendChild(spancmmt)
        comment.appendChild(btncmmt)


        category.appendChild(pp)
        catyandcmt.appendChild(category)
        catyandcmt.appendChild(comment)




        onepost.appendChild(userbar)
        onepost.appendChild(content)
        onepost.appendChild(catyandcmt)
        allposts.appendChild(onepost)
    })


}


function creatpostinput() {
    const divcreatpost = document.createElement("div");

    divcreatpost.setAttribute("id", "creatpostt");
    divcreatpost.classList.add("creatpost");

    const categories = [
        "Coding", "Technology", "Lifestyle", "Gaming", "Sports",
        "Music", "Movies", "Food", "Travel", "Other"
      ];
      
      divcreatpost.innerHTML = `
          <input id="titleID" type="text" placeholder="Post Title" />
          <textarea id="contentID" placeholder="Write your post here..."></textarea>
      
          <div id="categoryWrapper" class="category-wrapper">
              ${categories.map(cat => `<button id="category" class="category" data-value="${cat}">${cat}</button>`)}
          </div>
      
          <button class="bbutton" id="Submitpost">Submit</button>
          <button class="bbutton" id="deletePostBtn">SKIP</button>
      `;
      
    document.body.appendChild(divcreatpost);

    const deletePostBtn = document.getElementById("deletePostBtn");
    deletePostBtn.addEventListener("click", function () {
        divcreatpost.remove();
    });
    FetchCreatPost()
}

