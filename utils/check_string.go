package utils

import "strings"

func Check_string(errorr, typee string) bool {
	if strings.Contains(errorr, typee) {
		return true
	} else {
		return false
	}
}
