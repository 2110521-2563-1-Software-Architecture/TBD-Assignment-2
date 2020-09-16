const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const events = require("events");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// const bookStream = new events.EventEmitter();

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
  return res.status(200).send(books);
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
  // console.log(deletedIndex);
  books.splice(deletedIndex, 1);
  res.status(204).send("");
});

// app.get('/streaming', (req,res) => {
//     bookStream.on('new_book',function(book){
//         res.write(JSON.stringify(book) + '\n')
//     })
// })

server.listen(3000, () => {
  console.log("Connect to port 3000.");
});
