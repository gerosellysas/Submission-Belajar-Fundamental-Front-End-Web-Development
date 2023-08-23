const storageKey = "BOOKS_STORAGE";
const bookList = document.querySelector('#bookshelf');
const finishedBookshelf = document.querySelector(".isFinished");
const unfinishedBookshelf = document.querySelector(".isUnfinished");
const deleteButtons = document.querySelectorAll(".delete_btn");

function updateBookshelf() {
    if (finishedBookshelf.classList.contains("active")) {
        displayBooks(getBooks().filter(book => book.isFinish === 'isFinished'));
    }
    if (unfinishedBookshelf.classList.contains("active")) {
        displayBooks(getBooks().filter(book => book.isFinish === 'isUnfinished'));
    }
}

finishedBookshelf.addEventListener("click", function () {
    finishedBookshelf.classList.add("active")
    unfinishedBookshelf.classList.remove("active")
    const books = getBooks().filter(book => book.isFinish === 'isFinished')
    displayBooks(books)
})

unfinishedBookshelf.addEventListener("click", function () {
    finishedBookshelf.classList.remove("active")
    unfinishedBookshelf.classList.add("active")
    const books = getBooks().filter(book => book.isFinish === 'isUnfinished')
    displayBooks(books)
})

function getBooks() {
    if (localStorage.getItem(storageKey) !== null) {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    }
    else { return []; }
}

function displayBooks(books = getBooks()) {
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
}

window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem(storageKey) !== null) {
        const books = getBooks().filter(book => book.isFinish === 'isUnfinished');
        displayBooks(books);
    }
});

bookList.addEventListener("click", (e) => {
    // const books = getBooks();
    const buttonsWrapper = e.target.parentElement;
    const bookInfoWrapper = buttonsWrapper.parentElement;
    const bookCardWrapper = bookInfoWrapper.parentElement;
    const id = Number(bookCardWrapper.id);
    // const index = books.findIndex(item => item.id === id);
    // const isFinish = books[index].isFinish;

    if (e.target.classList.contains("delete_btn")) {
        deleteBook(id, updateBookshelf);
    }

    if (e.target.classList.contains("move_btn")) {
        moveBook({ id, isFinish: '' }, updateBookshelf);
    }
});

function moveBook({ id, isFinish }, updateDisplayBooks) {
    const books = getBooks();
    let updateBooks = [...books];
    const index = updateBooks.findIndex(item => item.id === id);
    const bookTitle = books[index].title;
    const shelfDestination = books[index].isFinish === 'isFinished' ? 'BELUM SELESAI DIBACA' : 'SELESAI DIBACA';

    const moveDialog = document.querySelector("#move_dialog");
    const moveText = document.querySelector(".move_dialog_text");
    const confirmMoveButton = document.querySelector(".move_dialog_btn_confirm");
    const cancelMoveButton = document.querySelector(".move_dialog_btn_cancel");

    moveText.innerHTML = 'Apakah anda yakin ingin menindahkan buku ' + '<span><b>' + bookTitle + '</span></b>' + ' ke rak ' + '<span><b>' + shelfDestination + '</span></b>' + ' ?';
    moveDialog.classList.add("dialog_active");

    confirmMoveButton.addEventListener("click", function () {
        updateBooks[index].isFinish = books[index].isFinish === 'isFinished' ? 'isUnfinished' : 'isFinished';
        localStorage.setItem(storageKey, JSON.stringify(updateBooks));
        moveDialog.classList.remove("dialog_active");
        updateDisplayBooks();
    })

    cancelMoveButton.addEventListener("click", function () {
        moveDialog.classList.remove("dialog_active");
        updateDisplayBooks();
    })
}

function deleteBook(id, updateDisplayBooks) {
    const books = getBooks();
    let updateBooks = [...books];
    const index = books.findIndex(book => book.id === id);
    const bookTitle = books[index].title;
    updateBooks = updateBooks.filter(item => item.id !== id);

    const deleteDialog = document.querySelector("#delete_dialog");
    const deleteText = document.querySelector(".delete_dialog_text");
    const confirmDeleteButton = document.querySelector(".delete_dialog_btn_confirm");
    const cancelDeleteButton = document.querySelector(".delete_dialog_btn_cancel");

    deleteText.innerHTML = 'Apakah anda yakin untuk menghapus buku ' + '<span><b>' + bookTitle + '</span></b>' + ' ?';
    deleteDialog.classList.add("dialog_active");

    confirmDeleteButton.addEventListener("click", function () {
        localStorage.setItem(storageKey, JSON.stringify(updateBooks));
        deleteDialog.classList.remove("dialog_active");
        updateDisplayBooks();
    })

    cancelDeleteButton.addEventListener("click", function () {
        deleteDialog.classList.remove("dialog_active");
        updateDisplayBooks();
    })
}