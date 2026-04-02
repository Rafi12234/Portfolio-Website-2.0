import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
export let smoother: { paused: (state: boolean) => void } | null = null;

const Navbar = () => {
  useEffect(() => {
    const desktop = window.innerWidth > 1024;
    smoother = desktop
      ? ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 0.68,
          smoothTouch: 0.08,
          effects: false,
          normalizeScroll: false,
        })
      : null;

    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
    });

    gsap.ticker.lagSmoothing(1000, 16);

    let links = document.querySelectorAll(".header ul a");
    const handlers: Array<{ el: HTMLAnchorElement; fn: (e: Event) => void }> = [];

    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      const onClick = (e: Event) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let target = e.currentTarget as HTMLAnchorElement;
          let section = target.getAttribute("data-href");
          if (section && smoother) {
            (smoother as ScrollSmoother).scrollTo(section, true, "top 8%");
            return;
          }
          if (section) {
            document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
          }
        }
      };
      element.addEventListener("click", onClick);
      handlers.push({ el: element, fn: onClick });
    });

    const onResize = () => {
      ScrollTrigger.refresh(true);
    };

    window.addEventListener("resize", onResize);

    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      window.removeEventListener("resize", onResize);
      (smoother as ScrollSmoother | null)?.kill();
      smoother = null;
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          RAFI
        </a>
        <a
          href="https://github.com/Rafi12234"
          className="navbar-connect"
          data-cursor="disable"
        >
          github.com/Rafi12234
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
