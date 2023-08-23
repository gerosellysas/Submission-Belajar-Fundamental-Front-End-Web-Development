const storageKey = "BOOKS_STORAGE";
const bookList = document.querySelector('#bookshelf');
const input = document.getElementById("searchInput");
const searchResult = document.querySelector(".search_result");

input.addEventListener("input", () => {
    const title = input.value;
    const books = filterBooks(title);
    displayBooks(books);
})

function filterBooks(title) {
    const books = getBooks();
    const input = title.toLowerCase();
    const result = books.filter(book => ((book.title).toLowerCase()).includes(input));
    return result;
}

function getBooks() {
    if (localStorage.getItem(storageKey) !== null) {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    }
    else { return []; }
}

function displayBooks(books = getBooks()) {
    if (books.length >= 1 && input.value !== '') {
        bookList.style.display = 'grid';
        searchResult.style.textDecoration = 'underline';
        searchResult.innerText = '"' + input.value + '"';
        bookList.innerHTML = '';
        books.map(book => {
            const { id, title, author, year } = book;
            bookList.innerHTML += `
                <div class="book_card" id=${id}>
                    <img src="https://ebooklaunch.com/wp-content/uploads/2019/03/ebooklaunch_ebookformatting-printformatting-bookcoverdesign_500x800_takebackyourtime.jpg" class="book_image" alt="gambar tidak tersedia"></img>
                    <div class="book_info">
                        <article>
                            <h3>${title}</h3>
                            <p>${author}</p>
                            <p class="release_year">${year}</p>
                        </article>
                        <div class="bookshelf_buttons">
                            <button class="move_btn"><img src="assets/move_out_icon.png"></button>
                            <button class="delete_btn"><img src="assets/delete_icon.png"></button>
                        </div>
                    </div>
                </div>
            `
        });
    } else if (books.length === 0 && input.value !== '') {
        bookList.style.display = 'block';
        bookList.style.textAlign = 'center';
        bookList.innerHTML = '<p>' + 'Hasil tidak ditemukan' + '</p>'
        searchResult.style.textDecoration = 'underline';
        searchResult.innerText = '"' + input.value + '"';
    } else {
        searchResult.style.textDecoration = 'none';
        searchResult.innerText = '-';
        bookList.innerHTML = '';
    }
}

window.addEventListener("DOMContentLoaded", () => {
    displayBooks();
})