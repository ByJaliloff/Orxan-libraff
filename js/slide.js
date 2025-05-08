
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

