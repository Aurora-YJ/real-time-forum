package controllers

import (
	"encoding/json"
	"net/http"
)

func Response(msg any, code int, w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	Response := struct {
		Message any `json:"message"`
	}{
		Message: msg,
	}
	json.NewEncoder(w).Encode(Response)
}
