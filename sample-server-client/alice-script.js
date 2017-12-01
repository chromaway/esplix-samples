const jayson = require("jayson/promise");
const client =  jayson.client.http("http://localhost:5535/alice/jsonrpc");
const fs = require('mz/fs');

const alicePubKey = "032a2b53cd473887e468f4c5cdb5e490e01e590694824678c4b091734184e82eb9";
const bobPubKey = "028854e1eb5d17c22c25712ca89b35b03223480971a88e7b573441cfa2b72f891d";

let chainID;

// Alice will be the seller. She will create a new contract instance of
// futuristic land sale contract (futuristic.r2o, hash a7d3410a253e8754f8d9676e74c21af82ccd4e7866441417007d721638b4533c)
// and set SELLER field to her public key
client.request(
  'createContractInstance',
  ["a7d3410a253e8754f8d9676e74c21af82ccd4e7866441417007d721638b4533c", {SELLER: alicePubKey}])
  .then(
    response => {
      if (response.error) throw Error("Request was unsuccessful:" + response.error.message);

      chainID = response.result;
      console.log("Contract instance ID (chainID): " + chainID);
      return fs.writeFile('chainID', chainID);
    })
  .then(
    () => {
      console.log("Initiating offer...");
      return client.request('performAction', [chainID, "OFFER", {"PROPERTY-ID": "Frobla" }]);
    })
  .then(
    response => {
      if (response.error) throw Error("Request was unsuccessful:" + response.error.message);

      // Bob is a broker, let's invite him to the contract.
      console.log("Inviting broker...");
      return client.request('performAction', [chainID, "INVITE-BROKER", {"BROKER-PK": bobPubKey }]);
    })
  .then(
    response => {
      if (response.error) throw Error("Request was unsuccessful:" + response.error.message);

      return client.request('getFields', [chainID]);
    })
  .then(
    response => {
      console.log("Contract fields:");
      console.log(response.result);
    })
  .catch( err => {
    console.log("Got error");
    console.log(err);
  })
