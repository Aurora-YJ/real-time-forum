package models

import "database/sql"

func InsertPost(Title, Content string,userID int, db *sql.DB) error {
	_ , err := db.Exec("INSERT INTO Posts (Title , Content,  ID_User ) VALUES(?,?,?)", Title, Content,  userID)
	if err != nil {
		return err
	}
	return nil
}
