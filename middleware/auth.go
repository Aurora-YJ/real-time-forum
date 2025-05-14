package middleware

import (
	"context"
	"database/sql"
	"fmt"
	"forum/backend/controllers"
	"net/http"
)

func CheckSession(next http.Handler, db *sql.DB) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("Token")
		if err != nil {
			fmt.Println("here--->", err)
			controllers.Response("unable", 400, w)
			return
		}
		var id int
		var nickname string

		err = db.QueryRow("SELECT ID, Nickname FROM Users WHERE Session = ?", cookie.Value).Scan(&id, &nickname)
		if err != nil {
			if err == sql.ErrNoRows {
				fmt.Println("الجلسة غير موجودة")
				controllers.Response("الجلسة غير موجودة", 401, w)
				return
			}
			fmt.Println("خطأ في قاعدة البيانات:", err)
			controllers.Response("خطأ في الخادم", 500, w)
			return
		}

		if id == 0 {
			fmt.Println("he youssef")
			controllers.Response("unable", 200, w)
			return
		}

		ctx := r.Context()
		ctx = context.WithValue(ctx, "ID", id)
		ctx = context.WithValue(ctx, "Nickname", nickname)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
