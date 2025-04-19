package middleware

import (
	"context"
	"database/sql"
	"fmt"
	"forum/backend/controllers"
	"net/http"
	"time"
)

func CheckSession(next http.Handler, db *sql.DB) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("Token")
		if err != nil {
			controllers.Response("unable", 200, w)
			return
		}

		fmt.Println(cookie)
		var id int
		var nickname string
		var expired time.Time

		db.QueryRow("SELECT ID , Nickname , Expired FROM Users WHERE Session = ? ", cookie.Value).Scan(&id, &nickname, &expired)
		if id == 0 {
			controllers.Response("unable", 200, w)
			return
		}

		if time.Now().UTC().After(expired.UTC()) {
			db.Exec("UPDATE Users SET Session =? WHERE ID = ?", "", id)
			controllers.Response("unable", 200, w)
			return
		}
		ctx := r.Context()                             
		ctx = context.WithValue(ctx, "ID", id)             
		ctx = context.WithValue(ctx, "Nickname", nickname) 

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
