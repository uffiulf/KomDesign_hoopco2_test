gsap.registerPlugin(ScrollTrigger);

// Declare variables at the top
let bubbleInterval;
const bubbleContainer = document.getElementById('bubble-container');

// Start bubbles immediately
bubbleInterval = setInterval(createBubble, 300);

// --- 0. LASTE-ANIMASJON ---
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
    gsap.to(loader, { opacity: 0, duration: 0.5, onComplete: () => loader.style.display = 'none' });
});

// --- 1. HOVEDFUNKSJON FOR SCROLLYTELLING ---
function initScrollytelling() {
    const graphicSteps = gsap.utils.toArray('.graphic-step');
    // VIKTIG: data-index er nå 0 (CCU) og 1 (BECCS)
    graphicSteps.forEach((step, i) => step.setAttribute('data-index', i));

    // Manuell mapping [Tekst-scene-ID, Grafikk-index-den-skal-vise]
    const mapping = [
        ["#scene-1", -1], // Problemet
        ["#scene-2", 0],  // Løsningen (Viser grafikk 0, statisk)
        ["#scene-2-active", 0], // Fangsten Starter (Viser OGSÅ grafikk 0)
        ["#scene-3", 0],  // Resultatet (Viser OGSÅ grafikk 0)
        ["#scene-4", 1]   // BECCS (Viser grafikk 1)
    ];

    mapping.forEach(([sceneID, graphicIndex]) => {
        const scene = document.querySelector(sceneID);

        ScrollTrigger.create({
            trigger: scene,
            start: 'top center',
            end: 'bottom center',
            onToggle: self => {
                scene.classList.toggle('is-active', self.isActive);
                // Toggler den riktige grafikken
                if(graphicIndex !== -1) {
                    graphicSteps[graphicIndex].classList.toggle('is-active', self.isActive);
                }
            },
            // Skrur av alle *andre* grafikk-steg
            onEnter: () => graphicSteps.forEach((step, i) => { if(i !== graphicIndex) step.classList.remove('is-active'); }),
            onEnterBack: () => graphicSteps.forEach((step, i) => { if(i !== graphicIndex) step.classList.remove('is-active'); }),
        });
    });

    // Aktiver det første tekst-steget (Scene 1)
    document.querySelector('#scene-1').classList.add('is-active');
}

initScrollytelling(); // Kjør hovedfunksjonen

// --- 2. TELLER-SYNLIGHET OG ANIMASJON ---
// Styrer synligheten til den faste telleren og etiketten
gsap.to("#co2-teller, #teller-label", {
    opacity: 1,
    visibility: 'visible',
    scrollTrigger: {
        trigger: "#scene-1",
        start: "top center",
        endTrigger: "#scene-4", // Hold den synlig til Scene 4 er ferdig
        end: "bottom center",
        toggleActions: "play reverse play reverse" // Fades inn og ut
    }
});

// Teller-animasjon (rød teller) - Stopper når Scene 2 Active begynner
gsap.to("#co2-teller", {
    innerText: 8000,
    snap: "innerText",
    ease: "none",
    scrollTrigger: {
        trigger: "#scene-1",
        start: "top top",
        endTrigger: "#scene-2-active",
        end: "top 70%",
        scrub: 1,
    }
});

// Ny grønn teller - Starter når Scene 2 Active begynner
gsap.to("#co2-teller-fangst", {
    innerText: 5000,
    snap: "innerText",
    ease: "none",
    scrollTrigger: {
        trigger: "#scene-2-active",
        start: "top 70%",
        endTrigger: "#scene-3",
        end: "bottom bottom",
        scrub: 1,
    }
});





// --- SCENE 2 ACTIVE: FANGST-ANIMASJON ---
let scene2ActiveTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-2-active",
        start: "top 70%", // Start animation as this new scene scrolls in
        end: "bottom center",
        scrub: 1,
        toggleActions: "play reverse play reverse"
    }
});

// 1. Particle moves from Kilde -> Rensing
scene2ActiveTimeline.to(".anim-co2-partikkel", {
    x: 375,
    ease: "none"
}, "<"); // "<" means "at the very start"

// --- NEW PARTICLE COLOR FADE ---
gsap.to(".anim-co2-partikkel", {
    backgroundColor: "var(--color-green)", // Target color
    ease: "none",
    scrollTrigger: {
        trigger: "#scene-2-active",
        start: "top 70%", // Start fading when the scene starts
        end: "bottom center", // Finish fading by the end of the scene
        scrub: true, // Link fade directly to scroll position
        // NO toggleActions needed here, scrub handles reverse automatically
    }
});

