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
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // Provide immediate feedback
    formStatus.textContent = "Sending message...";
    formStatus.style.color = "var(--teal)";

    const formData = new FormData(contactForm);
    // Add your Web3Forms Access Key here
    formData.append("access_key", "a7d1dd9a-4ac8-40ed-ab28-66a4e6150cd9"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        formStatus.textContent = "Message sent successfully! I will get back to you soon.";
        contactForm.reset();
      } else {
        formStatus.textContent = "Something went wrong. Please try again.";
        formStatus.style.color = "var(--amber)";
      }
    } catch (error) {
      formStatus.textContent = "Network error. Please try again later.";
      formStatus.style.color = "var(--amber)";
    }

    // Clear the message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = "";
    }, 5000);
  });
}