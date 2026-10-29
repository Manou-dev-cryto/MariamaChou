/* =====================================================================
   POUR MARIAMA — script.js
   Gère : code secret, navigation entre sections, décorations dynamiques
   (pétales / particules / confettis), lecteur de musique, galerie.
===================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------
     0. CONFIG
  --------------------------------------------------------------- */
  const SECRET_CODE = "2609";
  const CODE_LENGTH = SECRET_CODE.length;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const liveRegion = document.getElementById("live-region");
  function announce(message) {
    if (liveRegion) liveRegion.textContent = message;
  }

  /* ---------------------------------------------------------------
     1. ÉCRAN DE VERROUILLAGE — CODE SECRET
  --------------------------------------------------------------- */
  const dots = Array.from(document.querySelectorAll(".dot"));
  const indicatorsWrap = document.getElementById("code-indicators");
  const feedbackEl = document.getElementById("code-feedback");
  const hiddenInput = document.getElementById("secret-code-input");
  const keypad = document.querySelector(".keypad");

  let currentCode = "";
  let locked = false; // empêche la saisie pendant la vérification / transition

  function renderDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("filled", i < currentCode.length);
      dot.classList.remove("error");
    });
  }

  function resetCode() {
    currentCode = "";
    renderDots();
    hiddenInput.value = "";
  }

  function handleDigit(digit) {
    if (locked) return;
    if (currentCode.length >= CODE_LENGTH) return;
    currentCode += digit;
    renderDots();
    feedbackEl.textContent = "";
    feedbackEl.className = "code-feedback";

    if (currentCode.length === CODE_LENGTH) {
      verifyCode();
    }
  }

  function handleDelete() {
    if (locked) return;
    currentCode = currentCode.slice(0, -1);
    renderDots();
  }

  function verifyCode() {
    locked = true;
    setTimeout(() => {
      if (currentCode === SECRET_CODE) {
        feedbackEl.textContent = "Code accepté ❤️";
        feedbackEl.classList.add("is-success");
        announce("Code accepté. Ouverture de ton cadeau.");
        setTimeout(openGift, 500);
      } else {
        feedbackEl.textContent = "Code incorrect 😅 Réessaie...";
        feedbackEl.classList.add("is-error");
        announce("Code incorrect. Réessaie.");
        dots.forEach((d) => d.classList.add("error"));
        indicatorsWrap.classList.add("shake");
        setTimeout(() => {
          indicatorsWrap.classList.remove("shake");
          resetCode();
          locked = false;
        }, 500);
      }
    }, 220);
  }

  if (keypad) {
    keypad.addEventListener("click", (e) => {
      const btn = e.target.closest(".key");
      if (!btn || btn.classList.contains("key--empty")) return;
      const key = btn.dataset.key;

      btn.classList.add("is-pressed");
      setTimeout(() => btn.classList.remove("is-pressed"), 150);
      spawnClickSparkle(btn);

      if (key === "delete") {
        handleDelete();
      } else {
        handleDigit(key);
      }
    });
  }

  // Support clavier physique (accessibilité + confort)
  hiddenInput.addEventListener("keydown", (e) => {
    // laissé pour compat, la saisie se fait surtout via les boutons
  });
  document.addEventListener("keydown", (e) => {
    const lockScreen = document.getElementById("lock-screen");
    if (lockScreen.hidden) return;
    if (/^[0-9]$/.test(e.key)) {
      handleDigit(e.key);
    } else if (e.key === "Backspace") {
      handleDelete();
    }
  });

  /* ---------------------------------------------------------------
     2. TRANSITION D'OUVERTURE DU CADEAU
  --------------------------------------------------------------- */
  const overlay = document.getElementById("gift-opening-overlay");
  const lockScreenSection = document.getElementById("lock-screen");
  const giftExperience = document.getElementById("gift-experience");

  function openGift() {
    overlay.classList.add("active");
    burstSparkles(24);
    burstPetals(18);

    const delay = reducedMotion ? 200 : 1400;

    setTimeout(() => {
      lockScreenSection.hidden = true;
      giftExperience.hidden = false;
      overlay.classList.add("fade-out");
      goToSection("birthday-section", { skipScroll: false, instant: true });
      setTimeout(() => {
        overlay.classList.remove("active", "fade-out");
      }, 900);
    }, delay);
  }

  /* ---------------------------------------------------------------
     3. NAVIGATION ENTRE SECTIONS
  --------------------------------------------------------------- */
  function goToSection(id, opts) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

    // déplacer le focus pour l'accessibilité clavier / lecteurs d'écran
    const heading = target.querySelector("h1, h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      setTimeout(() => heading.focus({ preventScroll: true }), reducedMotion ? 0 : 500);
    }

    if (id === "final-section") {
      triggerFinalCelebration();
    }
  }

  document.querySelectorAll(".btn-continue").forEach((btn) => {
    btn.addEventListener("click", () => {
      spawnClickSparkle(btn);
      goToSection(btn.dataset.next);
    });
  });

  /* ---------------------------------------------------------------
     4. DÉCORATIONS DYNAMIQUES — pétales, particules, confettis
     Système réutilisable, limité, basé sur transform/opacity.
  --------------------------------------------------------------- */
  const petalsLayer = document.getElementById("petals-layer");
  const sparklesLayer = document.getElementById("sparkles-layer");

  const petalColors = ["#FFF9F0", "#F8F1E7", "#F2D675", "#C9A45C", "#7A1F32"];
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  const MAX_PETALS = isMobile ? 10 : 18;
  const MAX_SPARKLES = isMobile ? 14 : 24;

  function spawnPetal() {
    if (reducedMotion) return;
    if (petalsLayer.childElementCount >= MAX_PETALS) return;
    const petal = document.createElement("span");
    petal.className = "petal";
    const size = 10 + Math.random() * 10;
    petal.style.width = size + "px";
    petal.style.height = size * 1.3 + "px";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
    const duration = 9 + Math.random() * 6;
    petal.style.animationDuration = duration + "s";
    petalsLayer.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 200);
  }

  function spawnSparkle() {
    if (reducedMotion) return;
    if (sparklesLayer.childElementCount >= MAX_SPARKLES) return;
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.animationDelay = (Math.random() * 1.5) + "s";
    sparklesLayer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 4200);
  }

  function burstPetals(n) {
    if (reducedMotion) return;
    for (let i = 0; i < n; i++) {
      setTimeout(spawnPetal, i * 60);
    }
  }

  function burstSparkles(n) {
    if (reducedMotion) return;
    for (let i = 0; i < n; i++) {
      setTimeout(spawnSparkle, i * 40);
    }
  }

  function spawnClickSparkle(el) {
    if (reducedMotion) return;
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < 4; i++) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.style.left = rect.left + rect.width / 2 + (Math.random() * 30 - 15) + "px";
      sparkle.style.top = rect.top + rect.height / 2 + (Math.random() * 30 - 15) + "px";
      sparklesLayer.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 900);
    }
  }

  // Ambiance continue légère de pétales / particules
  if (!reducedMotion) {
    setInterval(spawnPetal, 2200);
    setInterval(spawnSparkle, 1400);
  }

  /* ---------------------------------------------------------------
     5. CONFETTIS — section finale
  --------------------------------------------------------------- */
  const confettiColors = ["#C9A45C", "#E6C766", "#F2D675", "#7A1F32", "#FFF9F0"];

  function spawnConfetti() {
    if (reducedMotion) return;
    const confetti = document.createElement("span");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.setProperty("--drift", (Math.random() * 160 - 80) + "px");
    const duration = 5 + Math.random() * 3;
    confetti.style.animationDuration = duration + "s";
    petalsLayer.appendChild(confetti);
    setTimeout(() => confetti.remove(), duration * 1000 + 200);
  }

  let finalCelebrationDone = false;
  function triggerFinalCelebration() {
    if (finalCelebrationDone || reducedMotion) return;
    finalCelebrationDone = true;
    for (let i = 0; i < 40; i++) {
      setTimeout(spawnConfetti, i * 45);
    }
    burstSparkles(30);
    burstPetals(16);
  }
  /* ---------------------------------------------------------------
     6. GALERIE — modale accessible au clavier
  --------------------------------------------------------------- */
  const galleryModal = document.getElementById("gallery-modal");
  const galleryModalImg = document.getElementById("gallery-modal-img");
  const galleryModalCaption = document.getElementById("gallery-modal-caption");
  let lastFocusedThumb = null;

  document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => openGalleryModal(thumb));
  });

  function openGalleryModal(thumb) {
    lastFocusedThumb = thumb;
    galleryModalImg.src = thumb.dataset.full;
    galleryModalImg.alt = thumb.querySelector("img").alt;
    galleryModalCaption.textContent = thumb.dataset.caption || "";
    galleryModal.hidden = false;
    const closeBtn = galleryModal.querySelector(".gallery-modal-close");
    closeBtn.focus();
    document.addEventListener("keydown", trapModalFocus);
  }

  function closeGalleryModal() {
    galleryModal.hidden = true;
    document.removeEventListener("keydown", trapModalFocus);
    if (lastFocusedThumb) lastFocusedThumb.focus();
  }

  galleryModal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeGalleryModal);
  });

  function trapModalFocus(e) {
    if (e.key === "Escape") {
      closeGalleryModal();
      return;
    }
    if (e.key !== "Tab") return;
    const focusables = galleryModal.querySelectorAll("button");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

})();
