package main

import (
	"fmt"
	"forum/cmd/routes"
	"forum/database"
	"log"
	"net/http"
)

func main() {
	db, err := database.Init()
	if err != nil {
		log.Fatal(err)
	}

	routes.Handlerouters(db)
	defer db.Close()

	fmt.Println("your serve on : http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("server error:", err)
	}

}