import React, { useState, useEffect } from 'react';

function App() {
  // Stato principale per debugging
  const [debug, setDebug] = useState({
    lastAction: null,
    formSubmissions: 0,
    errors: []
  });

  // Stati dell'applicazione
  const [patients, setPatients] = useState(() => {
    // Recupera i pazienti dal localStorage se disponibili
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : [];
  });
  
  const [currentView, setCurrentView] = useState('home');
  
  const [newPatient, setNewPatient] = useState({
    name: '',
    surname: '',
    birthDate: '',
    gender: '',
    bmi: '',
    comorbidities: {
      hypertension: false,
      diabetes: false
    },
    analgesiaType: '',
    pcaDetails: {
      infusionType: '',
      continuousRate: '',
      bolusSize: '',
      maxBolusPerDay: ''
    },
    epiduralDetails: {
      vertebralLevel: '',
      catheterDepth: '',
      medication: '',
      infusionType: ''
    },
    blockDetails: {
      locations: [],
      medication: '',
      concentration: '',
      volume: ''
    }
  });

  // Salva i pazienti nel localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
    console.log('Pazienti salvati:', patients); // Debug log
  }, [patients]);

  // Componente Home
  const HomeView = () => (
    <div className="container">
      <h1>Gestione Pazienti</h1>
      <div className="debug-info">
        <small>Pazienti totali: {patients.length}</small>
        <small>Ultima azione: {debug.lastAction}</small>
      </div>
      <div className="buttons">
        <button onClick={() => {
          setCurrentView('new');
          setDebug(prev => ({...prev, lastAction: 'Clicked: Nuovo Paziente'}));
        }}>
          Nuovo Paziente
        </button>
        <button onClick={() => {
          setCurrentView('list');
          setDebug(prev => ({...prev, lastAction: 'Clicked: Lista Pazienti'}));
        }}>
          Lista Pazienti ({patients.length})
        </button>
      </div>
    </div>
  );

  // Form Nuovo Paziente con gestione errori
  const NewPatientForm = () => {
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
      const errors = {};
      if (!newPatient.name) errors.name = 'Nome richiesto';
      if (!newPatient.surname) errors.surname = 'Cognome richiesto';
      if (!newPatient.birthDate) errors.birthDate = 'Data di nascita richiesta';
      if (!newPatient.gender) errors.gender = 'Sesso richiesto';
      if (!newPatient.analgesiaType) errors.analgesiaType = 'Tipo di analgesia richiesto';
      return errors;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submission attempt', newPatient); // Debug log

      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setDebug(prev => ({
          ...prev, 
          lastAction: 'Form Error',
          errors: Object.values(errors)
        }));
        return;
      }

      const patientToAdd = {
        ...newPatient,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'in carico',
        evaluations: []
      };

      setPatients(prev => [...prev, patientToAdd]);
      setDebug(prev => ({
        ...prev,
        lastAction: 'Patient Added',
        formSubmissions: prev.formSubmissions + 1
      }));

      // Reset form
      setNewPatient({
        name: '',
        surname: '',
        birthDate: '',
        gender: '',
        bmi: '',
        comorbidities: {
          hypertension: false,
          diabetes: false
        },
        analgesiaType: '',
        pcaDetails: {
          infusionType: '',
          continuousRate: '',
          bolusSize: '',
          maxBolusPerDay: ''
        },
        epiduralDetails: {
          vertebralLevel: '',
          catheterDepth: '',
          medication: '',
          infusionType: ''
        },
        blockDetails: {
          locations: [],
          medication: '',
          concentration: '',
          volume: ''
        }
      });
      setFormErrors({});
      setCurrentView('list');
    };

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      console.log('Input change:', { name, value, type }); // Debug log

      if (name.includes('.')) {
        // Gestione campi nested
        const [parent, child] = name.split('.');
        setNewPatient(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === 'checkbox' ? checked : value
          }
        }));
      } else {
        // Gestione campi diretti
        setNewPatient(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      }
    };

    return (
      <div className="container">
        <h2>Nuovo Paziente</h2>
        {Object.keys(formErrors).length > 0 && (
          <div className="error-box">
            {Object.values(formErrors).map((error, index) => (
              <p key={index} className="error-message">{error}</p>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={newPatient.name}
              onChange={handleInputChange}
              className={formErrors.name ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label>Cognome:</label>
            <input
              type="text"
              name="surname"
              value={newPatient.surname}
              onChange={handleInputChange}
              className={formErrors.surname ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label>Data di Nascita:</label>
            <input
              type="date"
              name="birthDate"
              value={newPatient.birthDate}
              onChange={handleInputChange}
              className={formErrors.birthDate ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label>Sesso:</label>
            <select
              name="gender"
              value={newPatient.gender}
              onChange={handleInputChange}
              className={formErrors.gender ? 'error' : ''}
            >
              <option value="">Seleziona...</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className="form-group">
            <label>BMI:</label>
            <input
              type="number"
              name="bmi"
              value={newPatient.bmi}
              onChange={handleInputChange}
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label>Comorbidità:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="comorbidities.hypertension"
                  checked={newPatient.comorbidities.hypertension}
                  onChange={handleInputChange}
                />
                Ipertensione
              </label>
              <label>
                <input
                  type="checkbox"
                  name="comorbidities.diabetes"
                  checked={newPatient.comorbidities.diabetes}
                  onChange={handleInputChange}
                />
                Diabete
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Tipo Analgesia:</label>
            <select
              name="analgesiaType"
              value={newPatient.analgesiaType}
              onChange={handleInputChange}
              className={formErrors.analgesiaType ? 'error' : ''}
            >
              <option value="">Seleziona...</option>
              <option value="PCA">PCA</option>
              <option value="Peridurale">Peridurale</option>
              <option value="Blocco">Blocco One Shot</option>
            </select>
          </div>

          {/* Campi condizionali basati sul tipo di analgesia */}
          {newPatient.analgesiaType === 'PCA' && (
            <div className="conditional-fields">
              <h3>Dettagli PCA</h3>
              <div className="form-group">
                <label>Tipo di Infusione:</label>
                <select
                  name="pcaDetails.infusionType"
                  value={newPatient.pcaDetails.infusionType}
                  onChange={handleInputChange}
                >
                  <option value="">Seleziona...</option>
                  <option value="continuous">Infusione Continua</option>
                  <option value="bolus">Solo Bolo</option>
                  <option value="both">Infusione + Bolo</option>
                </select>
              </div>
              {(newPatient.pcaDetails.infusionType === 'continuous' || 
                newPatient.pcaDetails.infusionType === 'both') && (
                <div className="form-group">
                  <label>Velocità Infusione (mg/h):</label>
                  <input
                    type="number"
                    name="pcaDetails.continuousRate"
                    value={newPatient.pcaDetails.continuousRate}
                    onChange={handleInputChange
