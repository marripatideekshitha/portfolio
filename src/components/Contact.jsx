import React, { useState, useRef } from 'react';
import { ExternalLink, Mail, Linkedin, Github, Code, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.section-header', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from('.contact-info-left', {
      scrollTrigger: {
        trigger: '.contact-hero',
        start: 'top 85%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -60,
      duration: 0.9,
      ease: "power3.out"
    });

    gsap.from('.contact-item', {
      scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 85%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 15,
      stagger: 0.08,
      duration: 0.5,
      ease: "power2.out"
    });

    gsap.from('.contact-form-card', {
      scrollTrigger: {
        trigger: '.contact-hero',
        start: 'top 85%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: 60,
      scale: 0.95,
      duration: 0.9,
      delay: 0.15,
      ease: "power3.out"
    });

    // Magnetic pull on submit button
    const submitBtn = containerRef.current?.querySelector('.submit-btn');
    if (submitBtn) {
      const onMouseMove = (e) => {
        const rect = submitBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(submitBtn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const onMouseLeave = () => {
        gsap.to(submitBtn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
      };

      submitBtn.addEventListener('mousemove', onMouseMove);
      submitBtn.addEventListener('mouseleave', onMouseLeave);
      return () => {
        submitBtn.removeEventListener('mousemove', onMouseMove);
        submitBtn.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, { scope: containerRef });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields.');
      return;
    }
    setFormStatus('Sending...');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "fd39da44-4bbf-4653-a38c-4dc838ef613a", // Important: You must replace this string with your real access key
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('Message sent successfully! ✓');
        setFormData({ name: '', email: '', message: '' });

        // Clear success message after 5 seconds
        setTimeout(() => setFormStatus(''), 5000);
      } else {
        setFormStatus(`API Error: ${result.message}`);
        console.error("Web3Forms API Error:", result);
      }
    } catch (error) {
      setFormStatus(`Network Error: ${error.message}`);
      console.error("Web3Forms Network Error:", error);
    }
  };

  return (
    <footer id="contact" className="contact-section section-container" ref={containerRef}>
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <span className="mono-text">CONTACT</span>
        <h2 className="section-title"><Mail className="inline-icon" /> GET IN TOUCH</h2>
      </div>
      {/* Hero Row: Title + Form */}
      <div className="contact-hero">
        {/* Left Side: Title and Info Grid */}
        <div className="contact-info-left">
          <div className="contact-header">
            <h2 className="contact-title">
              Let's Build<br />
              <span className="text-dim">Something Cool</span><br />
              Together.
            </h2>
          </div>

          <div className="contact-grid">
            <div className="contact-column">
              <h4 className="column-title mono-text">CONNECT</h4>
              <div className="contact-links">
                <a href="mailto:marripatideekshitha@gmail.com" className="contact-item">
                  <Mail size={16} /> marripatideekshitha@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/marripatideekshitha/" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <Linkedin size={16} /> LinkedIn <ExternalLink size={12} />
                </a>
                <a href="https://github.com/marripatideekshitha" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <Github size={16} /> GitHub <ExternalLink size={12} />
                </a>

              </div>
            </div>

            <div className="contact-column">
              <h4 className="column-title mono-text">MORE</h4>
              <div className="contact-info">
                <p><strong>Mobile:</strong><br />+91-8374333725</p>
              </div>
            </div>

            <div className="contact-column">
              <h4 className="column-title mono-text">LOCATION</h4>
              <div className="contact-info">
                <p>India</p>
                <p className="remote-status">
                  <span className="status-dot"></span> On-site, Remote & Hybrid
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="contact-form-card">
          <h3 className="form-card-heading">Send a Message</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="How can I help you?"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="send-message-btn">
              <Send size={16} /> Send Message
            </button>
            {formStatus && <p className="form-status-msg">{formStatus}</p>}
          </form>
        </div>
      </div>

      <div className="contact-footer">
        <p className="copyright mono-text">© {new Date().getFullYear()} Marripati Deekshitha.</p>
        <button className="back-to-top mono-text" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BACK TO START ↑
        </button>
      </div>
    </footer>
  );
};

export default Contact;
