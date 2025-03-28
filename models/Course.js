const pool = require('../config/db');

class Course {

    static async createTable() {
        const sql= `CREATE TABLE IF NOT EXISTS courses(
        course_id INT AUTO_INCREMENT PRIMARY KEY,
        course_name VARCHAR(100) NOT NULL,
        instructor VARCHAR(100),
        credits INT
        )
        
        `;
        await pool.query(sql);
    }

    static async create(course){

     const sql = `
     INSERT INTO courses (course_name, instructor, credits)
     VALUES ( ?,?,?)
     `;

     const [result] = await pool.query(sql,  [
        course.courseName,
        course.instructor,
        course.credits
     ]);

      // Return the auto-generated ID of the newly created course

     return result.insertId;
    }

    static async findAll(){
        const [rows] = await pool.query('SELECT * FROM courses');
        return rows;

    }

    static async findById(id){
        const [rows]  = await pool.query(
            'SELECT * FROM courses WHERE course_id= ?',
        [id]);

        return rows[0];

    }
 
    static async update(id, updates){
        const sql= `
        UPDATE courses 
        SET course_name =?, instructor = ?, credits = ?
        WHERE course_id =?
        `;

        //execute the sql query to update the record
        await pool.query(sql, [
            updates.courseName,
            updates.instructor,
            updates.credits,

        ]);

    }

    static async delete(id){
     await pool.query('DELETE FROM courese where course_id= ?', [id]);

    }


}

module.exports = Course;