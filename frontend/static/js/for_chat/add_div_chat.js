export function addDivChat(socket ,iduser) {
  if (document.getElementById(`chat-box-${iduser}`)) return;

  const div_chat = document.createElement("div");
  div_chat.id = `chat-box-${iduser}`;
  div_chat.style.position = "fixed";
  div_chat.style.bottom = "20px";
  div_chat.style.right = "20px";
  div_chat.style.width = "300px";
  div_chat.style.height = "400px";
  div_chat.style.border = "1px solid #ccc";
  div_chat.style.background = "#fff";
  div_chat.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
  div_chat.style.display = "flex";
  div_chat.style.flexDirection = "column";
  div_chat.style.zIndex = "1000";

  const header = document.createElement("div");
  header.style.padding = "10px";
  header.style.background = "#007bff";
  header.style.color = "#fff";
  header.innerText = ` mesg whit  ${iduser}`;
  div_chat.appendChild(header);

  const messagesContainer = document.createElement("div");
  messagesContainer.style.flex = "1";
  messagesContainer.style.padding = "10px";
  messagesContainer.style.overflowY = "auto";
  messagesContainer.style.borderTop = "1px solid #ddd";
  messagesContainer.style.borderBottom = "1px solid #ddd";
  div_chat.appendChild(messagesContainer);

  const inputContainer = document.createElement("div");
  inputContainer.style.display = "flex";
  inputContainer.style.padding = "10px";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "write here...";
  input.style.flex = "1";
  input.style.marginRight = "5px";

  const sendBtn = document.createElement("button");
  sendBtn.innerText = "Send";

  inputContainer.appendChild(input);
  inputContainer.appendChild(sendBtn);
  div_chat.appendChild(inputContainer);

  document.body.appendChild(div_chat);

  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    const msgDiv = document.createElement("div");
    msgDiv.style.textAlign = "right";
    msgDiv.innerText = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const payload = {
      event: "chatmsg",
      data: {
        to: iduser,
        message: text,
      },
    };

    socket.send(JSON.stringify(payload));

    input.value = "";
  });

  socket.addEventListener("message", (event) => {
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch (err) {
      return;
    }

    if (msg.event === "chatmsg" && msg.data.from == iduser) {
      const msgDiv = document.createElement("div");
      msgDiv.style.textAlign = "left";
      msgDiv.innerText = msg.data.message;
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
}
