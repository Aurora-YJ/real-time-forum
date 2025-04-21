package utils

import "time"

func GenerateDateNow() time.Time {
	return time.Now().UTC()
}


func GenerateExpiredTime(date time.Time) time.Time {
	return date.Add(time.Hour)
}