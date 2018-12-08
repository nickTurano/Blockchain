import Block from './Block';
import hash from './Hash';
//Requirements
var express = require('express');
var app = express();

//setup static webpage and listen on port 8080.  Serve index.html upon successful connection
app.use(express.static("."));
app.listen(8080, function(){
    app.use(express.static("index.html"));
    console.log('Running...')
})

//endpoint to generate a genesis block
app.get('/genesis', function(req, res){
    var data = req.query.data;
    //Mine a block with previousHash set to undefined
    let genesisBlock: Block = mine(data, undefined, req.query.diff);
    res.send(genesisBlock);
})
//endpoint to generate a new block
app.get('/new', function(req, res){
    var data = req.query.data;
    let newBlock: Block = mine(data, req.query.prev, req.query.diff);
    console.log("Mined" + newBlock.blockHash +" Nonce: " + newBlock.nonce);
    res.send(newBlock);
})

//Function to mine block based on blockdata, previousHash, and difficulty. Returns a mined block
function mine(data: string, previousHash: string, diff: number): Block{
    let nonce: number = 0;
    let difficulty: number = diff;
    let zero: string = "0";
    let zeroString: string = zero.repeat(difficulty);
    let blockString: string = data + previousHash + nonce;
    let blockHash: string = hash(blockString);
    while (blockHash.indexOf(zeroString) != 0){
        nonce += 1;
        blockString = data + previousHash + nonce;
        blockHash = hash(blockString);
    }
    return {data, previousHash, nonce, blockHash}
}
