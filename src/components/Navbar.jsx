import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Rocket, Mail, Github, Code, Download, BookOpen, Award, FileBadge, Linkedin, Menu, X, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import './Navbar.css';

const navItems = [
  { href: '#skills', label: 'SKILLS', icon: Cpu },
  { href: '#projects', label: 'PROJECTS', icon: Rocket },
  { href: '#training', label: 'TRAIN', icon: Code },
  { href: '#certificates', label: 'CERT', icon: FileBadge },
  { href: '#education', label: 'EDU', icon: BookOpen },
  { href: '#achievements', label: 'ACHV', icon: Award },
  { href: '#contact', label: 'CONTACT', icon: Mail },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nav entrance handled seamlessly by motion.nav without transform conflict

  const scrollToTop = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 1. TOP NAVBAR: Centered when at top of the page */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.nav
            ref={navRef}
            className="navbar-top"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nav-logo">
              <a href="#home" onClick={scrollToTop} className="nav-logo-link" title="Back to top">
                <span className="nav-pulse-dot" />
                <span className="nav-logo-text">MD</span>
              </a>
            </div>

            <div className="nav-content-wrapper">
              <div className="nav-links">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.href} href={item.href} className="nav-link">
                      <Icon className="nav-icon" /> {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="nav-socials">
                <a
                  href="https://github.com/marripatideekshitha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="GitHub Profile"
                >
                  <Github className="social-icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/marripatideekshitha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="social-icon" />
                </a>
                <a
                  href="https://drive.google.com/file/d/1BSZz1MCTTGgXUZ_Y4vMnKnT_dr05ok-k/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link resume-badge-link"
                  title="Download Resume"
                >
                  <Download className="social-icon" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 2. SCROLLED DOCK: Docked on the left side smoothly when scrolled down */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="navbar-scrolled-dock"
            initial={{ opacity: 0, scale: 0.85, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo Button - Smooth click back to top */}
            <a href="#home" onClick={scrollToTop} className="dock-logo-btn" title="Back to top">
              <span className="nav-pulse-dot" />
              <span className="dock-logo-text">MD</span>
              <ArrowUp size={13} className="dock-top-icon" />
            </a>

            {/* Quick Menu Toggle Button */}
            <button
              type="button"
              className={`dock-menu-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(prev => !prev)}
              title={isMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            {/* Floating Glass Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="dock-dropdown-menu"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className="dock-dropdown-header">
                    <span className="mono-text" style={{ fontSize: '0.72rem', color: '#00e5ff' }}>NAVIGATION</span>
                  </div>

                  <div className="dock-dropdown-links">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          className="dock-dropdown-item"
                          onClick={handleLinkClick}
                        >
                          <Icon size={15} className="dock-item-icon" />
                          <span>{item.label}</span>
                        </a>
                      );
                    })}
                  </div>

                  <div className="dock-dropdown-footer">
                    <a
                      href="https://github.com/marripatideekshitha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dock-social-link"
                      title="GitHub"
                    >
                      <Github size={15} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/marripatideekshitha/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dock-social-link"
                      title="LinkedIn"
                    >
                      <Linkedin size={15} />
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1BSZz1MCTTGgXUZ_Y4vMnKnT_dr05ok-k/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dock-social-link dock-resume-btn"
                      title="Resume"
                    >
                      <Download size={15} /> <span>CV</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
