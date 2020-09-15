const request = require("request");

function getBook(bookID) {
  request.get(
    "http://localhost:3000/books/" + String(bookID),
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(JSON.parse(body));
    }
  );
}

function listBook() {
  const options = {
    url: "http://localhost:3000/books",
    secure: false,
  };
  request.get(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.parse(body));
  });
}

function insertBook(bookID, bookTitle, bookAuthor) {
  const options = {
    url: "http://localhost:3000/books/insert",
    json: true,
    body: {
      id: parseInt(bookID),
      title: bookTitle,
      author: bookAuthor,
    },
  };
  request.post(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
}

function deleteBook(bookID) {
  request.delete(
    "http://localhost:3000/books/delete/" + String(bookID),
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
    }
  );
}

// function watchBook() {
//   request.get("http://localhost:3000/streaming", (err, res, body) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(body);
//   });
// }

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "list") listBook();
else if (command == "insert")
  insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);
// else if (command == 'watch')
//   watchBook();
