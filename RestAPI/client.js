const request = require("request");
const axios = require("axios");

function getBook(bookID) {
  const start = new Date();
  axios
    .get(`http://localhost:3000/books/${bookID}`)
    .then((response) => {
      const end = new Date();
      console.log(response.data);
      console.log("Time = ", end - start);
      return;
    })
    .catch((error) => printError(error))
}

function listBook() {
  const start = new Date();
  axios
    .get(`http://localhost:3000/books`)
    .then((response) => {
      const end = new Date();
      console.log(response.data);
      console.log("Time = ", end - start);
      return;
    })
    .catch((error) => printError(error))
}

function insertBook(bookID, bookTitle, bookAuthor) {
    const url = `http://localhost:3000/books/insert`;
    const body = {
      id: parseInt(bookID),
      title: bookTitle,
      author: bookAuthor,
    }
  const start = new Date();
  axios
    .post(url,body)
    .then((response) => {
      const end = new Date();
      console.log("Time = ", end - start);
      return;
    })
    .catch((error) => printError(error))
}

function deleteBook(bookID) {
  const start = new Date();
  axios
    .delete(`http://localhost:3000/books/delete/${bookID}`)
    .then((response) => {
      const end = new Date();
      console.log("Time = ", end - start);
      return;
    })
    .catch((error) => printError(error))
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "list") listBook();
else if (command == "insert")
  insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);
