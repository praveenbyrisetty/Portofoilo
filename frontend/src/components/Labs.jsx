import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTiltEffect, motionVariants } from '../hooks/useAnimations';

function ThmBadge({ thmProfile }) {
  if (!thmProfile) return null;
  const tiltRef = useTiltEffect(6);
  return (
    <motion.a
      ref={tiltRef}
      href={thmProfile.profile_url}
      target="_blank"
      rel="noopener noreferrer"
      className="thm-badge-card"
      whileHover={{ y: -3 }}
    >
      <div className="thm-badge-card__left">
        <div className="thm-badge-card__avatar">{thmProfile.username.charAt(0)}</div>
        <div className="thm-badge-card__info">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#22c55e', marginBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <img src="https://assets.tryhackme.com/img/favicon.png" alt="TryHackMe" style={{ width: '16px', height: '16px', borderRadius: '3px' }} />
            TryHackMe
          </span>
          <span className="thm-badge-card__username">{thmProfile.username}</span>
          <span className="thm-badge-card__level">{thmProfile.level}</span>
        </div>
      </div>
      <div className="thm-badge-card__stats">
        <div className="thm-badge-card__stat">
          <span className="thm-badge-card__stat-val">{thmProfile.rank}</span>
          <span className="thm-badge-card__stat-lbl">Rank</span>
        </div>
        <div className="thm-badge-card__stat">
          <span className="thm-badge-card__stat-val">{thmProfile.completed_rooms}</span>
          <span className="thm-badge-card__stat-lbl">Rooms</span>
        </div>
        <div className="thm-badge-card__stat">
          <span className="thm-badge-card__stat-val">{thmProfile.badges}</span>
          <span className="thm-badge-card__stat-lbl">Badges</span>
        </div>
      </div>
      <span className="thm-badge-card__cta">View Profile ↗</span>
    </motion.a>
  );
}

const DIFF_COLOR = { Easy: '#22c55e', Medium: '#f59e0b', Hard: '#ef4444' };

export default function Labs({ thmProfile, labs }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedLabId, setExpandedLabId] = useState(null);

  const categories = useMemo(() => {
    if (!labs?.length) return ['All'];
    const cats = new Set(labs.map(lab => lab.category));
    return ['All', ...Array.from(cats).sort()];
  }, [labs]);

  const filteredLabs = useMemo(() => {
    if (!labs?.length) return [];
    if (activeCategory === 'All') return labs;
    return labs.filter(lab => lab.category === activeCategory);
  }, [labs, activeCategory]);

  const toggleExpand = (id) => setExpandedLabId(expandedLabId === id ? null : id);
  const platformIcon = (p) => p === 'TryHackMe' ? '🎯' : p === 'HackTheBox' ? '📦' : '🛡️';

  return (
    <section className="section" id="labs">
      <div className="container glass-panel" style={{ padding: '48px 40px' }}>
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={motionVariants.fadeInUp}>
          <p className="section-label">Continuous Training</p>
          <h2 className="section-title">Labs &amp; Practice</h2>
          <p className="section-description">
            Hands-on learning across Blue Team, Malware Analysis, Threat Detection, and more —
            all tracked on TryHackMe. Cards marked <em>Coming Soon</em> are write-ups in progress.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={motionVariants.fadeInUp} style={{ marginBottom: 'var(--space-12)' }}>
          <ThmBadge thmProfile={thmProfile} />
        </motion.div>

        <motion.div className="labs__filters" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={motionVariants.fadeInUp}>
          {categories.map((cat) => (
            <button key={cat} className={`labs__filter-btn${activeCategory === cat ? ' labs__filter-btn--active' : ''}`} onClick={() => setActiveCategory(cat)}>
              {cat}
              {activeCategory === cat && <motion.div className="labs__filter-indicator" layoutId="lab-filter" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
            </button>
          ))}
        </motion.div>

        <motion.div className="labs__grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredLabs.map((lab, index) => {
              const isPlaceholder = lab.status === 'placeholder';
              const isExpanded = expandedLabId === lab.id;
              return (
                <motion.div
                  key={lab.id || index}
                  className={`lab-card${isPlaceholder ? ' lab-card--placeholder' : ''}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {isPlaceholder && (<div className="lab-card__placeholder-overlay"><span>Coming Soon</span></div>)}
                  <div className="lab-card__header">
                    <div className="lab-card__meta">
                      <span className="lab-card__difficulty" style={{ color: DIFF_COLOR[lab.difficulty] || 'var(--color-text-secondary)' }}>{lab.difficulty}</span>
                      {lab.duration && !isPlaceholder && (<span className="lab-card__duration">⏱ {lab.duration}</span>)}
                    </div>
                  </div>
                  <span className="lab-card__category">{lab.category}</span>
                  <h3 className="lab-card__name">{lab.name}</h3>
                  {!isPlaceholder && lab.tools_used?.length > 0 && (
                    <div className="lab-card__tools">{lab.tools_used.map((tool, i) => (<span key={i} className="tool-pill">{tool}</span>))}</div>
                  )}
                  {!isPlaceholder && (
                    <button className="lab-card__toggle" onClick={() => toggleExpand(lab.id)}>
                      {isExpanded ? '↑ Hide Details' : '↓ View Scenario Details'}
                    </button>
                  )}
                  <AnimatePresence>
                    {isExpanded && !isPlaceholder && (
                      <motion.div className="lab-card__details" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                        {[
                          { icon: '🎯', label: 'Objective', text: lab.objective },
                          { icon: '⚙️', label: 'Action Taken', text: lab.what_i_did },
                          { icon: '✅', label: 'Resolution', text: lab.what_i_solved },
                          { icon: '💡', label: 'Learnings', text: lab.what_i_learned },
                        ].map(({ icon, label, text }) => (
                          <div className="lab-card__detail-block" key={label}>
                            <span className="lab-card__detail-icon">{icon}</span>
                            <div>
                              <div className="lab-card__detail-label">{label}</div>
                              <div className="lab-card__detail-text">{text}</div>
                            </div>
                          </div>
                        ))}
                        {lab.tags?.length > 0 && (
                          <div className="lab-card__tags">{lab.tags.map((tag, i) => (<span key={i} className="lab-card__tag">#{tag}</span>))}</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
