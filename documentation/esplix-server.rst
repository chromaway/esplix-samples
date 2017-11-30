Esplix Server
====================

Esplix Server acts as an agent for a particular user or a set of users, it will retrieve messages corresponding to contracts they are interested in, compute current state, manage encryption/decryption and signing to allow users to interact with contracts. 

Install & Lanuch
^^^^^^^^^^^^^^^^

Working with Esplix Server is easy. Just download the SDK (``esplix-server-sdk.js``) and start the server using::

  node esplix-server-sdk.js

Make sure you have a data directory with sample contexts and contracts i.e::

  data_dir\contexts\somecontext
  data_dir\contracts\somecontract.r2o

You can then pass the data directory as an argument to the server::

  node esplix-server-sdk.js --datadir=data_dir

Configuration
^^^^^^^^^^^^^^^^

Esplix server expects 2 arguments:

* Data directory
* Port (default: 5535)

i.e::

  node esplix-server-sdk.js --datadir=data --port=5535

Besides that, the directory ``data/contexts`` can hold a context configuration file as follows::

  {
   "mode": "postchain",
   "postchainURL": "....",
   "messagingURL": "...",
   "keypair": { "pubKey": "<pubKey hex>", "privKey": "<privKey hex>" }
  }

Another option is to run the server in simulation mode with a context file as follows::

  {
   "mode": "simulated"
  }

We've also included a random key-pair generator which could be called like this::

  node esplix-server-sdk.js --keygen

Connecting to Esplix Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once setting up and running the server, you can connect to it and call its methods using any JSON-RPC client.

Examples:

* Node.js ``jayson`` module::

    const jayson = require("jayson");
    const client =  jayson.client.http("http://localhost:5535/alice/jsonrpc");

* Unix ``curl`` command::

    curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc": "2.0", "id":"test", "method":"getContractInstanceIDs", "params": [] }' 'http://localhost:5535/alice/jsonrpc'

* etc.
