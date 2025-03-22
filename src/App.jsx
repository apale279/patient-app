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
    painLevel: ''
  });

  // Vista Home
  const HomeView = () => (
    <div className="container">
      <h1>Gestione Pazienti</h1>
      <div className="buttons">
        <button onClick={() => setCurrentView('new')}>Nuovo Paziente</button>
        <button onClick={() => setCurrentView('list')}>Lista Pazienti ({patients.length})</button>
      </div>
    </div>
  );

  // Form Nuovo Paziente
  const NewPatientForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      setPatients([...patients, { ...newPatient, id: Date.now() }]);
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

    return (
      <div className="container">
        <h2>Nuovo Paziente</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={newPatient.name}
              onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Cognome:</label>
            <input
              type="text"
              value={newPatient.surname}
              onChange={(e) => setNewPatient({...newPatient, surname: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Data di Nascita:</label>
            <input
              type="date"
              value={newPatient.birthDate}
              onChange={(e) => setNewPatient({...newPatient, birthDate: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Sesso:</label>
            <select
              value={newPatient.gender}
              onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
              required
            >
              <option value="">Seleziona...</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tipo Analgesia:</label>
            <select
              value={newPatient.analgesiaType}
              onChange={(e) => setNewPatient({...newPatient, analgesiaType: e.target.value})}
              required
            >
              <option value="">Seleziona...</option>
              <option value="PCA">PCA</option>
              <option value="Peridurale">Peridurale</option>
              <option value="Blocco">Blocco One Shot</option>
            </select>
          </div>
          <div className="buttons">
            <button type="submit">Salva Paziente</button>
            <button type="button" onClick={() => setCurrentView('home')}>Annulla</button>
          </div>
        </form>
      </div>
    );
  };

  // Lista Pazienti
  const PatientList = () => (
    <div className="container">
      <h2>Lista Pazienti</h2>
      {patients.length === 0 ? (
        <p>Nessun paziente registrato</p>
      ) : (
        <div className="patient-list">
          {patients.map(patient => (
            <div key={patient.id} className="patient-card">
              <h3>{patient.name} {patient.surname}</h3>
              <p>Data di nascita: {patient.birthDate}</p>
              <p>Tipo analgesia: {patient.analgesiaType}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setCurrentView('home')}>Torna alla Home</button>
    </div>
  );

  return (
    <div className="app">
      {currentView === 'home' && <HomeView />}
      {currentView === 'new' && <NewPatientForm />}
      {currentView === 'list' && <PatientList />}
    </div>
  );
}

export default App;
