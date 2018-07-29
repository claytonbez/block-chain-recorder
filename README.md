# block-chain-recorder
An HTTP server that uses a rest API to build and serve a block-chain record database

Intended for educational purposes. There is no security added to these scripts. You will need to build your own on top of the concepts covered in these files. 

### Installation
First clone or download the repo

    git clone https://github.com/claytonbez/block-chain-recorde

 Open the block-chain-recorder directory in the terminal and install using:

    npm install

### Running the Server
Simply use the `npm start` in the block-chain-recorder directory.

## API
Using HTTP POST and GET requests, you can interact using the following rest api

|URL|REQUEST|params| Content Type | response |
|--|--|--|--|--|
|http://your.ip/add | POST | "block" |application/x-www-form-urlencoded| **true** or **false** |
|http://your.ip/chain | GET |none|none| returns the entire blockchain in json format. |
|http://your.ip/verify | GET |none| none |  **true** or **false** |

