package models

import (
	"database/sql"
	"fmt"
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
	Status       string
}

func GetPosts(db *sql.DB) ([]Post, error) {
	var posts []Post

	query := `
	    SELECT
		    P.ID,
		    P.Title,
		    P.Content,
		    p.DateCreation,
		    U.Nickname
		FROM Posts P
		JOIN Users U ON U.ID = P.ID_User
	`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	for rows.Next() {
		var p Post
		err := rows.Scan(&p.ID, &p.Title, &p.Content, &p.CreataAt, &p.Creator)
		if err != nil {
			return nil, err
		}
		comments, err := FetchComment(p.ID, db)
		if err != nil {
			fmt.Println("here the error", err)
		}
		p.Comments = comments

		// Likes , Dislikes , err := FetchLikes
		posts = append(posts, p)
	}
	return posts, nil
}
