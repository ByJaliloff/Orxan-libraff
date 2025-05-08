import { createBook, editBook, getAllBooks, deleteBookById } from "./service.js"

let data = []
const tBody = document.querySelector('tbody')
const form = document.querySelectorAll('#form input, #form textarea')
const categorySec = document.querySelector('#category');
const subCategorySec = document.querySelector('#subCategory');
const subSubCategorySec = document.querySelector('#subSubCategory');
const language = document.querySelector('#language');

 async function getData() {
    data = await getAllBooks()
    console.log(data);
    printTable()
    
}
getData()

function printTable() {
    tBody.innerHTML= ""
    data.forEach(book => {
        tBody.innerHTML += `<tr class="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-600">
    <th scope="row" class="px-6 py-3 font-medium text-gray-100 whitespace-nowrap dark:text-white">
        ${book.title}
    </th>
    <td class="px-6 py-3 text-gray-300">
        ${book.price}
    </td>
    <td class="px-6 py-3 text-gray-300">
        ${book.author}
    </td>
    <td class="px-6 py-3 text-gray-300">
        ${book.language}
    </td>
    <td class="px-6 py-3 text-gray-300">
        ${book.pages}
    </td>
    <td class="px-6 py-3 text-gray-300">
        ${book.content.slice(0, 40)}...
    </td>
    <td class="px-6 py-3 text-gray-300">
    ${book.category} > ${book.subCategory || ''} > ${book.subSubCategory || ''}
    </td>
    <td class="px-6 py-3 text-gray-300">
        ${book.like}, ${book.dislike}, ${book.view}
    </td>
    <td class="w-[50px] p-1">
        <img class="h-[50px] object-cover w-full rounded" src="${book.cover}" alt="news image">
    </td>
    <td class="px-6 py-3 flex space-x-4">
        <i onclick="handleEditFill('${book.id}')" class="fa-solid fa-pen-to-square text-green-400 hover:text-green-600 text-[25px] cursor-pointer"></i>
        <i onclick="handleDelete('${book.id}')" class="fa-solid fa-trash text-red-400 hover:text-red-600 text-[25px] cursor-pointer"></i>
    </td>
</tr>

        `
    })
}

window.handleDelete = async (id) => {
    await deleteBookById(id)
    data = data.filter(item => item.id !== id)
    printTable()
}


window.handlePost = async () => {
    const book = getVal()
    const resBook = await createBook(book)
    if (resBook) {
        data.push(resBook)
    }
    printTable()

    form.forEach(input => {
        input.value = ''
    });
    categorySec.value = '';
}


let globId = null;

window.handleEditFill = (id) => {
    const element = data.find(item => item.id === id);
    if (element) {
        form[0].value = element.title;
        form[1].value = element.price;
        form[2].value = element.author;
        form[3].value = element.pages;
        form[4].value = element.cover;
        tinymce.get('mytextarea').setContent(element.content);
        language.value = element.language
        categorySec.value = element.category;
        subCategorySec.value = element.subCategory || '';
        subSubCategorySec.value = element.subSubCategory || '';
        globId = id; 
        document.querySelector('[data-modal-toggle="crud-modal"]').click();
    }
}

window.handleEdit = async () => {
    if (!globId) return; 

    const updatedBook = getVal();
    updatedBook.id = globId;

    try {
        const res = await editBook(updatedBook, globId);
        const index = data.findIndex(item => item.id === globId);
        if (index !== -1) {
            data[index] = res; 
        }

        document.querySelector('[data-modal-toggle="crud-modal"]').click();

        printTable(); 
        
        form.forEach(input => {
            input.value = ''
        });
        categorySec.value = ''; 

        globId = null;

    } catch (error) {
        console.error("Edit zamanı xəta baş verdi:", error);
    }
}


function getVal() {
    const book = {
        title: form[0].value,
        price: form[1].value,
        author: form[2].value,
        language: language.value,
        pages: form[3].value,
        cover: form[4].value,
        content: tinymce.get('mytextarea').getContent(),
        category: categorySec.value,
        subCategory: subCategorySec.value,
        subSubCategory: subSubCategorySec.value,
        like: 0,
        dislike: 0,
        view:0
    }

    return book
}

