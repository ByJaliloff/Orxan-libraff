import { getAllBooks, incrementSold } from "./service.js";

const basket = JSON.parse(localStorage.getItem("basket")) || [];
const basketWrapper = document.getElementById("basket-wrapper");
const totalAmountSpan = document.getElementById("total-amount");
const resetBtnMobile = document.getElementById("reset-basket-mobile");
const resetBtnDesktop = document.getElementById("reset-basket-desktop");
const continueBtnMobile = document.getElementById("continue-shopping-mobile");
const continueBtnDesktop = document.getElementById("continue-shopping-desktop");
const basketButtons = document.getElementById("basket-buttons"); 
const basketWrapperMobile = document.getElementById("basket-wrapper-mobile");
const confirmOrderDesktop = document.getElementById("confirm-order-desktop");
const confirmOrderMobile = document.getElementById("confirm-order-mobile");


function renderBasket() {
  basketWrapper.innerHTML = "";
  basketWrapperMobile.innerHTML = "";
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
  <div class="grid grid-cols-[2fr_1fr_1fr_1fr] text-sm text-[#767676] font-medium mb-4 px-4">
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
  div.className = "grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 mb-4 border-t-[1px] border-[#cbd5e1] py-4";

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

  const mobileDiv = document.createElement("div");
  mobileDiv.className = "border-t border-gray-200 py-4 px-4 space-y-4";

  mobileDiv.innerHTML = `
  <div class="flex flex-col items-center gap-3 text-center">
    <img src="${item.cover}" class="w-[150px] h-[150px] object-cover rounded" />

    <h3 class="font-semibold text-[#ef3340] text-base">
      ${item.title}
      <button class="text-red-500 ml-2 delete-btn" data-id="${item.id}">
        <i class="fa-solid fa-circle-xmark pointer-events-none"></i>
      </button>
    </h3>

    <p class="text-xs text-gray-600">Kod: ${item.id}</p>
    <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Endirim</span>

    <div class="relative w-full h-14">
          <p class="absolute left-0 top-1/2 -translate-y-1/2 font-medium text-left">Qiymət:</p>
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
       <p class="line-through text-[#dc2626]">${(parseFloat(item.price) + 1).toFixed(2)} ₼</p>
       <p class="text-[#0d1219]">${parseFloat(item.price).toFixed(2)} ₼</p>
      </div>
    </div>
      <div class="relative w-full h-8">
         <p class="absolute left-0 top-1/2 -translate-y-1/2 font-medium text-left">Say:</p>
         <input type="number" 
           class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 count-input w-20 border border-[#e1e1e1] px-2 py-1 text-center" 
           value="${item.count}" min="1" data-id="${item.id}" />
      </div>
      <div class="relative w-full h-6">
        <p class="absolute left-0 font-medium">Cəm:</p>
        <p class="absolute left-1/2 -translate-x-1/2 font-semibold text-[#0f172a]">${itemTotal.toFixed(2)} ₼</p>
      </div>
    </div>
  </div>
`;


  basketWrapperMobile.appendChild(mobileDiv);
});

document.addEventListener("DOMContentLoaded", () => {
  const wishlistCount = document.getElementById("wishlist-count");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const count = wishlist.length;

  if (count > 0) {
    wishlistCount.textContent = count;
    wishlistCount.classList.remove("hidden");
  } else {
    wishlistCount.classList.add("hidden");
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const basketCount = document.getElementById("basket-count");
  const basketCountMobile = document.getElementById("basket-count-mobile");

  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const totalCount = basket.reduce((sum, item) => sum + (item.count || 1), 0);

  if (basketCount) {
    if (totalCount > 0) {
      basketCount.textContent = totalCount;
      basketCount.classList.remove("hidden");
    } else {
      basketCount.classList.add("hidden");
    }
  }

  if (basketCountMobile) {
    if (totalCount > 0) {
      basketCountMobile.textContent = totalCount;
      basketCountMobile.classList.remove("hidden");
    } else {
      basketCountMobile.classList.add("hidden");
    }
  }
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

if (resetBtnMobile) {
  resetBtnMobile.addEventListener("click", () => {
    localStorage.removeItem("basket");
    basket.length = 0;
    renderBasket();
  });
}

if (resetBtnDesktop) {
  resetBtnDesktop.addEventListener("click", () => {
    localStorage.removeItem("basket");
    basket.length = 0;
    renderBasket();
  });
}


if (continueBtnMobile) {
  continueBtnMobile.addEventListener("click", () => {
    window.location.href = "category.html";
  });
}

if (continueBtnDesktop) {
  continueBtnDesktop.addEventListener("click", () => {
    window.location.href = "category.html";
  });
}


confirmOrderDesktop.addEventListener("click", async () => {
  const books = await getAllBooks();

  for (const item of basket) {
    const fullBook = books.find((b) => b.id === item.id);
    if (!fullBook) continue;

    const currentSold = Number(fullBook.sold || 0);
    const newSold = currentSold + item.count;

    await incrementSold(item.id, newSold, fullBook);
  }

  localStorage.removeItem("basket");
  basket.length = 0;
  renderBasket();

  // ✅ SweetAlert2 modal
  Swal.fire({
    title: 'Sifarişiniz qəbul edildi!',
    text: 'Kitablarınız yolda ✨',
    icon: 'success',
    confirmButtonText: 'Bağla',
    confirmButtonColor: '#ef3340'
  });
});

confirmOrderMobile.addEventListener("click", async () => {
  const books = await getAllBooks();

  for (const item of basket) {
    const fullBook = books.find((b) => b.id === item.id);
    if (!fullBook) continue;

    const currentSold = Number(fullBook.sold || 0);
    const newSold = currentSold + item.count;

    await incrementSold(item.id, newSold, fullBook);
  }

  localStorage.removeItem("basket");
  basket.length = 0;
  renderBasket();

  // ✅ SweetAlert2 modal
  Swal.fire({
    title: 'Sifarişiniz qəbul edildi!',
    text: 'Kitablarınız yolda ✨',
    icon: 'success',
    confirmButtonText: 'Bağla',
    confirmButtonColor: '#ef3340'
  });
});




renderBasket();
