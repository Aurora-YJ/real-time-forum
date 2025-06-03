package models

import (
	"database/sql"
)

func InsertPost(Title, Content string, userID int, db *sql.DB) (int, error) {
	res, err := db.Exec("INSERT INTO Posts (Title , Content,  ID_User ) VALUES(?,?,?)", Title, Content, userID)
	if err != nil {
		return 0, err
	}

	lastID, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(lastID), nil
}
