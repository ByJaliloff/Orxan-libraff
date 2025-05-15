document.addEventListener("DOMContentLoaded", () => {
  const wishlistContainer = document.getElementById("wishlist");
  const clearBtn = document.getElementById("clear-wishlist-btn");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `<p class="text-gray-600 text-lg">İstək siyahısında heç nə yoxdur.</p>`;
    clearBtn.style.display = "none"; 
    return;
  }

  wishlist.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "bg-white relative"; 

    card.innerHTML = `
        <div class="bg-white border border-transparent rounded-2xl w-full px-3 py-3 hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] transition-all duration-300 relative group">
            <i 
              onclick="removeFromWishlist('${book.id}')" 
              class="fa-solid fa-circle-xmark absolute top-3 right-3 text-red-600 cursor-pointer hover:text-red-800 text-2xl"
              title="Siyahıdan sil"
            ></i>
            <a href="details.html?id=${book.id}" onclick="incrementView('${book.id}')">
                <img class="w-full h-[340px] object-cover rounded-t-lg mobl" src="${book.cover}" alt="" />
            </a>
            <div class="p-5">
                <h5 class="text-[16px] h-[69px] text-[#0f172a]">
                    <span class="text-[#0f172a] text-[16px] font-bold">${index + 1}.</span> 
                    <a href="details.html?id=${book.id}">
                        ${book.title}</a>
                </h5>
                <div class="flex justify-between items-center h-[45px]">
                    <span class="font-bold uppercase text-[#1e293b] text-[18px]">${book.price}₼</span>
                </div>
            </div>
        </div>`;

    wishlistContainer.appendChild(card);
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("wishlist");
    location.reload();
  });
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
})

function removeFromWishlist(bookId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlist = wishlist.filter(book => book.id !== bookId);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  location.reload();
}
window.removeFromWishlist = removeFromWishlist;