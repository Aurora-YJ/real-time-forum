package database

import (
	"database/sql"
	"io"
	"os"

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
	if err!=nil{
		return nil ,err
	}
	return db, nil
}

func creat_database(db *sql.DB) error {

	file, err := os.Open("database/sql.sql")
	if err != nil {
		return err
	}

	data, err := io.ReadAll(file)
	datastring := string(data)
	_, err = db.Exec(datastring)
	if err != nil {
		return err
	}
	return nil
}
