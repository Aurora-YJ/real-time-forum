package models

import (
	"database/sql"
	"time"
)

type Post struct {
	ID           int
	Title        string
	Content      string
	Creator      string
	CreataAt     time.Time
	Likes        int
	Dislikes     int
	CountComment int
	Comments     []Comment
	Status string
}

type Comment struct {
	Content string
}

func GetPosts(db *sql.DB) ([]Post, error) {
	var posts []Post

	query := `
	    SELCTE
		    P.ID,
		    P.Title,
		    P.Content,
		    p.DateCreation,
		    U.Nickname,
		FROM Posts
		JOIN Users U ON U.ID = P.ID_User
	`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	for rows.Next() {
		var p Post
		err := rows.Scan(&p.ID, &p.Title, &p.Content, &p.CreataAt)
		if err != nil {
			return nil, err
		}
		// comments, err := FetchComment(p.ID, db)


		// Likes , Dislikes , err := FetchLikes
	}
	return posts, nil
}
