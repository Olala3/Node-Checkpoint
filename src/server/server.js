const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3010;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: 'postgres://lxsgynnf:qavuBKsGCqyUJo56TmQTL98Vk3rmsT3A@chunee.db.elephantsql.com/lxsgynnf',
  ssl: { rejectUnauthorized: false }
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    return;
  }

  console.log('Connected to PostgreSQL server');

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS Patients (
    PatientID SERIAL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    AppointmentTime  INT
  );
`;

  

  pool.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating Patients table:', err);
    } else {
      console.log('Patients table created successfully');
    }
  });
});

app.get("/patients", async (req, res) => {
  try {
    const query = "SELECT * FROM patients ;";
  
    const result = await pool.query(query);
    const patients = result.rows;
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/patients", async (req, res) => {
    const { name, surname, appointment} = req.body;
    console.log("Received addPatient");
    try {
      console.log(name,surname,appointment);
      const query = `INSERT INTO Patients (name, surname, AppointmentTime)
      VALUES ('${name}', '${surname}', ${appointment})`;
      console.log("inserting query is done");
      const result = await pool.query(query);
      console.log("Patient added successfully");
      res.status(201).json({ msg: "Added successfully" });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ msg: "Cannot add patient" });
    }
});
  

app.delete("/patients/:id", async (req, res) => {
  const patientId = req.params.id;
  console.log("Received deletePatient");
  try {
    const query = `DELETE FROM patients WHERE patientid = ${patientId}`;
    const result = await pool.query(query);
    console.log("Patient deleted successfully");
    res.status(200).json({ msg: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/patients/:id", async (req, res) => {
  const patientId = req.params.id;
  const { appointment  } = req.body;
  console.log("Received updateAppointmentTime ");
  try {
    const query = `UPDATE patients SET AppointmentTime  = ${appointment } WHERE patientid = ${patientId}`;
    const result = await pool.query(query);
    console.log("AppointmentTime  updated successfully");
    res.status(200).json({ msg: "AppointmentTime  updated successfully" });
  } catch (error) {
    console.error("Error updating AppointmentTime :", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log("Server has started at port", PORT);
  console.log(`You can go to the following link: http://localhost:${PORT}`);
});
