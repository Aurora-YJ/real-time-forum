package middleware

import (
	"database/sql"
	"net/http"
)


func GetTheUser(w http.ResponseWriter , r *http.Request , db *sql.DB) (int,  error) {


	return 0 , nil
} 