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
	CategoryPost string
	CountComment int
	Comments     []Comment
	Status       string
}

type category struct {
	IdCategory int
	NameCategory string
}

func GetPosts(db *sql.DB) ([]Post, error) {
	var posts []Post

	query := `
	    SELECT
		    P.ID,
		    P.Title,
		    P.Content,
		    p.DateCreation,
		    U.Nickname, 
			GROUP_CONCAT(c.Name_Category, ' #') AS Categories
		FROM Posts P
		JOIN Users U ON U.ID = P.ID_User
		JOIN Post_Category pc ON P.ID = pc.ID_Post
		JOIN Category c ON pc.ID_Category  = c.ID
		GROUP BY P.ID
	`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var p Post
		err := rows.Scan(&p.ID, &p.Title, &p.Content, &p.CreataAt, &p.Creator, &p.CategoryPost)
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
