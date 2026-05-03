import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '$ ssh p.kumar@nexus.io', delay: 0 },
  { text: 'Connecting to host...', delay: 200 },
  { text: 'Authenticating with 2048-bit RSA key...', delay: 500 },
  { text: '[OK] Identity verified', delay: 800, color: '#22c55e' },
  { text: '$ sudo systemctl start portfolio.service', delay: 1100 },
  { text: '[OK] Loading defense modules...', delay: 1400, color: '#22c55e' },
  { text: '[OK] Initializing logging daemon...', delay: 1700, color: '#22c55e' },
  { text: '[OK] Nexus Core ready', delay: 2000, color: '#F59E0B' },
  { text: '$ launch --mode=interactive', delay: 2300 },
];

export default function CinematicLoader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);
  const termRef = useRef(null);

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
      }, line.delay)
    );
    const endTimer = setTimeout(() => setDone(true), 2800);
    const completeTimer = setTimeout(onComplete, 3200);
    return () => { timers.forEach(clearTimeout); clearTimeout(endTimer); clearTimeout(completeTimer); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="terminal-loader"
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
        >
          <div className="terminal-loader__window">
            <div className="terminal-loader__titlebar">
              <span className="terminal-loader__dot terminal-loader__dot--red" />
              <span className="terminal-loader__dot terminal-loader__dot--yellow" />
              <span className="terminal-loader__dot terminal-loader__dot--green" />
              <span className="terminal-loader__titlebar-text">p.kumar@nexus ~ </span>
            </div>
            <div className="terminal-loader__body" ref={termRef}>
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="terminal-loader__line"
                  style={{ color: line.color || '#ededed' }}
                >
                  {line.text}
                </motion.div>
              ))}
              {visibleLines.length > 0 && <span className="terminal-loader__cursor">█</span>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
