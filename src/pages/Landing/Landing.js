import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  Calendar,
  CheckSquare,
  Layers,
  ArrowRight,
  GraduationCap,
  Zap,
  BarChart2,
} from 'lucide-react';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen size={28} />,
      title: 'Smart Subjects',
      desc: 'Organize all your subjects, units, and topics in one beautiful workspace.',
    },
    {
      icon: <Brain size={28} />,
      title: 'Flashcards',
      desc: 'Create and study flashcards to reinforce your memory with spaced repetition.',
    },
    {
      icon: <Calendar size={28} />,
      title: 'Study Planner',
      desc: 'Plan your study sessions and never miss an exam or assignment deadline.',
    },
    {
      icon: <CheckSquare size={28} />,
      title: 'Task Manager',
      desc: 'Keep track of tasks. Check them off as you power through your study list.',
    },
    {
      icon: <Layers size={28} />,
      title: 'Workspace',
      desc: 'A focused writing & note-taking area for each topic in your curriculum.',
    },
    {
      icon: <BarChart2 size={28} />,
      title: 'Dashboard',
      desc: 'See all your stats, upcoming events and quick actions in one glance.',
    },
  ];

  return (
    <div className="landing-page">
      {/* ── Animated Wave Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} />
            <span>Your All-in-One Study Platform</span>
          </div>
          <h1 className="hero-title">
            Learn Smarter.<br />
            <span className="hero-gradient-text">Study Faster.</span>
          </h1>
          <p className="hero-subtitle">
            EduFlow brings your subjects, flashcards, planner, and workspace
            under one sleek, dark-mode dashboard. Built for serious students.
          </p>
          <div className="hero-cta">
            <button
              className="cta-primary"
              onClick={() => navigate('/dashboard')}
            >
              Get Started <ArrowRight size={18} />
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate('/subjects')}
            >
              Explore Subjects
            </button>
          </div>
        </div>

        {/* Floating Stat Cards */}
        <div className="hero-visual">
          <div className="float-card card-1">
            <GraduationCap size={20} />
            <span>Active Subjects</span>
            <strong>12</strong>
          </div>
          <div className="float-card card-2">
            <Brain size={20} />
            <span>Flashcards</span>
            <strong>340</strong>
          </div>
          <div className="float-card card-3">
            <CheckSquare size={20} />
            <span>Tasks Done</span>
            <strong>89%</strong>
          </div>
        </div>

        {/* SVG Wave Stack */}
        <div className="wave-container">
          <svg
            className="wave wave-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0,160L60,144C120,128,240,96,360,101.3C480,107,600,149,720,160C840,171,960,149,1080,133.3C1200,117,1320,107,1380,101.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
          <svg
            className="wave wave-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
          </svg>
          <svg
            className="wave wave-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0,256L120,245.3C240,235,480,213,720,213.3C960,213,1200,235,1320,245.3L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" />
          </svg>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="features-section">
        <div className="features-header">
          <h2>Everything You Need to Excel</h2>
          <p>Powerful tools designed to make studying efficient, organized, and even enjoyable.</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bottom-cta">
        <div className="bottom-cta-wave-top">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,50L360,20C720,0,1080,20,1440,50L1440,0L0,0Z" />
          </svg>
        </div>
        <div className="bottom-cta-content">
          <h2>Ready to transform your study routine?</h2>
          <button className="cta-primary" onClick={() => navigate('/dashboard')}>
            Open Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <span>© 2025 EduFlow. Built for curious minds.</span>
      </footer>
    </div>
  );
};

export default Landing;
