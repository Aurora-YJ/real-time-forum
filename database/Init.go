package database

import (
	"database/sql"
	"fmt"
	"io"
	"os"
	"strings"

	_ "github.com/mattn/go-sqlite3" 
)

// Init opens the SQLite database file and initializes the schema
func Init() (*sql.DB, error) {
	// Open a connection to the SQLite database file
	db, err := sql.Open("sqlite3", "database/rtforum.db")
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Ping to verify the connection is alive
	if err = db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Create the database schema by running SQL commands from file
	if err = createDatabase(db); err != nil {
		return nil, fmt.Errorf("error creating database schema: %w", err)
	}

	return db, nil
}

// createDatabase reads SQL statements from a file and executes them one by one
func createDatabase(db *sql.DB) error {
	// Open the SQL file containing schema creation commands
	file, err := os.Open("database/sql.sql")
	if err != nil {
		return fmt.Errorf("failed to open SQL file: %w", err)
	}
	defer file.Close()

	// Read the entire content of the SQL file
	data, err := io.ReadAll(file)
	if err != nil {
		return fmt.Errorf("failed to read SQL file: %w", err)
	}

	// Split the SQL content by semicolon to get individual queries
	queries := strings.Split(string(data), ";")

	// Execute each non-empty query
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
