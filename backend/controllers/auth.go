package controllers

import (
	"net/http"
)

func Auth(w http.ResponseWriter, r *http.Request) {
	Response("able", http.StatusOK, w)
}
