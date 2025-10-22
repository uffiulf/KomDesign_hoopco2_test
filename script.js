// Registrer ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Styrer synligheten til telleren
gsap.to(".teller", {
    opacity: 1,
    visibility: 'visible',
    scrollTrigger: {
        trigger: "#scene-1",
        start: "top 70%",
        endTrigger: "#scene-5",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse"
    }
});

// --- SCENE 2: PROSESS-ANIMASJON (CCU) ---
let prosessTidslinje = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-2", // Animasjonen skjer i Scene 2
        start: "center center",      // Start når Scene 2 er sentrert på skjermen (mye senere)
        end: "bottom top",  // Slutt når bunnen av Scene 2 treffer toppen av skjermen
        scrub: 1,              // Jevn, liten "lag" i stedet for 1:1-kontroll
    }
});

// Nå legger vi til stegene i animasjonen

// 1. Partikkelen beveger seg fra Kilde til Boks (bruker 40% av tiden)
prosessTidslinje.to(".anim-co2-partikkel", {
    x: 375, // Flytter den horisontalt til Hoop CO2 Rensing
    ease: "none",
    duration: 0.4 // Bruker 40% av total animasjonstid
});

// 2. Partikkelen blir "renset" (byter farge) når den er i boksen
prosessTidslinje.to(".anim-co2-partikkel", {
    backgroundColor: "#28a745", // Bytter til "ren" grønnfarge
    ease: "none",
    duration: 0.1 // Kort pause for fargeendring
});

// 3. Partikkelen beveger seg fra Boks til Kunde (bruker 50% av tiden)
prosessTidslinje.to(".anim-co2-partikkel", {
    x: 750, // Flytter den helt til Bryggeri
    ease: "none",
    duration: 0.5 // Bruker 50% av total animasjonstid
});

// --- SLUTT PÅ SCENE 2-ANIMASJON ---

// --- SCENE 4: PROSESS-ANIMASJON (BECCS) ---
let beccsTidslinje = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-4",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
    }
});

// 1. Røret animeres nedover mot havbunnen
beccsTidslinje.to("#beccs-rør", {
    height: 240, // Animerer høyden
    ease: "none"
});

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

// --- SCENE 5: SAMMENLIGNING FADE-IN ---
gsap.from(".comparison-container", {
    opacity: 0,
    y: 30,
    duration: 1.0,
    scrollTrigger: {
        trigger: "#scene-5",
        start: "top 60%",
        toggleActions: "play none none none"
    }
});