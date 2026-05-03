import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import getVisualizer from './ProjectVisualizers';

/* ── Category grouping logic ── */
function categorize(projects) {
  const quantum = projects.filter(p => p.domain.toLowerCase().includes('quantum'));
  const security = projects.filter(p =>
    p.domain.toLowerCase().includes('blue team') ||
    p.domain.toLowerCase().includes('deception') ||
    p.domain.toLowerCase().includes('appsec') ||
    p.domain.toLowerCase().includes('cryptography')
  );
  const web3 = projects.filter(p => p.domain.toLowerCase().includes('blockchain'));

  return [
    { name: 'quantum', label: 'quantum/', items: quantum },
    { name: 'security', label: 'security/', items: security },
    { name: 'web3', label: 'web3/', items: web3 },
  ];
}

/* ── Left Panel: Terminal File Tree ── */
function FileTree({ categories, selected, onSelect }) {
  const [expanded, setExpanded] = useState({ quantum: true, security: true, web3: true });

  const toggle = (name) => setExpanded(prev => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="term-tree">
      <div className="term-prompt">
        <span className="term-user">praveen</span>
        <span className="term-at">@</span>
        <span className="term-host">cyberforge</span>
        <span className="term-colon">:</span>
        <span className="term-path">~/projects</span>
        <span className="term-dollar">$</span>
        <span className="term-cmd"> ls -la</span>
      </div>

      <div className="term-tree-list">
        {categories.map(cat => (
          <div key={cat.name} className="term-folder-group">
            <button className="term-folder-btn" onClick={() => toggle(cat.name)}>
              <span className="term-arrow">{expanded[cat.name] ? '▼' : '▶'}</span>
              {cat.label}
            </button>

            <AnimatePresence>
              {expanded[cat.name] && (
                <motion.div
                  className="term-folder-children"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {cat.items.map(project => (
                    <button
                      key={project.id}
                      className={`term-file-btn ${selected?.id === project.id ? 'active' : ''}`}
                      onClick={() => onSelect(project)}
                    >
                      <span className="term-tree-branch">├── </span>
                      {project.icon && <span className="term-file-icon">{project.icon}</span>}
                      {project.id}/
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Right Panel: Hologram + Details ── */
function HologramPanel({ project, showDetails, onHologramClick }) {
  return (
    <div className="term-hologram-panel">
      {!project && (
        <div className="term-empty">
          <div className="term-prompt-mini">
            <span className="term-path">~/projects</span>
            <span className="term-dollar">$</span>
            <span className="term-cursor">_</span>
          </div>
          <p className="term-hint">Select a project folder to inspect...</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {project && (
          <motion.div
            key={project.id}
            className="term-hologram-wrapper"
            initial={{ y: 120, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 3D Hologram */}
            <div
              className="term-hologram-canvas"
              onClick={onHologramClick}
              title="Click for details"
            >
              {getVisualizer(project.id)}
              <div className="hologram-scanline" />
              <div className="hologram-glow" />
            </div>

            <motion.p
              className="term-hologram-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.icon && <span>{project.icon} </span>}{project.title}
            </motion.p>

            {/* Terminal-style details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  className="term-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="term-detail-line">
                    <span className="term-key">DOMAIN</span>
                    <span className="term-val">{project.domain}</span>
                  </div>
                  <div className="term-detail-line">
                    <span className="term-key">DESC</span>
                    <span className="term-val">{project.description}</span>
                  </div>
                  <div className="term-detail-line">
                    <span className="term-key">STACK</span>
                    <span className="term-val term-tags">
                      {project.tech?.map(t => (
                        <span key={t} className="term-tag">{t}</span>
                      ))}
                    </span>
                  </div>
                  {project.github && (
                    <div className="term-detail-line">
                      <span className="term-key">REPO</span>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="term-link">
                        {project.github}
                      </a>
                    </div>
                  )}
                  {project.case_study && (
                    <div className="term-case-study">
                      <div className="term-detail-line">
                        <span className="term-key">PROBLEM</span>
                        <span className="term-val">{project.case_study.problem}</span>
                      </div>
                      <div className="term-detail-line">
                        <span className="term-key">RESULTS</span>
                        <span className="term-val">{project.case_study.results}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Export ── */
export default function Projects({ projects }) {
  const [selected, setSelected] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const safeProjects = Array.isArray(projects) ? projects : [];
  const categories = categorize(safeProjects);

  const handleSelect = (project) => {
    setShowDetails(false);
    setSelected(project);
  };

  const handleHologramClick = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <section id="projects" className="section">
      <div className="container" style={{ maxWidth: '1300px' }}>
        <h2 className="section-title" style={{ marginBottom: '12px' }}>
          <span className="text-gradient">Engineered Systems</span>
        </h2>
        <p className="section-subtitle" style={{ marginBottom: '40px' }}>
          Navigate my projects like a file system. Click a folder, then click the hologram for details.
        </p>

        <div className="term-container glass-panel">
          {/* Terminal top bar */}
          <div className="term-topbar">
            <div className="term-dots">
              <span className="term-dot term-dot--red" />
              <span className="term-dot term-dot--yellow" />
              <span className="term-dot term-dot--green" />
            </div>
            <span className="term-topbar-title">praveen@cyberforge:~/projects</span>
          </div>

          {/* Split panels */}
          <div className="term-split">
            <FileTree
              categories={categories}
              selected={selected}
              onSelect={handleSelect}
            />
            <div className="term-divider" />
            <HologramPanel
              project={selected}
              showDetails={showDetails}
              onHologramClick={handleHologramClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
