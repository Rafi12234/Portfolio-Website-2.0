import { useState, useEffect, useRef, useCallback } from "react";
import "./styles/Education.css";

type EducationItem = {
  degree: string;
  institute: string;
  timeline: string;
  details: string;
  icon: string;
  year: number;
  achievements?: string[];
};

const educationData: EducationItem[] = [
  {
    degree: "Computer Science & Engineering",
    institute: "Ahsanullah University of Science and Technology (AUST)",
    timeline: "2023 - Present",
    year: 2023,
    details:
      "Focused on full-stack engineering, software architecture, and product development through academics and club leadership.",
    icon: "🎓",
    achievements: ["Assistant Director of AUST Robotics Club", "3.4 CGPA"],
  },
  {
    degree: "Higher Secondary Certificate (Science)",
    institute: "Notre Dame College",
    timeline: "2020 - 2022",
    year: 2020,
    details:
      "Completed higher secondary education with focus on Science, Mathematics, and Physics.",
    icon: "📚",
    achievements: ["Achieved GPA-5.00 in HSC"],
  },
  {
    degree: "Secondary School Certificate (Science)",
    institute: "Udayan Uchcha Madhyamik Bidyalaya",
    timeline: "2019 - 2020",
    year: 2020,
    details:
      "Foundation in sciences with exceptional performance in Mathematics and ICT.",
    icon: "✨",
    achievements: ["Achieved GPA-5.00 in SSC"],
  },
];

