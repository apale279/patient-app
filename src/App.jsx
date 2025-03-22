import React, { useState } from 'react';

function App() {
  const [patients, setPatients] = useState([]);
  const [currentView, setCurrentView] = useState('home');

  // Vista Home
  const HomeView = () => (
    <div className="container">
      <h1>Gestione Pazienti</h1>
      <div className="buttons">
        <button onClick={() => setCurrentView('new')}>
          Nuovo Paziente
        </button>
        <button onClick={() => setCurrentView('list')}>
          Lista Pazienti
        </button>
      </div>
    </div>
  );

  // Scegli quale vista mostrare
  return (
    <div className="app">
      {currentView === 'home' && <HomeView />}
    </div>
  );
}

export default App;
