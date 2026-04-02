import gsap from "gsap";
import { smoother } from "../Navbar";

let heroTitlesTl: gsap.core.Timeline | null = null;
let nameIntroTl: gsap.core.Timeline | null = null;

function splitToChars(el: Element): HTMLElement[] {
  const htmlEl = el as HTMLElement;
  if (htmlEl.dataset.splitReady === "1") {
    return Array.from(htmlEl.querySelectorAll<HTMLElement>(".hero-char"));
  }

  const text = htmlEl.textContent ?? "";
  htmlEl.textContent = "";

  for (const ch of Array.from(text)) {
    if (ch === " ") {
      htmlEl.appendChild(document.createTextNode("\u00A0"));
      continue;
    }
    const span = document.createElement("span");
    span.className = "hero-char";
    span.textContent = ch;
    htmlEl.appendChild(span);
  }

  htmlEl.dataset.splitReady = "1";
  return Array.from(htmlEl.querySelectorAll<HTMLElement>(".hero-char"));
}

function setupNameIntroAnimation() {
  const introTag = document.querySelector(".landing-intro h2");
  const nameWords = document.querySelectorAll(".landing-intro .name-word");

  if (!introTag || !nameWords.length) return;

  nameIntroTl?.kill();

  gsap.set(introTag, { autoAlpha: 0, y: 22 });
  gsap.set(nameWords, { autoAlpha: 0, y: 34 });

  nameIntroTl = gsap.timeline();
  nameIntroTl
    .fromTo(
      introTag,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }
    )
    .fromTo(
      nameWords,
      { autoAlpha: 0, y: 26 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: "power3.out",
      },
      "-=0.2"
    );
}

function setupHeroTitleLoop() {
  const topVariants = [
    document.querySelector(".landing-h2-1"),
    document.querySelector(".landing-h2-2"),
    document.querySelector(".landing-h2-3"),
    document.querySelector(".landing-h2-4"),
  ];
  
  const bottomVariants = [
    document.querySelector(".landing-h2-info"),
    document.querySelector(".landing-h2-info-1"),
    document.querySelector(".landing-h2-info-2"),
    document.querySelector(".landing-h2-info-3"),
  ];

  if (topVariants.some(el => !el) || bottomVariants.some(el => !el)) return;

  const charArrays = topVariants.map(el => splitToChars(el!));
  const bottomCharArrays = bottomVariants.map(el => splitToChars(el!));

  heroTitlesTl?.kill();

  // Initialize: first pair visible, rest hidden
  topVariants.forEach((el, i) => {
    gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 });
  });
  bottomVariants.forEach((el, i) => {
    gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 });
  });

  charArrays.forEach((chars, i) => {
    gsap.set(chars, { yPercent: i === 0 ? 0 : 120, autoAlpha: i === 0 ? 1 : 0 });
  });
  bottomCharArrays.forEach((chars, i) => {
    gsap.set(chars, { yPercent: i === 0 ? 0 : 120, autoAlpha: i === 0 ? 1 : 0 });
  });

  heroTitlesTl = gsap.timeline({ repeat: -1, repeatDelay: 0.18 });

  const holdDelay = 0.92;

  // Cycle through all 4 variants
  for (let i = 0; i < 4; i++) {
    const currentIdx = i;
    const nextIdx = (i + 1) % 4;

    // Current text exits
    heroTitlesTl!
      .to(
        [...charArrays[currentIdx], ...bottomCharArrays[currentIdx]],
        {
          yPercent: -120,
          autoAlpha: 0,
          duration: 0.42,
          stagger: 0.018,
          ease: "power2.in",
          delay: holdDelay,
        },
        i === 0 ? 0 : ">"
      )
      // Hide current container
      .to(
        [topVariants[currentIdx], bottomVariants[currentIdx]],
        { autoAlpha: 0, duration: 0.1 },
        "<0.4"
      )
      // Show next container
      .to(
        [topVariants[nextIdx], bottomVariants[nextIdx]],
        { autoAlpha: 1, duration: 0.1 },
        "<"
      )
      // Next text enters
      .to(
        [...charArrays[nextIdx], ...bottomCharArrays[nextIdx]],
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.48,
          stagger: 0.018,
          ease: "power2.out",
        },
        "<0.06"
      );
  }
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  gsap.set([".landing-container", ".header", ".icons-section", ".nav-fade"], {
    opacity: 1,
  });
  gsap.set(".landing-container", { y: "0%" });
  if (smoother) {
    smoother.paused(false);
  }
  const main = document.getElementsByTagName("main")[0];
  if (main) {
    main.classList.add("main-active");
  }
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 0.2,
  });

  setupNameIntroAnimation();
  setupHeroTitleLoop();
}