// --- SCENE 3: RESULTAT-ANIMASJON ---
let scene3Timeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-3",
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
    }
});

// 1. Particle moves from Rensing -> Kunde
scene3Timeline.to(".anim-co2-partikkel", {
    x: 850, // Move to Kunde
    ease: "none"
});


// --- FADE OUT DASHBOARD CARD ---
gsap.to(".dashboard-card", {
    opacity: 0,
    visibility: "hidden",
    scrollTrigger: {
        trigger: "#scene-4", // Triggered by the BECCS scene
        start: "top center", // As it enters the center
        end: "top top",
        toggleActions: "play none none reverse" // Fade out, but reappear if scrolling back up
    }
});

// --- SCENE 4: NEW BECCS ANIMATION (CORRECT SEQUENCE) ---

// Set boat's starting position (off-screen right) AND ensure it's visible initially
gsap.set("#beccs-skip", { x: "100vw", opacity: 1 }); 

let beccsTidslinje = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-4",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
    }
});

// 1. Boat drives in from the right
beccsTidslinje.to("#beccs-skip", {
    x: "calc(50% - 50px)", // Centers the boat (50% - half boat width)
    ease: "power2.inOut",
    duration: 1.5 // Adjust duration as needed
});

// 2. Pipe draws *after* boat starts arriving
beccsTidslinje.to("#beccs-pipe-path", {
    strokeDashoffset: 0,
    ease: "none"
}, "<0.5"); // Start drawing 0.5s after boat starts moving in

// 3. Particles drop *after* the pipe is fully drawn
// (Ensure .beccs-particle elements exist in HTML & CSS)
beccsTidslinje.to(".beccs-particle", {
    opacity: 1,
    y: 200, // Adjust distance
    ease: "power1.in",
    stagger: 0.2 // Drop one by one
}, ">-0.2"); // Start dropping slightly before pipe finishes drawing

// CO2-partikler som flyter ned røret
const beccsContainer = document.querySelector('#infografikk-2');
let co2ParticleInterval;

function createCO2Particle() {
    if (!beccsContainer) return;
    
    const particle = document.createElement('div');
    particle.classList.add('co2-particle');
    
    // Random timing og størrelse
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    // Random horisontal posisjon rundt røret
    const offset = (Math.random() - 0.5) * 20;
    particle.style.left = `calc(50% + ${offset}px)`;
    
    beccsContainer.appendChild(particle);
    
    // Fjern partikkelen etter animasjonen
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 6000);
}

// Start/stop CO2-partikler basert på scrolling
ScrollTrigger.create({
    trigger: "#scene-4",
    start: "top bottom",
    end: "bottom top",
    onEnter: () => {
        co2ParticleInterval = setInterval(createCO2Particle, 800);
    },
    onLeave: () => {
        clearInterval(co2ParticleInterval);
    },
    onEnterBack: () => {
        co2ParticleInterval = setInterval(createCO2Particle, 800);
    },
    onLeaveBack: () => {
        clearInterval(co2ParticleInterval);
    }
});

// --- 5. BOBLE-GENERATOR (Scene 1) ---
function createBubble() {
    if (!bubbleContainer) return; // Sikkerhetssjekk

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Random størrelse
    const size = Math.random() * 40 + 10 + 'px'; // 10px til 50px
    bubble.style.width = size;
    bubble.style.height = size;

    // Random posisjon (horisontalt)
    bubble.style.left = Math.random() * 100 + '%';

    // Random animasjons-varighet
    bubble.style.animationDuration = Math.random() * 5 + 8 + 's'; // 8s til 13s

    // Random animasjons-forsinkelse
    bubble.style.animationDelay = Math.random() * 3 + 's';

    bubbleContainer.appendChild(bubble);

    // Fjern boblen fra DOM etter at animasjonen er ferdig
    setTimeout(() => {
        bubble.remove();
    }, 13000); // Litt lenger enn maks animasjonstid
}

// --- 6. KONTEKST FADE-IN (Scene 5) ---
gsap.from(".comparison-container", {
    opacity: 0, y: 30, duration: 1.0,
    scrollTrigger: {
        trigger: "#scene-5-kontekst",
        start: "top 60%",
        toggleActions: "play none none none"
    }
});