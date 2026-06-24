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

//main
addDefaultLibrary();

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
    myLibrary.push(morningStar);
}
