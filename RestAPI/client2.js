// const request = require("request");
const axios = require("axios");

async function getBook(bookID) {
  // const start = new Date();
  await axios
    .get(`http://localhost:3000/books/${bookID}`)
    .then((response) => {
      // const end = new Date();
      // console.log(response.data);
      // console.log("Time = ", end - start);
      // console.log("get");
      return;
    })
    .catch((error) => printError(error));
}

async function listBook() {
  // const start = new Date();
  await axios
    .get(`http://localhost:3000/books`)
    .then((response) => {
      // const end = new Date();
      // console.log(response.data);
      // console.log("Time = ", end - start);
      // console.log("list");
      return;
    })
    .catch((error) => printError(error));
}

async function insertBook(bookID, bookTitle, bookAuthor) {
  const url = `http://localhost:3000/books/insert`;
  const body = {
    id: parseInt(bookID),
    title: bookTitle,
    author: bookAuthor,
  };
  // const start = new Date();
  await axios
    .post(url, body)
    .then((response) => {
      // const end = new Date();
      // console.log("Time = ", end - start);
      // return;
      // console.log("insert");
    })
    .catch((error) => printError(error));
}

async function deleteBook(bookID) {
  // const start = new Date();
  await axios
    .delete(`http://localhost:3000/books/delete/${bookID}`)
    .then((response) => {
      // const end = new Date();
      // console.log("Time = ", end - start);
      // console.log("delete");
      return;
    })
    .catch((error) => printError(error));
}

async function insertBookIteration(times, bookID, bookTitle, bookAuthor) {
  const start_total = new Date();
  for (let i = 0; i < times; i++)
    await insertBook(bookID, bookTitle, bookAuthor);
  const end_total = new Date();
  console.log("Total time:", end_total - start_total, "ms");
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "list") listBook();
else if (command == "insert")
  insertBook(process.argv[1], process.argv[2], process.argv[3]);
else if (command == "insert_multiple") {
  insertBookIteration(
    process.argv[0],
    process.argv[1],
    process.argv[2],
    process.argv[3]
  );
} else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);
