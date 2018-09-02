# Jaak - Voting Contract

A solidity smart contract written for the ethereum blockchain platform. 
This includes the smart contract, js compile script, js mocha test script for all scenarios. js deployment script to deploy to Rinkeby network.

#### Contract is already deployed to Ethereum Rinkeby at: 0x8df9E28Ecff092dFE90A0fDf5334025c8b783CDa

#### you can check the transactions via etherscan here: https://rinkeby.etherscan.io/address/0x8df9E28Ecff092dFE90A0fDf5334025c8b783CDa


## Source code contents

Smart contract: JaakVote/contracts/JaakVote.sol
Compile script: JaakVote/compile.js
Test script: JaakVote/test/jaakvote.test.js
Deployment script: JaakVote/deploy.js

## Getting Started

To use it yourself first git clone it locally. Once done you will need to compile, test and deploy.

### Compile
To compile please use:

```
npm run compile
```

### Test
To test please use:
This will execute the test cases specified in addition to a few more.

```
npm run test
```

### Compile
>Please edit "JaakVote/deploy.js" to add your network mnomonic on line 6 so that RINKEBY_MNEM is a string with
>your mnemonic. You can also add your own network URL or infura api key/URL on line 8 so that PROVIDER_URL has 
>the string equavalent of your specific netwrok URL or infura URL your api key. You can leave it as it is and use
>my infura URL

Once done please run the following command on the command line:

```
npm run deploy
```
This will output the address where the contract was deployed and also the address that was used for deployment.

You can use this contract address for further interactive testing on http://remix.ethereum.org/ 

## If you face any issues, please contract me via github or on ali@purple7.com