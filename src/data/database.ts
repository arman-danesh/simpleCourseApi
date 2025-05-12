// src/database.ts  
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to connect to the SQLite database
export const connectToDatabase = async () => {
  try {
    const db = await open({
      filename: './course.db',
      driver: sqlite3.Database,
    });

    // Log a success message if the connection was successful
    console.log('Connected to the database');

    return db;
  } catch (error) {
    // Log any errors that occur during the connection
    console.error('Error connecting to the database:', error);
    throw error; // Re-throw the error for handling further up the call stack
  }
};  