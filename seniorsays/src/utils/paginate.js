// Client-side pagination — search/filter ke BAAD call karo, pehle nahi.
// Pehle slice karke baad me filter karoge toh search sirf current page ke items me chalegi.
//
// Return: { visible, currentPage, totalPages }
export function paginate(items, page, perPage) {
    const totalPages = Math.ceil(items.length / perPage);

    // Clamp zaroori hai: search se results ghat jaayen (ya posts load hone se pehle page
    // badal jaaye) toh page range ke bahar nikal jaata hai aur khaali grid dikhti hai.
    // totalPages 0 ho (koi item nahi) toh currentPage 1 rakhte hain.
    const currentPage = Math.min(Math.max(page, 1), totalPages || 1);

    const visible = items.slice((currentPage - 1) * perPage, currentPage * perPage);

    return { visible, currentPage, totalPages };
}
