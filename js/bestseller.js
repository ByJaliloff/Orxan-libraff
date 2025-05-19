import { getAllBooks } from "./service.js";

const bestsellerContainer = document.getElementById("bestseller-container");

async function renderBestsellers() {
  const data = await getAllBooks();

  if (!data || data.length === 0) {
    bestsellerContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full">Kitab tapılmadı.</p>`;
    return;
  }

  const sorted = data
    .filter(book => book.sold && !isNaN(book.sold))
    .sort((a, b) => b.sold - a.sold) 
    .slice(0, 12); 

  sorted.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = `bg-white rounded-2xl w-full py-3 relative group`;

    card.innerHTML = `
      <div class="bg-white  rounded-2xl w-full px-3 py-3 hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] transition-all duration-300 relative group">
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
              ${book.title}
            </a>
          </h5>
          <div class="flex justify-between items-center h-[45px]">
            <span class="font-bold uppercase text-[#1e293b] text-[18px]">${book.price}₼</span>
          </div>
          <p class="text-sm text-gray-600 mt-2">Satılıb: <span class="font-semibold">${book.sold}</span> ədəd</p>
        </div>
      </div>
    `;

    bestsellerContainer.appendChild(card);
  });
}

renderBestsellers();
