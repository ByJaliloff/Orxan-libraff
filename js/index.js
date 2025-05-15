import { getAllBooks } from "./service.js"

let data = []

async function getData() {
    data = await getAllBooks()
    console.log(data);
    renderCards()
    updateWishlistCount()
}

function renderCards() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    data.forEach((book, index) => {
        const card = `
        <div class="bg-white border border-transparent rounded-2xl w-full px-3 py-3 hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] transition-all duration-300 relative group">
            <a href="details.html?id=${book.id}" onclick="incrementView(${book.id})">
                <img class="w-full h-[340px] object-cover rounded-t-lg mobl" src="${book.cover}" alt="" />
            </a>
       <span onclick="addToWishlist('${book.id}')"
      class="absolute top-5 right-5 text-2xl text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
  <i class="fa-solid fa-heart hover:text-[#ef3340]"></i>
</span>
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

        newsContainer.innerHTML += card;
    });
}
 getData()

function addToWishlist(bookId) {
  const id = bookId.toString();
  const selectedBook = data.find(book => book.id === id);

  if (!selectedBook) {
    alert("Kitab tapılmadı!");
    return;
  }

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const exists = wishlist.some(item => item.id === id);

  if (!exists) {
    wishlist.push(selectedBook);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("İstək siyahısına əlavə olundu!");
    updateWishlistCount(); 
  } else {
    alert("Bu kitab artıq siyahıdadır.");
  }
}

function updateWishlistCount() {
  const wishlistCount = document.getElementById("wishlist-count");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const count = wishlist.length;

  if (wishlistCount) {
    if (count > 0) {
      wishlistCount.textContent = count;
      wishlistCount.classList.remove("hidden");
    } else {
      wishlistCount.classList.add("hidden");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateWishlistCount();
});

window.addToWishlist = addToWishlist;

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