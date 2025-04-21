package models

import (
	"database/sql"
	"fmt"

	"forum/utils"

	"golang.org/x/crypto/bcrypt"
)

func UserExists(EmailOrnackname, password string, db *sql.DB) (string, int, error) {
	DatabasePassword := ""
	if utils.Checkemail(EmailOrnackname) {
		query := `SELECT EXISTS(SELECT 1 FROM Users WHERE Email = ? LIMIT 1)`
		var help bool
		err := db.QueryRow(query, EmailOrnackname).Scan(&help)
		if err != nil {
			fmt.Println("database errors 1",err)
			return "", 500, err
		}

		query2 := `SELECT Password FROM Users WHERE Email = ?`

		errr := db.QueryRow(query2, EmailOrnackname).Scan(&DatabasePassword)
		if errr != nil {
			fmt.Println("database errors 2",errr)
			return "", 500, err
		}
		if (!help) || DatabasePassword == "" {
			return "You have to register...", 401, nil
		}
	} else {
		query := `SELECT EXISTS(SELECT 1 FROM Users WHERE Nickname = ? LIMIT 1)`
		var help bool
		err := db.QueryRow(query, EmailOrnackname).Scan(&help)
		if err != nil {
			fmt.Println("database errors 3",err)
			return "", 500, err
		}
		query2 := `SELECT Password FROM Users WHERE Nickname = ?`

		errr := db.QueryRow(query2, EmailOrnackname).Scan(&DatabasePassword)
		if errr != nil {
			fmt.Println("database errors 4",errr)
			return "", 500, err
		}
		if (!help) || DatabasePassword == "" {
			return "You have to register...", 401, nil
		}

	}

	if !checkpassword(DatabasePassword, password) {
		return "You have to register...", 401, nil
	}
	return "you loged successfully! :)", 200, nil
}

func checkpassword(DatabasePassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(DatabasePassword), []byte(password))
	return err == nil
}
