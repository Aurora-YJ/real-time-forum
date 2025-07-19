export function addDivChat(socket, user, currentUserId) {
  const divchat = document.createElement("div");
  divchat.setAttribute("id", "divchat");

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
  inputBtn.appendChild(inputt)

  const buttonn  = document.createElement("button");
  buttonn.setAttribute("id", "buttonn")
  buttonn.innerHTML = "Send"
  inputBtn.appendChild(buttonn)

  document.body.appendChild(divchat);
  
}

export function showChatMessage(data, currentUserId) {}
