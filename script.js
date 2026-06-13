const yearElement = document.querySelector("#year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];

const setActiveLink = () => {
  if (sections.length === 0 || navLinks.length === 0) {
    return;
  }

  const current = sections
    .map((section) => ({
      id: section.id,
      top: Math.abs(section.getBoundingClientRect().top),
    }))
    .sort((a, b) => a.top - b.top)[0];

  if (!current) {
    return;
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

const revealItems = [...document.querySelectorAll(".reveal")];

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const projectTabs = [...document.querySelectorAll(".project-tab")];
const projectCards = [...document.querySelectorAll("[data-project-card]")];

projectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedProject = tab.dataset.project;

    projectTabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
    });

    projectCards.forEach((card) => {
      const isActive = card.dataset.projectCard === selectedProject;
      card.classList.toggle("active-project", isActive);
      card.classList.toggle("dimmed", !isActive);
    });
  });
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoLink = `mailto:aftabmulani001@gmail.com?subject=${subject}&body=${body}`;
    const mailWindow = window.open(mailtoLink, "_self");

    // Clear the form inputs after submission.
    contactForm.reset();

    if (formStatus) {
      // Provide a clear status for users whose mail app opened in a new context.
      formStatus.textContent = "Opening your email app. Message drafted successfully!";
      formStatus.style.color = "var(--teal)";

      if (!mailWindow) {
        formStatus.textContent = "Please use the email link below if your mail app did not open.";
        formStatus.style.color = "var(--amber)";
      }

      setTimeout(() => {
        formStatus.textContent = "";
      }, 5000);
    }
  });
}