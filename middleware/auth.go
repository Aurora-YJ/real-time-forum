package middleware

import (
	"database/sql"
	"fmt"
	"net/http"
)

func CheckSession(next http.Handler, db *sql.DB) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("hi")
	})
}
