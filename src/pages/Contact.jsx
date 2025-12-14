import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Contact.css';

const Contact = () => {
  useScrollAnimation();
  
  return (
    <div className="contact-page container">
      {/* Title */}
      <h1 className="reveal">Contact Us</h1>

      {/* Form Card */}
      <div className="form-wrapper slide-up">
        <form className="contact-form">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="form-input" 
            required 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="form-input" 
            required 
          />
          <textarea 
            placeholder="Your Message" 
            rows="6" 
            className="form-input" 
            required
          ></textarea>
          
          <button type="submit" className="btn-submit">
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info Footer */}
      <div className="contact-info slide-up" style={{transitionDelay: '0.2s'}}>
        <p><strong>Office:</strong> Startupshala_GIC, KLE Technological University</p>
        <p><strong>Email:</strong> hello@cradlecare.in</p>
      </div>
    </div>
  );
};

export default Contact;