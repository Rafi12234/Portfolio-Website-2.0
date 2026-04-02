import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sub Executive, Website & App Development Team</h4>
                <h5>AUST Robotics Club</h5>
              </div>
              <h3>Spring 2023</h3>
            </div>
            <p>
              Started working on official club digital products and contributed
              to both website and app development activities.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Sub Executive, Website & App Development Team</h4>
                <h5>AUST Robotics Club</h5>
              </div>
              <h3>Fall 2024</h3>
            </div>
            <p>
              Led key development contributions and received the Best Panel
              Member recognition for impact and consistency.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant Director, Website & App Development Team</h4>
                <h5>AUST Robotics Club</h5>
              </div>
              <h3>Spring 2025 - Present</h3>
            </div>
            <p>
              Leading roadmap execution across the official website and mobile
              app as Chief Developer of the official mobile application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
