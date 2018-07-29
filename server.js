//--------------------------------------------------------------------------------
// HTTP BLOCK CHAIN RECORDING SERVICE
//--------------------------------------------------------------------------------
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var BlockChain = require('./block-chain.js');
var blockchain = new BlockChain();
//--------------------------------------------------------------------------------
// load block-chain
//--------------------------------------------------------------------------------
blockchain.loadChain();
//--------------------------------------------------------------------------------
// express router
//--------------------------------------------------------------------------------
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({	extended: true })); 
app.get('/chain/', function(req, res) {
  res.send(blockchain.chain);
});
app.get('/verify/', function (req, res) {
    res.send(blockchain.chainIsValid());
});
app.post('/add', function (req, res) {
    var block = req.body.block;
    blockchain.addBlock(block,function(err,done){
        if(done){
            res.send(blockchain.chain[blockchain.chain.length-1]);
        }
    });
    
});
//--------------------------------------------------------------------------------
// init
//--------------------------------------------------------------------------------
app.listen(port);
console.log('Server started! At http://localhost:' + port);

