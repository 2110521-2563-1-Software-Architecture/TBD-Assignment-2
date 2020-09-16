const fs = require("fs");
const axios = require("axios");
const randomInt = require("random-int");

class Client {
  async getBook(bookID) {
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
      .catch((error) => console.log(error));
  }

  async listBook() {
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

  async insertBook(bookID, bookTitle, bookAuthor) {
    const url = `http://localhost:3000/books/insert`;
    const body = {
      id: parseInt(bookID),
      title: bookTitle,
      author: bookAuthor,
    };
    //   const start = new Date();
    await axios
      .post(url, body)
      .then((response) => {
        //   const end = new Date();
        //   stats_a.time.push(end - start);
        return;
      })
      .catch((error) => console.log(error));
  }

  async deleteBook(bookID) {
    // const start = new Date();
    await axios
      .delete(`http://localhost:3000/books/delete/${bookID}`)
      .then((response) => {
        // const end = new Date();
        // console.log("Time = ", end - start);
        // console.log("delete");
        return;
      })
      .catch((error) => console.log(error));
  }

  //   async insertBookIteration(times) {
  //     stats_a = {
  //       time: [],
  //     };
  //     // const start_total = new Date();
  //     for (let i = 0; i < times; i++)
  //       await insertBook(99, "bookTitle", "bookAuthor");
  //     // const end_total = new Date();

  //     // console.log("Total time:", end_total - start_total, "ms");
  //     const data = JSON.stringify(stats_a);
  //     fs.writeFile("stats_rest_a.json", data, (err) => {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log("JSON data is saved.");
  //     });
  //   }
}

async function concurrentCall() {
  let stats_c = {
    number_of_call: [],
    time: [],
  };
  const power_of_two = [
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512,
    1024,
    2048,
    4096,
  ];
  for (let i = 0; i < power_of_two.length; i++) {
    const start_t = new Date();
    for (let j = 0; j < power_of_two[i]; j++) {
      const cmd_int = randomInt(3);
      const client = new Client();
      switch (cmd_int) {
        case 0:
          await client.listBook();
        case 1:
          await client.insertBook(1, "c1", "c1");
        case 2:
          await client.deleteBook(2);
        case 3:
          await client.getBook(1);
      }
    }
    const end_t = new Date();
    // console.log(power_of_two[i], "time:", end_t - start_t);
    stats_c.number_of_call.push(power_of_two[i]);
    stats_c.time.push(end_t - start_t);
  }
  const data = JSON.stringify(stats_c);
  fs.writeFile("stats_rest_c.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}

async function multipleClient() {
  let stats_b = {
    number_of_call: [],
    time: [],
  };
  const client1 = new Client();
  const client2 = new Client();
  //   let client1_req = [];
  //   let client2_req = [];
  for (let i = 1; i <= 500; i++) {
    const start_t = new Date();
    const c1 = randomInt(3);
    switch (c1) {
      case 0:
        await client1.listBook();
      case 1:
        await client1.insertBook(1, "c1", "c1");
      case 2:
        await client1.deleteBook(2);
      case 3:
        await client1.getBook(1);
    }
    const c2 = randomInt(3);
    switch (c2) {
      case 0:
        await client2.listBook();
      case 1:
        await client2.insertBook(2, "c2", "c2");
      case 2:
        await client2.deleteBook(1);
      case 3:
        await client2.getBook(2);
    }
    // console.log("Time", new Date() - start_t);
    const end_t = new Date();
    stats_b.number_of_call.push(i);
    stats_b.time.push(end_t - start_t);
  }
  const data = JSON.stringify(stats_b);
  fs.writeFile("stats_rest_b.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
  //   await Promise.all(client1_req.concat(client2_req));
}

async function main() {
  var processName = process.argv.shift();
  var scriptName = process.argv.shift();
  var command = process.argv.shift();

  if (command == "b") {
    multipleClient();
  } else if (command == "c") {
    concurrentCall();
  }
}

main();
