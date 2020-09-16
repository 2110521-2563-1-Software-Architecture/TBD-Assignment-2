var grpc = require("grpc");

var booksProto = grpc.load("books.proto");

var client = new booksProto.books.BookService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

function printResponse(error, response, startTime) {
  const endTime = new Date();
  if (error) console.log("Error: ", error);
  else console.log(response);
  console.log("Response time: ", endTime - startTime);
}

function listBooks() {
  const startTime = new Date();
  client.list({}, function (error, books) {
    // printResponse(error, books, startTime);
  });
}

function insertBook(id, title, author) {
  const startTime = new Date();
  var book = { id: parseInt(id), title: title, author: author };
  client.insert(book, function (error, empty) {
    // printResponse(error, empty, startTime);
  });
}

function getBook(id) {
  const startTime = new Date();
  client.get({ id: parseInt(id) }, function (error, book) {
    // printResponse(error, book, startTime);
  });
}

function deleteBook(id) {
  const startTime = new Date();
  client.delete({ id: parseInt(id) }, function (error, empty) {
    // printResponse(error, empty, startTime);
  });
}
// add the following section
function watchBooks() {
  var call = client.watch({});
  call.on("data", function (book) {
    console.log(book);
  });
}
// add the following section
var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "list") listBooks();
else if (command == "insert")
  insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);
else if (command == "watch") watchBooks();
