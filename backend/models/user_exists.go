package models

import "database/sql"

func UserExists(email , password string, db *sql.DB) (bool , error){
	query := `SELECT EXISTS(SELECT 1 FROM Users WHERE Email = ? LIMIT 1)`
	var help bool
	err := db.QueryRow(query, email).Scan(&help)
	if err != nil {
		return false , err
	}
	return help , nil
	
}