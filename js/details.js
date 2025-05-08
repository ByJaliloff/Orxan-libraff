import { getAllBooks } from "./service.js";

const categoryWay = document.querySelector('#category-way');
const detailContainer = document.querySelector("#detail-container");

async function renderDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const data = await getAllBooks();
  const book = data.find((item) => item.id == id);

  if (!book) {
    categoryWay.innerHTML = "<p>Kitab tapılmadı.</p>";
    return;
  }

  categoryWay.innerHTML = `
    <div class="px-4 text-[14px] text-[#767676]">
      <span>Əsas səhifə</span>
      <span class="mx-[6px]">/</span>
      <span>${book.category}</span>
      <span class="mx-[6px]">/</span>
      <span>${book.subCategory}</span>
      <span class="mx-[6px]">/</span>
      <span>${book.subSubCategory}</span>
      <span class="mx-[6px]">/</span>
      <span>${book.title}</span>
    </div>`;

  detailContainer.innerHTML = `
  <div class="flex flex-col md:flex-row gap-6 mt-6 px-4">
    <div class="w-full md:w-2/3">
      <img src="${book.cover}" alt="${book.title}" class="w-[600px] h-[600px] rounded shadow" />
    </div>

    <div class="w-full md:w-1/3 space-y-6">
      <div>
        <p class="text-[13px] text-[#767676]">Kod: ${book.isbn || "N/A"}</p>
        <h2 class="text-[32px] font-semibold text-[#1e293b] mt-[30px] mb-[5px] pr-[20px]">${book.title}</h2>
        <p class="text-[64748b] text-[16px] mb-[20px]">${book.author}</p>

        <div class="mt-4 flex items-start gap-2">
         <div class="flex flex-col leading-tight">
             <span class="text-[28px] font-bold text-[#1e293b]">${book.price} ₼</span>
            <div class="flex items-center gap-2">
             <span class="line-through text-[#767676] text-[18px]">${book.oldPrice} ₼</span>
             <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">-${book.discount}%</span>
            </div>
         </div>
        </div>
      </div>

      <button class="bg-[#ef3340] w-[450px] h-[50px] text-white text-[18px] px-6 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-red-700 transition">
           <i class="fa-solid fa-bag-shopping"></i> Səbətə əlavə et
      </button>

      <div class="flex justify-between items-center text-sm text-[#64748b] w-full max-w-[500px] mx-auto">
        <div class="flex items-center gap-2 cursor-pointer">
           <i class="fa-regular fa-heart text-[26px]"></i>
              <span>Seçilmiş</span>
        </div>
        <div class="flex items-center gap-2 cursor-pointer">
           <i class="fa-solid fa-comment-dots text-[26px]"></i>
              <span>Sizə necə kömək edə bilərik?</span>
        </div>
      </div>
      
      <div class="border-t pt-4 text-sm space-y-2 text-[#64748b]">
           <h3 class="font-semibold text-[18px] text-[#1e293b]">Çatdırılma haqqında</h3>
           <p>Bakı şəhəri üçün təxmini müddət və qiymətlər:</p>
           <p><i class="fa-solid fa-shop"></i> Mağazadan təhvil alma — <strong>pulsuz</strong>.</p>
           <p><i class="fa-solid fa-truck-fast"></i> Kuryer ilə — operator təsdiqindən sonra <strong>24 saat</strong> ərzində. 30 AZN və yuxarı sifarişlərdə — <strong>pulsuz</strong>.</p>
       <div class="border-t-2 border-dashed border-[#94a3b8] pt-2">
        <p>Bölgələrə çatdırılma <strong>3-5 iş günü</strong> ərzində.</p>
       </div>
      </div>
    </div>
  </div>
`;

}

renderDetail();
