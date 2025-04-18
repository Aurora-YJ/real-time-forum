package handlers

import (
	"database/sql"
	"net/http"
	"text/template"
)

func Home_page(w http.ResponseWriter, r *http.Request , db *sql.DB) {
	if r.URL.Path != "/" {
		return
	}
	if r.Method != http.MethodGet {
		return
	}
	tmpl , err := template.ParseFiles("frontend/views/index.html")
	if err != nil {
		return
	}

	tmpl.Execute(w, "hi")
}
