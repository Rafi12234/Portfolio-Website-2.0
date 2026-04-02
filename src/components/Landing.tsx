import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              <span className="name-word">SHAJEDUL</span>
              <span className="name-word">KABIR</span>
              <span className="name-word">RAFI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Full-Stack</h3>
            <h2 className="landing-info-h2">
              <span className="landing-h2-1">Developer</span>
              <span className="landing-h2-2">Engineer</span>
              <span className="landing-h2-3">Tech Lead</span>
              <span className="landing-h2-4">Full-Stack Creator</span>
            </h2>
            <h2>
              <span className="landing-h2-info">Mobile App Creator</span>
              <span className="landing-h2-info-1">Web Developer</span>
              <span className="landing-h2-info-2">Application Architect</span>
              <span className="landing-h2-info-3">Software Engineer</span>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
