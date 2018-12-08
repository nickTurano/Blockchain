var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [];
        this.diff = 1;
    }
    Blockchain.prototype.addBlock = function (block) {
        this.chain.push(block);
    };
    return Blockchain;
}());
var myChain = new Blockchain;
function createNewBlock() {
    var data = document.getElementById("blockData").value;
    console.log("got: " + data);
    console.log(myChain.chain);
    if (myChain.chain.length == 0) {
        console.log("creating genesis block");
        myChain.diff = document.getElementById("diff").value;
        addGenesisBlock(data);
    }
    else {
        addNewBlock(data);
    }
    return false;
}
function addGenesisBlock(input) {
    var URL = "http://localhost:8080/genesis";
    $.ajax({
        type: "GET",
        url: URL,
        contentType: "application/json; charset=utf-8",
        data: { 'data': input, 'diff': myChain.diff },
        dataType: "html",
        success: function (msg) {
            var resBlock = JSON.parse(msg);
            myChain.addBlock(resBlock);
            publishBlock(resBlock);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("content").innerHTML = "Error obtaining transcript data";
        }
    });
}
function addNewBlock(input) {
    var URL = "http://localhost:8080/new";
    console.log("PREVIOUS HASH: " + myChain.chain[myChain.chain.length - 1].blockHash);
    $.ajax({
        type: "GET",
        url: URL,
        contentType: "application/json; charset=utf-8",
        data: { 'data': input, 'prev': myChain.chain[myChain.chain.length - 1].blockHash, 'diff': myChain.diff },
        dataType: "html",
        success: function (msg) {
            var resBlock = JSON.parse(msg);
            myChain.addBlock(resBlock);
            publishBlock(resBlock);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("content").innerHTML = "Error obtaining transcript data";
        }
    });
}
function publishBlock(block) {
    var outHTML = '<div style="background-color: #cfc ; padding: 10px; border: 1px solid green;">';
    outHTML += 'BLOCK NUMBER: ' + myChain.chain.length + '<br>';
    outHTML += 'Hash: ' + block.blockHash + '<br>';
    outHTML += 'Previous Hash: ' + block.previousHash + '<br>';
    outHTML += 'Nonce: ' + block.nonce + '<br>';
    outHTML += '</div><br>';
    document.getElementById("output").innerHTML += outHTML;
}
