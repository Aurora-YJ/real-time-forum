export function addDivChat(socket, user, currentUserId) {
  const divchat = document.createElement("div");
  divchat.setAttribute("id", `divchat-${user.Id}`);
  divchat.setAttribute("class", "divchat");

  const header = document.createElement("div");
  header.setAttribute("id", "header");
  header.innerHTML = `your chat with : ${user.Nickname}`;
  divchat.appendChild(header);

  const chatwith = document.createElement("div");
  chatwith.setAttribute("id", "chatwith");
  divchat.appendChild(chatwith);

  const inputBtn = document.createElement("div");
  inputBtn.setAttribute("id", "inputBtn");
  divchat.appendChild(inputBtn);

  const inputt = document.createElement("input");
  inputt.setAttribute("id", "inputt");
  inputBtn.appendChild(inputt);

  const buttonn = document.createElement("button");
  buttonn.setAttribute("id", "buttonn");
  buttonn.innerHTML = "Send";
  inputBtn.appendChild(buttonn);

  document.body.appendChild(divchat);

  buttonn.addEventListener("click", (e) => {
    const inputValue = inputt.value.trim();
    if (inputValue.length == 0) {
      inputt.style.border = "3px solid red";
      return;
    }

    const msgto = {
      event: "chatmsg",
      from: currentUserId,
      to: user.Id,
      message: inputValue,
    };

    socket.send(JSON.stringify(msgto));

    const pchat = document.createElement("p");
    pchat.setAttribute("class", "pchat");
    pchat.classList.add("sent");
    pchat.innerHTML = `${inputValue}`;

    chatwith.appendChild(pchat);
    chatwith.scrollTop = chatwith.scrollHeight;

    inputt.value = "";
    return;
  });
}

export function showChatMessage(event, data, currentUserId) {
  if (event == "chatmsgnow") {
    const divWith = document.getElementById(`divchat-${data.from}`);
    if (!divWith) {
      return;
    }
    const chatwith = document.getElementById("chatwith");

    const pchat = document.createElement("p");
    pchat.setAttribute("class", "pchat");
    pchat.classList.add("received");
    pchat.innerHTML = `${data.message}`;

    chatwith.appendChild(pchat);
    chatwith.scrollTop = chatwith.scrollHeight;
    return;
  }

  if (event == "All_chat") {

    const chatwith = document.getElementById("chatwith");

    console.log("-->", data);

    if (!data || data.length == 0) {
      return
    }

    data.forEach((m) => {
      if ((m.Sender == currentUserId)) {
        const pchat = document.createElement("p");
        pchat.setAttribute("class", "pchat");
        pchat.classList.add("received");
        pchat.innerHTML = `${m.Content}`;

        chatwith.appendChild(pchat);
        chatwith.scrollTop = chatwith.scrollHeight;
        return;
      }

      if (m.Receiver == currentUserId) {
        const pchat = document.createElement("p");
        pchat.setAttribute("class", "pchat");
        pchat.classList.add("sent");
        pchat.innerHTML = `${m.Content}`;

        chatwith.appendChild(pchat);
        chatwith.scrollTop = chatwith.scrollHeight;
        return;
      }
    });
  }
}
