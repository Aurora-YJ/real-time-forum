package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

type Userlog struct {
	Nicknameoremail  string `json:"nameOrEmail"`
	Password    string `json:"password"`
	ConPassword string `json:"confpassword"`
}

func Login(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	if r.Method != http.MethodPost {
		// http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}


	// Parse JSON from request body
	var userlog Userlog
	err := json.NewDecoder(r.Body).Decode(&userlog)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid JSON", http.StatusBadRequest)

		return
	}
	fmt.Println("hiiiiiiiiii")
	// Just for testing: print the received data
	fmt.Println("<----------------------------------->")
	fmt.Println("<----------------------------------->")
	fmt.Println("Nickname:", userlog.Nicknameoremail)
	
	fmt.Println("Password:", userlog.Password)
	fmt.Println("ConPassword:", userlog.ConPassword)

	// Optionally send a success response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User registered successfully!"))
}
