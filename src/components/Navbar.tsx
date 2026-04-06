import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

type SmootherApi = {
  paused: (state: boolean) => void;
  scrollTo: (target: string, smooth?: boolean, position?: string) => void;
  kill: () => void;
};

export let smoother: SmootherApi | null = null;

const Navbar = () => {
  useEffect(() => {
    const desktop = window.innerWidth > 1024;
    smoother = desktop
      ? {
          paused: () => {
            // Native scrolling has no paused state; kept for API compatibility.
          },
          scrollTo: (target: string) => {
            document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
          },
          kill: () => {
            // No cleanup required for native scrolling fallback.
          },
        }
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
            smoother.scrollTo(section, true, "top 8%");
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
      smoother?.kill();
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
