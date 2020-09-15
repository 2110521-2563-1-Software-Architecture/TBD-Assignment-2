const randomInt = require("random-int");
const childProc = require("child_process");
const CHILD_PROCESSES = 2;
const cmd = [
  ["client.js", "insert", 99, "a", "b"],
  ["client.js", "list"],
  ["client.js", "get", 99],
  ["client.js", "delete", 99],
];

const multipleClient = async () => {
  const start_t = new Date();
  for (let j = 0; j < 1; j++) {
    for (let i = 0; i < CHILD_PROCESSES; i++) {
      let childProcess = await childProc.spawn("node", cmd[randomInt(3)]);
      childProcess.stdout.on("data", (data) => {
        console.log(`child stdout: ${data}`);
      });
    }
  }
  const end_t = new Date();
  console.log("total time:", end_t - start_t, "ms");
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
