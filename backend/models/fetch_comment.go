package models

import "database/sql"

type Comment struct {
	Content string
}

func FetchComment(postid int , db *sql.DB ) ([]Comment , error) {
	var comment []Comment
	query := `
	   SELECT Content
	   FROM Comment 
	   WHERE ID_Post = ?
	`

	rows , err := db.Query(query, postid)
	if err != nil {
		return nil , err
	}

	for rows.Next() {
		var c Comment
		err := rows.Scan(&c.Content)
		if err != nil {
			return nil , err
		}
		comment = append(comment, c)
	}
	return comment , nil
}