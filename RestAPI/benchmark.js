let clientConstructor = require("./client_c");
const randomInt = require("random-int");
const childProc = require("child_process");
const exec = require("util").promisify(require("child_process").exec);
const fs = require("fs");
// const CHILD_PROCESSES = 1000;
const cmd = [["insert 99 a b"], ["list"], ["get 99"], ["delete 99"]];

const concurrentBenchmark = async () => {
  const start_t = new Date();
  let n = 1024;
  for (let i = 0; i < n; i++) {
    await childProc.exec("node", cmd1[randomInt(3)]);
    // childProcess.stdout.on("data", (data) => {
    //   console.log(`child stdout: ${data}`);
    // });
  }
  const end_t = new Date();
  console.log("total time:", end_t - start_t, "ms");
};

const multipleClient = async () => {
  let stats = {
    number_ith: [],
    time: [],
  };
  let clientId = 1;

  for (let i = 1; i <= 10; i++) {
    clientId = randomInt(1, 2);
    const start_t = new Date();
    if (clientId == 1) {
      await exec("node client1.js " + cmd[randomInt(3)]);
    } else await exec("node client2.js " + cmd[randomInt(3)]);

    const end_t = new Date();
    stats.number_ith.push(i);
    stats.time.push(end_t - start_t);
  }
  const data = JSON.stringify(stats);
  fs.writeFile("stats_rest_b.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
};

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "a") {
  exec("node client1.js insert_multiple 1000");
} else if (command == "b") {
  multipleClient();
} else if (command == "c") {
  concurrentBenchmark();
}
