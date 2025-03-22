import React, { useState, useEffect } from 'react';

function App() {
  // Stati principali
  const [patients, setPatients] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [newPatient, setNewPatient] = useState({
    name: '',
    surname: '',
    birthDate: '',
    gender: '',
    analgesiaType: '',
    painLevel: ''
  });

  // Salva i pazienti nel localStorage
  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  // Aggiorna localStorage quando patients cambia
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  // Vista Home
  const HomeView = () => (
    <div className="container">
      <h1>Gestione Pazienti</h1>
      <div className="buttons">
        <button 
          onClick={() => setCurrentView('new')}
          className="button-primary"
        >
          Nuovo Paziente
        </button>
        <button 
          onClick={() => setCurrentView('list')}
          className="button-secondary"
        >
          Lista Pazienti ({patients.length})
        </button>
      </div>
    </div>
  );

  // Form Nuovo Paziente
  const NewPatientForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const patientToAdd = {
        ...newPatient,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      setPatients(prevPatients => [...prevPatients, patientToAdd]);
      setNewPatient({
        name: '',
        surname: '',
        birthDate: '',
        gender: '',
        analgesiaType: '',
        painLevel: ''
      });
      setCurrentView('list');
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewPatient(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <div className="container">
        <h2>Nuovo Paziente</h2>
        <form onSubmit={handleSubmit} className="form">
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
              value={newPatient.surname}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Data di Nascita:</label>
            <input
              type="date"
              name="birthDate"
              value={newPatient.birthDate}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Sesso:</label>
            <select
              name="gender"
              value={newPatient.gender}
              onChange={handleInputChange}
              required
              className="select-field"
            >
              <option value="">Seleziona...</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tipo Analgesia:</label>
            <select
              name="analgesiaType"
              value={newPatient.analgesiaType}
              onChange={handleInputChange}
              required
              className="select-field"
            >
              <option value="">Seleziona...</option>
              <option value="PCA">PCA</option>
              <option value="Peridurale">Peridurale</option>
              <option value="Blocco">Blocco One Shot</option>
            </select>
          </div>

          <div className="buttons">
            <button type="submit" className="button-primary">
              Salva Paziente
            </button>
            <button 
              type="button" 
              onClick={() => setCurrentView('home')}
              className="button-secondary"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Lista Pazienti
  const PatientList = () => {
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('it-IT');
    };

    return (
      <div className="container">
        <h2>Lista Pazienti</h2>
        {patients.length === 0 ? (
          <div className="empty-state">
            <p>Nessun paziente registrato</p>
            <button 
              onClick={() => setCurrentView('new')}
              className="button-primary"
            >
              Aggiungi Paziente
            </button>
          </div>
        ) : (
          <div className="patient-list">
            {patients.map(patient => (
              <div key={patient.id} className="patient-card">
                <div className="patient-card-header">
                  <h3>{patient.name} {patient.surname}</h3>
                </div>
                <div className="patient-card-body">
                  <p><strong>Data di nascita:</strong> {formatDate(patient.birthDate)}</p>
                  <p><strong>Sesso:</strong> {patient.gender}</p>
                  <p><strong>Tipo analgesia:</strong> {patient.analgesiaType}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="buttons">
          <button 
            onClick={() => setCurrentView('home')}
            className="button-secondary"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );
  };

  // Router principale
  return (
    <div className="app">
      {currentView === 'home' && <HomeView />}
      {currentView === 'new' && <NewPatientForm />}
      {currentView === 'list' && <PatientList />}
    </div>
  );
}

export default App;

