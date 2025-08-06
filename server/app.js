const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const db = require('./dbService'); //import the database service

const app = express(); //initialize dotenv to use environment variables
app.use(cors()); //enable CORS for all routes
app.use(express.json()); //be able to parse JSON bodies
app.use(express.urlencoded({ extended: false })); //to not add additional properties to the request object

//gets name and cc from index
app.post('/submit', async (req, res) => {
  const { textField, numberField } = req.body;

  // Server-side validation
  if (!textField || !numberField) {
    return res.status(400).json({ error: 'Both fields are required.' });
  }

  try {
    await db.saveCreditInfo(textField, numberField); // Save to database
    res.status(200).json({ message: 'Data received and processed' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});


//server running test
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});