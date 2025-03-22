  // Form Nuovo Paziente
  const NewPatientForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      setPatients(prev => [...prev, { ...newPatient, id: Date.now() }]);
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
            />
          </div>
          <div className="form-group">
            <label>Sesso:</label>
            <select
              name="gender"
              value={newPatient.gender}
              onChange={handleInputChange}
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
              name="analgesiaType"
              value={newPatient.analgesiaType}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleziona...</option>
              <option value="PCA">PCA
