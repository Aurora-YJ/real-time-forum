import { home } from "./dom.js";
import { showMsgUsr , sendMsg } from "./chat.js";
import {creatpostinput} from "./creat_post.js"

import {showPost} from "./show_post.js"

export async function pagehome() {
  document.body.innerHTML = "";
  document.body.innerHTML = home;
  document.getElementById("main-style").href = "frontend/static/css/index.css";
  showMsgUsr();

  sendMsg("hi you can send")
  
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
