//Create Block and Blockchain data structures
interface Block{
    data: string;
    previousHash: string;
    nonce: number;
    blockHash: string;
}
class Blockchain{
    public chain: Array<Block> = [];
    public diff: number = 1;
    constructor(){
    }
    public addBlock(block: Block){
        this.chain.push(block);
    }
}

//Initialize empty blockchain
var myChain = new Blockchain;

//Create a new block, pull block data from HTML
function createNewBlock(){
    let data: string = document.getElementById("blockData").value;

    //If chain is empty, get a genesis block, otherwise get a new block
    if (myChain.chain.length == 0){
        //Pass genesis endpoint difficulty value
        myChain.diff = document.getElementById("diff").value;
        addGenesisBlock(data);
    } else{
        addNewBlock(data);
    }
    return false;
}

//Function to make an asyncropnous request to genesis endpoint
function addGenesisBlock(input: string){
    let URL: string = "http://localhost:8080/genesis";

    $.ajax({
        type: "GET",
        url: URL,
        contentType: "application/json; charset=utf-8",
        data: {'data':input, 'diff': myChain.diff},
        dataType: "html",
        //On a success parse block, add it to the chain, and publish the new block.  On a fail push error to HTML
        success: function(msg){
            let resBlock: Block = JSON.parse(msg);
            myChain.addBlock(resBlock);
            publishBlock(resBlock);
        },
        error: function(xhr, ajaxOptions, thrownError){
            document.getElementById("output").innerHTML = "Error obtaining block data";
        }
    });
}

function addNewBlock(input: string){
    let URL: string = "http://localhost:8080/new";
    console.log("PREVIOUS HASH: " + myChain.chain[myChain.chain.length-1].blockHash)
    $.ajax({
        type: "GET",
        url: URL,
        contentType: "application/json; charset=utf-8",
        data: {'data':input, 'prev': myChain.chain[myChain.chain.length-1].blockHash, 'diff': myChain.diff},
        dataType: "html",
        success: function(msg){
            let resBlock: Block = JSON.parse(msg);
            myChain.addBlock(resBlock);
            publishBlock(resBlock);
        },
        error: function(xhr, ajaxOptions, thrownError){
            document.getElementById("output").innerHTML = "Error obtaining block data";
        }
    });
}

//Function to parse a new block into html and publish it to the html page.
function publishBlock(block: Block){
    let outHTML: string = '<div style="background-color: #cfc ; padding: 10px; border: 1px solid green;">';
    outHTML += 'BLOCK NUMBER: ' + myChain.chain.length + '<br>';
    outHTML += 'Hash: ' + block.blockHash + '<br>'
    outHTML += 'Previous Hash: ' + block.previousHash + '<br>';
    outHTML += 'Nonce: ' + block.nonce + '<br>';
    outHTML += '</div><br>'
    document.getElementById("output").innerHTML += outHTML;
}

