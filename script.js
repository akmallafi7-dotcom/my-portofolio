/* =========================
   ACTIVE NAVBAR SCROLL
========================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 250) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

/* =========================
   MOUSE FOLLOW GLOW
========================== */
const glow = document.querySelector(".glow");

document.addEventListener("mousemove", (e) => {
  glow.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
});

/* =========================
   3D TILT CARD EFFECT
========================== */
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) scale(1.04)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  });
});

/* =========================
   SCROLL REVEAL ANIMATION
========================== */
const revealElements = document.querySelectorAll(".card, .hero-card, .title");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

/* =========================
   MOBILE MENU TOGGLE
========================== */
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active-sidebar");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active-sidebar");
    }
  });
});

/* =========================
   TYPING EFFECT (FIXED)
========================== */
const typing = document.querySelector(".typing");

const words = [
  "Frontend Developer",
  "UI Designer",
  "Web Creator",
  "Interactive Designer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typing.textContent = currentWord.substring(0, charIndex);

  let speed = 100;

  if (isDeleting) {
    speed = 50;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    speed = 1200;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();