import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // 1. Setup State for ALL sensors (Old + New)
  const [sensors, setSensors] = useState({
    // --- Existing Fields ---
    temperature: 0,      // V1
    humidity: 0,         // V2
    weight: 0.0,         // V3
    isCrying: 0,         // V4
    isWet: 0,            // V5
    swingStatus: 0,      // V6
    tiltStatus: 0,       // V7
    deviceMode: 0,       // V8
    babyMood: "Unknown", // V9
    heartRate: 0,        // V10

    // --- NEW Fields: Disease Detection ---
    jaundice: "Normal",     // V11 (String)
    hypothermia: "Normal",  // V12 (String)
    fever: "Normal",        // V13 (String)

    // --- NEW Fields: Mechanics ---
    swingAngle: 0,          // V14 (Number)
    musicStatus: 0          // V15 (0=Off, 1=On)
  });

  // 2. YOUR BLYNK TOKEN
  const BLYNK_TOKEN = "CUz9Q6wD6tdLP06t2NW-T3dbfxul_VkZ";

  // 3. Function to fetch REAL data from Blynk API
  const fetchData = async () => {
    try {
      // Requesting V1 to V15
      const response = await fetch(`https://blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&v1&v2&v3&v4&v5&v6&v7&v8&v9&v10&v11&v12&v13&v14&v15`);

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      console.log("Blynk Data:", data);

      setSensors({
        temperature: data.v1 || 0,
        humidity: data.v2 || 0,
        weight: data.v3 || 0,
        isCrying: data.v4 || 0,
        isWet: data.v5 || 0,
        swingStatus: data.v6 || 0,
        tiltStatus: data.v7 || 0,
        deviceMode: data.v8 || 0,
        babyMood: data.v9 || "Detecting...",
        heartRate: data.v10 || 0,

        // New Data Mapping
        jaundice: data.v11 || "Normal",
        hypothermia: data.v12 || "Normal",
        fever: data.v13 || "Normal",
        swingAngle: data.v14 || 0,
        musicStatus: data.v15 || 0
      });

    } catch (error) {
      console.error("Error fetching Blynk data:", error);
    }
  };

  // 4. Auto-refresh data every 2 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-page container">
      <h1 className="text-center">Live Health Monitor</h1>
      <p className="text-center" style={{ marginBottom: '40px', color: '#666' }}>
        Real-time data from CradleCare Hardware
      </p>

      {/* --- ALERT BANNERS --- */}
      {Number(sensors.isCrying) === 1 && (
        <div className="alert-banner cry-alert"><i className="fas fa-bell"></i> ALERT: Baby is Crying!</div>
      )}
      {Number(sensors.isWet) === 1 && (
        <div className="alert-banner wet-alert"><i className="fas fa-droplet"></i> ALERT: Bedding is Wet.</div>
      )}
      {Number(sensors.tiltStatus) === 1 && (
        <div className="alert-banner tilt-alert"><i className="fas fa-triangle-exclamation"></i> WARNING: Unsafe Tilt!</div>
      )}

      {/* --- SECTION 1: VITALS & ENVIRONMENT (Existing) --- */}
      <div className="section-header">
        <h2><i className="fas fa-heart-pulse"></i> Vitals & Environment</h2>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="icon-box heart-icon"><i className="fas fa-heart-pulse"></i></div>
          <div className="stat-info">
            <h3>Heart Rate</h3>
            <div className="value">{sensors.heartRate} BPM</div>
            <span className="status">Live Vitals</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-box temp-icon"><i className="fas fa-temperature-half"></i></div>
          <div className="stat-info">
            <h3>Temperature</h3>
            <div className="value">{sensors.temperature}°C</div>
            <span className="status">Room Temp</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-box humidity-icon"><i className="fas fa-wind"></i></div>
          <div className="stat-info">
            <h3>Humidity</h3>
            <div className="value">{sensors.humidity}%</div>
            <span className="status">Room Humidity</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon-box weight-icon"><i className="fas fa-weight-hanging"></i></div>
          <div className="stat-info">
            <h3>Baby Weight</h3>
            <div className="value">{sensors.weight} kg</div>
            <span className="status">Load Cell</span>
          </div>
        </div>

        {/* Baby Mood */}
        <div className="stat-card">
          <div className="icon-box mood-icon">
            <i className="fas fa-face-smile"></i>
          </div>
          <div className="stat-info">
            <h3>Baby Mood</h3>
            <div className="value" style={{ fontSize: '20px' }}>{sensors.babyMood}</div>
            <span className="status">AI Webcam</span>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: DISEASE DETECTION (New) --- */}
      <div className="section-header">
        <h2><i className="fas fa-user-doctor"></i> Disease Detection</h2>
      </div>

      <div className="dashboard-grid">
        {/* Jaundice */}
        <div className="stat-card">
          <div className="icon-box jaundice-icon">
            <i className="fas fa-eye"></i>
          </div>
          <div className="stat-info">
            <h3>Jaundice</h3>
            <div className="value" style={{ fontSize: '22px' }}>{sensors.jaundice}</div>
            <span className="status">Skin Analysis</span>
          </div>
        </div>

        {/* Hypothermia */}
        <div className="stat-card">
          <div className="icon-box hypothermia-icon">
            <i className="fas fa-snowflake"></i>
          </div>
          <div className="stat-info">
            <h3>Hypothermia</h3>
            <div className="value" style={{ fontSize: '22px' }}>{sensors.hypothermia}</div>
            <span className="status">Body Temp Check</span>
          </div>
        </div>

        {/* Fever */}
        <div className="stat-card">
          <div className="icon-box fever-icon">
            <i className="fas fa-fire"></i>
          </div>
          <div className="stat-info">
            <h3>Fever</h3>
            <div className="value" style={{ fontSize: '22px' }}>{sensors.fever}</div>
            <span className="status">Thermal Scan</span>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: SWING MECHANICS & CONTROL (New) --- */}
      <div className="section-header">
        <h2><i className="fas fa-sliders"></i> Cradle Mechanics</h2>
      </div>

      <div className="dashboard-grid">
        {/* Swing Degree */}
        <div className="stat-card">
          <div className="icon-box angle-icon">
            <i className="fas fa-ruler-combined"></i>
          </div>
          <div className="stat-info">
            <h3>Swing Degree</h3>
            <div className="value">{sensors.swingAngle}°</div>
            <span className="status">Current Angle</span>
          </div>
        </div>

        {/* Music Play */}
        <div className="stat-card">
          <div className="icon-box music-icon">
            <i className="fas fa-music"></i>
          </div>
          <div className="stat-info">
            <h3>Music Play</h3>
            <div className="value">{Number(sensors.musicStatus) === 1 ? "Playing" : "Stopped"}</div>
            <span className="status">Lullaby System</span>
          </div>
        </div>

        {/* Existing Swing Status */}
        <div className="stat-card">
          <div className="icon-box swing-icon"><i className="fas fa-arrows-left-right"></i></div>
          <div className="stat-info">
            <h3>Auto Swing</h3>
            <div className="value">{Number(sensors.swingStatus) === 1 ? "ON" : "OFF"}</div>
            <span className="status">Motor Status</span>
          </div>
        </div>

        {/* Device Mode */}
        <div className="stat-card">
          <div className="icon-box mode-icon">
            <i className={Number(sensors.deviceMode) === 0 ? "fas fa-bed" : "fas fa-baby-carriage"}></i>
          </div>
          <div className="stat-info">
            <h3>Mode</h3>
            <div className="value">{Number(sensors.deviceMode) === 0 ? "Cradle" : "Stroller"}</div>
            <span className="status">Configuration</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;