import { motion } from 'framer-motion';
import { motionVariants } from '../hooks/useAnimations';

export default function Footer() {
  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={motionVariants.fadeInUp}
    >
      <div className="container">
        <div className="footer__inner">
          <p className="footer__text">
            &copy; 2026 Praveen Kumar Byrisetty.
            Built with <span className="footer__text-accent">security</span> in mind.
          </p>
          <div className="footer__links">
            <a href="#projects" className="footer__link" onClick={(e) => handleClick(e, 'projects')}>Projects</a>
            <a href="#skills" className="footer__link" onClick={(e) => handleClick(e, 'skills')}>Skills</a>
            <a href="#contact" className="footer__link" onClick={(e) => handleClick(e, 'contact')}>Contact</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
