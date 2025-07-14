import {FetchCreatPost} from "./api.js"
export function creatpostinput() {
  const divcreatpost = document.createElement("div");

  divcreatpost.setAttribute("id", "creatpostt");
  divcreatpost.classList.add("creatpost");

  const categories = [
    "Coding",
    "Technology",
    "Lifestyle",
    "Gaming",
    "Sports",
    "Music",
    "Movies",
    "Food",
    "Travel",
    "Other",
  ];

  divcreatpost.innerHTML = `
          <input id="titleID" type="text" placeholder="Post Title" />
          <textarea id="contentID" placeholder="Write your post here..."></textarea>
      
          <div id="categoryWrapper" class="category-wrapper">
              ${categories
                .map(
                  (cat) =>
                    `<button class="category" data-value="${cat}">${cat}</button>`
                )
                .join("")}
          </div>
      
          <button class="bbutton" id="Submitpost">Submit</button>
          <button class="bbutton" id="deletePostBtn">SKIP</button>
      `;

  document.body.appendChild(divcreatpost);

  const categoryButtons = divcreatpost.querySelectorAll(".category");

  categoryButtons.forEach((but) => {
    but.addEventListener("click", function () {
      if (but.classList.contains("selected")) {
        but.classList.remove("selected");
      } else {
        but.classList.add("selected");
      }
    });
  });

  const deletePostBtn = document.getElementById("deletePostBtn");
  deletePostBtn.addEventListener("click", function () {
    divcreatpost.remove();
  });

  const Submitbtn = document.getElementById("Submitpost");
  Submitbtn.addEventListener("click", function () {
    const tt = document.getElementById("titleID");
    const dd = document.getElementById("contentID");

    if (tt.value.trim().length === 0 && dd.value.trim().length === 0) {
      alert("fail");
    } else {
      createIt(tt, dd);
    }
  });
}

function createIt(tt, dd) {
  const selectedCategories = Array.from(
    document.querySelectorAll(".category.selected")
  ).map((btn) => btn.dataset.value);  

 FetchCreatPost(tt.value.trim(), dd.value.trim(), selectedCategories);
}
