"use strict";
exports.__esModule = true;
var Hash_1 = require("./Hash");
//Requirements
var express = require('express');
var app = express();
//setup static webpage and listen on port 8080.  Serve index.html upon successful connection
app.use(express.static("."));
app.listen(8080, function () {
    app.use(express.static("index.html"));
    console.log('Running...');
});
//table endpoint function to get table data
app.get('/genesis', function (req, res) {
    var data = req.query.data;
    console.log("Mining" + req.query.data);
    var genesisBlock = mine(data, undefined, req.query.diff);
    console.log("Mined" + genesisBlock.blockHash + " Nonce: " + genesisBlock.nonce);
    res.send(genesisBlock);
});
app.get('/new', function (req, res) {
    var data = req.query.data;
    console.log("Mining" + req.query.data);
    console.log(req.query.prev);
    var newBlock = mine(data, req.query.prev, req.query.diff);
    console.log("Mined" + newBlock.blockHash + " Nonce: " + newBlock.nonce);
    res.send(newBlock);
});
function mine(data, previousHash, diff) {
    var nonce = 0;
    var difficulty = diff;
    var zero = "0";
    var zeroString = zero.repeat(difficulty);
    var blockString = data + previousHash + nonce;
    var blockHash = Hash_1["default"](blockString);
    while (blockHash.indexOf(zeroString) != 0) {
        nonce += 1;
        blockString = data + previousHash + nonce;
        blockHash = Hash_1["default"](blockString);
    }
    return { data: data, previousHash: previousHash, nonce: nonce, blockHash: blockHash };
}
