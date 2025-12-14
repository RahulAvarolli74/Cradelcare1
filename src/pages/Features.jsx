import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Features.css';

const Features = () => {
  useScrollAnimation();

  const features = [
    { 
      icon: "fa-baby", 
      img: "cute_13482057.png", 
      title: "AI Cry Detection", 
      desc: "Detects baby cries using TinyML." 
    },
    { 
      icon: "fa-temperature-half", 
      img: "changing-icon-20839.jpg", 
      title: "Temperature Monitoring", 
      desc: "Ensures perfect comfort." 
    },
    { 
      icon: "fa-droplet", 
      img: "baby-icon-19082.png", 
      title: "Moisture Detection", 
      desc: "Keeps baby dry and happy." 
    },
    { 
      icon: "fa-weight-hanging", 
      img: "baby-icon-19079.png", 
      title: "Weight Monitoring", 
      desc: "Tracks healthy growth." 
    },
    { 
      icon: "fa-arrows-alt", 
      img: "baby-boy_2608645.png", 
      title: "Tilt Protection", 
      desc: "Prevents unsafe movement." 
    },
    { 
      icon: "fa-bell", 
      img: "baby-boy_2608645.png", // Reusing image if unique one unavailable
      title: "Remote Alerts", 
      desc: "Instant phone notifications." 
    },
  ];

  return (
    <div className="features-page container">
      <h1 className="text-center reveal">Smart Features for Your Baby's Safety</h1>
      
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card slide-up" style={{transitionDelay: `${i * 0.1}s`}}>
            {/* Top Icon */}
            <i className={`fas ${f.icon} top-icon`}></i>
            
            {/* Illustration Image */}
            <img src={`/images/${f.img}`} alt={f.title} className="feature-img" />
            
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Detailed Description Section */}
      <div className="details-section">
        {features.map((f, i) => (
           <div key={i} className="detail-box slide-right">
             <h3><i className={`fas ${f.icon}`}></i> {f.title}</h3>
             <p>
               <b>{f.title}</b> is a crucial part of the CradleCare system. 
               {f.desc} It operates continuously to ensure maximum safety and comfort for your child.
               Data is synced in real-time to the mobile application.
             </p>
           </div>
        ))}
      </div>
    </div>
  );
};

export default Features;