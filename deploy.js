const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

//Add your mnemonic here
const RINKEBY_MNEM = 'pull vintage tag universe cancel oval inner program mule praise strike tooth';
//Add your provider URL or infura network URL or leave it as it is if you wish you use mine
const PROVIDER_URL = 'https://rinkeby.infura.io/L8Yx8J89L13yZbFG30ey';

const provider = new HDWalletProvider(
    //mnemonic for ethereum account to deploy with
    RINKEBY_MNEM,
    //using infuria as no local node running and not in browser
    PROVIDER_URL
);
//this will create web3 instance with provider for rinkeby network
const web3 = new Web3(provider);

//deploy to rinkeby
const deploy = async () =>    {
    
    //get list of accounts from web3 eth
    const accounts = await web3.eth.getAccounts();
    //Use the first account in the list to deploy
    //console log out to check which acc is being used for deployment
    console.log("\nContract will be deployed with public address: " + accounts[0]);
    
    //make a deployment api call thi will return the address of the deployed contract
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: '0x' + bytecode})
        .send({gas: '1000000', from: accounts[0]});
    //console.log("\nInterface is \n" + interface);
    console.log("\nContract deployed to ethereum address: " + result.options.address);

};

deploy();