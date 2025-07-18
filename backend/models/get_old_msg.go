package models

import (
	"database/sql"
	"log"
	"time"
)

type Message struct {
	ID               int
	Sender           int
	SenderNickname   string
	Receiver         int
	ReceiverNickname string
	Content          string
	DateCreation     time.Time
}

func GetOldMsg(from int, to int, db *sql.DB) ([]Message, error) {
	query := `SELECT
	            c.ID,
	            c.Sender,
				s.Nickname AS senderName,
				c.Receiver,
				r.Nickname AS receiverName,
				c.Content,
				c.DateCreation
			FROM Chat c
			JOIN Users s ON s.ID = c.Sender
			JOIN Users r ON r.ID = c.Receiver
			WHERE (c.Sender = ? AND c.Receiver = ?) OR (c.Sender = ? AND c.Receiver = ?)
			ORDER BY c.DateCreation ASC
	`

	rows, err := db.Query(query, from, to, to, from)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []Message
	for rows.Next() {
		var msg Message
		err := rows.Scan(&msg.ID ,&msg.Sender, &msg.SenderNickname, &msg.Receiver, &msg.ReceiverNickname, &msg.Content, &msg.DateCreation)
		if err != nil {
			log.Println("Scan error:", err)
			continue
		}
		messages = append(messages, msg)
	}

	return messages, nil
}
