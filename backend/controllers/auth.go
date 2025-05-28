package controllers

import (
	"fmt"
	"net/http"
)

func Auth(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hi")
	Response("able", http.StatusOK, w)
}
