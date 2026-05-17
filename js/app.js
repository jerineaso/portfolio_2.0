function init() {
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main_container"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(".main_container", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main_container").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

// init();

function updateExperienceYears() {
  const startDate = new Date('2022-08-22');
  const now = new Date();
  const elapsedMs = now - startDate;
  const years = elapsedMs / (1000 * 60 * 60 * 24 * 365.2425);
  const formattedYears = years.toFixed(1);

  ['experience-years', 'experience-years-inline'].forEach(function(id) {
    const node = document.getElementById(id);
    if (node) node.textContent = formattedYears;
  });
}

function updateCurrentYear() {
  const yearNode = document.getElementById('current-year');
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', function () {
  updateExperienceYears();
  updateCurrentYear();
});

// Cursor
var crsr = document.querySelector(".cursor")
document.addEventListener("mousemove",function(dets){
    crsr.style.left = dets.x + 10+"px"
    crsr.style.top = dets.y + 10+"px"
})

// Menu Link Smooth scroll
document.querySelectorAll('.menu').forEach(link => {
  link.addEventListener('click', function (e) {
    removeActive()
    const parentElement = link?.parentElement
    parentElement.classList.add('active');
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const topOffset = targetId === '#home' ? 120 : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth'
      });
    }
  });
});

function removeActive(){
  document.querySelectorAll('.menu').forEach(link=> link.parentElement?.classList.remove('active'))
}

// Scroll-based active menu highlight — picks the section most visible in viewport
const sections = document.querySelectorAll('.playground section[id]');

function setActiveSectionFromScroll() {
  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach(function(section) {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);
    if (rect.top <= window.innerHeight * 0.5 && distance < closestDistance) {
      closestDistance = distance;
      closestSection = section;
    }
  });

  if (closestSection) {
    removeActive();
    const id = closestSection.getAttribute('id');
    const activeLink = document.querySelector(`.menu[href="#${id}"]`);
    if (activeLink) activeLink.parentElement.classList.add('active');
  }
}

window.addEventListener('scroll', setActiveSectionFromScroll, { passive: true });
setActiveSectionFromScroll();

// GSAP animations
gsap.from(".playground", {
  y: -20,
  opacity: 0,
  delay: 0.8,
  duration: 0.7
})

gsap.from("aside", {
  y: -20,
  opacity: 0,
  delay: 0.8,
  duration: 0.7
})