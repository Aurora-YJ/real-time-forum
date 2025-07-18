import { addDivChat } from "./add_div_chat.js";

// add teh a new user to the old users......
export function AddUserToList(socket, user, currentUserId) {
  const mesgfrom = document.getElementById("mesgfrom");

  if (document.querySelector(`button[data-id="${user.Id}"]`)) {
    return;
  }

  const btn = document.createElement("button");
  const ic = document.createElement("i");
  ic.setAttribute("class", "fa-regular fa-message");

  btn.appendChild(ic);
  btn.append(" " + user.Nickname);

  btn.dataset.id = user.Id;

  btn.addEventListener("click", () => {
    const msg = {
      event: "get_old_chat",
      from: currentUserId,
      to: user.Id,
    };

    socket.send(JSON.stringify(msg));

    const recUserid = btn.dataset.id;
    console.log("gg", recUserid);
    addDivChat(socket, user, currentUserId);
  });

  mesgfrom.appendChild(btn);
}

export function AddUsersList(socket, data, currentUserId) {
  const mesgfrom = document.getElementById("mesgfrom");
  mesgfrom.innerHTML = "";
  data.forEach((u) => {
    const btn = document.createElement("button");

    const ic = document.createElement("i");
    ic.setAttribute("class", "fa-regular fa-message");

    btn.appendChild(ic);
    btn.append(" " + u.Nickname);

    btn.dataset.id = u.Id;

    btn.addEventListener("click", () => {
      const msg = {
        event: "get_old_chat",
        from: currentUserId,
        to: u.Id,
      };

      socket.send(JSON.stringify(msg));

      addDivChat(socket, u, currentUserId);
    });

    mesgfrom.appendChild(btn);
  });
}
