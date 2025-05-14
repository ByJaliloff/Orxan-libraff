const basket = JSON.parse(localStorage.getItem("basket")) || [];
const basketWrapper = document.getElementById("basket-wrapper");
const totalAmountSpan = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-basket");
const continueBtn = document.getElementById("continue-shopping");
const basketButtons = document.getElementById("basket-buttons"); 

function renderBasket() {
  basketWrapper.innerHTML = "";
  let total = 0;

  if (basket.length === 0) {
    basketWrapper.innerHTML = `<p class="text-center text-gray-500 w-full">Səbətiniz boşdur.</p>`;
    totalAmountSpan.textContent = "0 ₼";
    basketButtons.classList.add("hidden");
    return;
  } else {
    basketButtons.classList.remove("hidden");
  }


  basketWrapper.innerHTML = `
    <h1 class="text-[28px] text-[#0f172a] font-bold mb-[10px] px-4">Səbətdə olanlar</h1>
    <div class="grid grid-cols-4 text-sm text-[#767676] font-medium mb-4 px-4">
      <span>Məhsul</span>
      <span class="text-right">Qiyməti</span>
      <span class="text-right">Say</span>
      <span class="text-right">Cəm (₼)</span>
    </div>
    <div id="basket-items"></div>
  `;

  const basketItemsDiv = document.getElementById("basket-items");

  basket.forEach((item) => {
    const itemTotal = item.count * parseFloat(item.price);
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "grid grid-cols-4 gap-4 px-4 mb-4 border-t-[1px] border-[#cbd5e1]  py-4";

    div.innerHTML = `
      <div class="flex gap-6">
        <img src="${item.cover}" class="w-[150px] h-[150px] object-cover" />
        <div>
          <h3 class="font-semibold text-[16px] text-[#ef3340]">${item.title}
            <button class="text-red-500 ml-2 delete-btn" data-id="${item.id}">
              <i class="fa-solid fa-circle-xmark pointer-events-none"></i>
            </button>
          </h3>
          <p class="text-sm text-gray-600">Kod: ${item.id}</p>
          <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Endirim</span>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <p class="line-through text-sm text-[#dc2626]">${(parseFloat(item.price) + 1).toFixed(2)} ₼</p>
        <p class="text-[#0d1219] text-sm">${parseFloat(item.price).toFixed(2)} ₼</p>
      </div>
      <div class="text-right">
        <input type="number" class="count-input w-16 border border-[#e1e1e1] px-2 py-1 text-center" value="${item.count}" min="1" data-id="${item.id}" />
      </div>
      <div class="text-right">
        <p class="font-semibold text-[#0f172a]">${itemTotal.toFixed(2)} ₼</p>
      </div>
    `;

    basketItemsDiv.appendChild(div);
  });

  totalAmountSpan.textContent = total.toFixed(2) + " ₼";

  document.querySelectorAll(".count-input").forEach(input => {
    input.addEventListener("input", (e) => {
      const id = e.target.dataset.id;
      const newCount = parseInt(e.target.value);
      const item = basket.find(x => x.id === id);
      if (item && newCount > 0) {
        item.count = newCount;
        localStorage.setItem("basket", JSON.stringify(basket));
        renderBasket();
      }
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const index = basket.findIndex(x => x.id === id);
      if (index !== -1) {
        basket.splice(index, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        renderBasket();
      }
    });
  });
}

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("basket");
  basket.length = 0;
  renderBasket();
});


continueBtn.addEventListener("click", () => {
  window.location.href = "category.html";
});

renderBasket();
