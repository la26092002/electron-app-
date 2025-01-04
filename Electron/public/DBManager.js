// public/DBManager.js
const Database = require("better-sqlite3");
const path = require("path");
const { app } = require("electron");

// If you're in dev mode, you can also do something like:
// const dbPath = path.join(__dirname, "..", "demo_tableeeee.db");

let dbPath;
if (process.env.NODE_ENV === "development") {
  dbPath = path.join(__dirname, "..", "demo_tableeeee.db");
} else {
  dbPath = path.join(process.resourcesPath, "demo_tableeeee.db");
}


const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

const createTables = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS buyer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS product (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      id_buyer INTEGER,
      pricePurchace REAL NOT NULL,
      priceSale REAL,
      description TEXT NOT NULL,
      date TEXT DEFAULT CURRENT_DATE,
      FOREIGN KEY (id_buyer) REFERENCES buyer(id)
    );

    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number_phone TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  db.exec(query);

  // Seed a default user if none exists
  const rowCount = db.prepare("SELECT COUNT(*) as count FROM user").get().count;
  if (rowCount === 0) {
    db.prepare(`
      INSERT INTO user (number_phone, password)
      VALUES ('0797792672', '123456789');
    `).run();
  }
};

createTables();

module.exports = { db };
