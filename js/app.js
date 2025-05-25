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
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main_container").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

init();

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
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  });
});

function removeActive(){
  document.querySelectorAll('.menu').forEach(link=> link.parentElement?.classList.remove('active'))
}

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