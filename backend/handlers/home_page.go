package handlers

import (
	"database/sql"
	"net/http"
)

func Home_page(w http.ResponseWriter, r *http.Request , db *sql.DB) {
	if r.URL.Path != "/" {
		return
	}
	if r.Method != http.MethodGet {
		return
	}



	
	
}
