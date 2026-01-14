document.addEventListener("DOMContentLoaded", () => {
  // Reveal animations on scroll
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  // Persona Tabs
  const personaTabs = document.querySelectorAll(".persona-tab");
  const personaPanels = document.querySelectorAll(".persona-panel");

  personaTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanel = tab.dataset.tab;

      // Update tabs
      personaTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update panels
      personaPanels.forEach((panel) => {
        panel.classList.remove("active");
        if (panel.dataset.panel === targetPanel) {
          panel.classList.add("active");
        }
      });
    });
  });

  // Testimonial Carousel
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const testimonialDots = document.querySelectorAll(".testimonial-dot");
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentTestimonial = index;
  }

  function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(next);
  }

  function startTestimonialAutoplay() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  function stopTestimonialAutoplay() {
    clearInterval(testimonialInterval);
  }

  // Initialize testimonial carousel
  if (testimonialCards.length && testimonialDots.length) {
    showTestimonial(0);
    startTestimonialAutoplay();

    // Dot navigation
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopTestimonialAutoplay();
        showTestimonial(index);
        startTestimonialAutoplay();
      });
    });

    // Pause on hover
    const testimonialCarousel = document.querySelector(".testimonial-carousel");
    if (testimonialCarousel) {
      testimonialCarousel.addEventListener("mouseenter", stopTestimonialAutoplay);
      testimonialCarousel.addEventListener("mouseleave", startTestimonialAutoplay);
    }
  }

  // Video Modal
  const videoModal = document.getElementById("videoModal");
  const watchDemoBtn = document.getElementById("watchDemoBtn");
  const videoModalClose = document.getElementById("videoModalClose");
  const videoModalBackdrop = document.querySelector(".video-modal-backdrop");

  function openVideoModal() {
    videoModal.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeVideoModal() {
    videoModal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  if (watchDemoBtn && videoModal) {
    watchDemoBtn.addEventListener("click", openVideoModal);
  }

  if (videoModalClose) {
    videoModalClose.addEventListener("click", closeVideoModal);
  }

  if (videoModalBackdrop) {
    videoModalBackdrop.addEventListener("click", closeVideoModal);
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal?.classList.contains("open")) {
      closeVideoModal();
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
