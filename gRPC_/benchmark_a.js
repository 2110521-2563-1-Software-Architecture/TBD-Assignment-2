const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function main() {
  for (let i = 0; i < 1000; i++) {
    await exec(`node client.js insert 1 test_title test_author`);
    // break;
  }
}

main();
