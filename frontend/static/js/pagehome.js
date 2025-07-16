import { home } from "./dom.js";
import { showMsgUsr  } from "./for_chat/chat.js";
import {creatpostinput} from "./for_post/creat_post.js"

import {showPost} from "./for_post/show_post.js"


export async function pagehome() {
  document.body.innerHTML = "";
  document.body.innerHTML = home;
  document.getElementById("main-style").href = "frontend/static/css/index.css";
  showMsgUsr();
  
  const addPostBtn = document.getElementById("AddPostbtn");
  addPostBtn.addEventListener("click", creatpostinput);
  try {
    const rep = await fetch("/fetchposts", {
      method: "GET",
    });
    if (!rep.ok) {
      console.log("ERROR TO GET POSTS");
    }
    const repdata = await rep.json();
    if (repdata.lenght == null) {
      return;
    }
    showPost(repdata);
  } catch (error) {
    console.error(error);
  }

}
