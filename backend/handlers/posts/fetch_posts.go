package posts

import (
	"database/sql"
	"fmt"
	"forum/backend/controllers"
	"forum/backend/models"
	"net/http"
)

func FetchPosts(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	if r.Method != http.MethodGet {
		controllers.Response("Method Not Allowed...", 405, w)
		return
	}

	posts, err := models.GetPosts(db)
	if err != nil {
		fmt.Println("herehhhhh", err)
		return
	}

	fmt.Println(posts)
}
