import React, { useRef } from 'react';
import { Award, Trophy, Star, Medal, Code } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Using existing CSS from ResumeSections.css for the Achievements section
import './ResumeSections.css';

gsap.registerPlugin(ScrollTrigger);

const achievementsData = [
  {
    id: 1,
    title: "140+ Problems Solved on LeetCode",
    category: "Problem Solving",
    description: "Successfully solved over 140 algorithmic challenges on LeetCode, demonstrating strong proficiency in Data Structures and Algorithms.",
    icon: <Code size={24} />,
    delay: 0
  },
  {
    id: 2,
    title: "5th Place in Webathon 2.0",
    category: "Competition",
    description: "Secured 5th place in Webathon 2.0 by developing a highly responsive and interactive web application.",
    icon: <Medal size={24} />,
    delay: 0.2
  }
];

const Achievements = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.ach-card-new', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      scale: 0.92,
      duration: 0.7,
      stagger: 0.15,
      ease: "back.out(1.5)"
    });
  }, { scope: containerRef });

  return (
    <section id="achievements" className="achievements-section" ref={containerRef}>
      <div className="section-header">
        <span className="mono-text">RECOGNITION</span>
        <h2 className="section-title"><Award className="inline-icon" /> ACHIEVEMENTS</h2>
      </div>
      
      <div className="ach-cards-row">
        {achievementsData.map((ach) => (
          <div key={ach.id} className="ach-card-new">
            <div className="ach-card-top-row">
              <span className="ach-category-badge">
                <Award size={14} />
                {ach.category}
              </span>
              <div className="ach-card-icon">
                {ach.icon}
              </div>
            </div>
            <h3 className="ach-card-title">{ach.title}</h3>
            <p className="ach-card-desc">{ach.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
