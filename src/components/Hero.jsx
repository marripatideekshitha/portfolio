import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Hero.css';

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Left side entrance
    gsap.from('.hero-name-container', {
      opacity: 0,
      x: -60,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out"
    });

    // Right side entrance
    gsap.from('.hero-titles', {
      opacity: 0,
      x: 60,
      duration: 1.2,
      delay: 0.4,
      ease: "power3.out"
    });

    // Scroll indicator entrance & animation
    gsap.from('.scroll-indicator', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1.2,
      ease: "power2.out"
    });

    gsap.to('.wheel', {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut'
    });

    // Interactive mouse parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to('.hero-name', {
        x: xPercent * 20,
        y: yPercent * 12,
        duration: 0.8,
        ease: 'power1.out',
        overwrite: 'auto'
      });

      gsap.to('.hero-titles', {
        x: -xPercent * 18,
        y: -yPercent * 10,
        duration: 0.8,
        ease: 'power1.out',
        overwrite: 'auto'
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, { scope: containerRef });

  useEffect(() => {
    fetch('http://localhost:5000/api/public/heros')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProfile(data[0]);
        }
      })
      .catch(err => console.error('Failed to fetch Hero data:', err));
  }, []);

  // Helper to neatly render multiline strings saved via textarea
  const renderText = (text, fallback) => {
    const content = text || fallback;
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i !== content.split('\n').length - 1 && <br/>}
      </React.Fragment>
    ));
  };

  const [roleIndex, setRoleIndex] = useState(0);
  const titleRef = useRef(null);

  const roles = [
    { line1: profile?.heroTitle1 || 'DATA', line2: profile?.heroSubtitle1 || 'ANALYST' },
    { line1: 'BUSINESS', line2: 'ANALYST' },
    { line1: 'DATA', line2: 'SCIENTIST' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!titleRef.current) return;
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
          );
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const currentRole = roles[roleIndex];

  return (
    <section id="home" className="hero-section section-container" ref={containerRef}>
      <div className="hero-content">
        <div className="hero-name-container">
          <h1 className="hero-name" style={{ fontSize: '6rem' }}>
            {renderText(profile?.heroName, 'Marripati\nDeekshitha')}
          </h1>
        </div>



        <div className="hero-right-content">
          <div className="hero-titles">
            <div className="title-group hover-magnetic" ref={titleRef}>
              <h2 className="title-outline">{currentRole.line1}</h2>
              <h2 className="title-outline text-dim">{currentRole.line2}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
