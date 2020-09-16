const fs = require("fs");
const randomInt = require("random-int");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
var grpc = require("grpc");

var booksProto = grpc.load("books.proto");

// var client = new booksProto.books.BookService(
//   "127.0.0.1:50051",
//   grpc.credentials.createInsecure()
// );

class Client {
  constructor() {
    this.client = new booksProto.books.BookService(
      "127.0.0.1:50051",
      grpc.credentials.createInsecure()
    );
  }

  //   async printResponse(error, response, startTime) {
  //     const endTime = new Date();
  //     if (error) console.log("Error: ", error);
  //     else console.log(response);
  //     console.log("Response time: ", endTime - startTime);
  //   }

  async listBooks() {
    const startTime = new Date();
    await this.client.list({}, function (error, books) {
      const endTime = new Date();
      //   console.log("Response time: ", endTime - startTime);
    });
  }

  async insertBook(id, title, author) {
    const startTime = new Date();
    var book = { id: parseInt(id), title: title, author: author };
    await this.client.insert(book, function (error, empty) {
      const endTime = new Date();
      //   console.log("Response time: ", endTime - startTime);
    });
  }

  async getBook(id) {
    const startTime = new Date();
    await this.client.get({ id: parseInt(id) }, function (error, book) {
      const endTime = new Date();
      //   console.log("Response time: ", endTime - startTime);
    });
  }

  async deleteBook(id) {
    const startTime = new Date();
    await this.client.delete({ id: parseInt(id) }, function (error, empty) {
      const endTime = new Date();
      //   console.log("Response time: ", endTime - startTime);
    });
  }
}

let stats_b = {
  time: [],
};

async function doExec(content) {
  //console.log('content:',content);
  //   const start_t = new Date();
  const { stdout, stderr } = await exec(content);
  //   console.log('stdout:',stdout);
  //   const response = stdout.split(": ");
  //   //console.log('response:',response);
  //   const responseTime = parseInt(response[response.length - 1]);
  //   console.log("responseTime:", responseTime, content);
  //   const end_t = new Date();
  //   console.log(end_t - start_t);
}

const multipleClient = async () => {
  let stats_b = {
    number_of_call: [],
    time: [],
  };
  for (let i = 1; i <= 500; i++) {
    const start_t = new Date();
    const c = randomInt(3);
    const id = randomInt(1);
    if (id == 0) {
      switch (c) {
        case 0:
          await doExec(`node client1.js insert 1 test_title test_author`);
          break;
        case 1:
          await doExec(`node client1.js list`);
          break;
        case 2:
          await doExec(`node client1.js get 1`);
          break;
        case 3:
          await doExec(`node client1.js delete 1`);
          break;
      }
    } else {
      switch (c) {
        case 0:
          await doExec(`node client2.js insert 1 test_title test_author`);
          break;
        case 1:
          await doExec(`node client2.js list`);
          break;
        case 2:
          await doExec(`node client2.js get 1`);
          break;
        case 3:
          await doExec(`node client2.js delete 1`);
          break;
      }
    }
    // console.log("Time", new Date() - start_t);
    const end_t = new Date();
    stats_b.number_of_call.push(i);
    stats_b.time.push(end_t - start_t);
  }
  const data = JSON.stringify(stats_b);
  fs.writeFile("stats_grpc_b.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
};

// const multipleClient = async () => {
//   let stats_b = {
//     number_of_call: [],
//     time: [],
//   };
//   const client1 = new Client();
//   const client2 = new Client();
//   for (let i = 1; i <= 10; i++) {
//     const start_t = new Date();
//     const c = randomInt(3);
//     const id = randomInt(1);
//     if (id == 0) {
//       switch (c) {
//         case 0:
//           await client1.listBooks();
//           break;
//         case 1:
//           await client1.insertBook(1, "c1", "c1");
//           break;
//         case 2:
//           await client1.deleteBook(2);
//           break;
//         case 3:
//           await client1.getBook(1);
//           break;
//       }
//     } else {
//       switch (c) {
//         case 0:
//           await client2.listBooks();
//           break;
//         case 1:
//           await client2.insertBook(1, "c1", "c1");
//           break;
//         case 2:
//           await client2.deleteBook(2);
//           break;
//         case 3:
//           await client2.getBook(1);
//           break;
//       }
//     }
//     // console.log("Time", new Date() - start_t);
//     const end_t = new Date();
//     stats_b.number_of_call.push(i);
//     stats_b.time.push(end_t - start_t);
//   }
//   const data = JSON.stringify(stats_b);
//   fs.writeFile("stats_grpc_b.json", data, (err) => {
//     if (err) {
//       throw err;
//     }
//     console.log("JSON data is saved.");
//   });
// };

const concurrentCall = async () => {
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
          await client.listBooks();
          break;
        case 1:
          await client.insertBook(1, "c1", "c1");
          break;
        case 2:
          await client.deleteBook(2);
          break;
        case 3:
          await client.getBook(1);
          break;
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
};

async function main() {
  var processName = process.argv.shift();
  var scriptName = process.argv.shift();
  var command = process.argv.shift();

  if (command == "a") {
    for (let i = 0; i < 1000; i++) {
      await exec(`node client.js insert 1 test_title test_author`);
      // break;
    }
  } else if (command == "b") {
    await multipleClient();
  } else if (command == "c") {
    concurrentCall();
  }
}

main();
