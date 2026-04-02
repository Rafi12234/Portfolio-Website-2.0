import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    name: "AUST Robotics Club Mobile Application",
    category: "Official Club Mobile App",
    tools: "Flutter, Dart, Firebase",
    link: "https://github.com/Rafi12234/AUST-Robotics-Club-Mobile-Application",
  },
  {
    name: "AustRC Website",
    category: "Official Club Website",
    tools: "TypeScript, React, Vite",
    link: "https://github.com/Rafi12234/AustRC-Website",
  },
  {
    name: "CareerPath Ultimate Solution",
    category: "Youth Career Development Platform",
    tools: "JavaScript, React, Node.js",
    link: "https://github.com/Rafi12234/CareerPath-Ultimate-Solution-for-Youth-Career-Development",
  },
  {
    name: "Robomania 2.0 WebApp",
    category: "Robotics Competition Platform",
    tools: "React, Node.js, MongoDB",
    link: "https://github.com/Rafi12234/Robomania-2.0-Main-_WebApp",
  },
  {
    name: "IIUC 25 Version 2.0",
    category: "Event Management Web Application",
    tools: "HTML, CSS, JavaScript",
    link: "https://github.com/Rafi12234/IIUC_25_Version2.0",
  },
  {
    name: "Destination Cost Sharing Companion",
    category: "Travel Budget Management App",
    tools: "TypeScript, React",
    link: "https://github.com/Rafi12234/Destination-Based-Cost-Sharing-Companion-App",
  },
];

const Work = () => {
  useGSAP(() => {
    const section = document.querySelector(".work-section") as HTMLElement | null;
    const flex = document.querySelector(".work-flex") as HTMLElement | null;
    if (!section || !flex) return;

    let timeline: gsap.core.Timeline | null = null;

    const getTranslateX = () => {
      const boxes = Array.from(
        flex.querySelectorAll(".work-box")
      ) as HTMLElement[];
      if (!boxes.length) return 0;

      const marginLeft = Math.abs(parseFloat(getComputedStyle(flex).marginLeft) || 0);
      const paddingRight = parseFloat(getComputedStyle(flex).paddingRight) || 0;

      const lastBox = boxes[boxes.length - 1];
      const cardsWidth = lastBox.offsetLeft + lastBox.offsetWidth;
      const totalTrackWidth = cardsWidth + marginLeft + paddingRight;

      return Math.max(0, totalTrackWidth - section.clientWidth);
    };

    const createAnimation = () => {
      const translateX = getTranslateX();

      timeline?.kill();
      ScrollTrigger.getById("work")?.kill();
      gsap.set(flex, { x: 0 });

      if (translateX <= 0) return;

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${translateX}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      timeline.to(flex, {
        x: -translateX,
        ease: "none",
      });
    };

    createAnimation();

    const onResize = () => {
      createAnimation();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      timeline?.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt="" link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
