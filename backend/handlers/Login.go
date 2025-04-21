package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"forum/backend/controllers"
	"forum/backend/models"
	"forum/utils"
)

type Userlog struct {
	Nicknameoremail string `json:"nameOrEmail"`
	Password        string `json:"password"`
	ConPassword     string `json:"confpassword"`
}

func Login(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	if r.Method != http.MethodPost {
		controllers.Response("Method Not Allowed...", 405, w)
		return
	}

	// Parse JSON from request body
	var userlog Userlog
	err := json.NewDecoder(r.Body).Decode(&userlog)
	if err != nil {
		controllers.Response("Invalid JSON...", 40., w)
		return
	}
	if utils.ContainsEmpty(userlog.Nicknameoremail, userlog.Password, userlog.ConPassword) {
		controllers.Response("Please fill in all fields before continuing...", 405, w)
		return
	}

	if userlog.Password != userlog.ConPassword {
		controllers.Response("Passwords do not match...", 405, w)
		return
	}

	msg , code, err := models.UserExists(userlog.Nicknameoremail, userlog.Password, db)
	if err != nil {
		controllers.Response("error in the server...", 500, w)
		fmt.Println("error to login---->", err)
		return
	}

	controllers.Response(msg, code, w)
}
