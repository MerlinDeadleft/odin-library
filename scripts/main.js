const Status = {
    PlanToRead: "PlanToRead",
    Reading: "Reading",
    Finished: "Finished"
}

function Author(firstName, lastName) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor!");
    }

    this.firstName = firstName;
    this.lastName = lastName;
}

function Book(title, author, pages, status = Status.PlanToRead) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor!");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

const myLibrary = [];
const bookCardContainer = document.querySelector(".book-card-container");
const addBookModal = document.querySelector("#add-book-modal");
const addBookForm = document.querySelector("#add-book-form");
const confirmRemoveModal = document.querySelector("#confirm-remove-modal");
const confirmRemoveModalBookTitle = document.querySelector("#remove-modal-book-title");
const confirmRemoveButton = document.querySelector("#confirm-remove-button");
let currentDetailsShownId = null;

//main
bookCardContainer.addEventListener("click", handleBookCardDetailsButtonClicked);
bookCardContainer.addEventListener("click", handleRemoveBookClicked);
bookCardContainer.addEventListener("change", handleBookCardStatusChanged);
addBookModal.addEventListener("close", handleCloseAddBookModal);
addBookForm.addEventListener("submit", handleSubmitAddBookForm);
confirmRemoveButton.addEventListener("click", handleConfirmRemoveClicked);
confirmRemoveModal.addEventListener("close", handleCofirmRemoveModalClosed);

addDefaultLibrary();
showLibraryInDOM();

//functions
function addDefaultLibrary() {
    let tolkien = new Author("J.R.R.", "Tolkien");

    let fellowShipOfTheRing = new Book("The Fellowship of the Ring", tolkien, 432);
    myLibrary.push(fellowShipOfTheRing);

    let twoTowers = new Book("The Two Towers", tolkien, 448);
    myLibrary.push(twoTowers);

    let retunOfTheKing = new Book("The Return of the King", tolkien, 432);
    myLibrary.push(retunOfTheKing);

    let theHobbit = new Book("The Hobbit", tolkien, 230);
    myLibrary.push(theHobbit);

    let sanderson = new Author("Brandon", "Sanderson");

    let redRising = new Book("Red Rising", sanderson, 382, Status.Finished);
    myLibrary.push(redRising);

    let goldenSon = new Book("Golden Son", sanderson, 466, Status.Finished);
    myLibrary.push(goldenSon);

    let morningStar = new Book("Morning Star", sanderson, 524, Status.Reading);
    myLibrary.push(morningStar);

    let mistborn = new Book("Mistborn: The Final Empire", sanderson, 541, Status.Reading);
    myLibrary.push(mistborn);
}

function showLibraryInDOM() {
    for(const book of myLibrary) {
        addBookToDOM(book);
    }
}

function addBookToDOM(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id;
    bookCard.dataset.status = book.status;

    const titleElement = document.createElement("h2");
    titleElement.textContent = book.title;
    bookCard.appendChild(titleElement);

    const authorElement = document.createElement("p");
    const authorPrefixElement = document.createElement("span");
    authorPrefixElement.classList.add("author-prefix");
    authorPrefixElement.textContent = "Author: ";
    authorElement.appendChild(authorPrefixElement);
    const firstNameElement = document.createElement("span");
    firstNameElement.textContent = book.author.firstName;
    firstNameElement.classList.add("author-first-name");
    const lastNameElement = document.createElement("span");
    lastNameElement.textContent = book.author.lastName;
    authorElement.appendChild(firstNameElement);
    authorElement.appendChild(document.createTextNode(" "));
    authorElement.appendChild(lastNameElement);
    bookCard.appendChild(authorElement);

    const pagesElement = document.createElement("p");
    pagesElement.classList.add("pages");
    pagesElement.textContent = `${book.pages} pages`;
    bookCard.appendChild(pagesElement);

    const statusElement = document.createElement("p");
    statusElement.classList.add("status-container");
    const statusPrefixElement = document.createElement("span");
    statusPrefixElement.classList.add("status-prefix");
    statusPrefixElement.textContent = "Status: "
    statusElement.appendChild(statusPrefixElement);

    const statusSelectElement = document.createElement("select");
    statusSelectElement.id = `select-${book.id}`;
    statusSelectElement.classList.add("status-select");
    statusSelectElement.setAttribute("name", "status-select")
    statusSelectElement.setAttribute("disabled", "");
    for(let status in Status) {
        const statusOptionElement = document.createElement("option");
        statusOptionElement.setAttribute("value", status);
        statusOptionElement.textContent = bookStatusToPrettyString(status);
        statusSelectElement.appendChild(statusOptionElement);
    }
    statusSelectElement.value = book.status;
    statusElement.appendChild(statusSelectElement);
    bookCard.appendChild(statusElement);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("book-card-button-container");
    bookCard.appendChild(buttonContainer);

    const detailsButton = document.createElement("button");
    detailsButton.id = book.id;
    detailsButton.classList.add("details-button");
    detailsButton.textContent = "Details";
    buttonContainer.appendChild(detailsButton);

    const removeButton = document.createElement("button");
    removeButton.id = `remove-${book.id}`;
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    buttonContainer.appendChild(removeButton);

    bookCardContainer.appendChild(bookCard);
}

