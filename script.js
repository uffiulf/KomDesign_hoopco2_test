gsap.registerPlugin(ScrollTrigger);

// --- 0. LASTE-ANIMASJON ---
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
    gsap.to(loader, { opacity: 0, duration: 0.5, onComplete: () => loader.style.display = 'none' });
});

// --- 1. HOVEDFUNKSJON FOR SCROLLYTELLING ---
function initScrollytelling() {
    // Hent alle tekstelementene
    const textScenes = gsap.utils.toArray('.text-scene');

    // Loop gjennom hver tekst-scene
    textScenes.forEach((scene, i) => {
        const graphicStep = document.querySelector(`.graphic-step[data-index="${i}"]`);

        ScrollTrigger.create({
            trigger: scene,
            start: 'top center',
            end: 'bottom center',
            // Marker/avmarker aktivt steg
            onToggle: self => {
                if (self.isActive) {
                    scene.classList.add('is-active');
                    if (graphicStep) graphicStep.classList.add('is-active');
                } else {
                    scene.classList.remove('is-active');
                    if (graphicStep) graphicStep.classList.remove('is-active');
                }
            },
        });
    });

    // Gi de grafiske stegene en data-index som matcher tekst-scenene
    gsap.utils.toArray('.graphic-step').forEach((step, i) => {
        step.setAttribute('data-index', i);
    });

    // Sørg for at det første steget er aktivt fra start
    document.querySelector('.text-scene').classList.add('is-active');
    document.querySelector('.graphic-step[data-index="0"]').classList.add('is-active');
}

initScrollytelling(); // Kjør hovedfunksjonen

// --- 2. TELLER-ANIMASJON (Scene 1) ---
gsap.to("#co2-teller", {
    innerText: 8000,
    snap: "innerText",
    ease: "none",
    scrollTrigger: {
        trigger: "#scene-1",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
    }
});

// --- 3. CCU PROSESS-ANIMASJON (Scene 2) ---
let prosessTidslinje = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-2",
        start: "top top",
        end: "bottom top", // Fiks for hastighet
        scrub: 1, // Fiks for hastighet
    }
});
prosessTidslinje.to(".anim-co2-partikkel", { x: 375, ease: "none" });
prosessTidslinje.to(".anim-co2-partikkel", { backgroundColor: "var(--color-green)", ease: "none" }, "-=0.2");
prosessTidslinje.to(".anim-co2-partikkel", { x: 750, ease: "none" });

// --- 4. BECCS PROSESS-ANIMASJON (Scene 4) (SVG "DRAW") ---
gsap.to("#beccs-pipe-path", {
    strokeDashoffset: 0, // Animerer "tegningen" av linjen
    ease: "none",
    scrollTrigger: {
        trigger: "#scene-4",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
    }
});

// --- 5. BOBLE-GENERATOR (Scene 1) ---
const bubbleContainer = document.getElementById('bubble-container');
let bubbleInterval; // Vi definerer intervallet her

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

// Styrer når boble-maskinen skal skrus av og på
ScrollTrigger.create({
    trigger: "#scene-1",
    start: "top bottom", // Når toppen av scenen treffer bunnen av skjermen
    end: "bottom top", // Når bunnen av scenen treffer toppen

    // Når vi scroller INN i scenen:
    onEnter: () => {
        // Start å lage bobler hvert 300ms
        bubbleInterval = setInterval(createBubble, 300);
    },
    // Når vi scroller UT av scenen:
    onLeave: () => {
        clearInterval(bubbleInterval); // Stopp å lage bobler
    },
    // Når vi scroller TILBAKE INN i scenen:
    onEnterBack: () => {
        bubbleInterval = setInterval(createBubble, 300);
    },
    // Når vi scroller TILBAKE UT av scenen:
    onLeaveBack: () => {
        clearInterval(bubbleInterval); // Stopp å lage bobler
    }
});

// --- 6. KONTEKST FADE-IN (Scene 5) ---
gsap.from(".comparison-container", {
    opacity: 0, y: 30, duration: 1.0,
    scrollTrigger: {
        trigger: "#scene-5-kontekst",
        start: "top 60%",
        toggleActions: "play none none none"
    }
});