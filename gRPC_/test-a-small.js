const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function doExec(content) {
  const { stdout } = await exec(content);
  const response = stdout.split(": ");
  const responseTime = parseInt(response[response.length - 1]);
  console.log("Response time: ", responseTime);
}

async function main() {
  for (let i = 1; i <= 50; i++) {
    await doExec(`node client.js insert ${i} small_insert small_insert`);
  }
}

main();