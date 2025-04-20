package utils

import "strings"

func ContainsEmpty(fields ...string) bool {
	for _, field := range fields {
		if strings.TrimSpace(field) == "" {
			return true
		}
	}
	return false
}
