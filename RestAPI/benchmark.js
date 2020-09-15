const randomInt = require("random-int");
const childProc = require("child_process");
// const CHILD_PROCESSES = 1000;
const cmd1 = [
  ["client1.js", "insert", 99, "a", "b"],
  ["client1.js", "list"],
  ["client1.js", "get", 99],
  ["client1.js", "delete", 99],
];

const cmd2 = [
  ["client2.js", "insert", 99, "a", "b"],
  ["client2.js", "list"],
  ["client2.js", "get", 99],
  ["client2.js", "delete", 99],
];

// let stats = {
//   number_of_call: [],
//   time: [],
// };

// const multipleClient = async () => {
//   const start_t = new Date();

//   for (let i = 0; i < CHILD_PROCESSES; i++) {
//     let childProcess = await childProc.spawn("node", cmd[randomInt(2)]);
//     childProcess.stdout.on("data", (data) => {
//       console.log(`child stdout: ${data}`);
//     });
//   }
//   const end_t = new Date();
//   console.log("total time:", end_t - start_t, "ms");
// };

const multipleClient = async () => {
  let clientId = 1;
  const start_t = new Date();
  for (let i = 0; i < k; i++) {
    clientId = randomInt(1, 2);
    if (clientId == 1) await childProc.exec("node", cmd1[1]);
    else await childProc.exec("node", cmd2[1]);
    // childProcess.stdout.on("data", (data) => {
    //   console.log(`child stdout: ${data}`);
    // });
  }
  const end_t = new Date();
  console.log(k, "time:", end_t - start_t);
};

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "a") {
  let childProcess = childProc.spawn("node", [
    "client.js",
    "insert_multiple",
    process.argv[0],
    99,
    "a",
    "b",
  ]);
  childProcess.stdout.on("data", (data) => {
    console.log(`child stdout: ${data}`);
  });
} else if (command == "b") {
  multipleClient();
}
