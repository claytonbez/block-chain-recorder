# block-chain-recorder
An HTTP server that uses a rest API to build and serve a block-chain record database

Intended for educational purposes. There is no security added to these scripts. You will need to build your own on top of the concepts covered in these files. 

### Installation
First clone or download the repo

    git clone https://github.com/claytonbez/block-chain-recorder

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

## Pushing/Reading/Verifying Data
#### Using NodeJS
Using the request module `npm install request --save`
```
//adding records
var request = require('request');
request.post(
    'http://www.yoursite.com/add',
    { block: { yourchoiceOfData: 'inJsonFormat' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
	    else{
		    console.log(`Error:${error}`);
        }
    }
);
//requesting the chain
request('http://your.ip/chain',function(response){
	var chain = JSON.parse(response);
	console.log(chain);
});
//verifying chain integrity 
request('http://your.ip/verify',function(response){
	if(response){
		console.log('Verification Passed');
	}
	else{
		console.log('Verification failed');
	}	
});
```
#### Using JQuery in Broswer
```
//Define a Custom JSON post type
$.postJSON = function(url, data, callback) {
  return jQuery.ajax({
    'type': 'POST',
    'url': url,
    'contentType': 'application/json; charset=utf-8',
    'data': JSON.stringify(data),
    'dataType': 'json',
    'success': callback
  });
};
//then use it to add records
$.postJSON('http://your.ip/add',{block:{this:"Is your test data set",useIt:['like','any','js',{def:'object'}]},function(){
	console.log('Added to chain');
})
//requesting the chain
$.get('http://your.ip/chain',function(data,status){
	if(status == 200){
		var chain = JSON.parse(data);
		console.log(chain);
	}
});
//verifying chain integrity 
$.get('http://your.ip/chain',function(response,status){
	if(status == 200){
		if(response){
		console.log('Verification Passed');
		}
		else{
			console.log('Verification failed');
		}	
	}
});

```
