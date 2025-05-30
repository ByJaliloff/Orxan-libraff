import { getAllBooks } from "./service.js";

const categoryList = document.getElementById("categoryList");
const bookList = document.getElementById("bookList");
const languageFilter = document.getElementById("languageFilter");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const priceRange = document.getElementById("priceRange");
const rangeValueLabel = document.getElementById("rangeValue");


let currentCategory = "Klassiklər";

function getUniqueCategories(data) {
  const allCategories = data.map((book) => book.subSubCategory);
  return [...new Set(allCategories)];
}

function getSelectedLanguages() {
  const checkboxes = document.querySelectorAll(".lang-checkbox");
  return Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function renderCategories(categories, books) {
  const mobileList = document.getElementById("categoryListMobile");
  mobileList.innerHTML = "";
  categoryList.innerHTML = "";
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.textContent = category;
    li.className = "cursor-pointer hover:bg-gray-200 px-3 py-2 rounded text-sm";
    li.onclick = () => {
      currentCategory = category;
      renderBooks(books, category);
      closeCategory();
    };
    const liClone = li.cloneNode(true);
    liClone.onclick = li.onclick;
    categoryList.appendChild(liClone);
    mobileList.appendChild(li);
  });
}

function renderLanguageFilters(
  books,
  selectedCategory,
  selectedLanguages = [],
  onFilterChange
) {
  const filteredBooks = books.filter(
    (book) => book.subSubCategory === selectedCategory
  );
  const languages = [...new Set(filteredBooks.map((book) => book.language))];

  languageFilter.innerHTML = "";

  languages.forEach((lang) => {
    const label = document.createElement("label");
    label.className = "flex items-center space-x-2 mb-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = lang;
    checkbox.className = "lang-checkbox w-6 h-6";

    if (selectedLanguages.includes(lang)) {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", onFilterChange);

    const span = document.createElement("span");
    span.textContent = lang;

    label.appendChild(checkbox);
    label.appendChild(span);
    languageFilter.appendChild(label);
  });
}

function renderPriceFilter(books, selectedCategory) {
  const filteredBooks = books.filter(
    (book) => book.subSubCategory === selectedCategory
  );
  const prices = filteredBooks.map((book) => book.price);
  if (prices.length === 0) return;

  const min = Math.floor(Math.min(...prices));
  const max = Math.ceil(Math.max(...prices));

  minPriceInput.value = min;
  maxPriceInput.value = max;

  priceRange.min = min;
  priceRange.max = max;
  priceRange.value = max;

  priceRange.addEventListener("input", () => {
    const value = parseFloat(priceRange.value);
    maxPriceInput.value = value;

    rangeValueLabel.textContent = `${minPriceInput.value}₼ - ${maxPriceInput.value}₼`;

    renderBooks(books, selectedCategory);
  });

  minPriceInput.addEventListener("input", () => {
    rangeValueLabel.textContent = `${minPriceInput.value}₼ - ${maxPriceInput.value}₼`;
    renderBooks(books, selectedCategory);
  });

  maxPriceInput.addEventListener("input", () => {
    rangeValueLabel.textContent = `${minPriceInput.value}₼ - ${maxPriceInput.value}₼`;
    renderBooks(books, selectedCategory);
  });
}


function renderBooks(books, selectedCategory) {
  const categoryWay = document.getElementById("category-way");
  const mainTitle = document.getElementById("main-title").querySelector("h3");

  bookList.innerHTML = "";

  const selectedLanguages = getSelectedLanguages();

  renderLanguageFilters(books, selectedCategory, selectedLanguages, () =>
    renderBooks(books, selectedCategory)
  );
  renderPriceFilter(books, selectedCategory);

  let filtered = books.filter(
    (book) => book.subSubCategory === selectedCategory
  );

  if (selectedLanguages.length > 0) {
    filtered = filtered.filter((book) =>
      selectedLanguages.includes(book.language)
    );
  }

  const minVal = parseFloat(minPriceInput.value) || 0;
  const maxVal = parseFloat(maxPriceInput.value) || Infinity;

  filtered = filtered.filter(
    (book) => book.price >= minVal && book.price <= maxVal
  );

  if (filtered.length === 0) {
    categoryWay.innerHTML = "";
    mainTitle.innerText = "";
    bookList.innerHTML =
      "<p class='text-gray-500'>Bu filtrə uyğun kitab yoxdur.</p>";
    return;
  }

  const book = filtered[0];

  mainTitle.innerText = book.subSubCategory;

  categoryWay.innerHTML = `
    <div class="px-4 text-[14px] text-[#767676]">
      <span>Əsas səhifə</span>
      <span class="mx-[6px]">/</span>
      <span>${book.category}</span>
      <span class="mx-[6px]">/</span>
      <span>${book.subCategory}</span>
      <span class="mx-[6px]">/</span>
      <span>${book.subSubCategory}</span>
    </div>
  `;

  filtered.forEach((book) => {
    const card = `
      <div class="bg-white border border-transparent rounded-2xl w-full px-3 py-3 hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] transition-all duration-300 relative group">
        <a href="details.html?id=${book.id}" onclick="incrementView(${book.id})">
          <img class="w-full h-[340px] object-cover mob-cat rounded-t-lg" src="${book.cover}" alt="${book.title}" />
        </a>
        <a href="wishlist.html"
          class="absolute top-5 right-5 text-2xl text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
          <i class="fa-solid fa-heart hover:text-[#ef3340]"></i>
        </a>
        <div class="p-5 space-y-3">
          <h5 class="text-[16px] h-auto text-[#0f172a]">
            <a href="details.html?id=${book.id}">${book.title}</a>
          </h5>
          <div class="flex justify-between items-center pt-2 h-[45px]">
            <span class="font-bold uppercase text-[#1e293b] text-[18px]">${book.price}₼</span>
          </div>
        </div>
      </div>
    `;
    bookList.insertAdjacentHTML("beforeend", card);
  });
}

async function init() {
  const books = await getAllBooks();
  const categories = getUniqueCategories(books);
  renderCategories(categories, books);
  renderBooks(books, currentCategory);
}

init();

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
