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

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  function goToBooksPage() {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `books.html?search=${encodeURIComponent(query)}`;
    }
  }

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      goToBooksPage();
    }
  });

  searchBtn.addEventListener('click', () => {
    goToBooksPage();
  });

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


const toggleButton = document.getElementById("menu-toggle");
const closeButton = document.getElementById("menu-close");
const sidebar = document.getElementById("sidebar");
const overley = document.getElementById("overley");
const menuLink = document.getElementById("menu-link"); 

toggleButton.addEventListener("click", () => {
  sidebar.classList.remove("-translate-x-full");
  overley.classList.remove("hidden");
});

menuLink.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
  overley.classList.toggle("hidden");
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




const bediiEdebiyyatContent = [
  ["Antologiya", "Bioqrafiyaç avtobioqrafiya & Xatirə", "Detektiv", "Elmi-fantastika & Fantaziya", "Fəlsəfə"],
  ["Hekayələr & Oçerklər", "Kino və teatr", "Klassik poemalar", "Klassiklər", "Komiks", "Macəra"],
  ["Mifologiya", "Nağıllar", "Poemalar", "Psixologiya", "Romanlar & Novellalar", "Satira"],
  ["Tarix, hüquq & Siyasi", "Tarix roman", "Triller, mistika & Qorxu", "Təhsil, mənbə & Dil"]
];

const qeyriBediiEdebiyyatContent = [
  ["Ailə", "Akademik", "Aşpazlıq", "Astronomiya", "Bağbanlıq", "Detektiv", "Dini", "Dəb"],
  ["Elm", "Ezoterika", "Fəaliyyətlər", "Fəlsəfə", "Hekayələr & Esselər", "Heyvanlar", "Jurnallar & Qəzetlər", "Kino və teatr", "Klassiklər"],
  ["Komiks", "Komputer elmləri", "Mifologiya", "Musiqi", "Poemalar", "Psixologiya", "Publisistika", "Qeyri-bədii", "Regional maraqlar", "Romanlar & Novellalar"],
  ["Sağlamlıq, tibbi & İdman", "Sitatlar & Aforizmlər", "Sosiologiya", "Şəxsi inkişaf", "Səyahət & Məkanlar", "Tarix, hüquq & Siyasi", "Tarix roman", "Təhsil, mənbə & Dil", "Xəritələr"]
];

const bediiUsaqContent = [
  "3D kitab", "Dedektiv", "Heyvanlar", "Elmi-fantastika & Fantaziya",
  "Hekayələr & Oçerklər", "Klassik Poemalar", "Klassiklər", "Komiks",
  "Macəra", "Nağıllar", "Oyuncaq kitablar", "Poemalar",
  "Romanlar & Novellalar", "Satira", "Tarix roman",
  "Triller, mistika & Qorxu", "Təhsil, mənbə & Dil"
];

const qeyriBediiUsaqContent = [
  ["3D kitab", "Dedektiv", "Heyvanlar", "Elmi-fantastika & Fantaziya", "Hekayələr & Oçerklər", "Klassik Poemalar", "Klassiklər", "Komiks", "Macəra", "Nağıllar"],
  ["Sosiologiya", "Şəxsi inkisaf", "Səyahət & Məkanlar", "Tarix, hüquq & Siyasi", "Tarix roman", "Təhsil, mənbə & Dil", "Xəritələr"],
  ["Ailə", "Akademik", "Aşpazlıq", "Astromoniya", "Bağbanlıq", "Detektiv", "Dini", "Dəb"],
  ["Kino və teatr", "Klassik poemalar", "Klassiklər", "Antologiya", "Bioqrafiyaç avtobioqrafiya & Xatirə", "Detektiv", "Elmi-fantastika & Fantaziya"]
];

function renderContent(contentArray, targetDivId) {
  const targetDiv = document.getElementById(targetDivId);
  targetDiv.innerHTML = ""; 

  contentArray.forEach(column => {
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    ul.className = "sec-menu text-[#0f172abf]";

    column.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });

    div.appendChild(ul);
    targetDiv.appendChild(div);
  });
}

document.getElementById("bedii-edeb").addEventListener("mouseenter", () => {
  renderContent(bediiEdebiyyatContent, "bedii-edeb-content");
  document.getElementById("bedii-edeb-content").classList.remove("hidden");
  document.getElementById("qeyri-bedii-content").classList.add("hidden");
  document.getElementById("bedii-usaq-content").classList.add("hidden");
  document.getElementById("qeyri-bedii-usaq-content").classList.add("hidden");
});

document.getElementById("qeyri-bedii").addEventListener("mouseenter", () => {
  renderContent(qeyriBediiEdebiyyatContent, "qeyri-bedii-content");
  document.getElementById("qeyri-bedii-content").classList.remove("hidden");
  document.getElementById("bedii-edeb-content").classList.add("hidden");
  document.getElementById("bedii-usaq-content").classList.add("hidden");
  document.getElementById("qeyri-bedii-usaq-content").classList.add("hidden");
});

document.getElementById("bedii-usaq").addEventListener("mouseenter", () => {
  renderContent([bediiUsaqContent], "bedii-usaq-content");
  document.getElementById("bedii-usaq-content").classList.remove("hidden");
  document.getElementById("bedii-edeb-content").classList.add("hidden");
  document.getElementById("qeyri-bedii-content").classList.add("hidden");
  document.getElementById("qeyri-bedii-usaq-content").classList.add("hidden");
});

document.getElementById("qeyri-bedii-usaq").addEventListener("mouseenter", () => {
  renderContent(qeyriBediiUsaqContent, "qeyri-bedii-usaq-content");
  document.getElementById("qeyri-bedii-usaq-content").classList.remove("hidden");
  document.getElementById("bedii-edeb-content").classList.add("hidden");
  document.getElementById("qeyri-bedii-content").classList.add("hidden");
  document.getElementById("bedii-usaq-content").classList.add("hidden");
});


document.addEventListener("DOMContentLoaded", () => {
  renderContent(bediiEdebiyyatContent, "bedii-edeb-content");
  document.getElementById("bedii-edeb-content").classList.remove("hidden");
});
