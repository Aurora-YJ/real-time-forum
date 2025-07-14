package chat

import (
	"database/sql"
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

type msg struct {
	Event string `json:"event"`
	Data  string `json:"data"`
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

var (
	connections = make(map[int][]*websocket.Conn)
	mut         = sync.Mutex{}
)

func HandleChat(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	rawID := r.Context().Value("userId")
	if rawID == nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	userID, ok := rawID.(int)
	if !ok {
		http.Error(w, "invalid user ID", http.StatusInternalServerError)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "error  in the conn", http.StatusInternalServerError)
		return
	}

	mut.Lock()
	connections[userID] = append(connections[userID], conn)
	mut.Unlock()

	defer func() {
		CloseUserConnections(userID)
	}()

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}

		fmt.Println("hh", string(msg))

		BroadcastMessage("hi from server")
		fmt.Println("------____>", connections)
	}
}


func BroadcastMessage(message string) {
	mut.Lock()
	defer mut.Unlock()

	for userID, conns := range connections {
		for _, conn := range conns {
			err := conn.WriteMessage(websocket.TextMessage, []byte(message))
			if err != nil {
				fmt.Printf("Error sending message to user %d: %v\n", userID, err)
				conn.Close()
			}
		}
	}
}



func CloseUserConnections(userID int) {
	mut.Lock()
	defer mut.Unlock()

	conns, ok := connections[userID]
	if !ok {
		return
	}

	for _, c := range conns {
		c.Close()
	}

	delete(connections, userID)
}
