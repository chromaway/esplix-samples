const jayson = require("jayson");
const client =  jayson.client.http("http://localhost:5535/alice/jsonrpc");

client.request('createContractInstance', ["a7d3410a253e8754f8d9676e74c21af82ccd4e7866441417007d721638b4533c", {SELLER: "0000"}], function(err, response) {
  if(err) throw err;
  console.log("Contract instance ID: "+response.result);

  client.request('getFields', [response.result], function(err, response) {
    if(err) throw err;
    console.log("Contract fields:");
    console.log(response.result);
  });
});
