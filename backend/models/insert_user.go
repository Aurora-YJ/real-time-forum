package models

import (
	"database/sql"
	"net/http"
)

func InsertUser(w http.ResponseWriter, r *http.Request, db *sql.DB, Nickname, Firstname, Lastname, Gender, Email, Age, Password, ConPassword, session, Expired string) error {
	query := `
	INSERT INTO Users ( Nickname, FirstName, LastName, Gender, Email, Age, PassWord, ConfirmPassword, Session, Expired) 
	VALUES (?, ?, ?, ?, ?, ?,?, ?, ?,?);
	`

	_, err := db.Exec(query, Nickname, Firstname, Lastname, Gender, Email, Age, Password, ConPassword, session, Expired)
	if err != nil {
		return err
	}

	return nil
}
