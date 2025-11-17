let books = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("books.json")
        .then(res => res.json())
        .then(data => {
            books = data;
            displayBooks(books);
        });

    document.getElementById("searchInput").addEventListener("input", searchBooks);
});

function displayBooks(list) {
    const container = document.getElementById("booksContainer");
    container.innerHTML = "";

    list.forEach(book => {
        container.innerHTML += `
            <div class="book-card">
                <div class="book-title">${book.name}</div>
                <div class="book-info">نویسنده: ${book.author}</div>
                <div class="book-info">قفسه: ${book.shelf}</div>
                <div class="book-info">سال چاپ: ${book.year}</div>
            </div>
        `;
    });
}

function searchBooks() {
    const search = document.getElementById("searchInput").value.trim();
    const filtered = books.filter(b =>
        b.name.includes(search)
    );
    displayBooks(filtered);
}
