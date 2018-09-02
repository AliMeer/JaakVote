const path = require('path');
const fs = require('fs');
const solc = require('solc');


const jaakVotePath = path.resolve(__dirname, "contracts","JaakVote.sol");
const source = fs.readFileSync(jaakVotePath, "utf8");

console.log(solc.compile(source, 1));

module.exports = solc.compile(source, 1).contracts[':JaakVote'];