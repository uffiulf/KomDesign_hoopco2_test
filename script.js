// Registrer ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// CO₂-teller animasjon
let co2Counter = { value: 0 };
let counterElement = document.getElementById("co2-teller");

// Animasjon for CO₂-telleren (Scene 1)
gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-1",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: function() {
            counterElement.textContent = Math.round(co2Counter.value) + " CO₂";
        }
    }
}).to(co2Counter, {
    value: 5000,
    ease: "none"
});

// Animasjoner for Scene 0 (Intro)
gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-0",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
}).from("#scene-0 h1", {
    y: 100,
    opacity: 0,
    duration: 1
}).from("#scene-0 h2", {
    y: 100,
    opacity: 0,
    duration: 1
}, "-=0.5").from("#scene-0 p", {
    y: 50,
    opacity: 0,
    duration: 1
}, "-=0.3");

// Animasjoner for Scene 1 (Problemet)
gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-1",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
}).from("#scene-1 h2", {
    y: 100,
    opacity: 0,
    duration: 1
}).from("#scene-1 p", {
    y: 50,
    opacity: 0,
    duration: 1
}, "-=0.5").from(".factory", {
    scale: 0,
    opacity: 0,
    duration: 1
}, "-=0.3").from(".smoke", {
    x: -100,
    opacity: 0,
    duration: 1
}, "-=0.5");

// Animasjoner for Scene 2 (Løsningen)
gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-2",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
}).from("#scene-2 h2", {
    y: 100,
    opacity: 0,
    duration: 1
}).from("#scene-2 p", {
    y: 50,
    opacity: 0,
    duration: 1
}, "-=0.5").from(".hoop-device", {
    rotation: 360,
    scale: 0,
    opacity: 0,
    duration: 1
}, "-=0.3").from(".bubbles", {
    scale: 0,
    opacity: 0,
    duration: 1
}, "-=0.5");

// Animasjoner for Scene 3 (Resultatet)
gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-3",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
}).from("#scene-3 h2", {
    y: 100,
    opacity: 0,
    duration: 1
}).from("#scene-3 p", {
    y: 50,
    opacity: 0,
    duration: 1
}, "-=0.5").from(".clean-air", {
    scale: 0,
    opacity: 0,
    duration: 1
}, "-=0.3").from(".products", {
    scale: 0,
    opacity: 0,
    duration: 1
}, "-=0.5");

// Fargeendring på telleren når vi kommer til løsningen
gsap.to(".teller", {
    scrollTrigger: {
        trigger: "#scene-2",
        start: "top center",
        toggleActions: "play none none reverse"
    },
    color: "#28a745",
    duration: 0.5
});