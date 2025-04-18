package middleware

import (
	"database/sql"
	"fmt"
	"forum/backend/controllers"
	"net/http"
)

func CheckSession(next http.Handler, db *sql.DB) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("Token")
		if err != nil {
			controllers.Response("unable", 403, w)
			return
		}

		fmt.Println(cookie)

		next.ServeHTTP(w, r)
	})
}
