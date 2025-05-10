
async function getAllBooks() {
    try {
     const res = await fetch('https://681da568f74de1d219b078d2.mockapi.io/libraff-data')
     if(!res.ok) {
         throw new Error(`${res.status} fetchde xeta bas verdi`)
     }
     const data = await res.json()
     return data
    } catch (error) {
     console.log(error.message);
     
    } 
 }

 async function deleteBookById(id) {
    try {
     const res = await fetch(`https://681da568f74de1d219b078d2.mockapi.io/libraff-data/${id}`, {
        method: 'DELETE'
     })
     if(!res.ok) {
         throw new Error(`${res.status} fetchde xeta bas verdi`)
     }
     const data = await res.json()
     return data
    } catch (error) {
     console.log(error.message);
     
    } 
 }

 async function createBook(book) {
    try {
        const res = await fetch('https://681da568f74de1d219b078d2.mockapi.io/libraff-data', {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(book)
        });

        if (!res.ok) {
            throw new Error(`${res.status} fetchde xeta bas verdi`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

 async function editBook(book, id) {
    try {
        const res = await fetch(`https://681da568f74de1d219b078d2.mockapi.io/libraff-data/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
        if (!res.ok) {
            throw new Error(`PUT əməliyyatında xəta baş verdi. Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}


 export{
    getAllBooks,
    deleteBookById,
    createBook,
    editBook
 }