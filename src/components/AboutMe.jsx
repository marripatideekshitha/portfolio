import React, { useState, useEffect, useRef } from 'react';
import { MapPin, GraduationCap, BarChart3, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './AboutMe.css';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const [profile, setProfile] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/abouts')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProfile(data[0]);
        }
      })
      .catch(err => console.error('Failed to fetch AboutMe data:', err));
  }, []);

  useGSAP(() => {
    gsap.from('.about-image-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -50,
      scale: 0.95,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from('.about-info', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.15,
      ease: "power3.out"
    });

    gsap.from('.info-card', {
      scrollTrigger: {
        trigger: '.about-info-grid',
        start: 'top 85%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.6)"
    });

    // 3D Tilt interaction on about image card
    const card = containerRef.current?.querySelector('.about-image-card');
    if (card) {
      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(card, {
          rotateY: x * 0.04,
          rotateX: -y * 0.04,
          transformPerspective: 800,
          duration: 0.4,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto'
        });
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
      return () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, { scope: containerRef });

  const renderText = (text, fallback) => {
    const content = text || fallback;
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i !== content.split('\n').length - 1 && <br/>}
      </React.Fragment>
    ));
  };

  return (
    <section id="about" className="about-section section-container" ref={containerRef}>
      <div className="about-content">
        {/* Left: Portrait Card */}
        <div className="about-image-card">
          <div className="about-image-inner">
            <img 
              src={profile?.aboutImage || "/assets/pro.png?v=3"} 
              alt="Marripati Deekshitha" 
              className="about-portrait" 
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="about-info">
          <span className="about-label">ABOUT ME</span>
          <h2 className="about-heading">
            {profile?.aboutHeading ? renderText(profile.aboutHeading, '') : (
              <>Passionate about <span className="accent-text">Data & Code</span></>
            )}
          </h2>

          <p className="about-description">
            {renderText(profile?.aboutDescription1, 'Computer Science Engineering student specializing in Data Analytics, Data Science, Machine Learning, and Web Development. Experienced in building interactive dashboards, developing intelligent models, and creating full-stack applications that transform data into actionable insights.')}
          </p>

          <p className="about-description-secondary">
            {renderText(profile?.aboutDescription2, "Strong focus on problem-solving and delivering efficient, user-centric digital solutions. Passionate about analyzing complex datasets, designing scalable machine learning systems, and building responsive web applications that turn ideas into impactful results.")}
          </p>

          <div className="about-info-grid">
            <div className="info-card">
              <MapPin size={18} className="info-card-icon" />
              <div>
                <span className="info-card-label">LOCATION</span>
                <span className="info-card-value">{profile?.aboutLocation || 'India'}</span>
              </div>
            </div>
            <div className="info-card">
              <GraduationCap size={18} className="info-card-icon" />
              <div>
                <span className="info-card-label">DEGREE</span>
                <span className="info-card-value">{profile?.aboutDegree || 'B.Tech CSE'}</span>
              </div>
            </div>
            <div className="info-card">
              <BarChart3 size={18} className="info-card-icon" />
              <div>
                <span className="info-card-label">FOCUS</span>
                <span className="info-card-value">{profile?.aboutFocus || 'Data Analyst'}</span>
              </div>
            </div>
            <div className="info-card">
              <Heart size={18} className="info-card-icon" />
              <div>
                <span className="info-card-label">PASSION</span>
                <span className="info-card-value">{profile?.aboutPassion || 'Problem Solving'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
