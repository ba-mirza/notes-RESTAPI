import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const sqlOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const pool = mysql.createPool(sqlOptions).promise();

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;
}

export async function getNote(id) {
  const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ${id}`);
  return rows;
}

export async function createNote(title, contents) {
  const [result] = await pool.query(
    `INSERT INTO notes (title, contents) VALUES (?, ?)`,
    [title, contents]
  );
  const id = await result.insertId;
  return getNote(id);
}
