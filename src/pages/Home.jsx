import React, { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Home.css';

const Home = () => {
  useScrollAnimation(); // Activates scroll animations

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    { q: "Is CradleCare safe for newborns?", a: "Yes. CradleCare uses low-power medical-grade sensors and non-invasive monitoring." },
    { q: "Does it replace parental care?", a: "No. It acts as a digital assistant to provide alerts when you are busy." },
    { q: "Can I monitor my baby remotely?", a: "Yes. You receive real-time alerts on your mobile phone app." },
    { q: "What makes CradleCare different?", a: "Traditional cradles only support sleep. We actively monitor safety, health, hygiene, and movement using AI." }
  ];

  return (
    <div className="home-page">
      
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text slide-left">
            <h1>Where Love Meets Technology</h1>
            <p>
              CradleCare is an AI-powered smart cradle ensuring your baby's safety through
              cry detection, hygiene monitoring, temperature control and real-time alerts.
            </p>
          </div>
          <div className="hero-img slide-right">
            {/* Make sure this image exists in public/images/ */}
            <img src="/images/Homepage.jpg" alt="Smart Baby Cradle" onError={(e) => e.target.style.display='none'} />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <div className="container">
          {/* About Top Row: Text Left, Image Right */}
          <div className="about-top-row">
            <div className="about-text slide-left">
              <h2>What Our Company Is About</h2>
              <p>
                <b>CradleCare</b> is built with one mission — to protect newborn lives using <b>medical-grade technology</b> combined
                with <b>AI intelligence</b>. We transform traditional cradles into a <b>24/7 smart healthcare system</b>
                that watches over your baby when parents cannot.
              </p>
            </div>
            <div className="about-img slide-right">
               <img src="/images/Picture1.jpg" alt="About CradleCare" />
            </div>
          </div>

          {/* About Cards Row */}
          <div className="cards-grid">
            <div className="about-card slide-up">
              <i className="fa-solid fa-heart-pulse"></i>
              <h5>Why This Cradle Only?</h5>
              <p>Unlike normal cradles, CradleCare continuously monitors <b>cry, temperature, hygiene, tilt & safety</b> — all in real time.</p>
            </div>

            <div className="about-card slide-up" style={{transitionDelay: '0.2s'}}>
              <i className="fa-solid fa-shield-halved"></i>
              <h5>Medical-Grade Safety</h5>
              <p>Designed with hospital-level sensors and AI models, ensuring <b>early detection</b> before danger occurs.</p>
            </div>

            <div className="about-card slide-up" style={{transitionDelay: '0.4s'}}>
              <i className="fa-solid fa-cart-shopping"></i>
              <h5>Why Parents Should Buy</h5>
              <p>Peace of mind. Remote alerts. 24/7 protection. CradleCare acts as a <b>digital caretaker</b> for your baby.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION (New!) */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item reveal">
            <h3>24/7</h3>
            <p>Monitoring</p>
          </div>
          <div className="stat-item reveal" style={{transitionDelay: '0.2s'}}>
            <h3>AI</h3>
            <p>Driven Safety</p>
          </div>
          <div className="stat-item reveal" style={{transitionDelay: '0.4s'}}>
            <h3>100%</h3>
            <p>Parental Peace</p>
          </div>
        </div>
      </section>

      {/* FOUNDERS SECTION */}
      <section className="founders">
        <div className="container">
          <div className="section-title reveal">
            <h2>Meet the Founders</h2>
            <p>Driven by innovation, compassion & a mission to protect every newborn</p>
          </div>

          <div className="cards-grid">
            {/* Founder 1 */}
            <div className="founder-card slide-up">
              <img src="/images/founder1.jpg" alt="Founder 1" />
              <h5>Founder Name 1</h5>
              <span>CEO & Product Architect</span>
              <p>Led the vision and design of CradleCare, integrating AI, healthcare logic and real-world parenting needs.</p>
            </div>

            {/* Founder 2 */}
            <div className="founder-card slide-up" style={{transitionDelay: '0.2s'}}>
              <img src="/images/founder2.jpg" alt="Founder 2" />
              <h5>Founder Name 2</h5>
              <span>CTO & Embedded Systems Lead</span>
              <p>Designed and implemented sensor integration, real-time monitoring, ESP/Raspberry Pi control.</p>
            </div>

            {/* Founder 3 */}
            <div className="founder-card slide-up" style={{transitionDelay: '0.4s'}}>
              <img src="/images/founder3.jpg" alt="Founder 3" />
              <h5>Founder Name 3</h5>
              <span>AI & Healthcare Research Lead</span>
              <p>Developed AI models for cry detection, baby safety analysis and future capabilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section container">
        <h2 className="reveal">Frequently Asked Questions</h2>
        <div className="faq-list reveal">
          {faqData.map((item, index) => (
            <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
              <button className="faq-question">
                {item.q}
                <i className={`fas fa-plus ${activeFaq === index ? 'rotate' : ''}`}></i>
              </button>
              <div className="faq-answer">
                <div className="answer-content">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;