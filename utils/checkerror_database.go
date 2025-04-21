package utils

import "fmt"

func Checkerror_Database(errr error) string {
	str := errr.Error()
	fmt.Println("Error as string:", str)
	return str
}
