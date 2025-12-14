import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // 1. Setup State for all your sensors
  const [sensors, setSensors] = useState({
    temperature: 0,      // V1
    humidity: 0,         // V2
    weight: 0.0,         // V3
    isCrying: 0,         // V4
    isWet: 0,            // V5
    swingStatus: 0       // V6
  });

  // 2. YOUR BLYNK TOKEN
  // ⚠️ PASTE YOUR TOKEN INSIDE THE QUOTES BELOW ⚠️
  const BLYNK_TOKEN = "CUz9Q6wD6tdLP06t2NW-T3dbfxul_VkZ";

  // 3. Function to fetch REAL data from Blynk API
  const fetchData = async () => {
    try {
      // We request values for Pins V1 to V6
      const response = await fetch(`https://blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&v1&v2&v3&v4&v5&v6`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      console.log("Blynk Data:", data); // Check console to see raw data

      setSensors({
        // Make sure these match the Virtual Pins in your Blynk App!
        temperature: data.v1 || 0,
        humidity: data.v2 || 0,
        weight: data.v3 || 0,
        isCrying: data.v4 || 0,
        isWet: data.v5 || 0,
        swingStatus: data.v6 || 0
      });

    } catch (error) {
      console.error("Error fetching Blynk data:", error);
    }
  };

  // 4. Auto-refresh data every 2 seconds
  useEffect(() => {
    fetchData(); // Run once immediately
    const interval = setInterval(fetchData, 2000); // Run every 2000ms (2s)
    return () => clearInterval(interval); // Cleanup on page exit
  }, []);

  return (
    <div className="dashboard-page container">
      <h1 className="text-center">Live Health Monitor</h1>
      <p className="text-center" style={{marginBottom: '40px', color: '#666'}}>
        Real-time data from CradleCare Hardware (Synced via Blynk IoT)
      </p>

      {/* ALERT BANNERS (Only show if active) */}
      {Number(sensors.isCrying) === 1 && (
        <div className="alert-banner cry-alert">
          <i className="fas fa-bell"></i> ALERT: Baby is Crying!
        </div>
      )}
      {Number(sensors.isWet) === 1 && (
        <div className="alert-banner wet-alert">
          <i className="fas fa-droplet"></i> ALERT: Moisture Detected! Bedding is Wet.
        </div>
      )}

      <div className="dashboard-grid">
        
        {/* Card 1: Temperature (V1) */}
        <div className="stat-card">
          <div className="icon-box temp-icon">
            <i className="fas fa-temperature-half"></i>
          </div>
          <div className="stat-info">
            <h3>Temperature</h3>
            <div className="value">{sensors.temperature}°C</div>
            <span className="status">Real-time</span>
          </div>
        </div>

        {/* Card 2: Humidity (V2) */}
        <div className="stat-card">
          <div className="icon-box humidity-icon">
            <i className="fas fa-wind"></i>
          </div>
          <div className="stat-info">
            <h3>Humidity</h3>
            <div className="value">{sensors.humidity}%</div>
            <span className="status">Real-time</span>
          </div>
        </div>

        {/* Card 3: Weight (V3) */}
        <div className="stat-card">
          <div className="icon-box weight-icon">
            <i className="fas fa-weight-hanging"></i>
          </div>
          <div className="stat-info">
            <h3>Baby Weight</h3>
            <div className="value">{sensors.weight} kg</div>
            <span className="status">Live Load Cell</span>
          </div>
        </div>

        {/* Card 4: Swing Status (V6) */}
        <div className="stat-card">
          <div className="icon-box swing-icon">
            <i className="fas fa-arrows-left-right"></i>
          </div>
          <div className="stat-info">
            <h3>Auto Swing</h3>
            <div className="value">{Number(sensors.swingStatus) === 1 ? "ON" : "OFF"}</div>
            <span className="status">{Number(sensors.swingStatus) === 1 ? "Rocking..." : "Stationary"}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
