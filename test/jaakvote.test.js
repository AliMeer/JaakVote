const path = require('path');
const fs = require('fs');
const solc = require('solc');
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let jaakVote;

beforeEach(async ()=> {
    //get a list of all accounts
    
    accounts =   await web3.eth.getAccounts();
    
    jaakVote = await new web3.eth.Contract(JSON.parse(interface))
    
    .deploy({ data: bytecode})
    .send({ from: accounts[0], gas: '1000000'});
    
    jaakVote.setProvider(provider);
    //use one of the accounts to deploy the contract
    
});

describe('Jaak Voting Contract:', () => {

    it('deploys contract', () => {
        //it is able to deploy the contract to the network
        assert.ok(jaakVote.options.address);
    });

    it('Allows user to enter a valid yes vote and records it correctly', async () =>  {
        await jaakVote.methods.castVote("yes").send({
            from: accounts[0],
        });

        var totalVotes = await jaakVote.methods.totalVotes().call({
            from: accounts[0]
        });
        var checkVote = await jaakVote.methods.checkVote().call({
            from: accounts[0]
        });
        var yesVotes = await jaakVote.methods.totalYesVotes().call({
            from: accounts[0]
        });

        assert.equal(totalVotes,1);
        assert.equal(checkVote, 'yes');
        assert.equal(yesVotes, 1);
    });

    it('Allows user to enter a valid no vote and records it correctly', async () =>  {
        await jaakVote.methods.castVote("no").send({
            from: accounts[0],
        });

        var totalVotes = await jaakVote.methods.totalVotes().call({
            from: accounts[0]
        });
        var checkVote = await jaakVote.methods.checkVote().call({
            from: accounts[0]
        });
        var noVotes = await jaakVote.methods.totalNoVotes().call({
            from: accounts[0]
        });

        assert.equal(totalVotes,1);
        assert.equal(checkVote, 'no');
        assert.equal(noVotes, 1);
    });

    it('Allows multiple users to enter valid votes and records correctly', async () =>  {
        //this should icrement totalVotes to 1
        //this should increment totalYesVotes to 1
        await jaakVote.methods.castVote("yes").send({
            from: accounts[0],
        });

        //this should icrement totalVotes to 2
        //this should increment totalYesVotes to 2
        await jaakVote.methods.castVote("yes").send({
            from: accounts[1],
        });


        //this should icrement totalVotes to 3
        //this should increment totalNoVotes to 1
        await jaakVote.methods.castVote("no").send({
            from: accounts[3],
        });

       //this should icrement totalVotes to 4
        //this should increment totalNoVotes to 2
        await jaakVote.methods.castVote("no").send({
            from: accounts[4],
        });
    

        var totalVotes = await jaakVote.methods.totalVotes().call({
            from: accounts[0]
        });
        
        var noVotes = await jaakVote.methods.totalNoVotes().call({
            from: accounts[0]
        });

        var yesVotes = await jaakVote.methods.totalYesVotes().call({
            from: accounts[0]
        });

        assert.equal(totalVotes,4);
        assert.equal(noVotes, 2);
        assert.equal(yesVotes, 2);
    });

    it('Ensure each user only votes once', async ()=>  {
        await jaakVote.methods.castVote("yes").send({
            from: accounts[1]
        });

        //trying to vote again with the same account
        await jaakVote.methods.castVote("yes").send({
            from: accounts[1]
        });
        
        //getting total votes and total yes votes
        var totalVotes = await jaakVote.methods.totalVotes().call({
            from: accounts[1]
        });

        var yesVotes = await jaakVote.methods.totalYesVotes().call({
            from: accounts[0]
        });

        assert.equal(totalVotes, 1);
        assert.equal(yesVotes,1);
    });

    
});