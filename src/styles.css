import React, { useState } from 'react';

function App() {
  const [patients, setPatients] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [newPatient, setNewPatient] = useState({
    name: '',
    surname: '',
    birthDate: '',
    gender: '',
    analgesiaType: '',
    notes: ''
  });

  // Metodo per aggiornare solo i campi modificati del form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevState) => ({
      ...prevState, // Manteniamo il resto dello stato invariato
      [name]: value // Aggiorniamo solo il campo che è stato modificato
    }));
  };

  // Salvataggio del paziente
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const patientToAdd = {
      ...newPatient,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    setPatients((prevPatients) => [...prevPatients, patientToAdd]);
    setNewPatient({
      name: '',
      surname: '',
      birthDate: '',
      gender: '',
      analgesiaType: '',
      notes: ''
    });
    setCurrentView('list');
  };

  // Vista per aggiungere un nuovo paziente
  const NewPatientForm = () => (
    <div className="container">
      <h2>Nuovo Paziente</h2>
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={newPatient.name}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Cognome:</label>
          <input
            type="text"
            name="surname"
