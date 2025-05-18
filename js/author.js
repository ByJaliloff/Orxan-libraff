import { getAllBooks} from "./service.js"


function getFirstLetter(name) {
  const letter = name.trim()[0].toUpperCase();
  return letter.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
}

function sortAlphabetically(obj) {
  return Object.keys(obj).sort((a, b) => a.localeCompare(b, 'az-Cyrl-u-co-phonebk'));
}

function sortAuthorsByName(list) {
  return Array.from(list).sort((a, b) => a.localeCompare(b, 'az-Cyrl-u-co-phonebk'));
}

function groupAuthorsByLetter(books) {
  const grouped = {};

  books.forEach(book => {
    const author = book.author?.trim();
    if (!author) return;

    const letter = getFirstLetter(author);

    if (!grouped[letter]) {
      grouped[letter] = new Set();
    }

    grouped[letter].add(author);
  });

  return grouped;
}

function renderAuthors(grouped) {
  const container = document.getElementById('authors-list');
  container.innerHTML = '';

  const sortedLetters = sortAlphabetically(grouped);

  sortedLetters.forEach(letter => {
    const wrapper = document.createElement('div');
    wrapper.className = 'bg-white p-4';

    const title = document.createElement('h2');
    title.textContent = letter;
    title.className = 'text-[18px] font-semibold mb-2 text-[#0f172a]';

    const ul = document.createElement('ul');
    ul.className = 'space-y-1';

    sortAuthorsByName(grouped[letter]).forEach(author => {
      const li = document.createElement('li');
      li.textContent = author;
      li.className = 'text-sm text-[#ef3340] cursor-pointer';  
      li.addEventListener('click', () => {

        window.location.href = `books.html?author=${encodeURIComponent(author)}`;
      });
      ul.appendChild(li);
    });

    wrapper.appendChild(title);
    wrapper.appendChild(ul);
    container.appendChild(wrapper);
  });
}

(async function () {
  const books = await getAllBooks();
  if (books) {
    const grouped = groupAuthorsByLetter(books);
    renderAuthors(grouped);
  }
})();