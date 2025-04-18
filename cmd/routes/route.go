package routes

import (
	"database/sql"
	"forum/backend/handlers"
	"net/http"
)

func Handle_routers(db *sql.DB) {
	http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request)  {
		handlers.Home_page(w, r, db)
	})
	http.HandleFunc("/frontend/static/css", handlers.Handle_css)
}
