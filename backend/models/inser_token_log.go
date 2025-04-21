package models

import (
	"database/sql"
	"time"

	"forum/utils"
)

func InserTokenLog(Token, Nicknameoremail string, db *sql.DB) error {
	DateNow := utils.GenerateDateNow()
	Expired := utils.GenerateExpiredTime(DateNow)
	query := `UPDATE Users SET Session = ?, Expired = ? WHERE Nickname = ? OR Email = ?`

	_, err := db.Exec(query, Token, Expired.Format(time.DateTime), Nicknameoremail, Nicknameoremail)
	if err != nil {
		return err
	}
	return nil
}
