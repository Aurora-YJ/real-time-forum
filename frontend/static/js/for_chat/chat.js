import { AddUsersList , AddUserToList } from "./users_list.js"

export function showMsgUsr() {
  const socket = new WebSocket("ws://localhost:8080/chat");
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
        AddUsersList(socket , msg.data);
        break;

      case "newUser":
        AddUserToList(socket , msg.data);
        break;

      case "chatmsg":
        showChatMessage(msg.data);
        break;

      case "writing":
        showNotification(msg.data);
        break;

      default:
        console.error("Unknown event:", msg.event);
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
