package utils

import (
	"github.com/gofrs/uuid"
)

func GenerateToken() (string, error) {
	session, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	return session.String(), nil
}
