import { getAllBooks } from "./service.js"

let data = []

async function getData() {
    data = await getAllBooks()
    console.log(data);
    renderCards()
}

function renderCards() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    data.forEach((book, index) => {
        const card = `
        <div class="bg-white border border-transparent rounded-2xl w-full px-3 py-3 hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] transition-all duration-300 relative group">
            <a href="details.html?id=${book.id}" onclick="incrementView(${book.id})">
                <img class="w-full h-[407px] object-cover rounded-t-lg" src="${book.cover}" alt="" />
            </a>
            <a href="wishlist.html"
              class="absolute top-5 right-5 text-2xl text-white opacity-0 group-hover:opacity-100 transition-all duration-300" onclick='addToWishlist(${JSON.stringify(book)})'>
              <i class="fa-solid fa-heart hover:text-[#ef3340]"></i>
             </a>
            <div class="p-5 space-y-3">
                <h5 class="text-[16px] h-auto text-[#0f172a]">
                    <span class="text-[#0f172a] text-[16px] font-bold">${index + 1}.</span> 
                    <a href="details.html?id=${book.id}">
                        ${book.title}</a>
                </h5>
                <div class="flex justify-between items-center pt-2 h-[45px]">
                    <span class="font-bold uppercase text-[#1e293b] text-[18px]">${book.price}₼</span>
                </div>
            </div>
        </div>`;

        newsContainer.innerHTML += card;
    });
}
 getData()