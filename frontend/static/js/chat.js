export   const socket = new WebSocket("ws://localhost:8080/chat");

export function showMsgUsr() {
  socket.onopen = () => {
    console.log("Connected to WebSocket server");
    socket.send("Hello from JavaScript!");
  };

  socket.onmessage = (event) => {
    console.log("Received from server:", event.data);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}


export function sendMsg(msg) {
    if (socket.readyState == WebSocket.OPEN) {
        socket.send(msg)
    } else {
            console.error("Socket is not open. readyState=", socket.readyState);
    }
}