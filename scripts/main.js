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

//main
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

    let goldenSon = new Book("Golden Sun", sanderson, 466, Status.Finished);
    myLibrary.push(goldenSon);

    let morningStar = new Book("Morning Star", sanderson, 524, Status.Reading);
    myLibrary.push(morningStar);

    let mistborn = new Book("Mistborn: The Final Empire", sanderson, 541, Status.Reading);
    myLibrary.push(mistborn);
}

function showLibraryInDOM() {
    for(const book of myLibrary) {
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id;
        bookCard.dataset.status = book.status;

        let titleElement = document.createElement("h2");
        titleElement.textContent = book.title;
        bookCard.appendChild(titleElement);

        let authorElement = document.createElement("p");
        let authorPrefixElement = document.createElement("span");
        authorPrefixElement.classList.add("author-prefix");
        authorPrefixElement.textContent = "Author: ";
        authorElement.appendChild(authorPrefixElement);
        let firstNameElement = document.createElement("span");
        firstNameElement.textContent = book.author.firstName;
        firstNameElement.classList.add("author-first-name");
        let lastNameElement = document.createElement("span");
        lastNameElement.textContent = book.author.lastName;
        authorElement.appendChild(firstNameElement);
        authorElement.appendChild(document.createTextNode(" "));
        authorElement.appendChild(lastNameElement);
        bookCard.appendChild(authorElement);

        let pagesElement = document.createElement("p");
        pagesElement.textContent = `${book.pages} pages`;
        bookCard.appendChild(pagesElement);

        let statusElement = document.createElement("p");
        let statusPrefixElement = document.createElement("span");
        statusPrefixElement.classList.add("status-prefix");
        statusPrefixElement.textContent = "Status: "
        statusElement.appendChild(statusPrefixElement);
        let statusValueElement = document.createElement("span");
        statusValueElement.classList.add("status");
        statusValueElement.textContent = book.status;
        statusElement.appendChild(statusValueElement);
        bookCard.appendChild(statusElement);

        bookCardContainer.appendChild(bookCard);
    }
}