function bookStatusToPrettyString(status) {
    switch (status) {
        case Status.PlanToRead:
            return "Plan To Read";
        case Status.Reading:
            return "Reading";
        case Status.Finished:
            return "Finished";
        default:
            break;
    }
}

function handleBookCardDetailsButtonClicked(clickEvent) {
    if(!clickEvent.target.classList.contains("details-button")) {
        return;
    }

    if(currentDetailsShownId) {
        const currentDetailsBookCard = document.querySelector(`[data-id="${currentDetailsShownId}"]`);
        delete currentDetailsBookCard.dataset.showDetails;
        const currentDetailsButton = document.getElementById(`${currentDetailsShownId}`);
        currentDetailsButton.textContent = "Details";
        const currentStatusSelect = document.querySelector(`#select-${currentDetailsShownId}`);
        currentStatusSelect.setAttribute("disabled", "");

        if(clickEvent.target.id === currentDetailsShownId) {
            currentDetailsShownId = null;
            return;
        }
    }

    const clickedBookCard = document.querySelector(`[data-id="${clickEvent.target.id}"]`);
    clickedBookCard.dataset.showDetails = '';
    clickEvent.target.textContent = "Close Details";

    const clickedStatusSelect = document.querySelector(`#select-${clickEvent.target.id}`);
    clickedStatusSelect.removeAttribute("disabled");

    currentDetailsShownId = clickEvent.target.id;
}

function handleBookCardStatusChanged(changeEvent) {
    if(!changeEvent.target.classList.contains("status-select")) {
        return;
    }

    const id = changeEvent.target.id.substr(7);

    const changedBook = myLibrary.find(book => book.id === id);
    changedBook.status = changeEvent.target.value;

    const changedBookCard = document.querySelector(`[data-id="${id}"]`);
    changedBookCard.dataset.status = changedBook.status;
}

function handleCloseAddBookModal(closeEvent) {
    if(closeEvent.target.id !== "add-book-modal") {
        return;
    }

    addBookForm.reset();
}

function handleSubmitAddBookForm(submitEvent) {
    if(submitEvent.target.id !== "add-book-form") {
        return;
    }
    submitEvent.preventDefault();
    const formData = new FormData(submitEvent.target);
    const formObject = Object.fromEntries(formData.entries());

    const author = new Author(formObject["author-first-name"], formObject["author-last-name"]);
    const book = new Book(formObject.title, author, formObject.pages, formObject.status);
    myLibrary.push(book);
    addBookToDOM(book);

    addBookModal.close();
}

function handleRemoveBookClicked(clickEvent) {
    if(!clickEvent.target.classList.contains("remove-button")) {
        return;
    }

    const id = clickEvent.target.id.substr(7);
    const bookToRemove = myLibrary.find(book => book.id === id);

    confirmRemoveModal.dataset.bookId = id;
    confirmRemoveModalBookTitle.textContent = `"${bookToRemove.title}"`;
    confirmRemoveModal.showModal();
}

function handleConfirmRemoveClicked(clickEvent) {
    if(clickEvent.target.id !== "confirm-remove-button") {
        return;
    }

    const id = confirmRemoveModal.dataset.bookId;

    if(currentDetailsShownId !== null) {
        currentDetailsShownId = null;
    }

    console.log(myLibrary);
    const bookToRemove = myLibrary.find(book => book.id === id);
    const index = myLibrary.indexOf(bookToRemove);
    console.log(index);

    myLibrary.splice(index, 1);
    console.log(myLibrary);

    const bookCard = document.querySelector(`[data-id="${id}"]`);
    bookCardContainer.removeChild(bookCard);

    confirmRemoveModal.close();
}

function handleCofirmRemoveModalClosed(closeEvent) {
    if(closeEvent.target.id !== "confirm-remove-modal") {
        return;
    }

    delete confirmRemoveModal.dataset.bookId;
}
