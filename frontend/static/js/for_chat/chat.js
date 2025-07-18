  import { AddUsersList , AddUserToList } from "./users_list.js"
  import {showChatMessage } from "./add_div_chat.js"
  export function showMsgUsr() {
    const socket = new WebSocket("ws://localhost:8080/chat");
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
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
        case "your_id":
          Addtheiduser(socket , msg.data);
          break;
        case "usersList":
          AddUsersList(socket , msg.data, currentUserId);
          break;

        case "newUser":
          AddUserToList(socket , msg.data , currentUserId);
          break;

    
        case "All_chat":
          showChatMessage(msg.data, currentUserId);
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



  let currentUserId = null; 
  function Addtheiduser(socket, id) {
    currentUserId = id;
    console.log("My user ID is:", currentUserId);
  }

