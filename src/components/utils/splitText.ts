import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let initialized = false;

function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.splitWordsReady === "1") {
    return Array.from(el.querySelectorAll<HTMLElement>(".split-word"));
  }

  const text = el.textContent?.trim() ?? "";
  if (!text) return [];

  const words = text.split(/\s+/);
  el.textContent = "";

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "split-word";
    span.textContent = word;
    span.style.display = "inline-block";
    el.appendChild(span);
    if (index < words.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
  });

  el.dataset.splitWordsReady = "1";
  return Array.from(el.querySelectorAll<HTMLElement>(".split-word"));
}

function splitChars(el: HTMLElement): HTMLElement[] {
  if (el.dataset.splitCharsReady === "1") {
    return Array.from(el.querySelectorAll<HTMLElement>(".split-char"));
  }

  const text = el.textContent ?? "";
  if (!text.trim()) return [];

  const chars = Array.from(text);
  el.textContent = "";

  chars.forEach((char) => {
    if (char === " ") {
      el.appendChild(document.createTextNode(" "));
      return;
    }
    const span = document.createElement("span");
    span.className = "split-char";
    span.textContent = char;
    span.style.display = "inline-block";
    el.appendChild(span);
  });

  el.dataset.splitCharsReady = "1";
  return Array.from(el.querySelectorAll<HTMLElement>(".split-char"));
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });

  const triggerStart = window.innerWidth <= 1024 ? "top 80%" : "top 72%";

  if (!initialized) {
    initialized = true;

    gsap.utils.toArray<HTMLElement>(".para").forEach((para) => {
      const words = splitWords(para);
      if (!words.length) return;
      gsap.fromTo(
        words,
        { autoAlpha: 0, y: 34, rotateX: -18, transformOrigin: "50% 100%" },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: para.closest("section, div") || para,
            start: triggerStart,
            toggleActions: "play pause resume reverse",
          },
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".title").forEach((title) => {
      const chars = splitChars(title);
      if (!chars.length) return;
      gsap.fromTo(
        chars,
        { autoAlpha: 0, y: 46, rotate: 8, transformOrigin: "50% 100%" },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 0.7,
          stagger: 0.02,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: title.closest("section, div") || title,
            start: triggerStart,
            toggleActions: "play pause resume reverse",
          },
        }
      );
    });

    const aboutMe = document.querySelector<HTMLElement>(".about-me");
    if (aboutMe) {
      gsap.fromTo(
        aboutMe,
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: triggerStart,
            toggleActions: "play pause resume reverse",
          },
        }
      );
    }
  }

  ScrollTrigger.refresh();
}
