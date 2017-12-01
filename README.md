Esplix sample code
==================

These samples allow you to test out the Esplix API server, useful for RPC calls, and the Esplix JavaScript library, useful for GUI clients.
Esplix applications can be implemented in two ways:

 * using Esplix JavaScript library (for node.js and browser)
 * using Esplix Server and JSON-RPC API

In this sample bundle you can find:

 * sample-node:  example of using the Esplix Node SDK 
 * server: example Esplix API Server configuration and launch scripts
 * sample-server-client: client code which connects to the API Server over JSON-RPC (JS)

The API server connects to postchain servers at esplix1.chromaway.net, but you can also run with a simulated back-end

For more information, please refer to documentation.

## Client-server sample

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


