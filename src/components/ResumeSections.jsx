import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Helper to convert Google Drive share links into direct image links
const getImageUrl = (url) => {
  if (!url) return null;
  const driveRegex = /drive\.google\.com\/file\/d\/([^\/]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/uc?id=${match[1]}`;
  }
  return url;
};
import { Award, BookOpen, FileBadge, Code, Linkedin } from 'lucide-react';
import './ResumeSections.css';
import Achievements from './Achievements';

const educationsData = [
  {
    institution: 'Dayananda Sagar University',
    degree: 'Bachelor of Technology — Computer Science and Engineering',
    date: "AUG '23 — PRESENT",
    location: '📍 Karnataka, India',
    score: 'CGPA: 7.72',
    badgeClass: 'gold'
  },
  {
    institution: 'Amaravati IIT Academy',
    degree: 'Intermediate',
    date: "JUN '21 — MAY '23",
    location: '📍 Sri Krishna Nagar, Tirupati',
    score: '95.4%',
    badgeClass: 'gold'
  },
  {
    institution: "Sri Chaithanya Children’s Academy",
    degree: 'Matriculation',
    date: "JUN '16 — APR '20",
    location: '📍 Madanapalle, A.P',
    score: '98%',
    badgeClass: 'gold'
  }
];

const ResumeSections = () => {
  const [experiences, setExperiences] = useState([
    {
      _id: 'exp_ml_intern',
      title: 'ML ENGINEER INTERN',
      company: 'Infosys Springboard',
      description: 'This project analyzes a dataset using Python and EDA techniques to understand content patterns and distribution. It uses visualizations to compare original and licensed content and identify key trends in the data.',
      date: "FEB '26 — PRESENT",
      createdAt: new Date().toISOString()
    },
    {
      _id: 'exp_ds_intern',
      title: 'DATA SCIENCE INTERN',
      company: 'Codec Technologies Pvt. Ltd.',
      description: 'Completed 1-Month AICTE & ICAC Approved internship program in Data Science. Implemented machine learning workflows, exploratory data analysis, and predictive models.',
      date: "MAR '25 — APR '25",
      createdAt: new Date().toISOString()
    }
  ]);
  const [trainings, setTrainings] = useState([]);
  const [certifications, setCertifications] = useState([
    {
      _id: 'cert_ds_codec',
      title: 'Data Science Internship Certification',
      issuer: 'Codec Technologies (AICTE & ICAC Approved)',
      date: 'Apr 25, 2025',
      url: '/cert_codec_datascience.png',
      image: '/cert_codec_datascience.png'
    },
    {
      _id: 'cert_genai_tata',
      title: 'GenAI Powered Data Analytics Job Simulation',
      issuer: 'TATA Group (Forage)',
      date: 'Aug 15, 2025',
      url: '/certificates/GenAI_Powered_Data_Analytics.pdf',
      image: '/cert_genai_tata.png'
    },
    {
      _id: 'cert_rapidminer',
      title: 'Applications & Use Cases Professional Certification',
      issuer: 'RapidMiner (An Altair Company)',
      date: 'Professional Level',
      url: 'https://www.rapidminer.com/badgecheck',
      image: '/cert_rapidminer.png'
    },
    {
      _id: 'cert_data_vis_tata',
      title: 'Data Visualisation: Empowering Business with Effective Insights',
      issuer: 'TATA Group (Forage)',
      date: 'Aug 21, 2025',
      url: '/certificates/Data_Visualisation_Tata.pdf',
      image: '/cert_data_vis_tata.png'
    },
    {
      _id: 'cert_multidimensional',
      title: 'Multidimensional Data Modeling',
      issuer: 'Infosys Springboard',
      date: 'May 30, 2025',
      url: '/certificates/Multidimensional_Data_Modeling.pdf',
      image: '/cert_multidimensional_data_modeling.png'
    },
    {
      _id: 'cert_bi_intro',
      title: 'Introduction to Business Intelligence',
      issuer: 'Infosys Springboard',
      date: 'May 30, 2025',
      url: 'https://verify.onwingspan.com',
      image: '/cert_bi_intro.png'
    },
    {
      _id: 'cert_powerbi_learning',
      title: 'Learning Microsoft Power BI',
      issuer: 'Infosys Springboard',
      date: 'Apr 17, 2025',
      url: 'https://verify.onwingspan.com',
      image: '/cert_powerbi_learning.png'
    },
    {
      _id: 'cert_powerbi_infosys',
      title: 'Power BI for Business Professionals',
      issuer: 'Infosys Springboard',
      date: 'Apr 17, 2025',
      url: '/certificates/Power_BI_Infosys.pdf',
      image: '/cert_powerbi_infosys.png'
    }
  ]);
  const [socialPosts, setSocialPosts] = useState([
    {
      _id: 'social_1',
      authorName: 'Marripati Deekshitha',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      content: 'Just launched my new portfolio website! Super excited to share my recent projects and experiences. Built with React.js, Framer Motion, and lots of caffeine. ☕🚀 #WebDevelopment #ReactJS #Portfolio #Frontend',
      likes: 24,
      comments: [
        { _id: 'c1', text: 'Looks amazing, great job!', createdAt: new Date(Date.now() - 3600000).toISOString() }
      ]
    },
    {
      _id: 'social_2',
      authorName: 'Marripati Deekshitha',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      content: 'Finished building a Machine Learning model for analyzing rainfall patterns in India using Python, Pandas, and Matplotlib. The insights were fascinating! 🌧️📈 Check out the project section for more details.',
      likes: 15,
      comments: []
    }
  ]);
  const [commentInputs, setCommentInputs] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'Experience', 'Training'
  const socialScrollRef = useRef(null);

  useGSAP(() => {
    // Timeline connector line drawing on scroll
    gsap.utils.toArray('.edu-timeline-line').forEach((line) => {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 0.8
          }
        }
      );
    });

    // Edu/Exp Timeline fade-ins with smooth spring
    gsap.utils.toArray('.edu-timeline-item').forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: index % 2 === 0 ? -40 : 40,
        scale: 0.96,
        duration: 0.7,
        ease: "power3.out"
      });
    });

    // Certifications Section Staggered Entrance with back-out ease
    gsap.from('.cert-card', {
      scrollTrigger: {
        trigger: '#certificates',
        start: 'top 80%',
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 40,
      scale: 0.92,
      duration: 0.65,
      stagger: 0.07,
      ease: "back.out(1.4)"
    });
  });

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainRes, expRes, certRes, socialRes] = await Promise.all([
          fetch('http://localhost:5000/api/public/trainings'),
          fetch('http://localhost:5000/api/public/experiences'),
          fetch('http://localhost:5000/api/public/certifications'),
          fetch('http://localhost:5000/api/public/socialposts')
        ]);

        if (trainRes.ok) {
          const fetchedTrains = await trainRes.json();
          setTrainings(prev => [...prev, ...fetchedTrains]);
        }
        if (expRes.ok) {
          const fetchedExps = await expRes.json();
          setExperiences(prev => [...prev, ...fetchedExps]);
        }
        if (certRes.ok) setCertifications(await certRes.json());
        if (socialRes.ok) {
          const fetchedSocials = await socialRes.json();
          setSocialPosts(prev => [...prev, ...fetchedSocials]);
        }
      } catch (err) {
        console.error('Failed to fetch resume data', err);
      }
    };
    fetchData();
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/public/socialposts/${postId}/like`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        setSocialPosts(posts => posts.map(p => p._id === postId ? { ...p, likes: data.likes } : p));
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(prev => ({ ...prev, likes: data.likes }));
        }
      }
    } catch (err) {
      console.error('Failed to like post', err);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/public/socialposts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
      if (res.ok) {
        const updatedComments = await res.json();
        setSocialPosts(posts => posts.map(p => p._id === postId ? { ...p, comments: updatedComments } : p));
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(prev => ({ ...prev, comments: updatedComments }));
        }
        setCommentInputs(prev => ({ ...prev, [postId]: '' })); // clear input
      }
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  // Combine and sort trainings and experiences
  const combinedTimeline = [
    ...trainings.map(t => ({ ...t, type: 'Training' })),
    ...experiences.map(e => ({ ...e, type: 'Experience' }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort newest first

  const filteredTimeline = combinedTimeline.filter(item =>
    activeFilter === 'All' ? true : item.type === activeFilter
  );

  return (
    <>
      {/* Training & Experience Section */}
      <section id="training" className="training-section section-container">
        <div className="section-header" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span className="mono-text">MY JOURNEY</span>
          <h2 className="section-title timeline-section-title">Training <span className="title-ampersand">&</span> <span className="title-outline">Experience</span></h2>
        </div>

        <div className="edu-timeline">
          <div className="edu-timeline-line"></div>
          {filteredTimeline.length > 0 ? filteredTimeline.map((item, index) => (
            <div
              key={item._id}
              className="edu-timeline-item"
            >
              <div className="edu-dot-wrapper">
                <div className={`edu-dot ${index === 0 ? 'active' : ''}`} />
                {index === 0 && <div className="edu-dot-ring" />}
              </div>
              <div className={`edu-card ${index === 0 ? 'edu-card-active' : ''}`}>
                <div className="edu-card-header">
                  <div>
                    <h4 className="edu-institution">{item.type === 'Training' ? item.organization : item.company}</h4>
                    <p className="edu-degree">{item.title}</p>
                  </div>
                  <span className={`edu-badge ${item.type === 'Training' ? 'gold' : 'silver'}`}>
                    {item.type}
                  </span>
                </div>
                {item.description && (
                  <div style={{ padding: '0 1.5rem', marginBottom: '1rem', color: '#8892b0', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {item.description}
                  </div>
                )}
                <div className="edu-card-footer">
                  <span className="edu-date mono-text">{item.date || '—'}</span>
                  <span className="edu-location"></span>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-dim text-center" style={{ width: '100%', padding: '2rem 0' }}>No items found for {activeFilter.toLowerCase()}.</p>
          )}
        </div>
      </section>


      {/* Certificates Section */}
      <section id="certificates" className="certifications-section resume-section section-container">
        <div className="section-header" style={{ alignItems: 'center', textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="mono-text">QUALIFICATIONS</span>
          <h2 className="section-title"><FileBadge className="inline-icon" /> CERTIFICATIONS</h2>
        </div>

        <div className="cert-cards-grid">
          {certifications.length > 0 ? certifications.map((cert) => (
            <div key={cert._id} className="cert-card">
              <div className="cert-image-container">
                {cert.image && <img src={cert.image} alt={cert.title} />}
              </div>
              
              <h3 className="cert-card-title">{cert.title}</h3>
              
              <div className="cert-card-meta">
                {cert.issuer} {cert.date ? `| ${cert.date}` : ''}
              </div>
              
              <div className="cert-card-footer">
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-card-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> VIEW CREDENTIAL
                </a>
              </div>
            </div>
          )) : (
            <p className="text-dim text-center" style={{ gridColumn: '1 / -1', padding: '2rem 0' }}>No certifications available.</p>
          )}
        </div>
      </section>

      <Achievements />

      {/* Education Section */}
      <section id="education" className="resume-section section-container">
        <div className="section-header">
          <span className="mono-text">BACKGROUND</span>
          <h2 className="section-title"><BookOpen className="inline-icon" /> EDUCATION</h2>
        </div>

        <div className="edu-timeline">
          <div className="edu-timeline-line"></div>
          {educationsData.map((item, index) => (
            <div
              key={index}
              className="edu-timeline-item"
            >
              <div className="edu-dot-wrapper">
                <div className={`edu-dot ${index === 0 ? 'active' : ''}`} />
                {index === 0 && <div className="edu-dot-ring" />}
              </div>
              <div className={`edu-card ${index === 0 ? 'edu-card-active' : ''}`}>
                <div className="edu-card-header">
                  <div>
                    <h4 className="edu-institution">{item.institution}</h4>
                    <p className="edu-degree">{item.degree}</p>
                  </div>
                  <span className={`edu-badge ${item.badgeClass}`}>
                    {item.score}
                  </span>
                </div>
                <div className="edu-card-footer">
                  <span className="edu-date mono-text">{item.date}</span>
                  <span className="edu-location">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ResumeSections;
