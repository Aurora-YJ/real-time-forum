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
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err = db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	if err = createDatabase(db); err != nil {
		return nil, fmt.Errorf("error creating database schema: %w", err)
	}

	return db, nil
}

func createDatabase(db *sql.DB) error {
	file, err := os.Open("database/sql.sql")
	if err != nil {
		return fmt.Errorf("failed to open SQL file: %w", err)
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		return fmt.Errorf("failed to read SQL file: %w", err)
	}

	queries := strings.Split(string(data), ";")

	for i, query := range queries {
		query = strings.TrimSpace(query)
		if query != "" {
			_, err := db.Exec(query)
			if err != nil {
				return fmt.Errorf("error executing query #%d:\n%s\nerror: %w", i+1, query, err)
			}
		}
	}

	return nil
}
