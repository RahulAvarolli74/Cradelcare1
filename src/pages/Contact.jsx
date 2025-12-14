import React, { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Contact.css';

const Contact = () => {
  useScrollAnimation();

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State to handle submission status (Loading, Success, Error)
  const [status, setStatus] = useState({ type: '', msg: '' });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Sending message...' });

    try {
      //  CONNECTION POINT: Sending data to your Node.js Backend
      const response = await fetch('http://localhost:8000/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', msg: 'Message Sent Successfully!' });
        setFormData({ name: '', email: '', message: '' }); // Clear form

        // Remove success message after 3 seconds
        setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
      } else {
        setStatus({ type: 'error', msg: data.message || 'Failed to send message. ❌' });
      }

    } catch (error) {
      console.error("Connection Error:", error);
      setStatus({ type: 'error', msg: 'Server connection failed. Is the backend running? ⚠️' });
    }
  };

  return (
    <div className="contact-page container">
      <h1 className="reveal">Contact Us</h1>

      <div className="form-wrapper slide-up">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="message">Your Feedback</label>
          <textarea
            name="message"
            placeholder="Your Feedback"
            rows="6"
            className="form-input"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="btn-submit" disabled={status.type === 'loading'}>
            {status.type === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {/* Status Message Display */}
          {status.msg && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
              fontWeight: 'bold',
              backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
              color: status.type === 'success' ? '#155724' : '#721c24'
            }}>
              {status.msg}
            </div>
          )}

        </form>
      </div>

      <div className="contact-info slide-up" style={{ transitionDelay: '0.2s' }}>
        <p><strong>Office:</strong> Startupshala_GIC, KLE Technological University</p>
        <p><strong>Email:</strong> hello@cradlecare.in</p>
      </div>
    </div>
  );
};

export default Contact;