package models

import (
	"database/sql"
	"fmt"
)

func InsertCategory(c string, postid int, db *sql.DB) error {

	var id int
	err := db.QueryRow(`SELECT ID FROM Category WHERE Name_Category = ?`, c).Scan(&id)
	if err != nil {
		return err
	}

	fmt.Println(",,,hjk")
	_, err = db.Exec("INSERT INTO Post_Category (ID_Post,  ID_Category) VALUES(?,?)", postid, id)
	if err != nil {
		return err
	}
	return nil
}
