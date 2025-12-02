// Force scroll to top on page refresh/load
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

// Ensure page starts at top
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 0);
};

// Additional fallback for browser history navigation
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// Section fade-in on scroll
const sections = document.querySelectorAll(".section");
const fadeOptions = { threshold: 0.13 };
const fadeInOnScroll = new IntersectionObserver((entries, fadeInOnScroll) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeInOnScroll.unobserve(entry.target);
    }
  });
}, fadeOptions);
sections.forEach((section) => {
  fadeInOnScroll.observe(section);
});

// Hamburger menu logic
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navToggle.setAttribute(
    "aria-label",
    navLinks.classList.contains("open") ? "Close navigation" : "Open navigation"
  );
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 820) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-label", "Open navigation");
    }
  });
});

// Skill tooltip effect
const skillElements = document.querySelectorAll(".skill");
const tooltip = document.getElementById("skill-tooltip");
skillElements.forEach((skill) => {
  skill.addEventListener("mousemove", (e) => {
    tooltip.textContent = skill.dataset.desc;
    tooltip.style.display = "block";
    tooltip.style.top = e.pageY - 35 + "px";
    tooltip.style.left = e.pageX + 15 + "px";
  });
  skill.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
});

// Navbar active link highlight logic improved for accurate section highlight
window.addEventListener("scroll", () => {
  const fromTop = window.scrollY + 90; // Adjust offset if needed
  let currentSectionId = null;

  document.querySelectorAll("section[id]").forEach((section) => {
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      currentSectionId = section.id;
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Contact form handling — UI only demo
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("form-response").textContent =
      "Thank you for your message! (This is a demo. No actual message sent.)";
    this.reset();
  });

// Scroll to Top Button Logic and Theming
const scrollBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 180) {
    scrollBtn.classList.add("show");
    const scrollPercent = Math.min(
      window.scrollY / (0.5 * window.innerHeight),
      1
    );
    if (scrollPercent < 0.5) {
      scrollBtn.style.background = `linear-gradient(144deg, #18181b ${
        100 - 100 * scrollPercent
      }%, #FFD600 ${100 * scrollPercent}%)`;
      scrollBtn.style.color = "#FFD600";
    } else {
      scrollBtn.style.background = `linear-gradient(120deg, #FFD600 ${
        100 * scrollPercent
      }%, #18181b ${100 - 100 * scrollPercent}%)`;
      scrollBtn.style.color = "#18181b";
    }
  } else {
    scrollBtn.classList.remove("show");
    scrollBtn.style.background = "#18181b";
    scrollBtn.style.color = "#FFD600";
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
