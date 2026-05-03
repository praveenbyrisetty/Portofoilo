import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CombinedHeroAbout({ profile, isBreaker, setIsBreaker }) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Easter egg: toggle persona when hovering the avatar
  const handleAvatarHoverStart = () => setIsBreaker(true);
  const handleAvatarHoverEnd = () => setIsBreaker(false);

  const role = isBreaker ? profile.hacker_role : profile.role;
  const tagline = isBreaker ? profile.hacker_tagline : profile.tagline;
  const stats = isBreaker ? profile.hacker_focus_areas : profile.stats;
  const avatar = isBreaker ? profile.hacker_avatar : profile.avatar;
  const bio = isBreaker ? profile.hacker_bio : profile.bio;
  const focusAreas = isBreaker ? profile.hacker_focus_areas : profile.focus_areas;

  // Typing effect
  useEffect(() => {
    let timeout;
    let currentIndex = 0;
    setIsTyping(true);
    setDisplayText('');
    
    // Slight delay before typing starts when swapping
    const startDelay = setTimeout(() => {
      const typeNextChar = () => {
        if (currentIndex < role.length) {
          setDisplayText(role.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(typeNextChar, 30 + Math.random() * 40);
        } else {
          setIsTyping(false);
        }
      };
      typeNextChar();
    }, 200);

    return () => {
      clearTimeout(timeout);
      clearTimeout(startDelay);
    };
  }, [role]);

  return (
    <section id="about" className="hero">
      <div className="radial-blur radial-blur--top" />
      <div className="radial-blur radial-blur--bottom" />

      <div className="container hero__container">
        <div className="hero__layout">
          
          <motion.div 
            className={`hero__content ${isBreaker ? 'glitch-anim' : ''}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Persona indicator text (hidden normally, reveals on breaker) */}
            <AnimatePresence>
              {isBreaker && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="section-label"
                  style={{ color: 'var(--color-danger)' }}
                >
                  SYSTEM COMPROMISED
                </motion.div>
              )}
            </AnimatePresence>

            <h1 className="hero__name">
              <span className="hero__name-accent">{profile.name}</span>
            </h1>

            <div className="hero__role">
              {displayText}
              <span className="typing-cursor">_</span>
            </div>

            <p className="hero__description">{tagline}</p>

            <div className="hero__cta">
              <a href="#projects" className="btn btn--primary">
                View My Work
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#contact" className="btn btn--secondary">
                Contact Me
              </a>
            </div>

            {!isBreaker && (
              <div className="hero__stats">
                {stats.slice(0, 3).map((stat, idx) => (
                  <motion.div 
                    key={idx} 
                    className="hero__stat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="hero__stat-number">{stat.number}+</div>
                    <div className="hero__stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            className="hero__avatar-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onHoverStart={handleAvatarHoverStart}
            onHoverEnd={handleAvatarHoverEnd}
          >
            <div className="avatar-wrapper">
              <div className="avatar-ring" />
              <img src={avatar} alt="Praveen Kumar" className="avatar-image" />
            </div>
            {/* Hint text for the easter egg */}
            <motion.div 
              style={{ textAlign: 'center', marginTop: '1rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}
              animate={{ opacity: isBreaker ? 0 : 0.5 }}
            >
              Hover to reveal the other side.
            </motion.div>
          </motion.div>

        </div>

        {/* About Bio Section */}
        <motion.div 
          className="about-bio"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {bio.map((paragraph, idx) => {
            const words = paragraph.text.split(' ');
            return (
              <p key={idx} className="about__paragraph">
                {words.map((word, wIdx) => {
                  const isHighlighted = paragraph.highlights?.some(h => 
                    word.replace(/[.,]/g, '').includes(h.split(' ')[0])
                  );
                  return (
                    <span key={wIdx} className={isHighlighted ? 'about__highlight' : ''}>
                      {word}{' '}
                    </span>
                  );
                })}
              </p>
            );
          })}
          
          <div className="about__focus-areas">
            {focusAreas.map((area, idx) => (
              <motion.div 
                key={idx} 
                className="about__focus-tag"
                whileHover={{ y: -2, borderColor: 'var(--color-accent)' }}
              >
                {area.icon && <span>{area.icon}</span>} {area.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
