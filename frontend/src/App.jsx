import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { getProfile, getProjects, getSkills, getTimeline, getLabs } from './api/client';
import CinematicLoader from './components/CinematicLoader';
import GlobalBackground from './components/GlobalBackground';
import Nav from './components/Nav';
import CombinedHeroAbout from './components/CombinedHeroAbout';
import Projects from './components/Projects';
import Labs from './components/Labs';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Certs from './components/Certs';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [thmProfile, setThmProfile] = useState(null);
  const [labs, setLabs] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [isBreaker, setIsBreaker] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, projectsData, skillsData, timelineData, labsData] = await Promise.all([
          getProfile(), getProjects(), getSkills(), getTimeline(), getLabs()
        ]);
        setProfile(profileData);
        setProjects(projectsData.projects || []);
        setSkills(skillsData.skills || []);
        setTools(skillsData.tools || []);
        setMatrix(skillsData.matrix || []);
        setTimeline(timelineData.timeline || []);
        setThmProfile(labsData.profile || null);
        setLabs(labsData.labs || []);
        setCerts(labsData.certs || []);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLoaderComplete = useCallback(() => setShowLoader(false), []);

  if (loading || showLoader) {
    return (
      <ThemeProvider>
        <CinematicLoader onComplete={loading ? () => {} : handleLoaderComplete} />
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <div className="loader">
        <p className="loader__text loader__text--error">Error loading portfolio: {error}</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'var(--color-accent)', transformOrigin: '0%', zIndex: 9999 }} />

      {/* Global Three.js wireframe background */}
      <GlobalBackground />

      <div className={`app-container ${isBreaker ? 'is-breaker' : ''}`}>
        <Nav />
        <main>
          <CombinedHeroAbout
            profile={profile}
            isBreaker={isBreaker}
            setIsBreaker={setIsBreaker}
          />
          <Projects projects={projects} />
          <Labs thmProfile={thmProfile} labs={labs} />
          <Skills skills={skills} tools={tools} matrix={matrix} />
          <Journey timeline={timeline} />
          <Certs certs={certs} />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
