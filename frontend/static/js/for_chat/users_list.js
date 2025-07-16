import {addDivChat} from "./add_div_chat.js"

// add teh a new user to the old users......
export function AddUserToList(socket , user) {
  const mesgfrom = document.getElementById("mesgfrom");

  const btn = document.createElement("button");
  const ic = document.createElement("i");
  ic.setAttribute("class", "fa-regular fa-message");

  btn.appendChild(ic);
  btn.append(" " + user.Nickname);

  btn.dataset.id = user.Id;

  btn.addEventListener("click", () => {
    const recUserid = btn.dataset.id;
    console.log("gg", recUserid);
    addDivChat(socket ,recUserid)
  });

  mesgfrom.appendChild(btn);
}


// get the users in put theme in list.....
export function AddUsersList(socket , data) {
  const mesgfrom = document.getElementById("mesgfrom");

  data.forEach((u) => {
    const btn = document.createElement("button");

    const ic = document.createElement("i");
    ic.setAttribute("class", "fa-regular fa-message");

    btn.appendChild(ic);
    btn.append(" " + u.Nickname);

    btn.dataset.id = u.Id;

    btn.addEventListener("click", () => {
      const recUserid = btn.dataset.id;
      console.log("gg", recUserid);
      addDivChat(socket , recUserid)
    });

    mesgfrom.appendChild(btn);
  });
}
