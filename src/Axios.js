import axios from "axios";
import React, { useState } from "react";

export default function Axios() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [appointment, setAppointment] = useState("");
    const [patientId, setPatientId] = useState("");
  
    const handleAddPatient = async () => {
      try {
        const response = await axios.post("http://localhost:3010/patients", {
          name,
          surname,
          appointment,
        });
        setName('');
        setSurname('');
        setAppointment('');

        console.log("Patient added successfully:", response.data);
      } catch (error) {
        console.error("Error adding patient:", error);
      }
    };
  
    const handleDeletePatient = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:3010/patients/${patientId}`
        );
        console.log("Patient deleted successfully:", response.data);
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    };
  
    const handleUpdateAppointment = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3010/patients/${patientId}`,
          {
            appointment,
          }
        );
        console.log("Appointment updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    };

    return (
        <div className="App-header">
            <h1>Hospital DataBase</h1>
            <label>Name:</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>Surname:</label>
            <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <label>Appointment:</label>
            <input
                value={appointment}
                onChange={(e) => setAppointment(e.target.value)}
            />
            <label>Patient ID:</label>
            <input
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
            />
            <div>
            <button onClick={handleAddPatient}>Add</button>
            <button onClick={handleDeletePatient}>Delete</button>
            <button onClick={handleUpdateAppointment}>Update</button>
            </div>
        </div>
        )
    
}