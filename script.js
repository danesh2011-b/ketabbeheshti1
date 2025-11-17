let books = [];
let selectedCategory = "all";

document.addEventListener("DOMContentLoaded", () => {
    fetch("books.json")
        .then(res => res.json())
        .then(data => {
            books = data;
            displayBooks(books);
        });

    // جستجو
    document.getElementById("searchInput").addEventListener("input", searchBooks);

    // دسته‌بندی‌ها
    document.querySelectorAll(".categories button").forEach(btn => {
        btn.addEventListener("click", () => {
            selectedCategory = btn.getAttribute("data-category");
            searchBooks(); // همزمان با جستجو دسته‌بندی هم اعمال شود
        });
    });
});

function displayBooks(list) {
    const container = document.getElementById("booksContainer");
    container.innerHTML = "";

    if(list.length === 0){
        container.innerHTML = "<p>هیچ کتابی یافت نشد.</p>";
        return;
    }

    list.forEach(book => {
        container.innerHTML += `
            <div class="book-card">
                <div class="book-title">${book.name}</div>
                <div class="book-info">نویسنده: ${book.author}</div>
                <div class="book-info">قفسه: ${book.shelf}</div>
                <div class="book-info">سال چاپ: ${book.year}</div>
                <div class="book-info">دسته: ${book.category}</div>
            </div>
        `;
    });
}

function searchBooks() {
    const search = document.getElementById("searchInput").value.trim();

    const filtered = books.filter(book => {
        const matchCategory = selectedCategory === "all" || book.category === selectedCategory;
        const matchSearch = book.name.includes(search);
        return matchCategory && matchSearch;
    });

    displayBooks(filtered);
}
