import React, { useRef, useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const targetRef = useRef(null);
  const gridRef = useRef(null);
  const [projectsData, setProjectsData] = useState([]);

  useGSAP(() => {
    gsap.from('.projects-header-wrapper', {
      scrollTrigger: {
        trigger: targetRef.current,
        start: 'top 85%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.from('.project-card-wrapper', {
      scrollTrigger: {
        trigger: targetRef.current,
        start: 'top 80%',
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.92,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out"
    });

    gsap.to(gridRef.current, {
      xPercent: -75,
      ease: "none",
      scrollTrigger: {
        trigger: targetRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });
  }, { scope: targetRef });

  useEffect(() => {
    // Replaced failing backend fetch with hardcoded local projects
    const fallbackProjects = [
      {
        title: "Visualizing US Natural Disaster Declarations: Trends and Pattern",
        category: "DATA ANALYTICS — INFOSYS SPRINGBOARD",
        description: "Performed data cleaning, preprocessing, and exploratory data analysis (EDA) on FEMA disaster declaration datasets using Python and Pandas. Created interactive visualizations and geographical maps using Matplotlib, Seaborn, and Plotly to analyze disaster trends, incident types, and state-wise patterns.",
        tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "GeoPandas", "Power BI"],
        githubLink: "",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "DermaAgent AI — AI-Powered Personalized Skincare Agent",
        category: "AI & FULL STACK",
        description: "Developed an AI-powered skincare agent using Python, Flask, FastAPI, OpenAI API, and MongoDB to analyze skin images and generate personalized skincare routines with product and lifestyle recommendations.",
        tech: ["Python", "FastAPI", "OpenAI API", "MongoDB", "Flask", "JavaScript", "REST API"],
        githubLink: "https://github.com/marripatideekshitha/DermaAgent-AI-AI-Powered-Personalized-Skincare-Agent",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Road Accident Analysis Dashboard – Predictive & Visual Insights",
        category: "POWER BI & PREDICTIVE ML",
        description: "Cleaned and prepared accident datasets with normalization and label encoding. Built and compared ML models using RapidMiner and scikit-learn (up to 82% accuracy). Created interactive Power BI dashboards visualizing peak accident times and hotspots.",
        tech: ["Power BI", "Pandas", "RapidMiner", "Scikit-Learn", "Python"],
        githubLink: "https://github.com/marripatideekshitha/road-accidents",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1508873696983-2df57046475a?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Netflix Movies & TV Shows: Recommendation & Content Analysis",
        category: "EDA & MACHINE LEARNING",
        description: "Comprehensive Exploratory Data Analysis (EDA) on Netflix movies and TV shows dataset using Python, Pandas, and Seaborn. Analyzed content patterns, release trends, genres, and Original vs. Licensed distributions to extract entertainment insights.",
        tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA"],
        githubLink: "https://github.com/marripatideekshitha/netflix-movies-and-tv-shows-recommed-system",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Predicting Increase in COVID-19 Cases in India",
        category: "POWER BI & PREDICTIVE ML",
        description: "Analyzed and predicted the increase in COVID-19 cases across India by leveraging data visualization and machine learning techniques. Integrated Power BI and RapidMiner for comprehensive insights into historical trends, seasonal fluctuations, and variant-driven spikes.",
        tech: ["Power BI", "RapidMiner", "Excel", "Machine Learning", "EDA"],
        githubLink: "https://github.com/marripatideekshitha/Predicting-increase-in-Covid-cases-in-India",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Calories Burnt Prediction using Machine Learning",
        category: "MACHINE LEARNING",
        description: "Supervised machine learning model predicting calorie expenditure based on workout duration, heart rate, body temperature, and exercise parameters. Evaluated multiple regressors with thorough EDA in Jupyter Notebook.",
        tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
        githubLink: "https://github.com/marripatideekshitha/Calories-Burnt-Prediction-using-Machine-Learning",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Forest Fire Awareness & Monitoring Platform",
        category: "WEB APPLICATION",
        description: "An informative and interactive forest fire awareness website that educates the public about dangers of forest fires, prevention techniques, fire risk monitoring, and emergency response.",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        githubLink: "https://github.com/marripatideekshitha/forest-fire-project",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Interactive Food Ordering Website",
        category: "WEB APPLICATION",
        description: "A fully interactive, user-friendly food ordering website providing customers with a seamless online platform to browse menus, customize meal orders, and simulate secure payments.",
        tech: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
        githubLink: "https://github.com/marripatideekshitha/food-ordering-website",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Wedding Event Management Platform",
        category: "WEB APPLICATION",
        description: "A dynamic, responsive wedding event management website allowing planners and couples to effortlessly organize, coordinate vendors, browse services, and manage wedding celebrations.",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        githubLink: "https://github.com/marripatideekshitha/wedding-event-management-website",
        liveLink: "",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop"
      }
    ];
    setProjectsData(fallbackProjects);
  }, []);


  return (
    <section id="projects" ref={targetRef} className="projects-scroll-section">
      <div className="projects-sticky-container">

        <div className="projects-header-wrapper">
          <div className="section-header" style={{ marginBottom: "0", zIndex: 1 }}>
            <span className="mono-text">WORK</span>
            <h2 className="section-title">PROJECTS</h2>
          </div>
        </div>

        <div className="projects-carousel-wrapper" style={{ marginTop: "3rem" }}>
          <div ref={gridRef} className="projects-grid">
            {projectsData.map((project, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={2500}
                className="project-card-wrapper"
              >
                <div className="project-card">
                  <div
                    className="project-bg"
                    style={{ backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop'})` }}
                  ></div>
                  <div className="project-overlay"></div>

                  <div className="project-content">
                    <div className="project-top">
                      <div className="project-id">{index < 9 ? `0${index + 1}` : index + 1}</div>
                    </div>

                    <div className="project-bottom">
                      <p className="project-category mono-text">{project.category || 'PROJECT'}</p>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description text-dim">{project.description}</p>

                      <div className="project-tags">
                        {project.tech && project.tech.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>

                      <div className="project-links">
                        {project.githubLink && (
                          <a href={project.githubLink} className="project-link" target="_blank" rel="noreferrer">
                            SOURCE <ExternalLink size={14} />
                          </a>
                        )}
                        {project.liveLink && (
                          <a href={project.liveLink} className="project-link primary" target="_blank" rel="noreferrer">
                            LIVE DEMO <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
