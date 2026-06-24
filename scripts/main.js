const myLibrary = [];

function Author(firstName, lastName) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor!");
    }

    this.firstName = firstName;
    this.lastName = lastName;
}

function Book(title, author, read) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor!");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.read = read;
}