Esplix sample code
==================

These samples allow you to test out the Esplix API server, useful for RPC calls, and the Esplix JavaScript library, useful for GUI clients.
Esplix applications can be implemented in two ways:

 * using Esplix JavaScript library (for node.js and browser)
 * using Esplix Server and JSON-RPC API (currently disabled!)

In this sample bundle you can find:

 * sample-node:  example of using the Esplix Node SDK 
 * server: example Esplix API Server configuration and launch scripts
 * sample-server-client: client code which connects to the API Server over JSON-RPC (JS)

The API server and libs connect to postchain servers at esplix1.chromaway.net or to an in-memory simulated backend depending on command-line options.

For more information, please refer to documentation.

## node.js sample

In `sample-node` directory, run:

 * `npm install` to install dependencies
 * `node index.js` to run a simple script which creates a contract and performs few actions (using in-memory simulation)
 * `node index.js postchain` to do same as above but connecting to a Postchain node

See `documentation/js-api.md` for Esplix JS API documentation.

## Client-server sample

Note: currently doesn't work!

Two server configurations are provided: 

 * local simulation
 * postchain connection (connecting to public server `main-message-store.esplix1.chromaway.net`)

To run the sample, first run either (not both) of the start scripts in the `server/` directory:

  * ./start-sim.sh
  * ./start-postchain.sh

You should see log messages corresponding to alice and bob contexts.

While keeping the server connection running, go to `sample-server-client/` directory and run:

 * `npm install` to install dependencies (jayson package)
 * `node alice-script.js`: this script connects as Alice and creates a new `futuristic` contract, thend invites Bob as a broker. Contract ID is written to a file.
 * `node bob-script.js`: this script connects as Bob and reads fields from the contract, then checks applicable action and calls DESCRIBE action.


## Browser app sample

`esplix-browser-sdk` can be used as an in-browser client which does local security checks and signing, as well as a mobile app using Cordova.

To run sample, execute following commands in `esplix-browser-sample` directory:

 * `npm install`
 * `npm start`

This will automatically open browser page with URL `http://localhost:3000/` which runs the sample. It will display public key of a
randomly generated keypair. A button can be used to create a contract instance.

By default Esplix context uses in-memory simulation mode. If page is opened as `http://localhost:3000/#postchain`, Esplix will connect
to a Postchain node. (Page reload is required.)

See `documentation/js-api.md` for Esplix JS API documentation.

