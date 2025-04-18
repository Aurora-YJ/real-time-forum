package handlers

import (
	"database/sql"
	"log"
	"net/http"
	"text/template"
)

func Home_page(w http.ResponseWriter, r *http.Request , db *sql.DB) {
	if r.URL.Path != "/" {
		// pageerror 404
		return
	}
	if r.Method != http.MethodGet {
		// pageerror 405
		return
	}
	
	tmpl , err := template.ParseFiles("frontend/views/index.html")
	if err != nil {
		// pageerror 500
		return
	}

	err = tmpl.Execute(w, "")
	if err != nil {
		// pageerror 500
		log.Fatal("error to serve html file...")
	}
}
