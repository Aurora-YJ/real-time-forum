package routes

import (
	"database/sql"
	"forum/backend/controllers"
	"forum/backend/handlers"
	"forum/middleware"
	"net/http"
)

func Handle_routers(db *sql.DB) {
	http.HandleFunc("/register", func (w http.ResponseWriter, r *http.Request)  {
		handlers.Register(w, r, db)
	})

	http.HandleFunc("/login", func (w http.ResponseWriter, r *http.Request)  {
		handlers.Login(w, r, db)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		handlers.Home_page(w, r, db)
	})
	http.HandleFunc("/auth", middleware.CheckSession(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			controllers.Auth(w, r)
		}), db))		
	http.HandleFunc("/frontend/static/css/", handlers.HandleStatic)
	http.HandleFunc("/frontend/static/js/", handlers.HandleStatic)

}
