// const request = require("request");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const axios = require("axios");

let stats_a = {
  time: [],
};

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
  const start = new Date();
  await axios
    .post(url, body)
    .then((response) => {
      const end = new Date();
      // console.log("Time = ", end - start);
      // stats.number_of_call.push(k);
      stats_a.time.push(end - start);
      // return;
    })
    .catch((error) => console.log(error));
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

async function insertBookIteration(times) {
  // stats_a = {
  //   time: [],
  // };
  // // const start_total = new Date();
  // for (let i = 0; i < times; i++)
  //   await insertBook(99, "bookTitle", "bookAuthor");
  // // const end_total = new Date();

  // // console.log("Total time:", end_total - start_total, "ms");
  // const data = JSON.stringify(stats_a);
  // fs.writeFile("stats_rest_a.json", data, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log("JSON data is saved.");
  // });
  for (let i = 0; i < times; i++) {
    await exec(`node client.js insert 1 test_title test_author`);
    // break;
  }
}

async function main() {
  insertBookIteration(1000);
}

main();
