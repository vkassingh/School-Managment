const pool = require('../config/db');  

//Define student class to handle student data operation

class Student {

    //Static method to create student table it not exists
 static async createTable(){
  
    //sql query to create table
    const sql= `CREATE TABLE IF NOT EXISTS students (
    
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    enrollment_date DATE 
  )
    
    `;

    //execute the above query
    await pool.query(sql);

 }

 //static method to create a new student record
 static async create(student) {
   const sql = `
     INSERT INTO students (first_name, last_name, email, enrollment_date)
     VALUES (?, ?, ?, ?)
   `;
   const [result] = await pool.query(sql, [
     student.firstName,
     student.lastName,
     student.email,
     student.enrollmentDate
   ]);
   return result.insertId;
 }

 //static method to retireve all students
 static async findAll(){
    //execute query to get all students
    const [rows]= await pool.query('SELECT * FROM students');

    //return array of records
    return rows;
 }

 //static method to finda student by ID
 static async findById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM students WHERE student_id = ?', [id]);

        //return single student object
        return rows[0];
 } 

 //static method to update studdent record
 static async update(id, updates){

    //sql query update record
    const sql = ` 
    UPDATE students
    SET first_name = ?, last_name =?, emai = ?, enrollment_date= ?
    WHERE student_id =?
    `;

    //execute the query with new values
    await pool.query(sql, [
      updates.firstName,
      updates.lastName,
      updates.email,
      updates.enrollmentDate,
      id

    ]);

 }


 //static method to delete a record
 static async delete(id){
    
    //execute the delete query directly
    await pool.query('DELETE from students WHERE student_id =?', [id]);
 }

}

//export the student class in other modules
module.exports = Student;