## Members
1.  6030053921  Keerati Chuatanapinyo
2.  6030559121  Siwat Pongpanit
3.  6030631621  Anawat Trongwattananon
4.  6031022621  Thanapun Yan-amporn
5.  6031055321  Weerayut Thinchamlong
6.  6031059921  Setthanan Nakaphan


## 1. Screenshots of Swagger for your APIs
![alt text](https://raw.githubusercontent.com/2110521-2563-1-Software-Architecture/TBD-Assignment-1/master/swagger_api_doc.png "Swagger API Documentation")


## 2. Source codes of REST API's server and client

### Server
```javascript
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      title: "Book REST API",
      description: "REST API | Software Architecture Assignment 1",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let books = [{ id: 1, title: "team", author: "team" }];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 * /books:
 *  get:
 *      summary: Returns list of all books
 *      responses:
 *          '200':
 *              description: A successful response
 */

app.get("/books", (req, res) => {
  res.status(200).send(books);
});

/**
 * @swagger
 * /books/{id}:
 *  get:
 *      summary: Return a book with a specific id
 *      responses:
 *          '200':
 *              description: A successful response
 *  parameters:
 *      -   name: id
 *          in: path
 *          description: An ID of a book to get
 *          required: true
 *          schema:
 *              type: integer
 */
app.get("/books/:id", (req, res) => {
  for (let book of books) {
    if (book.id === parseInt(req.params.id)) {
      res.status(200).json(book);
      //   return;
    }
  }
  res.status(200).send("Not found");
});

/**
 * @swagger
 * /books/insert:
 *  post:
 *      summary: Insert a new book
 *      parameters:
 *        - name: Book
 *          in: body
 *          description: ID of a new book to be inserted
 *          required: true
 *          schema:
 *            type: object
 *            property:
 *              id:
 *                  type: integer
 *              title:
 *                  type: string
 *              author:
 *                  type: string
 *            example:
 *              id: 2
 *              title: The Handmaid's Tale
 *              author: Magaret Atwood
 *
 *      responses:
 *          '201':
 *              description: Successfully inserted a new book.
 *
 */
app.post("/books/insert", (req, res) => {
  book = req.body;
  books.push(book);
  //   bookStream.emit("new_book", book);
  //   console.log(res.status);
  res.status(201).send("");
});

/**
 * @swagger
 * /books/delete/{id}:
 *  delete:
 *      summary: Return a book with a specific id
 *      responses:
 *          '204':
 *              description: Successfully deleted a book
 *  parameters:
 *      -   name: id
 *          in: path
 *          description: An ID of a book to delete
 *          required: true
 *          schema:
 *              type: integer
 */
app.delete("/books/delete/:id", (req, res) => {
  const deletedIndex = books.findIndex(
    (book) => book.id === parseInt(req.params.id)
  );
  console.log(deletedIndex);
  books.splice(deletedIndex, 1);
  res.status(204).send("");
});

server.listen(3000, () => {
  console.log("Connect to port 3000.");
});

```

### Client
```javascript
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


var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "list") listBook();
else if (command == "insert")
  insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);


```


## 3.Compare how to call the methods based on gRPC and REST API side-by-side. 

| Functions | gPRC | REST API | 
| :---: | :---: | :---: |
| List books | `client.list({}, function(error, books) {...}` | `request.get({url: "http://localhost:3000/books"}, (err, res, body) => {...})` | 
| Insert book | `client.insert({id, title, author}, function(error, empty) {...}` | `request.get({url: "http://localhost:3000/books/insert", json: true, body: {id, title, author}}, (err, res, body) => {...})` | 
| Get book | `client.get({ id: parseInt(id) }, function(error, book) {...}` | `request.get("http://localhost:3000/books/" + String(bookID),(err, res, body) => {...})` |
| Delete book | `client.delete({ id: parseInt(id) }, function(error, book) {...}` | `request.delete("http://localhost:3000/books/delete/" + String(bookID),(err, res, body) => {...})` |
| Watch | `client.watch({})` | - | 


## 4. What are the main differences between REST API and gRPC?
  First, obviously, both of them requires different payload format, JSON for REST API and PROCTOBUF for gRPC. Unlike JSON, PROCTOBUF has type and uniqe number. Second, since gRPC uses the newer HTTP/2 protocol and supports both synchronous and asynchronous processing, it is faster than REST whcih uses HTTP/1.1 protocal. Finally, REST API dominating a communication between client and server in a web development makes browers support it more than gRPC.


## 5. What is the benefits of introducing interface in front of the gRPC and REST API of the book services. 
  We can simply change the way functions work but it does not affect the client at all.


## 6. Based on the introduced interface, compare how to call the methods based on gRPC and REST API side-by-side. 

| Functions | gPRC | REST API | 
| :---: | :---: | :---: |
| List books | node client.js list | node client.js list | node client.js list | node client.js list
| Insert book | node client.js insert `id` `title` `author` | node client.js insert `id` `title` `author` | 
| Get book | node client.js get `id` | node client.js get `id` |
| Delete book | node client.js delete `id` | node client.js delete `id` |
| Watch | node client.js watch | - | 


## 7. Component diagram representing the book services with and without interfaces.
![alt text](https://raw.githubusercontent.com/2110521-2563-1-Software-Architecture/TBD-Assignment-1/master/REST%20API%20Component%20Diagram.jpeg "REST API Component Diagram")
