// Load environment variables from .env file into process.env
require('dotenv').config();

// Import required libraries and models
const mysql = require('mysql2/promise'); // MySQL driver with promise support
const Student = require('../models/Student'); // Student model
const Course = require('../models/Course'); // Course model

// Main function to initialize the database
async function initializeDatabase() {
  let connection; // Declare connection variable outside try block for finally access
  
  try {
    // 1. Connect to MySQL server using credentials from .env
    connection = await mysql.createConnection({
      host: process.env.DB_HOST, // Database server host
      user: process.env.DB_USER, // Database username
      password: process.env.DB_PASSWORD // Database password
    });
    console.log('Successfully connected to MySQL server');

    // 2. Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database "${process.env.DB_NAME}" created or already exists`);

    // 3. Create all required tables using model methods
    await Student.createTable(); // Create students table
    await Course.createTable(); // Create courses table
    console.log('All tables created successfully');

    // 4. Insert initial sample data into the tables
    await insertSampleData();
    console.log('Database initialization completed successfully');
    
  } catch (error) {
    // Handle any errors that occur during initialization
    console.error('Error initializing database:', error);
    throw error; // Re-throw error to indicate initialization failure
  } finally {
    // Ensure connection is closed whether initialization succeeds or fails
    if (connection) await connection.end();
  }
}

// Helper function to insert sample data into the database
async function insertSampleData() {
  try {
    // Insert sample student records
    await Student.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      enrollmentDate: '2023-09-01'
    });

    await Student.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      enrollmentDate: '2023-09-01'
    });

    // Insert sample course records
    await Course.create({
      courseName: 'Mathematics',
      instructor: 'Dr. Williams',
      credits: 3
    });

    await Course.create({
      courseName: 'Computer Science',
      instructor: 'Prof. Brown',
      credits: 4
    });

    console.log('Successfully inserted all sample data');
  } catch (error) {
    console.error('Error inserting sample data:', error);
    throw error; // Re-throw error to indicate sample data insertion failure
  }
}

// Execute the database initialization process
initializeDatabase()
  .then(() => console.log('Database setup completed'))
  .catch(err => console.error('Database setup failed:', err));