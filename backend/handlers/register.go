package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"forum/backend/controllers"
	"forum/backend/models"
	"forum/utils"
)

type User struct {
	Nickname    string `json:"nickname"`
	Firstname   string `json:"firstname"`
	Lastname    string `json:"lastname"`
	Gender      string `json:"gender"`
	Email       string `json:"email"`
	Age         string `json:"age"`
	Password    string `json:"password"`
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

	if utils.ContainsEmpty(user.Nickname, user.Firstname, user.Lastname, user.Gender, user.Email, user.Age, user.Password, user.ConPassword) {
		controllers.Response("Please fill in all fields before continuing...", 405, w)
		return
	}

	if user.Password != user.ConPassword {
		controllers.Response("Invalid email format...", 405, w)
		return
	}

	if !utils.Checkemail(user.Email) {
		controllers.Response("Invalid email format...", 405, w)
		return
	}

	Token, err := utils.GenerateToken()
	if err != nil {
		controllers.Response("error in the server...", 500, w)
		fmt.Println("error to generate token..<<--")
		return
	}

	DateCreation := utils.GenerateDateNow()
	Expired := utils.GenerateExpiredTime(DateCreation)

	err = models.InsertUser(w, r, db, user.Nickname, user.Firstname, user.Lastname, user.Gender, user.Email, user.Age, user.Password,
		user.ConPassword, Token, Expired.Format(time.DateTime))
	if err != nil {
		str := utils.Checkerror_Database(err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User registered successfully!"))
}
