//--------------------------------------------------------------------------------
// module 
//--------------------------------------------------------------------------------
var sha = require('sha.js');
var JsonDB = require('node-json-db');
var db = new JsonDB('./chain.json',true,false);
//--------------------------------------------------------------------------------
// class def
//--------------------------------------------------------------------------------
class Block {
    constructor(index, data, prevHash) {
        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.getHash();
    }

    getHash() {
        return sha('sha256').update(JSON.stringify(this.data) + this.preHash + this.index + this.timestamp).digest('hex');
    }
}
class loadBlock {
    constructor(obj) {
        this.index = obj.index;
        this.timestamp = obj.timestamp;
        this.data = obj.data;
        this.prevHash = obj.prevHash;
        this.hash = obj.hash;
    }

    getHash() {
        return sha('sha256').update(JSON.stringify(this.data) + this.preHash + this.index + this.timestamp).digest('hex');
    }
}
class BlockChain {
    constructor() {
        this.chain = []; 
    }
    loadChain(){
        try {
            var data = db.getData("/chain");
            for (var i = 0; i < data.length; i++) {
                var block = new loadBlock(data[i]);
                this.chain.push(block);
            }

        } catch (e) {

        }
    }
    addBlock(data,callback) {
        try{
            console.log('add data:',data)
            let index = this.chain.length;
            let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
            let block = new Block(index, data, prevHash);
            this.chain.push(block);
            db.push(`/chain[]`,block);
            callback(null, true);
        }catch(e){
            callback(e, null);
        }
      
    }
    chainIsValid() {

        for (var i = 0; i < this.chain.length; i++) {

            if (this.chain[i].hash !== this.chain[i].getHash())
                return false;

            if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash)
                return false;
        }

        return true;
    }
    getBlocks(){
        return this.chain;
    }
}
//--------------------------------------------------------------------------------
// export
//--------------------------------------------------------------------------------
module.exports = BlockChain;
