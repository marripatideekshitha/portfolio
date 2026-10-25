import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const [skillsRows, setSkillsRows] = useState([[], [], []]);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.section-header.skills-header', {
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

    gsap.from('.marquee-row', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.9,
      ease: "power2.out"
    });

    // Velocity-based dynamic skew on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const skew = Math.max(Math.min(self.getVelocity() / -250, 8), -8);
        gsap.to('.marquee-row', {
          skewX: skew,
          overwrite: 'auto',
          duration: 0.6,
          ease: 'power1.out'
        });
      }
    });
  }, { scope: containerRef });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = [
          { name: "Python" }, { name: "Django" }, { name: "SQL" },
          { name: "Excel" }, { name: "Power BI" }, { name: "Tableau" },
          { name: "Pandas" }, { name: "NumPy" }, { name: "Matplotlib" },
          { name: "Seaborn" }, { name: "Scikit-learn" }, { name: "Machine Learning" },
          { name: "Data Visualization" }, { name: "Data Analysis" }, { name: "HTML" },
          { name: "CSS" }, { name: "JavaScript" }, { name: "Git" }
        ];
        // Distribute skills into 3 rows for the marquee effect
        const rows = [[], [], []];
        data.forEach((skill, i) => {
          rows[i % 3].push(skill.name);
        });
        setSkillsRows(rows);
      } catch (err) {
        console.error('Failed to fetch skills', err);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="skills-section section-container" ref={containerRef}>
      <div className="section-header skills-header">
        <span className="mono-text">SKILLS</span>
        <h2 className="section-title">CAPABILITIES</h2>
      </div>

      <div className="marquee-container">
        {skillsRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`marquee-row ${rowIndex % 2 !== 0 ? 'reverse' : ''}`}
          >
            <div className="marquee-content">
              {row.map((skill, index) => (
                <span key={index} className="skill-item">{skill}</span>
              ))}
              {/* Duplicate for seamless infinite scrolling */}
              {row.map((skill, index) => (
                <span key={`dup-${index}`} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="fade-overlay left"></div>
      <div className="fade-overlay right"></div>
    </section>
  );
};

export default Skills;
