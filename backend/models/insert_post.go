package models

import "database/sql"

func InsertPost(Title, Content string, db *sql.DB) error {
	_ , err := db.Exec("INSERT INTO Posts (Title , Content) VALUES(?,?)", Title, Content)
	if err != nil {
		return err
	}
	return nil
}
