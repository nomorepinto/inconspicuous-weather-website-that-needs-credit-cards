const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({ //this is a pool
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise(); 

async function testConnection() {
    const [rows] = await db.query('SELECT * FROM ccinfo');
    return rows;
}

async function saveCreditInfo(name, cc_number) {
    try {
        const query = 'INSERT INTO ccinfo (name, cc_number) VALUES (?, ?)';
        const [result] = await db.query(query, [name, cc_number]);
        return result;
    } catch (error) {
        console.error('Error saving credit info:', error);
        throw error;
    }
}

module.exports = {
  saveCreditInfo
};