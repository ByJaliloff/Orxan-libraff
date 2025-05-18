import { getAllBooks } from "./service.js";

let allBooks = [];

function getSearchQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("search")?.toLowerCase() || "";
}

function renderBooks(books) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  books.forEach((book, index) => {
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
            <a href="details.html?id=${book.id}">${book.title}</a>
          </h5>
          <div class="flex justify-between items-center h-[45px]">
            <span class="font-bold uppercase text-[#1e293b] text-[18px]">${book.price}₼</span>
          </div>
        </div>
      </div>`;
    bookList.innerHTML += card;
  });
}

function renderLanguageFilters() {
  const filterContainer = document.getElementById("languageFilter");
  const languages = [...new Set(allBooks.map((book) => book.language))];
  filterContainer.innerHTML = "";

  languages.forEach((lang) => {
    const checkbox = document.createElement("div");
    checkbox.innerHTML = `
      <label>
        <input type="checkbox" value="${lang}" class="language-checkbox mr-2" />
        ${lang.toUpperCase()}
      </label>`;
    filterContainer.appendChild(checkbox);
  });

  document.querySelectorAll(".language-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", handleLanguageFilter);
  });
}

function handleLanguageFilter() {
  const selectedLangs = Array.from(document.querySelectorAll(".language-checkbox:checked")).map(cb => cb.value);

  let filteredBooks = [...allBooks];

  const searchQuery = getSearchQuery();
  if (searchQuery) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(searchQuery)
    );
  }

  if (selectedLangs.length > 0) {
    filteredBooks = filteredBooks.filter(book => selectedLangs.includes(book.language));
  }

  renderBooks(filteredBooks);
}

async function init() {
  allBooks = await getAllBooks();
  const searchQuery = getSearchQuery();

  if (searchQuery) {
    document.getElementById("main-title").innerHTML = `
      <h3 class="text-[28px] font-semibold text-[#0f172a]">
        Axtarış nəticələri: "${searchQuery}"
      </h3>`;
  }

  renderLanguageFilters();

  let filtered = allBooks;

  if (searchQuery) {
    filtered = filtered.filter((book) =>
      book.title.toLowerCase().includes(searchQuery)
    );
  }

  renderBooks(filtered);
}

init();
