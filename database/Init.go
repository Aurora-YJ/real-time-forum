package database

import (
	"database/sql"
	"fmt"
	"io"
	"os"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)

func Init() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "database/rtforum.db")
	if err != nil {
		return nil, err
	}
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	err = creat_database(db)
	if err != nil {
		return nil, err
	}
	return db, nil
}

func creat_database(db *sql.DB) error {
	file, err := os.Open("database/sql.sql")
	if err != nil {
		return err
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		return err
	}

	// افصل الجمل باستخدام ;
	queries := strings.Split(string(data), ";")

	for _, query := range queries {
		query = strings.TrimSpace(query)
		if query != "" {
			_, err := db.Exec(query)
			if err != nil {
				return fmt.Errorf("error executing query: %s\n%w", query, err)
			}
		}
	}
	return nil
}
