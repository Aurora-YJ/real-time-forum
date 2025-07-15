export const socket = new WebSocket("ws://localhost:8080/chat");

export function showMsgUsr() {
  socket.onopen = () => {
    console.log("Connected to WebSocket server");
    socket.send("Hello from JavaScript!");
  };

  socket.onmessage = (event) => {
    let msg;

    try {
      msg = JSON.parse(event.data);
    } catch (err) {
      console.error("Invalid JSON from server:", event.data);
      return;
    }

    switch (msg.event) {
      case "usersList":
        AddUsersList(event.data);
        break;

      case "chatmsg":
        showChatMessage(msg.data);
        break;

      case "writing":
        showNotification(msg.data);
        break;

      default:
        console.error("Unknown event:", msg.event)
    }
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

export function sendMsg(msg) {
  console.log("is here");

  if (socket.readyState == WebSocket.OPEN) {
    socket.send(msg);
  } else {
    console.error("Socket is not open. readyState=", socket.readyState);
  }
}

function AddUsersList(data) {
  const mesgfrom = document.getElementById("mesgfrom");
  let users = [];
  try {
    users = JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse data:", data);
    return;
  }

  if (users.length == 0) {
    return;
  }
  users.forEach((u) => {
    const btn = document.createElement("button");

    const ic = document.createElement("i");
    ic.setAttribute("class", "fa-regular fa-message");

    btn.appendChild(ic);
    btn.append(" " + u.name);

    mesgfrom.appendChild(btn);
  });
}

/*
<button>
   <i class="fa-regular fa-message"></i>  youssef    
</button>
*/
