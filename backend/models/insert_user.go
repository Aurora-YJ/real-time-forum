package models

import (
	"database/sql"
	"fmt"
	"net/http"
)

func InsertUser(w http.ResponseWriter, r *http.Request, db *sql.DB, Nickname, Firstname, Lastname, Gender, Email, Age, Password, ConPassword string) error {
	query := `
	INSERT INTO Users (
		Nickname,
		FirstName,
		LastName,
		Gender,
		Email,
		Age,
		PassWord,
		ConfirmPassword) VALUES (?, ?, ?, ?, ?, ?,?, ?);
`

	_, err := db.Exec(
		query,
		Nickname,
		Firstname,
		Lastname,
		Gender,
		Email,
		Age,
		Password,
		ConPassword,
	)

	if err != nil {
		return err
	}
    fmt.Println("llllllllllllllllll")
	return nil
}
