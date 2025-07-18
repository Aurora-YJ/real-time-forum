package chat

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"forum/backend/models"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

var (
	connections = make(map[int][]*websocket.Conn)
	mut         = sync.Mutex{}
)

type ChatMessage struct {
	Event   string `json:"event"`
	From    int    `json:"from"`
	To      int    `json:"to"`
	Message string `json:"message"`
}

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
	_, alreadyConnected := connections[userID]
	connections[userID] = append(connections[userID], conn)
	mut.Unlock()

	if !alreadyConnected {
		users, err := getListUsers(userID, db)
		if err != nil {
			fmt.Println("error to get users list:", err)
		}
		sendusers(userID, "your_id", userID)
		sendusers(userID, "usersList", users)

		newUser := User{Id: userID}
		err = db.QueryRow("SELECT Nickname FROM Users WHERE ID=?", userID).Scan(&newUser.Nickname)
		if err == nil {
			BroadcastMessage(userID, "newUser", newUser)
		}

	}

	defer func() {
		CloseUserConnections(userID)
	}()

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}

		var m ChatMessage

		err = json.Unmarshal(msg, &m)
		if err != nil {
			fmt.Println("error parsing message:", err)
			continue
		}

		switch m.Event {
		    case "chatmsg":
		    	From := m.From
		    	To := m.To
		    	message := m.Message
		    	err := models.PutTheMsg(From, To, message, db)
		    	if err != nil {
		    		fmt.Println("error insert message:", err)
		    		continue
		    	}
		    case "get_old_chat":
		    	From := m.From
		    	To := m.To
				data , err := models.GetOldMsg(From, To, db)
				if err != nil {
					fmt.Println("error to get old messages:", err)
		    		continue
		    	}
				sendusers(userID, "All_chat", data)
		    default:
		    	fmt.Println("error ")
		}

	}
}

type msg struct {
	Event string `json:"event"`
	Data  any    `json:"data"`
}

func sendusers(userid int, event string, data any) {
	var message msg
	message.Event = event
	message.Data = data

	jsonData, err := json.Marshal(message)
	if err != nil {
		log.Println("Error marshaling message:", err)
		return
	}

	mut.Lock()
	defer mut.Unlock()

	for userID, conns := range connections {
		if userID == userid {
			for _, conn := range conns {
				err := conn.WriteMessage(websocket.TextMessage, jsonData)
				if err != nil {
					fmt.Printf("Error sending message to user %d: %v\n", userID, err)
				}
			}
		}
	}
}

func BroadcastMessage(userid int, event string, data any) {
	var message msg
	message.Event = event
	message.Data = data

	jsonData, err := json.Marshal(message)
	if err != nil {
		log.Println("Error marshaling message:", err)
		return
	}

	mut.Lock()
	defer mut.Unlock()

	for userID, conns := range connections {
		if userID != userid {
			for _, conn := range conns {
				err := conn.WriteMessage(websocket.TextMessage, jsonData)
				if err != nil {
					fmt.Printf("Error sending message to user %d: %v\n", userID, err)
				}
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

type User struct {
	Id       int
	Nickname string
}

func getListUsers(userID int, db *sql.DB) ([]User, error) {
	query := `SELECT
			 u.ID,
			 u.Nickname
		  FROM Users u
		  WHERE u.ID != ?
		  ORDER BY u.ID DESC
		`

	row, err := db.Query(query, userID)
	if err != nil {
		return nil, err
	}

	defer row.Close()

	var users []User

	for row.Next() {
		var u User

		err := row.Scan(&u.Id, &u.Nickname)
		if err != nil {
			return nil, err
		}

		users = append(users, u)
	}

	return users, nil
}
