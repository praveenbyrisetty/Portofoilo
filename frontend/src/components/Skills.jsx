import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView, useTiltEffect, motionVariants } from '../hooks/useAnimations';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

function SkillMatrix({ matrix }) {
  if (!matrix || matrix.length === 0) return null;
  return (
    <div className="skill-matrix">
      <h3 className="skill-matrix__title">Cybersecurity Profile Matrix</h3>
      <div className="skill-matrix__chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={matrix}>
            <PolarGrid stroke="var(--color-border-subtle)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11, fontWeight: 600 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(10,10,15,0.9)', borderColor: 'var(--color-accent-border)', borderRadius: '8px', color: '#fff', boxShadow: 'var(--shadow-card-hover)', backdropFilter: 'blur(4px)' }} itemStyle={{ color: 'var(--color-accent)' }} />
            <Radar name="Proficiency" dataKey="score" stroke="var(--color-accent)" strokeWidth={2} fill="var(--color-accent)" fillOpacity={0.3} dot={{ r: 3, fill: 'var(--color-surface)', stroke: 'var(--color-accent)', strokeWidth: 2 }} activeDot={{ r: 5, fill: 'var(--color-accent)', stroke: '#fff', strokeWidth: 2 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SkillBar({ name, level }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div className="skill-item" ref={ref}>
      <span className="skill-item__name">{name}</span>
      <div className="skill-item__bar">
        <motion.div
          className="skill-item__fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function TerminalTools({ tools }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [typedLines, setTypedLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!inView || isTyping || typedLines.length > 0) return;
    setIsTyping(true);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < tools.length) {
        setTypedLines(prev => [...prev, `> install module: ${tools[currentIndex]}`]);
        currentIndex++;
      } else {
        setTypedLines(prev => [...prev, '> [OK] All toolkits loaded and ready.']);
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [inView, tools, isTyping, typedLines]);

  return (
    <div className="terminal-tools" ref={ref}>
      <div className="terminal-tools__header">
        <div className="terminal-tools__dots">
          <span className="terminal-tools__dot terminal-tools__dot--red" />
          <span className="terminal-tools__dot terminal-tools__dot--yellow" />
          <span className="terminal-tools__dot terminal-tools__dot--green" />
        </div>
        <div className="terminal-tools__title">bash - toolkit.sh</div>
      </div>
      <div className="terminal-tools__body">
        {typedLines.map((line, i) => (
          <div key={i} className="terminal-tools__line">
            {line}
          </div>
        ))}
        {inView && <span className="terminal-tools__cursor">█</span>}
      </div>
    </div>
  );
}

export default function Skills({ skills, tools, matrix }) {
  return (
    <section className="section skills" id="skills">
      <div className="container glass-panel" style={{ padding: '48px 40px' }}>
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={motionVariants.fadeInUp}>
          <p className="section-label">Capabilities</p>
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-description">
            My technical foundation spans across detection engineering, log analysis, and system architecture.
          </p>
        </motion.div>

        <div className="skills__layout">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={motionVariants.scaleIn}>
            <SkillMatrix matrix={matrix} />
          </motion.div>

          <motion.div className="skills__grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={motionVariants.staggerContainer}>
            {skills?.map((category) => {
              const tiltRef = useTiltEffect(6);
              return (
                <motion.div key={category.id} ref={tiltRef} className="skill-card" variants={motionVariants.fadeInUp}>
                  <div className="skill-card__header">
                    <div className="skill-card__title">{category.title}</div>
                  </div>
                  <div className="skill-card__items">
                    {category.items.map((item, j) => (
                      <SkillBar key={j} name={item.name} level={item.level} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div style={{ marginTop: 'var(--space-12)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={motionVariants.fadeInUp}>
          <TerminalTools tools={tools} />
        </motion.div>
      </div>
    </section>
  );
}
