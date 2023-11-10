import sqlite3, { Database } from "sqlite3";

const filePath: string =
  process.env.NODE_ENV === "test"
    ? "src/db/test_school.sqlite"
    : "src/db/school.sqlite";

const createDbConnection = () => {
  let db: Database = new sqlite3.Database(filePath, (error: Error | null) => {
    if (error) {
      return console.error(error.message);
    }
  });
  console.log("Connection with SQLite has been estabilished");
  db.exec(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        shift VARCHAR(50),
        year VARCHAR(50),
        room VARCHAR(50)
        );
        `);
  db.exec(`CREATE TABLE IF NOT EXISTS professionals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50),
            birthday VARCHAR(50),
            adress VARCHAR(50),
            role VARCHAR(50),
            shift VARCHAR(50),
            sector VARCHAR(50)
            );
            `);
  return db;
};

export { createDbConnection };
