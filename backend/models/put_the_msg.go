package models

import "database/sql"


func PutTheMsg(from int, to int , msg string, db *sql.DB) error {

	query := ` INSERT INTO Chat (Content, Sender, Receiver) VALUES (?,?,?)`

	_ , err := db.Exec(query, msg, from, to)
	if err != nil {
		return nil
	}

	return nil
}