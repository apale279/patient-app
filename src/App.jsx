import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartLegend } from '@/components/ui';

const PatientManagementApp = () => {
  // Initial state for patients and view management
  const [patients, setPatients] = useState([{
    id: 1,
    name: "John",
    surname: "Doe",
    dateOfBirth: "1990-05-15",
    gender: "male",
    bmi: "24.5",
    comorbidities: {
      hypertension: true,
      diabetes: false
    },
    analgesiaType: "PCA",
    pcaDetails: {
      medication: "morphine",
      type: "both",
      infusionRate: "2",
      bolusSize: "1",
      maxBolusPerDay: "6"
    },
    status: "in carico",
    evaluations: [
      {
        timestamp: "2025-03-20T10:00",
        painLevel: 7,
        requestedBoluses: 8,
        deliveredBoluses: 6,
        fill: "hsl(var(--chart-1))"
      },
      {
        timestamp: "2025-03-20T16:00",
        painLevel: 5,
        requestedBoluses: 4,
        deliveredBoluses: 4,
        fill: "hsl(var(--chart-2))"
      },
      {
        timestamp: "2025-03-21T09:00",
        painLevel: 3,
        requestedBoluses: 2,
        deliveredBoluses: 2,
        fill: "hsl(var(--chart-3))"
      }
    ]
  }]);
  const [activeView, setActiveView] = useState('home');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Initial state for new patient form
  const initialFormState = {
    name: '',
    surname: '',
    dateOfBirth: '',
    gender: '',
    bmi: '',
    comorbidities: {
      hypertension: false,
      diabetes: false
    },
    analgesiaType: '',
    pcaDetails: {
      medication: 'morphine',
      type: '',
      infusionRate: '',
      bolusSize: '',
      maxBolusPerDay: ''
    },
    epiduralDetails: {
      medication: '',
      location: '',
      catheterDepth: '',
      type: '',
      infusionRate: '',
      bolusSize: '',
      maxBolusPerDay: ''
    },
    oneshotDetails: {
      locations: [],
      medication: '',
      concentration: '',
      volume: ''
    }
  };

  const [formData, setFormData] = useState(initialFormState);

  // Theme colors
  const colors = {
    primary: 'hsl(var(--primary))',
    muted: 'hsl(var(--muted))',
    card: 'hsl(var(--card))',
    cardForeground: 'hsl(var(--card-foreground))',
    background: 'hsl(var(--background))',
    border: 'hsl(var(--border))',
  };

  // Form input handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleComorbidityChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      comorbidities: {
        ...prev.comorbidities,
        [name]: checked
      }
    }));
  };

  const handlePCAChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      pcaDetails: {
        ...prev.pcaDetails,
        [name]: value
      }
    }));
  };

  const handleEpiduralChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      epiduralDetails: {
        ...prev.epiduralDetails,
        [name]: value
      }
    }));
  };

  const handleOneshotChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      oneshotDetails: {
        ...prev.oneshotDetails,
        [name]: value
      }
    }));
  };

  // Navigation component
  const Navigation = () => (
    <div className="flex justify-between items-center p-4 bg-card text-card-foreground shadow-sm mb-6">
      <h1 className="text-2xl font-bold">
        Patient Management
      </h1>
      <button
        onClick={() => {
          setActiveView('home');
          setFormData(initialFormState);
        }}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Home
      </button>
    </div>
  );

  // Home view component
  const HomeView = () => (
    <div className="p-4">
      <div className="grid md:grid-cols-2 gap-6">
        {/* New Patient Button */}
        <div 
          className="p-6 rounded-xl bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          onClick={() => setActiveView('newPatient')}
        >
          <h2 className="text-xl font-semibold mb-2">
            Add New Patient
          </h2>
          <p className="text-muted-foreground">
            Register a new patient in the system
          </p>
        </div>

        {/* Active Patients List */}
        <div className="p-6 rounded-xl bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Active Patients
          </h2>
          {patients.filter(p => p.status === 'in carico').length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">
              No active patients
            </p>
          ) : (
            <ul className="space-y-3">
              {patients
                .filter(p => p.status === 'in carico')
                .map(patient => (
                  <li 
                    key={patient.id}
                    className="p-4 rounded-lg bg-muted flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">
                        {patient.name} {patient.surname}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {patient.analgesiaType}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedPatient(patient);
                          setActiveView('evaluation');
                        }}
                        className="px-3 py-1 rounded text-sm bg-primary text-primary-foreground hover:opacity-90"
                      >
                        Add Evaluation
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPatient(patient);
                          setActiveView('viewEvaluations');
                        }}
                        className="px-3 py-1 rounded text-sm bg-muted-foreground text-muted hover:opacity-90"
                      >
                        View History
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );

  // Form input component
  const FormInput = ({ label, name, type = 'text', value, onChange, required = false }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 rounded-lg border bg-background"
      />
    </div>
  );

  // New Patient Form
  const NewPatientForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const newPatient = {
        ...formData,
        id: Date.now(),
        status: 'in carico',
        evaluations: []
      };
      setPatients(prev => [...prev, newPatient]);
      setFormData(initialFormState);
      setActiveView('home');
    };

    return (
      <div className="p-4 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-card text-card-foreground rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">
            New Patient Registration
          </h2>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border bg-background"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <FormInput
            label="BMI"
            name="bmi"
            type="number"
            value={formData.bmi}
            onChange={handleInputChange}
            required
          />

          {/* Comorbidities */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Comorbidities
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hypertension"
                  checked={formData.comorbidities.hypertension}
                  onChange={handleComorbidityChange}
                  className="mr-2"
                />
                <span className="text-muted-foreground">Hypertension</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="diabetes"
                  checked={formData.comorbidities.diabetes}
                  onChange={handleComorbidityChange}
                  className="mr-2"
                />
                <span className="text-muted-foreground">Diabetes</span>
              </label>
            </div>
          </div>

          {/* Analgesia Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Type of Analgesia
            </label>
            <select
              name="analgesiaType"
              value={formData.analgesiaType}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg border bg-background"
            >
              <option value="">Select type</option>
              <option value="PCA">PCA</option>
              <option value="epidural">Epidural</option>
              <option value="oneshot">One Shot Block</option>
            </select>
          </div>

          {/* Conditional PCA Fields */}
          {formData.analgesiaType === 'PCA' && (
            <div className="p-4 rounded-lg mb-6 bg-muted">
              <h3 className="font-medium mb-4">
                PCA Details (Morphine)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">PCA Type</label>
                  <select
                    name="type"
                    value={formData.pcaDetails.type}
                    onChange={handlePCAChange}
                    className="w-full p-3 rounded-lg border bg-background"
                  >
                    <option value="">Select type</option>
                    <option value="continuous">Continuous Infusion</option>
                    <option value="bolus">Bolus Only</option>
                    <option value="both">Continuous + Bolus</option>
                  </select>
                </div>

                {(formData.pcaDetails.type === 'continuous' || formData.pcaDetails.type === 'both') && (
                  <FormInput
                    label="Infusion Rate (mg/h)"
                    name="infusionRate"
                    type="number"
                    value={formData.pcaDetails.infusionRate}
                    onChange={handlePCAChange}
                  />
                )}

                {(formData.pcaDetails.type === 'bolus' || formData.pcaDetails.type === 'both') && (
                  <>
                    <FormInput
                      label="Bolus Size (mg)"
                      name="bolusSize"
                      type="number"
                      value={formData.pcaDetails.bolusSize}
                      onChange={handlePCAChange}
                    />
                    <FormInput
                      label="Maximum Boluses per Day"
                      name="maxBolusPerDay"
                      type="number"
                      value={formData.pcaDetails.maxBolusPerDay}
                      onChange={handlePCAChange}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Conditional Epidural Fields */}
          {formData.analgesiaType === 'epidural' && (
            <div className="p-4 rounded-lg mb-6 bg-muted">
              <h3 className="font-medium mb-4">
                Epidural Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Medication</label>
                  <select
                    name="medication"
                    value={formData.epiduralDetails.medication}
                    onChange={handleEpiduralChange}
                    className="w-full p-3 rounded-lg border bg-background"
                  >
                    <option value="">Select medication</option>
                    <option value="ropivacaine">Ropivacaine 0.2%</option>
                    <option value="ropivacaine_sufentanil">Ropivacaine + Sufentanil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location (Vertebral Space)</label>
                  <select
                    name="location"
                    value={formData.epiduralDetails.location}
                    onChange={handleEpiduralChange}
                    className="w-full p-3 rounded-lg border bg-background"
                  >
                    <option value="">Select location</option>
                    {['T12-L1', 'L1-L2', 'L2-L3', 'L3-L4', 'L4-L5', 'L5-S1'].map(space => (
                      <option key={space} value={space}>{space}</option>
                    ))}
                  </select>
                </div>

                <FormInput
                  label="Catheter Depth (cm)"
                  name="catheterDepth"
                  type="number"
                  value={formData.epiduralDetails.catheterDepth}
                  onChange={handleEpiduralChange}
                />

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    name="type"
                    value={formData.epiduralDetails.type}
                    onChange={handleEpiduralChange}
                    className="w-full p-3 rounded-lg border bg-background"
                  >
                    <option value="">Select type</option>
                    <option value="continuous">Continuous Infusion</option>
                    <option value="bolus">Bolus Only</option>
                    <option value="both">Continuous + Bolus</option>
                  </select>
                </div>

                {(formData.epiduralDetails.type === 'continuous' || formData.epiduralDetails.type === 'both') && (
                  <FormInput
                    label="Infusion Rate (ml/h)"
                    name="infusionRate"
                    type="number"
                    value={formData.epiduralDetails.infusionRate}
                    onChange={handleEpiduralChange}
                  />
                )}

                {(formData.epiduralDetails.type === 'bolus' || formData.epiduralDetails.type === 'both') && (
                  <>
                    <FormInput
                      label="Bolus Size (ml)"
                      name="bolusSize"
                      type="number"
                      value={formData.epiduralDetails.bolusSize}
                      onChange={handleEpiduralChange}
                    />
                    <FormInput
                      label="Maximum Boluses per Day"
                      name="maxBolusPerDay"
                      type="number"
                      value={formData.epiduralDetails.maxBolusPerDay}
                      onChange={handleEpiduralChange}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Conditional One Shot Block Fields */}
          {formData.analgesiaType === 'oneshot' && (
            <div className="p-4 rounded-lg mb-6 bg-muted">
              <h3 className="font-medium mb-4">
                One Shot Block Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Locations</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="femoral"
                        checked={formData.oneshotDetails.locations.includes('femoral')}
                        onChange={(e) => {
                          const newLocations = e.target.checked
                            ? [...formData.oneshotDetails.locations, 'femoral']
                            : formData.oneshotDetails.locations.filter(l => l !== 'femoral');
                          setFormData(prev => ({
                            ...prev,
                            oneshotDetails: {
                              ...prev.oneshotDetails,
                              locations: newLocations
                            }
                          }));
                        }}
                        className="mr-2"
                      />
                      <span>Femoral</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="sciatic"
                        checked={formData.oneshotDetails.locations.includes('sciatic')}
                        onChange={(e) => {
                          const newLocations = e.target.checked
                            ? [...formData.oneshotDetails.locations, 'sciatic']
                            : formData.oneshotDetails.locations.filter(l => l !== 'sciatic');
                          setFormData(prev => ({
                            ...prev,
                            oneshotDetails: {
                              ...prev.oneshotDetails,
                              locations: newLocations
                            }
                          }));
                        }}
                        className="mr-2"
                      />
                      <span>Sciatic</span>
                    </label>
                  </div>
                </div>

                <FormInput
                  label="Medication"
                  name="medication"
                  value={formData.oneshotDetails.medication}
                  onChange={handleOneshotChange}
                />

                <FormInput
                  label="Concentration (%)"
                  name="concentration"
                  type="number"
                  value={formData.oneshotDetails.concentration}
                  onChange={handleOneshotChange}
                />

                <FormInput
                  label="Volume (ml)"
                  name="volume"
                  type="number"
                  value={formData.oneshotDetails.volume}
                  onChange={handleOneshotChange}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 active:scale-95"
          >
            Register Patient
          </button>
        </form>
      </div>
    );
  };

  // Evaluation Form
  const EvaluationForm = () => {
    const [evaluationData, setEvaluationData] = useState({
      timestamp: new Date().toISOString().slice(0, 16),
      painLevel: '',
      requestedBoluses: '',
      deliveredBoluses: '',
      fill: "hsl(var(--chart-1))"
    });

    const handleEvaluationChange = (e) => {
      const { name, value } = e.target;
      setEvaluationData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedPatients = patients.map(p => {
        if (p.id === selectedPatient.id) {
          return {
            ...p,
            evaluations: [...p.evaluations, evaluationData]
          };
        }
        return p;
      });
      setPatients(updatedPatients);
      setActiveView('home');
    };

    return (
      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-card text-card-foreground rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">
            New Evaluation for {selectedPatient?.name} {selectedPatient?.surname}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Date and Time"
              name="timestamp"
              type="datetime-local"
              value={evaluationData.timestamp}
              onChange={handleEvaluationChange}
              required
            />

            <FormInput
              label="Pain Level (1-10)"
              name="painLevel"
              type="number"
              min="1"
              max="10"
              value={evaluationData.painLevel}
              onChange={handleEvaluationChange}
              required
            />

            {selectedPatient?.analgesiaType === 'PCA' && (
              <>
                <FormInput
                  label="Requested Boluses"
                  name="requestedBoluses"
                  type="number"
                  value={evaluationData.requestedBoluses}
                  onChange={handleEvaluationChange}
                  required
                />
                <FormInput
                  label="Delivered Boluses"
                  name="deliveredBoluses"
                  type="number"
                  value={evaluationData.deliveredBoluses}
                  onChange={handleEvaluationChange}
                  required
                />
                {evaluationData.deliveredBoluses && (
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="font-medium">
                      Total Morphine: {evaluationData.deliveredBoluses * selectedPatient.pcaDetails.bolusSize} mg
                    </p>
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 active:scale-95"
            >
              Save Evaluation
            </button>
          </form>
        </div>
      </div>
    );
  };

  // View Evaluations
  const ViewEvaluations = () => {
    if (!selectedPatient) return null;

    return (
      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-card text-card-foreground rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">
            Evaluations for {selectedPatient.name} {selectedPatient.surname}
          </h2>

          {selectedPatient.evaluations.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">
              No evaluations yet
            </p>
          ) : (
            <>
              {/* Pain Level Chart */}
              <div className="mb-6 p-4 rounded-lg bg-muted">
                <h3 className="font-medium mb-4">Pain Level History</h3>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedPatient.evaluations}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp"
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis domain={[0, 10]} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleString()}
                      />
                      <Line 
                        type="monotone"
                        dataKey="painLevel"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* Evaluations List */}
              <div className="space-y-4">
                {selectedPatient.evaluations.map((eval, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-muted"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(eval.timestamp).toLocaleString()}
                      </span>
                      <span className="font-medium">
                        Pain Level: {eval.painLevel}
                      </span>
                    </div>
                    {selectedPatient.analgesiaType === 'PCA' && (
                      <div className="space-y-1 mt-2">
                        <p>
                          Requested Boluses: {eval.requestedBoluses}
                        </p>
                        <p>
                          Delivered Boluses: {eval.deliveredBoluses}
                        </p>
                        <p className="font-medium">
                          Total Morphine: {eval.deliveredBoluses * selectedPatient.pcaDetails.bolusSize} mg
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {activeView === 'home' && <HomeView />}
      {activeView === 'newPatient' && <NewPatientForm />}
      {activeView === 'evaluation' && <EvaluationForm />}
      {activeView === 'viewEvaluations' && <ViewEvaluations />}
    </div>
  );
};

export default PatientManagementApp;
