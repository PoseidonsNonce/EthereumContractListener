Web3 = require('web3');
var net = require('net');
var web3 = new Web3(new Web3.providers.IpcProvider('YOURPROVIDER', net)); 

async function main() {
    let lasttx;
    let block = await web3.eth.getBlock(await web3.eth.getBlockNumber());
    console.log("Checking Transactions" )
    for(let i=0; i< block.transactions.length; i++){
        lasttx = await web3.eth.getTransaction(block.transactions[i]);
        if( lasttx != null && lasttx['to'] == null ) {
            console.log("Contract Created:  " + block.transactions[i]);
        }; 
    };
}

var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        return;
    }
    console.error(error);
}).on("data", function(blockHeader){
   main();
})


