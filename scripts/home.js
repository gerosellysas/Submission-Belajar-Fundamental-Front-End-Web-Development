const storageKey = "BOOKS_STORAGE";
const inputBook = document.getElementById('inputBook');
const bookIsFinish = document.getElementById('bookIsFinish');

function saveBook(book) {
    let bookList = [];
    if (localStorage.getItem(storageKey) !== null) {
        bookList = JSON.parse(localStorage.getItem(storageKey));
    }
    bookList.push(book);
    localStorage.setItem(storageKey, JSON.stringify(bookList));
}

bookIsFinish.addEventListener('change', function () {
    const bookSubmit = document.querySelector('#bookSubmit');
    if (bookIsFinish.value === 'isFinished') {
        bookSubmit.innerHTML = 'Masukkan Buku ke rak ' + '<span><b>Selesai Dibaca</b></span>';
    } else if (bookIsFinish.value === 'isUnfinished') {
        bookSubmit.innerHTML = 'Masukkan Buku ke rak ' + '<span><b>Belum Selesai Dibaca</b></span>';
    } else {
        bookSubmit.innerHTML = 'Belum Ada Buku yang Dimasukkan ke dalam Rak';
    }
})

inputBook.addEventListener('submit', function (event) {
    event.preventDefault();
    let bookTitle = document.getElementById('bookTitle').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookYear = document.getElementById('bookYear').value;
    let bookIsFinish = document.getElementById('bookIsFinish').value;
    const newBook = {
        id: +new Date(),
        title: bookTitle,
        author: bookAuthor,
        year: bookYear,
        isFinish: bookIsFinish,
    }
    if (typeof Storage !== undefined) {
        saveBook(newBook);
    } else {
        window.alert("Browser yang anda pakai tidak mendukung Web Storage");
    }
    inputBook.reset();
    window.alert('Berhasil memasukkan data buku yang baru');
})
