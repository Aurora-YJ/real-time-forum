package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	Nickname  string `json:"nickname"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Gender    string `json:"gender"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	ConPassword string `json:"confirmPassword"`
}

func Register(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	if r.Method != http.MethodPost {
		// http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse JSON from request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		// http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Just for testing: print the received data
	fmt.Println("<----------------------------------->")
	fmt.Println("<----------------------------------->")
	fmt.Println("Nickname:", user.Nickname)
	fmt.Println("First Name:", user.Firstname)
	fmt.Println("Last Name:", user.Lastname)
	fmt.Println("Gender:", user.Gender)
	fmt.Println("Email:", user.Email)
	fmt.Println("Password:", user.Password)
	fmt.Println("ConPassword:", user.ConPassword)

	// Optionally send a success response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User registered successfully!"))
}
