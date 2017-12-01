Esplix sample code
==================

Esplix applications can be implemented in several ways:

 * using Esplix JavaScript library (for node.js and browser)
 * using Esplix Server and JSON-RPC API

In this sample bundle you can find:

 * sample-node:  example of using Esplix Node SDK 
 * server: example Esplix Server configuration and lunch scripts
 * sample-server-client: client code which connects to Server over JSON-RPC (JS)

For more information, please refer to documentation.

## Client-server sample

Two server configurations are provided: 

 * local simulation
 * postchain connection (connecting to public server `main-message-store.esplix1.chromaway.net`)

To run the sample, first run start script in `server/` directory:

  * ./start-sim.sh
  * ./start-postchain.sh

You should see log messages corresponding to alice and bob contexts.

While keeping server open, go to `sample-server-client/` directory and run:

 * `npm install` to install dependencies (jayson package)
 * `node script.js`

Now you should see:

 * new contract being created
 * its fields 
