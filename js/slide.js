
  const slider = document.getElementById("slider-track");
  const dots = document.querySelectorAll("[data-index]");
  let current = 0;
  const total = dots.length;

  function goToSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => {
        dot.classList.remove("bg-gray-400", "w-8");
        dot.classList.add("bg-gray-300", "w-2");
    });

    dots[index].classList.remove("bg-gray-300", "w-2");
    dots[index].classList.add("bg-gray-400", "w-8");

    current = index;
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => goToSlide(parseInt(dot.dataset.index)));
  });

  setInterval(() => {
    let next = (current + 1) % total;
    goToSlide(next);
  }, 5000); 

function updateImageSource() {
  const images = document.querySelectorAll(".slider-image");

  images.forEach(img => {
    const isMobile = window.innerWidth < 1024;  // Mobil ölçü
    if (isMobile) {
      img.src = img.getAttribute("data-mobile");  // Mobil şəkil
    } else {
      img.src = img.getAttribute("data-desktop");  // Desktop şəkil
    }
  });
}

// Sayt yükləndikdə və pəncərə ölçüsü dəyişəndə şəkilləri yenilə
window.addEventListener("load", updateImageSource);
window.addEventListener("resize", updateImageSource);