const text = "Növbəti kitabınızı axtarın";
const input = document.getElementById("searchInput");

let i = 0;
let typing = true;

function loopPlaceholder() {
  if (typing) {
    if (i <= text.length) {
      input.setAttribute("placeholder", text.slice(0, i));
      i++;
      setTimeout(loopPlaceholder, 100);
    } else {
      typing = false;
      setTimeout(loopPlaceholder, 2000);
    }
  } else {
    if (i >= 0) {
      input.setAttribute("placeholder", text.slice(0, i));
      i--;
      setTimeout(loopPlaceholder, 50);
    } else {
      typing = true;
      setTimeout(loopPlaceholder, 500);
    }
  }
}

window.addEventListener("DOMContentLoaded", loopPlaceholder);

const toggleBtn = document.getElementById("toggleBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const icon = document.getElementById("icon");
const caretIcon = document.getElementById("caretIcon");
const overlay = document.getElementById("overlay");

toggleBtn.addEventListener("click", () => {
  const isHidden = dropdownMenu.classList.contains("hidden");

  if (isHidden) {
    dropdownMenu.classList.remove("hidden");
    setTimeout(() => {
      dropdownMenu.classList.remove("opacity-0", "scale-95");
      dropdownMenu.classList.add("opacity-100", "scale-100");
    }, 10);
  } else {
    dropdownMenu.classList.remove("opacity-100", "scale-100");
    dropdownMenu.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
      dropdownMenu.classList.add("hidden");
    }, 300);
  }

  icon.textContent = isHidden ? "✕" : "☰";
  caretIcon.style.display = isHidden ? "inline-block" : "none";
  overlay.classList.toggle("hidden", !isHidden);
});

document.querySelectorAll(".hover-trigger").forEach((trigger) => {
  trigger.addEventListener("mouseenter", function () {
    if (this.closest(".column-2")) {
      const targetId = this.id;
      const targetContent = document.getElementById(targetId + "-content");

      const allContent = document.querySelectorAll("[id$='-content']");
      allContent.forEach((content) => content.classList.add("hidden"));

      if (targetContent) {
        targetContent.classList.remove("hidden");
      }
    }
  });
});

const toggleButton = document.getElementById("menu-toggle");
const closeButton = document.getElementById("menu-close");
const sidebar = document.getElementById("sidebar");
const overley = document.getElementById("overley");

toggleButton.addEventListener("click", () => {
  sidebar.classList.remove("-translate-x-full");
  overley.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overley.classList.add("hidden");
});

overley.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overley.classList.add("hidden");
});

function toggleMainLinks() {
  const mainLinks = document.getElementById("main-links");
  const toggleIcon = document.getElementById("main-links-toggle");

  if (mainLinks.classList.contains("hidden")) {
    mainLinks.classList.remove("hidden");
    toggleIcon.innerHTML = '<i class="fa-solid fa-minus"></i>';
  } else {
    mainLinks.classList.add("hidden");
    toggleIcon.innerHTML = '<i class="fa-solid fa-plus"></i>';
  }
}

function toggleCatalogLinks() {
  const catalogLinks = document.getElementById("catalog-links");
  const toggleIcon = document.getElementById("catalog-toggle");

  if (catalogLinks.classList.contains("hidden")) {
    catalogLinks.classList.remove("hidden");
    toggleIcon.innerHTML = '<i class="fa-solid fa-minus"></i>';
  } else {
    catalogLinks.classList.add("hidden");
    toggleIcon.innerHTML = '<i class="fa-solid fa-plus"></i>';
  }
}
function toggleOtherLinks() {
  const otherLinks = document.getElementById("other-links");
  const toggleIcon = document.getElementById("other-links-toggle");

  if (otherLinks.classList.contains("hidden")) {
    otherLinks.classList.remove("hidden");
    toggleIcon.innerHTML = '<i class="fa-solid fa-minus"></i>';
  } else {
    otherLinks.classList.add("hidden");
    toggleIcon.innerHTML = '<i class="fa-solid fa-plus"></i>';
  }
}
