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
			controllers.Response("unauthorized", 403, w)
			return
		}
		var userId int
		var userName string
		var expired time.Time
		err = db.QueryRow("SELECT ID, Nickname ,Expired FROM Users WHERE Session=?", cookie.Value).Scan(&userId, &userName, &expired)
		if err != nil {
			fmt.Println("hiii", err)
			err = db.Ping()
			if err != nil {
				fmt.Println("hello jhgkfjhgkf", err)
			}

		}
		if userId == 0 {
			controllers.Response("unauthorized", 403, w)
			fmt.Println("hi youssef hhhh")
			return
		}

		if time.Now().UTC().After(expired.UTC()) {
			db.Exec("UPDATE users set Session=? WHERE ID=?", "", userId)
			controllers.Response("unauthorized", 403, w)
			return
		}
		ctx := context.WithValue(r.Context(), "userId", userId)
		ctx = context.WithValue(ctx, "userName", userName)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
