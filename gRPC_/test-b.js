const util = require("util");
const exec = util.promisify(require("child_process").exec);

getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

async function doExec(content) {
    const { stdout, stderr } = await exec(content);
    const response = stdout.split(": ");
    const responseTime = parseInt(response[response.length - 1]);
    console.log("Response time: ", responseTime);
  }

main = async () => {
    
    for(let i=1;i<=1000;i++) {
        const clientId = getRandomInt(2);
        const rand = getRandomInt(50);
        const method = getRandomInt(4);
        if(clientId===1) {
            switch(method) {
                case 0:
                    await doExec(`node client.js insert ${rand} a b`);
                    break;
                case 1:
                    await doExec(`node client.js delete ${rand}`);
                    break;
                case 2:
                    await doExec(`node client.js get ${rand}`);
                    break;
                case 3:
                    await doExec(`node client.js list`);
                    break;
            }
        }
        else {
            switch(method) {
                case 0:
                    await doExec(`node client2.js insert ${rand} a b`);
                    break;
                case 1:
                    await doExec(`node client2.js delete ${rand}`);
                    break;
                case 2:
                    await doExec(`node client2.js get ${rand}`);
                    break;
                case 3:
                    await doExec(`node client2.js list`);
                    break;
            }
        }
    }
}

main();