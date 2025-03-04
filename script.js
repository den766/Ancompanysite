"use strict";

// Elements selecting
const sections = document.querySelectorAll("section");
const nav = document.querySelector(".navlinks");
const ScrollbtnHome = document.getElementById('home');
const sectionHome = document.querySelector('.Banner-Section');
const ScrolltoBtn = document.getElementById("Category");
const ScrollToCom = document.getElementById("Community");
const ScrollToBlog = document.getElementById("blog");
const SectionBlog = document.querySelector(".Questions");
const ScrolltoServicebtn = document.getElementById("Service");
const SectionService = document.querySelector(".Section__1");
const SectionCategory = document.querySelector(".Section__Two");
const SectionComCategory = document.querySelector(".Feedback__Section");
const header = document.querySelector(".nav");

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");
const scrollTopBtn = document.getElementById("scrollTopBtn");
let currentIndex = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  updateSlider();
});

nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  updateSlider();
});

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    currentIndex = parseInt(e.target.dataset.index);
    updateSlider();
  });
});

// Nav Fading Animation.
const FadeOver = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest(".navlinks").querySelectorAll(".nav_link");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};

nav.addEventListener("mouseover", FadeOver.bind(0.5));
nav.addEventListener("mouseout", FadeOver.bind(1));

// Section Scrollto

ScrollbtnHome.addEventListener('click', function (e) {
    
    sectionHome.scrollIntoView({ behavior: "smooth" });
})

ScrolltoBtn.addEventListener("click", function (e) {
  SectionCategory.scrollIntoView({ behavior: "smooth" });
});

ScrollToCom.addEventListener("click", function (e) {
  SectionComCategory.scrollIntoView({ behavior: "smooth" });
});

ScrolltoServicebtn.addEventListener("click", function (e) {
  SectionService.scrollIntoView({ behavior: "smooth" });
});

ScrollToBlog.addEventListener("click", function (e) {
  SectionBlog.scrollIntoView({ behavior: "smooth" });
});

// Sticky navigation

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const StickyNav = function (entreis) {
  const [entry] = entreis;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(StickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Sections Revealing

const allSections = document.querySelectorAll(".Section");

const SectionReaveal = function (entreis, observer) {
  const [entry] = entreis;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const SectionObserver = new IntersectionObserver(SectionReaveal, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  SectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// ScrollTopBtn funcionality.

let scrollThreshold = 0;
for (let i = 0; i < 3 && i < sections.length; i++) {
  scrollThreshold += sections[i].offsetHeight;
}

window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

