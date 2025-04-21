package utils

import "regexp"

func Checkemail(email string) bool {
	Rgx := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return Rgx.MatchString(email)
}
