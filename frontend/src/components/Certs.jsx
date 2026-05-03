import { motion } from 'framer-motion';
import { useTiltEffect, motionVariants } from '../hooks/useAnimations';

const STATUS_MAP = {
  earned:      { label: 'Earned ✓',    color: '#22c55e' },
  in_progress: { label: 'In Progress', color: '#f59e0b' },
  expired:     { label: 'Expired',     color: '#6b7280' },
};

function getInitials(name) {
  const words = name.split(/[\s/,&]+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function CertCard({ cert, index }) {
  const tiltRef = useTiltEffect(6);
  const { label, color } = STATUS_MAP[cert.status] || STATUS_MAP.earned;

  return (
    <motion.div
      ref={tiltRef}
      className="cert-card"
      style={{ '--cert-color': cert.badge_color }}
      variants={motionVariants.fadeInUp}
    >
      <div className="cert-card__accent" style={{ background: cert.badge_color }} />
      <div className="cert-card__header">
        <div className="cert-card__issuer-icon" style={{ color: cert.badge_color, borderColor: cert.badge_color + '44' }}>
          {getInitials(cert.issuer)}
        </div>
        <span className="cert-card__status" style={{ color, borderColor: color + '66', background: color + '15' }}>
          {label}
        </span>
      </div>
      <h3 className="cert-card__name">{cert.name}</h3>
      <p className="cert-card__issuer">{cert.issuer}</p>
      <p className="cert-card__description">{cert.description}</p>
      <div className="cert-card__footer">
        {cert.issued && <span className="cert-card__date">📅 {cert.issued}</span>}
        {cert.verify_url ? (
          <a href={cert.verify_url} target="_blank" rel="noopener noreferrer" className="cert-card__verify">Verify ↗</a>
        ) : (
          <span className="cert-card__verify cert-card__verify--pending">
            {cert.status === 'in_progress' ? '⌛ Pursuing' : 'Credential'}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Certs({ certs }) {
  if (!certs?.length) return null;

  return (
    <section className="section certs" id="certs">
      <div className="container glass-panel" style={{ padding: '48px 40px' }}>
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={motionVariants.fadeInUp}>
          <p className="section-label">Credentials</p>
          <h2 className="section-title">Certifications &amp; Achievements</h2>
          <p className="section-description">
            Real credentials and hands-on programme completions that back my cybersecurity skill set.
          </p>
        </motion.div>

        <motion.div className="certs__grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={motionVariants.staggerContainer}>
          {certs.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