const Education = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(
          0,
          Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for magnetic effect
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      const card = cardsRef.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      setMousePosition({ x, y });
    },
    []
  );

  // Generate floating particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section
      className={`edu-universe ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      {/* Animated Background */}
      <div className="edu-cosmos">
        <div className="cosmic-gradient"></div>
        <div className="star-field">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="floating-particle"
              style={{
                "--size": `${particle.size}px`,
                "--x": `${particle.x}%`,
                "--y": `${particle.y}%`,
                "--duration": `${particle.duration}s`,
                "--delay": `${particle.delay}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="nebula-effect"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-track">
        <div
          className="scroll-progress-fill"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
        <div
          className="scroll-progress-glow"
          style={{ top: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Main Content Container */}
      <div className="edu-galaxy-container">
        {/* Header with Glitch Effect */}
        <header className="edu-header-zone">
          <div className="header-badge">
            <span className="badge-pulse"></span>
            <span className="badge-text">Learning Path</span>
          </div>

          <h2 className="glitch-title" data-text="My Journey">
            <span className="title-main theme-title">
              <span className="theme-title-base">My</span>
              <span className="theme-title-accent">Journey</span>
            </span>
          </h2>

          <p className="header-description">
            <span className="typing-text">
              A chronicle of knowledge, growth, and endless curiosity
            </span>
          </p>

          <div className="header-decoration">
            <svg className="wave-svg" viewBox="0 0 1200 120">
              <path className="wave-path" />
            </svg>
          </div>
        </header>

        {/* Timeline Container */}
        <div className="timeline-dimension">
          {/* Animated Timeline Line */}
          <div className="timeline-spine">
            <svg className="spine-svg" viewBox="0 0 100 800">
              <defs>
                <linearGradient
                  id="spineGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                className="spine-path"
                d="M50,0 Q30,100 50,200 Q70,300 50,400 Q30,500 50,600 Q70,700 50,800"
                fill="none"
                stroke="url(#spineGradient)"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <circle className="traveling-dot" r="6" fill="#fff">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M50,0 Q30,100 50,200 Q70,300 50,400 Q30,500 50,600 Q70,700 50,800"
                />
              </circle>
            </svg>
          </div>

          {/* Education Cards */}
          <div className="cards-constellation">
            {educationData.map((item, index) => (
              <div
                key={`${item.degree}-${item.year}`}
                className={`edu-card-wrapper ${activeCard === index ? "active" : ""} ${
                  isVisible ? "revealed" : ""
                }`}
                style={
                  {
                    "--card-index": index,
                    "--total-cards": educationData.length,
                  } as React.CSSProperties
                }
              >
                {/* Year Marker */}
                <div className="year-beacon">
                  <div className="beacon-ring"></div>
                  <div className="beacon-ring delay-1"></div>
                  <div className="beacon-ring delay-2"></div>
                  <span className="beacon-year">{item.year}</span>
                </div>

                {/* Main Card */}
                <div
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className={`edu-hologram-card ${index % 2 === 0 ? "left-orbit" : "right-orbit"}`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => {
                    setActiveCard(null);
                    setMousePosition({ x: 0, y: 0 });
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  style={
                    {
                      "--mouse-x": `${mousePosition.x}px`,
                      "--mouse-y": `${mousePosition.y}px`,
                    } as React.CSSProperties
                  }
                >
                  {/* Card Layers */}
                  <div className="card-hologram-bg">
                    <div className="hologram-layer layer-1"></div>
                    <div className="hologram-layer layer-2"></div>
                    <div className="hologram-layer layer-3"></div>
                  </div>

                  <div className="card-scan-line"></div>

                  <div className="card-content-zone">
                    {/* Icon Container */}
                    <div className="icon-nebula">
                      <div className="nebula-glow"></div>
                      <div className="icon-orbit">
                        <span className="orbit-ring"></span>
                        <span className="orbit-ring delay"></span>
                      </div>
                      <span className="edu-icon">{item.icon}</span>
                    </div>

                    {/* Timeline Badge */}
                    <div className="timeline-chip">
                      <span className="chip-dot"></span>
                      <span className="chip-text">{item.timeline}</span>
                    </div>

                    {/* Degree Title */}
                    <h3 className="degree-title">
                      {item.degree.split(" ").map((word, i) => (
                        <span
                          key={i}
                          className="word-reveal"
                          style={{ "--word-index": i } as React.CSSProperties}
                        >
                          {word}{" "}
                        </span>
                      ))}
                    </h3>

                    {/* Institute */}
                    <div className="institute-row">
                      <span className="institute-icon">🏛️</span>
                      <h4 className="institute-name">{item.institute}</h4>
                    </div>

                    {/* Description */}
                    <p className="edu-description">{item.details}</p>

                    {/* Achievements */}
                    {item.achievements && (
                      <div className="achievements-grid">
                        {item.achievements.map((achievement, achIndex) => (
                          <span
                            key={achIndex}
                            className="achievement-tag"
                            style={
                              { "--ach-index": achIndex } as React.CSSProperties
                            }
                          >
                            <span className="tag-glow"></span>
                            {achievement}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expand Indicator */}
                    <div className="card-expand-zone">
                      <div className="expand-line"></div>
                      <span className="expand-text">Hover to explore</span>
                      <div className="expand-line"></div>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="corner-accent top-left"></div>
                  <div className="corner-accent top-right"></div>
                  <div className="corner-accent bottom-left"></div>
                  <div className="corner-accent bottom-right"></div>

                  {/* Hover Glow Effect */}
                  <div className="hover-glow-effect"></div>
                </div>

                {/* Connection Line */}
                <svg className="connector-line" viewBox="0 0 100 50">
                  <path
                    className="connector-path"
                    d={
                      index % 2 === 0
                        ? "M100,25 Q50,25 0,25"
                        : "M0,25 Q50,25 100,25"
                    }
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="stats-horizon">
          {/* <div className="stat-orb">
            <div className="orb-ring"></div>
            <span className="stat-value">3+</span>
            <span className="stat-label">Years Learning</span>
          </div>
          <div className="stat-orb">
            <div className="orb-ring"></div>
            <span className="stat-value">15+</span>
            <span className="stat-label">Certifications</span>
          </div>
          <div className="stat-orb">
            <div className="orb-ring"></div>
            <span className="stat-value">∞</span>
            <span className="stat-label">Curiosity</span>
          </div> */}
        </div>

        {/* Floating Action Elements */}
        <div className="floating-elements">
          <div className="float-shape shape-1">
            <svg viewBox="0 0 100 100">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="float-shape shape-2">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="float-shape shape-3">
            <svg viewBox="0 0 100 100">
              <rect
                x="20"
                y="20"
                width="60"
                height="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                transform="rotate(45 50 50)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Mouse Follower */}
      <div
        className="cursor-glow"
        style={
          {
            "--cursor-x": `${mousePosition.x}px`,
            "--cursor-y": `${mousePosition.y}px`,
          } as React.CSSProperties
        }
      ></div>
    </section>
  );
};

export default Education;